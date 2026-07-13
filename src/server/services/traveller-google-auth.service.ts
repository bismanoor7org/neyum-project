import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/db/prisma";
import {
  LOCAL_TRAVELLER_ID,
  isTravellerDatabaseConfigured,
  readLocalTraveller,
  updateLocalTraveller,
  writeLocalTraveller,
} from "@/server/auth/local-traveller-store";

export type GoogleProfile = {
  sub: string;
  email: string;
  email_verified?: boolean;
  given_name?: string;
  family_name?: string;
  name?: string;
  picture?: string;
};

async function safeLogActivity(
  input: Parameters<typeof import("@/server/services/activity-log.service").logActivity>[0],
) {
  try {
    const { logActivity } = await import("@/server/services/activity-log.service");
    await logActivity(input);
  } catch (error) {
    console.error("[traveller-google-auth]", error);
  }
}

function splitName(profile: GoogleProfile) {
  const firstName = profile.given_name ?? profile.name?.split(" ")[0] ?? "Fiji";
  const lastName =
    profile.family_name ?? profile.name?.split(" ").slice(1).join(" ") ?? "Explorer";
  return { firstName, lastName };
}

export async function authenticateTravellerWithGoogle(
  profile: GoogleProfile,
  meta: { ip?: string; userAgent?: string } = {},
): Promise<{ ok: true; userId: string } | { ok: false; error: string }> {
  const email = profile.email.toLowerCase().trim();
  if (!email || !profile.sub) {
    return { ok: false, error: "Google account did not return a valid email." };
  }

  if (!isTravellerDatabaseConfigured()) {
    const existing = readLocalTraveller();
    const { firstName, lastName } = splitName(profile);

    if (existing) {
      if (existing.email !== email && !existing.googleId) {
        return { ok: false, error: "This Google account does not match the local traveller email." };
      }

      updateLocalTraveller({
        googleId: profile.sub,
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
        googleId: profile.sub,
        emailVerifiedAt: new Date().toISOString(),
      });
    }

    await safeLogActivity({
      action: "traveller.login.google.success",
      module: "AUTH",
      metadata: { email, ip: meta.ip, mode: "local" },
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });

    return { ok: true, userId: LOCAL_TRAVELLER_ID };
  }

  let user = await prisma.user.findFirst({
    where: {
      OR: [{ googleId: profile.sub }, { email }],
    },
  });

  const { firstName, lastName } = splitName(profile);

  if (user) {
    if (user.role !== "TRAVELER" || user.status === "BLOCKED") {
      return { ok: false, error: "This account cannot sign in here." };
    }

    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        googleId: user.googleId ?? profile.sub,
        emailVerifiedAt: user.emailVerifiedAt ?? new Date(),
        status: user.status === "PENDING_VERIFICATION" ? "ACTIVE" : user.status,
        firstName: user.firstName || firstName,
        lastName: user.lastName || lastName,
        avatar: user.avatar ?? profile.picture,
        lastLoginAt: new Date(),
      },
    });
  } else {
    user = await prisma.user.create({
      data: {
        email,
        googleId: profile.sub,
        firstName,
        lastName,
        avatar: profile.picture,
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
    userId: user.id,
    action: "traveller.login.google.success",
    module: "AUTH",
    metadata: { email, ip: meta.ip },
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
  });

  return { ok: true, userId: user.id };
}

export function getGoogleAuthUrl(state: string): string {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ??
    `${(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "")}/api/auth/callback/google`;

  if (!clientId) {
    throw new Error("GOOGLE_CLIENT_ID is not configured");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "online",
    prompt: "select_account",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeGoogleCode(code: string): Promise<GoogleProfile> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ??
    `${(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "")}/api/auth/callback/google`;

  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth is not configured");
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    throw new Error("Failed to exchange Google authorization code");
  }

  const tokenData = (await tokenRes.json()) as { access_token?: string };
  if (!tokenData.access_token) {
    throw new Error("Google token response missing access_token");
  }

  const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  if (!profileRes.ok) {
    throw new Error("Failed to fetch Google user profile");
  }

  return (await profileRes.json()) as GoogleProfile;
}
