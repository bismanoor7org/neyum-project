import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { generateSecureToken, hashToken } from "@/lib/auth/token-hash";
import type { TravellerRegisterRequest } from "@/lib/validations/traveller-auth";
import { prisma } from "@/lib/db/prisma";
import {
  consumeLocalAuthToken,
  createLocalAuthToken,
} from "@/server/auth/local-auth-tokens";
import {
  LOCAL_TRAVELLER_ID,
  isTravellerDatabaseConfigured,
  readLocalTraveller,
  updateLocalTraveller,
  writeLocalTraveller,
} from "@/server/auth/local-traveller-store";
import { sendVerificationEmail } from "@/server/services/email.service";

const EMAIL_EXISTS = "An account with this email already exists.";
const GENERIC_SUCCESS =
  "If an account exists for this email, we sent a verification link. Please check your inbox.";

async function safeLogActivity(
  input: Parameters<typeof import("@/server/services/activity-log.service").logActivity>[0],
) {
  try {
    const { logActivity } = await import("@/server/services/activity-log.service");
    await logActivity(input);
  } catch (error) {
    console.error("[traveller-register]", error);
  }
}

async function issueVerificationToken(userId: string): Promise<string> {
  const token = generateSecureToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  if (!isTravellerDatabaseConfigured()) {
    createLocalAuthToken({
      id: randomUUID(),
      userId,
      type: "EMAIL_VERIFICATION",
      token,
      expiresAt,
    });
    return token;
  }

  await prisma.authToken.deleteMany({
    where: { userId, type: "EMAIL_VERIFICATION", usedAt: null },
  });

  await prisma.authToken.create({
    data: {
      userId,
      type: "EMAIL_VERIFICATION",
      tokenHash: hashToken(token),
      expiresAt,
    },
  });

  return token;
}

export async function registerTraveller(
  input: TravellerRegisterRequest,
  meta: { ip?: string; userAgent?: string } = {},
) {
  const email = input.email.toLowerCase().trim();

  if (!isTravellerDatabaseConfigured()) {
    const existing = readLocalTraveller();
    if (existing?.email === email) {
      return { ok: false as const, error: EMAIL_EXISTS };
    }

    writeLocalTraveller({
      email,
      password: input.password,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      emailVerifiedAt: null,
    });

    const token = await issueVerificationToken(LOCAL_TRAVELLER_ID);
    await sendVerificationEmail({
      to: email,
      name: input.firstName.trim(),
      token,
    });

    await safeLogActivity({
      action: "traveller.register.success",
      module: "AUTH",
      metadata: { email, ip: meta.ip, mode: "local" },
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });

    return { ok: true as const, message: GENERIC_SUCCESS };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false as const, error: EMAIL_EXISTS };
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      passwordHash,
      role: "TRAVELER",
      status: "PENDING_VERIFICATION",
      travellerProfile: { create: {} },
      loyaltyAccount: { create: {} },
    },
  });

  const token = await issueVerificationToken(user.id);
  await sendVerificationEmail({
    to: email,
    name: user.firstName,
    token,
  });

  await safeLogActivity({
    userId: user.id,
    action: "traveller.register.success",
    module: "AUTH",
    metadata: { email, ip: meta.ip },
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
  });

  return { ok: true as const, message: GENERIC_SUCCESS };
}

export async function verifyTravellerEmail(
  token: string,
  meta: { ip?: string; userAgent?: string } = {},
) {
  if (!isTravellerDatabaseConfigured()) {
    const result = consumeLocalAuthToken(token, "EMAIL_VERIFICATION");
    if (!result || result.userId !== LOCAL_TRAVELLER_ID) {
      return { ok: false as const, error: "Invalid or expired verification link." };
    }

    updateLocalTraveller({ emailVerifiedAt: new Date().toISOString() });
    return { ok: true as const };
  }

  const hashed = hashToken(token);
  const authToken = await prisma.authToken.findFirst({
    where: {
      tokenHash: hashed,
      type: "EMAIL_VERIFICATION",
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    include: { user: true },
  });

  if (!authToken?.user) {
    return { ok: false as const, error: "Invalid or expired verification link." };
  }

  await prisma.$transaction([
    prisma.authToken.update({
      where: { id: authToken.id },
      data: { usedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: authToken.userId },
      data: {
        emailVerifiedAt: new Date(),
        status: "ACTIVE",
      },
    }),
  ]);

  await safeLogActivity({
    userId: authToken.userId,
    action: "traveller.email.verified",
    module: "AUTH",
    metadata: { ip: meta.ip },
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
  });

  return { ok: true as const };
}

export async function resendTravellerVerification(
  email: string,
  meta: { ip?: string; userAgent?: string } = {},
) {
  const normalized = email.toLowerCase().trim();

  if (!isTravellerDatabaseConfigured()) {
    const record = readLocalTraveller();
    if (!record || record.email !== normalized || record.emailVerifiedAt) {
      return { ok: true as const, message: GENERIC_SUCCESS };
    }

    const token = await issueVerificationToken(LOCAL_TRAVELLER_ID);
    await sendVerificationEmail({ to: normalized, name: record.firstName, token });
    return { ok: true as const, message: GENERIC_SUCCESS };
  }

  const user = await prisma.user.findUnique({
    where: { email: normalized },
    select: { id: true, firstName: true, emailVerifiedAt: true, role: true, status: true },
  });

  if (
    !user ||
    user.role !== "TRAVELER" ||
    user.emailVerifiedAt ||
    user.status === "BLOCKED"
  ) {
    return { ok: true as const, message: GENERIC_SUCCESS };
  }

  const token = await issueVerificationToken(user.id);
  await sendVerificationEmail({ to: normalized, name: user.firstName, token });

  await safeLogActivity({
    userId: user.id,
    action: "traveller.verification.resent",
    module: "AUTH",
    metadata: { ip: meta.ip },
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
  });

  return { ok: true as const, message: GENERIC_SUCCESS };
}

export async function isTravellerEmailVerifiedAsync(userId: string): Promise<boolean> {
  if (!isTravellerDatabaseConfigured()) {
    if (userId !== LOCAL_TRAVELLER_ID) return false;
    const record = readLocalTraveller();
    return Boolean(record?.emailVerifiedAt || record?.googleId);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { emailVerifiedAt: true, googleId: true },
  });

  return Boolean(user?.emailVerifiedAt || user?.googleId);
}
