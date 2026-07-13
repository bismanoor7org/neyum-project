import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import type { AdminLoginRequest } from "@/lib/validations/admin-auth";
import { authenticateLocalTraveller, resolveLocalTravellerUser } from "@/server/auth/local-traveller-auth";
import { isTravellerDatabaseConfigured, readLocalTraveller } from "@/server/auth/local-traveller-store";

const GENERIC_FAILURE = "Invalid email or password.";
const EMAIL_NOT_VERIFIED =
  "Please verify your email before signing in. Check your inbox or request a new verification link.";

async function safeLogActivity(
  input: Parameters<typeof import("@/server/services/activity-log.service").logActivity>[0],
) {
  try {
    const { logActivity } = await import("@/server/services/activity-log.service");
    await logActivity(input);
  } catch (error) {
    console.error("[traveller-auth]", error);
  }
}

async function authenticateWithDatabase(
  input: AdminLoginRequest,
  meta: { ip?: string; userAgent?: string },
) {
  const email = input.email.toLowerCase().trim();
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      passwordHash: true,
      emailVerifiedAt: true,
      googleId: true,
    },
  });

  if (!user || user.role !== "TRAVELER" || user.status === "BLOCKED" || !user.passwordHash) {
    await safeLogActivity({
      action: "traveller.login.failed",
      module: "AUTH",
      metadata: { email, reason: "invalid_account", ip: meta.ip },
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });
    return { ok: false as const, error: GENERIC_FAILURE };
  }

  if (!user.emailVerifiedAt && !user.googleId) {
    await safeLogActivity({
      userId: user.id,
      action: "traveller.login.failed",
      module: "AUTH",
      metadata: { email, reason: "email_not_verified", ip: meta.ip },
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });
    return { ok: false as const, error: EMAIL_NOT_VERIFIED, code: "EMAIL_NOT_VERIFIED" as const };
  }

  if (user.status === "PENDING_VERIFICATION" && !user.emailVerifiedAt) {
    return { ok: false as const, error: EMAIL_NOT_VERIFIED, code: "EMAIL_NOT_VERIFIED" as const };
  }

  const passwordValid = await bcrypt.compare(input.password, user.passwordHash);
  if (!passwordValid) {
    await safeLogActivity({
      userId: user.id,
      action: "traveller.login.failed",
      module: "AUTH",
      metadata: { email, reason: "invalid_password", ip: meta.ip },
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });
    return { ok: false as const, error: GENERIC_FAILURE };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  await safeLogActivity({
    userId: user.id,
    action: "traveller.login.success",
    module: "AUTH",
    metadata: { email, ip: meta.ip, rememberDevice: input.remember },
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
  });

  return { ok: true as const, userId: user.id, remember: input.remember ?? false };
}

export async function authenticateTraveller(
  input: AdminLoginRequest,
  meta: { ip?: string; userAgent?: string } = {},
) {
  if (!isTravellerDatabaseConfigured()) {
    return authenticateLocalTraveller(input);
  }
  return authenticateWithDatabase(input, meta);
}

export async function resolveTravellerUserFromSession(userId: string) {
  if (!isTravellerDatabaseConfigured()) {
    const local = resolveLocalTravellerUser(userId);
    if (!local) return null;
    return {
      user: {
        id: local.id,
        email: local.email,
        firstName: local.firstName,
        lastName: local.lastName,
        avatar: local.avatar ?? null,
      },
      profile: {
        loyaltyPoints: local.loyaltyPoints,
        loyaltyTier: local.loyaltyTier,
        walletBalance: local.walletBalance,
        wishlistCount: 12,
        upcomingTrips: 2,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId, role: "TRAVELER" },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      avatar: true,
      travellerProfile: true,
      loyaltyAccount: { select: { points: true, tier: true } },
      travellerWallet: { select: { balance: true } },
      _count: { select: { wishlistItems: true, bookings: true } },
    },
  });

  if (!user) return null;

  const upcoming = await prisma.booking.count({
    where: {
      travelerId: userId,
      bookingStatus: { in: ["CONFIRMED", "PENDING"] },
      travelDate: { gte: new Date() },
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
    },
    profile: {
      loyaltyPoints: user.loyaltyAccount?.points ?? 0,
      loyaltyTier: user.loyaltyAccount?.tier ?? "EXPLORER",
      walletBalance: Number(user.travellerWallet?.balance ?? 0),
      wishlistCount: user._count.wishlistItems,
      upcomingTrips: upcoming,
    },
  };
}

export async function resolveTravellerUser(userId: string) {
  if (!isTravellerDatabaseConfigured()) {
    return readLocalTraveller();
  }
  return prisma.user.findUnique({ where: { id: userId, role: "TRAVELER" } });
}
