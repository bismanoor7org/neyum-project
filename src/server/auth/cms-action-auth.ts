import { cookies } from "next/headers";
import type { AdminStaffRole } from "@prisma/client";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/auth/admin-session";
import { resolveAdminUserFromSession } from "@/server/services/admin-auth.service";
import { ForbiddenError, UnauthorizedError } from "@/server/errors";
import type { Permission } from "@/lib/auth/permissions";
import { canStaffRole, resolveStaffRole } from "@/lib/auth/admin-roles";
import { LOCAL_ADMIN_ID } from "@/server/auth/local-admin-store";
import { prisma } from "@/lib/db/prisma";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";

export async function getAdminUserIdFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await verifyAdminSessionToken(token);
  if (!session) return null;
  const user = await resolveAdminUserFromSession(session.userId);
  return user?.id ?? null;
}

async function resolveStaffRoleForUser(userId: string): Promise<AdminStaffRole | null> {
  if (userId === LOCAL_ADMIN_ID) return "SUPER_ADMIN";
  if (!isDatabaseConfigured()) return null;
  const profile = await prisma.adminStaffProfile.findUnique({ where: { userId } });
  return resolveStaffRole(profile?.staffRole);
}

export async function requireCmsAction(permission: Permission) {
  const userId = await getAdminUserIdFromCookies();
  if (!userId) throw new UnauthorizedError("Admin login required");
  const staffRole = await resolveStaffRoleForUser(userId);
  if (!staffRole || !canStaffRole(staffRole, permission)) {
    throw new ForbiddenError(`Missing permission: ${permission}`);
  }
  return { userId, staffRole };
}
