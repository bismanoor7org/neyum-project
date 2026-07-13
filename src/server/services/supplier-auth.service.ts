import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { verifyTotpCode } from "@/lib/auth/totp";
import type { SupplierLoginRequest } from "@/lib/validations/admin-auth";
import { authenticateLocalSupplier } from "@/server/auth/local-supplier-auth";
import { isDatabaseConfigured } from "@/server/auth/local-supplier-store";

const GENERIC_FAILURE = "Invalid email, password, or two-factor code.";

async function safeLogActivity(
  input: Parameters<typeof import("@/server/services/activity-log.service").logActivity>[0],
) {
  try {
    const { logActivity } = await import("@/server/services/activity-log.service");
    await logActivity(input);
  } catch (error) {
    console.error("[supplier-auth]", error);
  }
}

async function authenticateWithDatabase(
  input: SupplierLoginRequest,
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
      twoFactorSecret: true,
      twoFactorEnabled: true,
      supplier: { select: { id: true, verificationStatus: true } },
    },
  });

  if (
    !user ||
    user.role !== "SUPPLIER" ||
    user.status !== "ACTIVE" ||
    !user.passwordHash ||
    !user.twoFactorEnabled ||
    !user.twoFactorSecret ||
    !user.supplier
  ) {
    await safeLogActivity({
      action: "supplier.login.failed",
      module: "AUTH",
      metadata: { email, reason: "invalid_account", ip: meta.ip },
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });
    return { ok: false as const, error: GENERIC_FAILURE };
  }

  if (user.supplier.verificationStatus === "SUSPENDED") {
    return { ok: false as const, error: "Supplier account suspended. Contact support." };
  }

  const passwordValid = await bcrypt.compare(input.password, user.passwordHash);
  if (!passwordValid) {
    await safeLogActivity({
      userId: user.id,
      action: "supplier.login.failed",
      module: "AUTH",
      metadata: { email, reason: "invalid_password", ip: meta.ip },
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });
    return { ok: false as const, error: GENERIC_FAILURE };
  }

  const totpValid = verifyTotpCode(input.twoFactor, user.twoFactorSecret);
  if (!totpValid) {
    await safeLogActivity({
      userId: user.id,
      action: "supplier.login.failed",
      module: "AUTH",
      metadata: { email, reason: "invalid_2fa", ip: meta.ip },
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
    action: "supplier.login.success",
    module: "AUTH",
    metadata: { email, ip: meta.ip, rememberDevice: input.remember },
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
  });

  return { ok: true as const, userId: user.id, remember: input.remember ?? false };
}

export async function authenticateSupplier(
  input: SupplierLoginRequest,
  meta: { ip?: string; userAgent?: string },
) {
  if (!isDatabaseConfigured()) {
    const result = await authenticateLocalSupplier(input);
    if (!result.ok) {
      await safeLogActivity({
        action: "supplier.login.failed",
        module: "AUTH",
        metadata: { email: input.email, reason: "local_failed", ip: meta.ip },
        ipAddress: meta.ip,
        userAgent: meta.userAgent,
      });
      return result;
    }
    await safeLogActivity({
      userId: result.userId,
      action: "supplier.login.success",
      module: "AUTH",
      metadata: { email: input.email, source: "local", ip: meta.ip },
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });
    return { ok: true as const, userId: result.userId, remember: result.remember };
  }

  try {
    return await authenticateWithDatabase(input, meta);
  } catch (error) {
    console.error("[supplier-auth]", error);
    return authenticateLocalSupplier(input).then(async (result) => {
      if (result.ok) {
        return { ok: true as const, userId: result.userId, remember: result.remember };
      }
      return { ok: false as const, error: "Authentication service unavailable." };
    });
  }
}

export async function resolveSupplierUserFromSession(userId: string) {
  if (!isDatabaseConfigured()) {
    const { resolveLocalSupplierUser, resolveLocalSupplierProfile } = await import(
      "@/server/auth/local-supplier-auth"
    );
    const user = resolveLocalSupplierUser(userId);
    const supplier = resolveLocalSupplierProfile(userId);
    if (!user || !supplier) return null;
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      supplier: {
        id: supplier.id,
        companyName: supplier.companyName,
        verificationStatus: supplier.verificationStatus,
        kycStatus: supplier.kycStatus,
        onboardingStep: supplier.onboardingStep,
        rating: supplier.rating,
        healthScore: supplier.healthScore,
      },
    };
  }

  const user = await prisma.user.findFirst({
    where: { id: userId, role: "SUPPLIER", status: "ACTIVE" },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      supplier: {
        select: {
          id: true,
          companyName: true,
          verificationStatus: true,
          kycStatus: true,
          onboardingStep: true,
          rating: true,
          healthScore: true,
        },
      },
    },
  });

  if (!user?.supplier) return null;
  return { user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }, supplier: user.supplier };
}
