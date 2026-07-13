import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import type { AdminLoginRequest } from "@/lib/validations/admin-auth";
import { authenticateLocalAdmin, resolveLocalAdminUser } from "@/server/auth/local-admin-auth";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";

const GENERIC_FAILURE = "Invalid email or password.";

async function safeLogActivity(
  input: Parameters<typeof import("@/server/services/activity-log.service").logActivity>[0],
) {
  try {
    const { logActivity } = await import("@/server/services/activity-log.service");
    await logActivity(input);
  } catch (error) {
    console.error("[admin-auth] audit log failed:", error);
  }
}

async function authenticateWithDatabase(
  input: AdminLoginRequest,
  meta: { ip?: string; userAgent?: string },
): Promise<
  | { ok: true; userId: string; remember: boolean }
  | { ok: false; error: string; userId?: string }
> {
  const email = input.email.toLowerCase().trim();

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      passwordHash: true,
    },
  });

  if (
    !user ||
    user.role !== "ADMIN" ||
    user.status !== "ACTIVE" ||
    !user.passwordHash
  ) {
    await safeLogActivity({
      action: "admin.login.failed",
      module: "AUTH",
      metadata: { email, reason: "invalid_account", ip: meta.ip },
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });
    return { ok: false, error: GENERIC_FAILURE };
  }

  const passwordValid = await bcrypt.compare(input.password, user.passwordHash);
  if (!passwordValid) {
    await safeLogActivity({
      userId: user.id,
      action: "admin.login.failed",
      module: "AUTH",
      metadata: { email, reason: "invalid_password", ip: meta.ip },
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });
    return { ok: false, error: GENERIC_FAILURE, userId: user.id };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  await safeLogActivity({
    userId: user.id,
    action: "admin.login.success",
    module: "AUTH",
    metadata: { email, ip: meta.ip, rememberDevice: input.remember },
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
  });

  return { ok: true, userId: user.id, remember: input.remember ?? false };
}

async function authenticateWithLocalStore(
  input: AdminLoginRequest,
  meta: { ip?: string; userAgent?: string },
): Promise<
  | { ok: true; userId: string; remember: boolean }
  | { ok: false; error: string; userId?: string }
> {
  const result = await authenticateLocalAdmin(input);
  const email = input.email.toLowerCase().trim();

  if (!result.ok) {
    await safeLogActivity({
      action: "admin.login.failed",
      module: "AUTH",
      metadata: { email, reason: "local_auth_failed", ip: meta.ip },
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });
    return result;
  }

  await safeLogActivity({
    userId: result.userId,
    action: "admin.login.success",
    module: "AUTH",
    metadata: { email, ip: meta.ip, rememberDevice: input.remember, source: "local" },
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
  });

  return { ok: true, userId: result.userId, remember: result.remember };
}

export async function authenticateAdmin(
  input: AdminLoginRequest,
  meta: { ip?: string; userAgent?: string },
): Promise<
  | { ok: true; userId: string; remember: boolean }
  | { ok: false; error: string; userId?: string }
> {
  if (!isDatabaseConfigured()) {
    return authenticateWithLocalStore(input, meta);
  }

  try {
    return await authenticateWithDatabase(input, meta);
  } catch (error) {
    console.error("[admin-auth] database unavailable, using local admin store", error);
    return authenticateWithLocalStore(input, meta);
  }
}

export async function resolveAdminUserFromSession(userId: string) {
  const local = resolveLocalAdminUser(userId);
  if (local) {
    return {
      id: local.id,
      email: local.email,
      firstName: local.firstName,
      lastName: local.lastName,
    };
  }

  if (!isDatabaseConfigured()) return null;

  try {
    return await prisma.user.findFirst({
      where: { id: userId, role: "ADMIN", status: "ACTIVE" },
      select: { id: true, email: true, firstName: true, lastName: true },
    });
  } catch {
    return null;
  }
}
