import type { Supplier, User, UserRole, SupplierMemberRole, AdminStaffRole } from "@prisma/client";
import { verifyAdminSession } from "@/lib/auth/verify-admin-session";
import { verifySupplierSession } from "@/lib/auth/verify-supplier-session";
import { verifyTravellerSession } from "@/lib/auth/verify-traveller-session";
import { prisma } from "@/lib/db/prisma";
import { ForbiddenError, UnauthorizedError } from "@/server/errors";
import type { Permission } from "@/lib/auth/permissions";
import { can, canSupplierMember } from "@/lib/auth/permissions";
import { canStaffRole, resolveStaffRole } from "@/lib/auth/admin-roles";
import { LOCAL_ADMIN_ID } from "@/server/auth/local-admin-store";
import { isDatabaseConfigured } from "@/server/auth/local-supplier-store";
import { resolveLocalSupplierUser } from "@/server/auth/local-supplier-auth";
import { resolveLocalTravellerUser } from "@/server/auth/local-traveller-auth";
import { resolveLocalAdminUser } from "@/server/auth/local-admin-auth";
import { isDatabaseConfigured as isAdminDbConfigured } from "@/server/auth/local-admin-store";
import { isTravellerDatabaseConfigured } from "@/server/auth/local-traveller-store";

export type AuthContext = {
  user: User;
  role: UserRole;
  source: "clerk" | "legacy" | "supplier_session" | "traveller_session" | "admin_session";
  staffRole?: AdminStaffRole;
};

export type SupplierAuthContext = AuthContext & {
  supplierId: string;
  supplier: Supplier;
  memberRole: SupplierMemberRole;
};

export type TravellerAuthContext = AuthContext & {
  travelerId: string;
};

