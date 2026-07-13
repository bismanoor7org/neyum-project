import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { generateSecureToken, hashToken } from "@/lib/auth/token-hash";
import type { ForgotPasswordRequest, ResetPasswordRequest } from "@/lib/validations/traveller-auth";
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
} from "@/server/auth/local-traveller-store";
import { sendPasswordResetEmail } from "@/server/services/email.service";

const GENERIC_RESET_MESSAGE =
  "If an account exists for this email, we sent password reset instructions.";

async function safeLogActivity(
  input: Parameters<typeof import("@/server/services/activity-log.service").logActivity>[0],
) {
  try {
    const { logActivity } = await import("@/server/services/activity-log.service");
    await logActivity(input);
  } catch (error) {
    console.error("[traveller-password]", error);
  }
}

async function issuePasswordResetToken(userId: string): Promise<string> {
  const token = generateSecureToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  if (!isTravellerDatabaseConfigured()) {
    createLocalAuthToken({
      id: randomUUID(),
      userId,
      type: "PASSWORD_RESET",
      token,
      expiresAt,
    });
    return token;
  }

  await prisma.authToken.deleteMany({
    where: { userId, type: "PASSWORD_RESET", usedAt: null },
  });

  await prisma.authToken.create({
    data: {
      userId,
      type: "PASSWORD_RESET",
      tokenHash: hashToken(token),
      expiresAt,
    },
  });

  return token;
}

export async function requestTravellerPasswordReset(
  input: ForgotPasswordRequest,
  meta: { ip?: string; userAgent?: string } = {},
) {
  const email = input.email.toLowerCase().trim();

  if (!isTravellerDatabaseConfigured()) {
    const record = readLocalTraveller();
    if (record?.email === email) {
      const token = await issuePasswordResetToken(LOCAL_TRAVELLER_ID);
      await sendPasswordResetEmail({ to: email, name: record.firstName, token });
    }
    return { ok: true as const, message: GENERIC_RESET_MESSAGE };
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, firstName: true, role: true, status: true, passwordHash: true },
  });

  if (
    user &&
    user.role === "TRAVELER" &&
    user.status !== "BLOCKED" &&
    user.passwordHash
  ) {
    const token = await issuePasswordResetToken(user.id);
    await sendPasswordResetEmail({ to: email, name: user.firstName, token });

    await safeLogActivity({
      userId: user.id,
      action: "traveller.password.reset_requested",
      module: "AUTH",
      metadata: { ip: meta.ip },
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });
  }

  return { ok: true as const, message: GENERIC_RESET_MESSAGE };
}

export async function resetTravellerPassword(
  input: ResetPasswordRequest,
  meta: { ip?: string; userAgent?: string } = {},
) {
  if (!isTravellerDatabaseConfigured()) {
    const result = consumeLocalAuthToken(input.token, "PASSWORD_RESET");
    if (!result || result.userId !== LOCAL_TRAVELLER_ID) {
      return { ok: false as const, error: "Invalid or expired reset link." };
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    updateLocalTraveller({ passwordHash });

    return { ok: true as const };
  }

  const hashed = hashToken(input.token);
  const authToken = await prisma.authToken.findFirst({
    where: {
      tokenHash: hashed,
      type: "PASSWORD_RESET",
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    include: { user: true },
  });

  if (!authToken?.user || authToken.user.role !== "TRAVELER") {
    return { ok: false as const, error: "Invalid or expired reset link." };
  }

  const passwordHash = await bcrypt.hash(input.password, 12);

  await prisma.$transaction([
    prisma.authToken.update({
      where: { id: authToken.id },
      data: { usedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: authToken.userId },
      data: { passwordHash },
    }),
  ]);

  await safeLogActivity({
    userId: authToken.userId,
    action: "traveller.password.reset_completed",
    module: "AUTH",
    metadata: { ip: meta.ip },
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
  });

  return { ok: true as const };
}
