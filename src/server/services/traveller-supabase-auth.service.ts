import { randomUUID } from "crypto";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { prisma } from "@/lib/db/prisma";
import {
  LOCAL_TRAVELLER_ID,
  isTravellerDatabaseConfigured,
  readLocalTraveller,
  updateLocalTraveller,
  writeLocalTraveller,
} from "@/server/auth/local-traveller-store";

async function safeLogActivity(
  input: Parameters<typeof import("@/server/services/activity-log.service").logActivity>[0],
) {
  try {
    const { logActivity } = await import("@/server/services/activity-log.service");
    await logActivity(input);
  } catch (error) {
    console.error("[traveller-supabase-auth]", error);
  }
}

function extractGoogleId(user: SupabaseUser): string | null {
  const googleIdentity = user.identities?.find((identity) => identity.provider === "google");
  const sub =
    googleIdentity?.identity_data?.sub ??
    (typeof user.user_metadata?.sub === "string" ? user.user_metadata.sub : null);
  return sub ?? null;
}

function splitName(user: SupabaseUser) {
  const metadata = user.user_metadata ?? {};
  const fullName = typeof metadata.full_name === "string" ? metadata.full_name : metadata.name;
  const firstName =
    (typeof metadata.given_name === "string" ? metadata.given_name : null) ??
    fullName?.split(" ")[0] ??
    "Fiji";
  const lastName =
    (typeof metadata.family_name === "string" ? metadata.family_name : null) ??
    fullName?.split(" ").slice(1).join(" ") ??
    "Explorer";
  return { firstName, lastName };
}

export async function authenticateTravellerWithSupabase(
  user: SupabaseUser,
  meta: { ip?: string; userAgent?: string } = {},
): Promise<{ ok: true; userId: string } | { ok: false; error: string }> {
  const email = user.email?.toLowerCase().trim();
  if (!email) {
    return { ok: false, error: "Google account did not return a valid email." };
  }

  const googleId = extractGoogleId(user) ?? user.id;
  const { firstName, lastName } = splitName(user);
  const avatar =
    typeof user.user_metadata?.avatar_url === "string"
      ? user.user_metadata.avatar_url
      : typeof user.user_metadata?.picture === "string"
        ? user.user_metadata.picture
        : undefined;

  if (!isTravellerDatabaseConfigured()) {
    const existing = readLocalTraveller();

    if (existing) {
      if (existing.email !== email && !existing.googleId) {
        return { ok: false, error: "This Google account does not match the local traveller email." };
      }

      updateLocalTraveller({
        googleId,
        emailVerifiedAt: new Date().toISOString(),
        firstName: existing.firstName || firstName,
        lastName: existing.lastName || lastName,
      });
    } else {
      writeLocalTraveller({
        email,
        password: randomUUID(),
        firstName,
        lastName,
        googleId,
        emailVerifiedAt: new Date().toISOString(),
      });
    }

    await safeLogActivity({
      action: "traveller.login.google.success",
      module: "AUTH",
      metadata: { email, ip: meta.ip, mode: "local", provider: "supabase" },
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });

    return { ok: true, userId: LOCAL_TRAVELLER_ID };
  }

  let traveller = await prisma.user.findFirst({
    where: {
      OR: [{ googleId }, { email }],
    },
  });

  if (traveller) {
    if (traveller.role !== "TRAVELER" || traveller.status === "BLOCKED") {
      return { ok: false, error: "This account cannot sign in here." };
    }

    traveller = await prisma.user.update({
      where: { id: traveller.id },
      data: {
        googleId: traveller.googleId ?? googleId,
        emailVerifiedAt: traveller.emailVerifiedAt ?? new Date(),
        status: traveller.status === "PENDING_VERIFICATION" ? "ACTIVE" : traveller.status,
        firstName: traveller.firstName || firstName,
        lastName: traveller.lastName || lastName,
        avatar: traveller.avatar ?? avatar,
        lastLoginAt: new Date(),
      },
    });
  } else {
    traveller = await prisma.user.create({
      data: {
        email,
        googleId,
        firstName,
        lastName,
        avatar,
        role: "TRAVELER",
        status: "ACTIVE",
        emailVerifiedAt: new Date(),
        travellerProfile: { create: {} },
        loyaltyAccount: { create: {} },
        lastLoginAt: new Date(),
      },
    });
  }

  await safeLogActivity({
    userId: traveller.id,
    action: "traveller.login.google.success",
    module: "AUTH",
    metadata: { email, ip: meta.ip, provider: "supabase" },
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
  });

  return { ok: true, userId: traveller.id };
}