export async function resolveAuthContext(request: Request): Promise<AuthContext | null> {
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const clerkAuth = await auth();

    if (clerkAuth.userId) {
      const user = await prisma.user.findUnique({
        where: { clerkId: clerkAuth.userId },
      });

      if (user && user.status !== "BLOCKED") {
        if (user.role === "ADMIN") {
          const staffRole = await resolveAdminStaffRole(user.id);
          return withStaffRole({ user, role: user.role, source: "clerk" }, staffRole);
        }
        return { user, role: user.role, source: "clerk" };
      }
    }
  } catch {
    // Clerk not configured
  }

  const supplierUserId = await verifySupplierSession(request);
  if (supplierUserId) {
    const user = await resolveLocalSupplierUser(supplierUserId);
    if (user && user.status !== "BLOCKED" && user.role === "SUPPLIER") {
      return { user, role: user.role, source: "supplier_session" };
    }
    if (isDatabaseConfigured()) {
      const dbUser = await prisma.user.findUnique({ where: { id: supplierUserId } });
      if (dbUser && dbUser.status !== "BLOCKED" && dbUser.role === "SUPPLIER") {
        return { user: dbUser, role: dbUser.role, source: "supplier_session" };
      }
    }
  }

  const travellerUserId = await verifyTravellerSession(request);
  if (travellerUserId) {
    const local = resolveLocalTravellerUser(travellerUserId);
    if (local) {
      const user = {
        id: local.id,
        clerkId: null,
        googleId: null,
        emailVerifiedAt: null,
        firstName: local.firstName,
        lastName: local.lastName,
        email: local.email,
        passwordHash: local.passwordHash,
        twoFactorSecret: null,
        twoFactorEnabled: false,
        phone: null,
        avatar: local.avatar ?? null,
        role: "TRAVELER" as const,
        status: "ACTIVE" as const,
        lastLoginAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return { user, role: "TRAVELER", source: "traveller_session" };
    }
    if (isTravellerDatabaseConfigured()) {
      const dbUser = await prisma.user.findUnique({ where: { id: travellerUserId } });
      if (dbUser && dbUser.status !== "BLOCKED" && dbUser.role === "TRAVELER") {
        return { user: dbUser, role: dbUser.role, source: "traveller_session" };
      }
    }
  }

  const sessionUserId = await verifyAdminSession(request);
  if (sessionUserId) {
    const localAdmin = resolveLocalAdminUser(sessionUserId);
    if (localAdmin) {
      const user = {
        id: localAdmin.id,
        clerkId: null,
        googleId: null,
        emailVerifiedAt: null,
        firstName: localAdmin.firstName,
        lastName: localAdmin.lastName,
        email: localAdmin.email,
        passwordHash: localAdmin.passwordHash,
        twoFactorSecret: null,
        twoFactorEnabled: false,
        phone: null,
        avatar: null,
        role: "ADMIN" as const,
        status: "ACTIVE" as const,
        lastLoginAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return withStaffRole({ user, role: "ADMIN", source: "admin_session" }, "SUPER_ADMIN");
    }
    if (isAdminDbConfigured()) {
      const user = await prisma.user.findUnique({ where: { id: sessionUserId } });
      if (user && user.status !== "BLOCKED" && user.role === "ADMIN") {
        const staffRole = await resolveAdminStaffRole(user.id);
        return withStaffRole({ user, role: user.role, source: "admin_session" }, staffRole);
      }
    }
  }

  return null;
}

async function resolveAdminStaffRole(userId: string): Promise<AdminStaffRole | null> {
  if (userId === LOCAL_ADMIN_ID) return "SUPER_ADMIN";
  if (!isAdminDbConfigured()) return null;
  const profile = await prisma.adminStaffProfile.findUnique({ where: { userId } });
  return resolveStaffRole(profile?.staffRole);
}

function withStaffRole(
  ctx: AuthContext,
  staffRole: AdminStaffRole | null,
): AuthContext {
  return staffRole ? { ...ctx, staffRole } : ctx;
}

export async function requireAuth(request: Request): Promise<AuthContext> {
  const ctx = await resolveAuthContext(request);
  if (!ctx) throw new UnauthorizedError();
  return ctx;
}

export async function requireAdmin(request: Request): Promise<AuthContext> {
  const ctx = await requireAuth(request);
  if (ctx.role !== "ADMIN") throw new ForbiddenError("Admin access required");
  return ctx;
}

export async function requirePermission(
  request: Request,
  permission: Permission,
): Promise<AuthContext> {
  const ctx = await requireAuth(request);

  if (ctx.role === "ADMIN") {
    const staffRole = ctx.staffRole;
    if (!staffRole || !canStaffRole(staffRole, permission)) {
      throw new ForbiddenError(`Missing permission: ${permission}`);
    }
    return ctx;
  }

  if (!can(ctx.role, permission)) {
    throw new ForbiddenError(`Missing permission: ${permission}`);
  }
  return ctx;
}

export async function resolveSupplierForUser(userId: string): Promise<Supplier | null> {
  if (!isDatabaseConfigured()) {
    const { readLocalSupplier } = await import("@/server/auth/local-supplier-store");
    const local = readLocalSupplier();
    return local && local.userId === userId ? (local as unknown as Supplier) : null;
  }
  return prisma.supplier.findUnique({ where: { userId } });
}

export async function requireSupplier(request: Request): Promise<SupplierAuthContext> {
  const ctx = await requireAuth(request);
  if (ctx.role !== "SUPPLIER") {
    throw new ForbiddenError("Supplier access required");
  }

  const supplier = await resolveSupplierForUser(ctx.user.id);
  if (!supplier) {
    throw new ForbiddenError("Supplier profile not found. Complete onboarding first.");
  }

  if (supplier.verificationStatus === "SUSPENDED") {
    throw new ForbiddenError("Supplier account suspended");
  }

  return {
    ...ctx,
    supplierId: supplier.id,
    supplier,
    memberRole: "OWNER",
  };
}

export async function requireSupplierPermission(
  request: Request,
  permission: Permission,
): Promise<SupplierAuthContext> {
  const ctx = await requireSupplier(request);
  const allowed =
    can(ctx.role, permission) && canSupplierMember(ctx.memberRole, permission);
  if (!allowed) {
    throw new ForbiddenError(`Missing permission: ${permission}`);
  }
  return ctx;
}

export function assertSupplierScope(
  supplierId: string,
  resourceSupplierId: string,
): void {
  if (supplierId !== resourceSupplierId) {
    throw new ForbiddenError("Access denied to this resource");
  }
}

export async function requireTraveller(request: Request): Promise<TravellerAuthContext> {
  const ctx = await requireAuth(request);
  if (ctx.role !== "TRAVELER") {
    throw new ForbiddenError("Traveller access required");
  }
  return { ...ctx, travelerId: ctx.user.id };
}

export async function requireTravellerPermission(
  request: Request,
  permission: Permission,
): Promise<TravellerAuthContext> {
  const ctx = await requireTraveller(request);
  if (!can(ctx.role, permission)) {
    throw new ForbiddenError(`Missing permission: ${permission}`);
  }
  return ctx;
}

export function assertTravellerScope(travelerId: string, resourceTravelerId: string): void {
  if (travelerId !== resourceTravelerId) {
    throw new ForbiddenError("Access denied to this resource");
  }
}
