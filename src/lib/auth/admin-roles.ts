import type { AdminStaffRole } from "@prisma/client";
import type { Permission } from "@/lib/auth/permissions";

/** Granular CMS permissions for admin staff */
export type CmsPermission =
  | "cms:read"
  | "cms:write"
  | "cms:publish"
  | "cms:media"
  | "cms:seo"
  | "cms:approve";

export const CMS_PERMISSIONS: CmsPermission[] = [
  "cms:read",
  "cms:write",
  "cms:publish",
  "cms:media",
  "cms:seo",
  "cms:approve",
];

const SUPER_ADMIN_PERMISSIONS: Permission[] = [
  "dashboard:read",
  "analytics:read",
  "bookings:read",
  "bookings:write",
  "bookings:cancel",
  "bookings:refund",
  "suppliers:read",
  "suppliers:write",
  "suppliers:approve",
  "suppliers:suspend",
  "tours:read",
  "tours:write",
  "tours:approve",
  "tours:feature",
  "tours:delete",
  "transport:read",
  "transport:write",
  "transport:approve",
  "transport:feature",
  "users:read",
  "users:write",
  "users:block",
  "payments:read",
  "payments:refund",
  "settlements:read",
  "settlements:write",
  "settlements:pay",
  "commission:read",
  "commission:write",
  "content:read",
  "content:write",
  "cms:read",
  "cms:write",
  "cms:publish",
  "cms:media",
  "cms:seo",
  "cms:approve",
  "reviews:read",
  "reviews:moderate",
  "support:read",
  "support:write",
  "settings:read",
  "settings:write",
  "notifications:read",
  "activity:read",
];

const EDITOR_PERMISSIONS: Permission[] = [
  "dashboard:read",
  "content:read",
  "content:write",
  "cms:read",
  "cms:write",
  "cms:publish",
  "cms:media",
  "cms:seo",
  "tours:read",
  "reviews:read",
  "notifications:read",
];

const CONTENT_MANAGER_PERMISSIONS: Permission[] = EDITOR_PERMISSIONS;

const SUPPORT_MANAGER_PERMISSIONS: Permission[] = [
  "dashboard:read",
  "bookings:read",
  "bookings:write",
  "bookings:cancel",
  "bookings:refund",
  "suppliers:read",
  "users:read",
  "users:write",
  "support:read",
  "support:write",
  "reviews:read",
  "reviews:moderate",
  "cms:read",
  "cms:approve",
  "tours:read",
  "tours:approve",
  "transport:read",
  "transport:approve",
  "notifications:read",
  "activity:read",
];

export const ADMIN_STAFF_ROLE_PERMISSIONS: Record<AdminStaffRole, Permission[]> = {
  SUPER_ADMIN: SUPER_ADMIN_PERMISSIONS,
  ADMIN: SUPER_ADMIN_PERMISSIONS.filter(
    (p) => !p.startsWith("settlements:") && p !== "commission:write",
  ),
  EDITOR: EDITOR_PERMISSIONS,
  CONTENT_MANAGER: CONTENT_MANAGER_PERMISSIONS,
  SUPPORT_MANAGER: SUPPORT_MANAGER_PERMISSIONS,
};

export const ADMIN_STAFF_ROLE_LABELS: Record<AdminStaffRole, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  EDITOR: "Editor",
  CONTENT_MANAGER: "Content Manager",
  SUPPORT_MANAGER: "Support Manager",
};

export function canStaffRole(role: AdminStaffRole, permission: Permission): boolean {
  return ADMIN_STAFF_ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/** Returns null when no staff profile exists — never escalates to SUPER_ADMIN. */
export function resolveStaffRole(
  staffRole: AdminStaffRole | null | undefined,
): AdminStaffRole | null {
  return staffRole ?? null;
}
