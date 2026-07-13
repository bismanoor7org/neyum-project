import type { UserRole, SupplierMemberRole } from "@prisma/client";
import { ROLES } from "@/lib/auth/roles";

export type Permission =
  | "dashboard:read"
  | "analytics:read"
  | "bookings:read"
  | "bookings:write"
  | "bookings:cancel"
  | "bookings:refund"
  | "suppliers:read"
  | "suppliers:write"
  | "suppliers:approve"
  | "suppliers:suspend"
  | "tours:read"
  | "tours:write"
  | "tours:approve"
  | "tours:feature"
  | "tours:delete"
  | "transport:read"
  | "transport:write"
  | "transport:approve"
  | "transport:feature"
  | "users:read"
  | "users:write"
  | "users:block"
  | "users:delete"
  | "payments:read"
  | "payments:refund"
  | "settlements:read"
  | "settlements:write"
  | "settlements:pay"
  | "commission:read"
  | "commission:write"
  | "content:read"
  | "content:write"
  | "cms:read"
  | "cms:write"
  | "cms:publish"
  | "cms:media"
  | "cms:seo"
  | "cms:approve"
  | "reviews:read"
  | "reviews:moderate"
  | "reviews:write"
  | "support:read"
  | "support:write"
  | "settings:read"
  | "settings:write"
  | "notifications:read"
  | "activity:read"
  | "calendar:read"
  | "calendar:write"
  | "customers:read"
  | "customers:write"
  | "documents:read"
  | "documents:write"
  | "team:read"
  | "team:write"
  | "messages:read"
  | "messages:write"
  | "finance:read"
  | "operations:read"
  | "operations:write"
  | "onboarding:read"
  | "onboarding:write";

const ADMIN_PERMISSIONS: Permission[] = [
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
  "users:delete",
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
  "calendar:read",
  "calendar:write",
  "customers:read",
  "customers:write",
  "documents:read",
  "documents:write",
  "team:read",
  "team:write",
  "messages:read",
  "messages:write",
  "finance:read",
  "operations:read",
  "operations:write",
  "onboarding:read",
  "onboarding:write",
];

const SUPPLIER_PERMISSIONS: Permission[] = [
  "dashboard:read",
  "analytics:read",
  "bookings:read",
  "bookings:write",
  "bookings:cancel",
  "tours:read",
  "tours:write",
  "transport:read",
  "transport:write",
  "payments:read",
  "settlements:read",
  "finance:read",
  "reviews:read",
  "reviews:write",
  "support:read",
  "support:write",
  "settings:read",
  "settings:write",
  "notifications:read",
  "calendar:read",
  "calendar:write",
  "customers:read",
  "customers:write",
  "documents:read",
  "documents:write",
  "team:read",
  "team:write",
  "messages:read",
  "messages:write",
  "operations:read",
  "operations:write",
  "onboarding:read",
  "onboarding:write",
];

const TRAVELER_PERMISSIONS: Permission[] = [
  "dashboard:read",
  "bookings:read",
  "bookings:write",
  "bookings:cancel",
  "reviews:read",
  "reviews:write",
  "support:read",
  "support:write",
  "notifications:read",
  "messages:read",
  "messages:write",
  "payments:read",
  "documents:read",
  "documents:write",
  "settings:read",
  "settings:write",
  "analytics:read",
];

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [ROLES.ADMIN]: ADMIN_PERMISSIONS,
  [ROLES.SUPPLIER]: SUPPLIER_PERMISSIONS,
  [ROLES.TRAVELER]: TRAVELER_PERMISSIONS,
};

/** Supplier team role → permission overrides (subset of supplier permissions) */
export const SUPPLIER_MEMBER_ROLE_PERMISSIONS: Record<SupplierMemberRole, Permission[]> = {
  OWNER: SUPPLIER_PERMISSIONS,
  MANAGER: SUPPLIER_PERMISSIONS.filter((p) => !p.startsWith("team:write")),
  SALES_AGENT: [
    "dashboard:read",
    "bookings:read",
    "bookings:write",
    "customers:read",
    "customers:write",
    "messages:read",
    "messages:write",
    "notifications:read",
    "tours:read",
    "calendar:read",
  ],
  OPERATIONS: [
    "dashboard:read",
    "bookings:read",
    "bookings:write",
    "calendar:read",
    "calendar:write",
    "operations:read",
    "operations:write",
    "tours:read",
    "transport:read",
    "notifications:read",
  ],
  FINANCE: [
    "dashboard:read",
    "payments:read",
    "settlements:read",
    "finance:read",
    "analytics:read",
    "notifications:read",
  ],
  GUIDE_MANAGER: [
    "dashboard:read",
    "bookings:read",
    "calendar:read",
    "operations:read",
    "operations:write",
    "tours:read",
    "notifications:read",
  ],
  CUSTOM: [],
};

export function can(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function canSupplierMember(
  memberRole: SupplierMemberRole,
  permission: Permission,
): boolean {
  const perms = SUPPLIER_MEMBER_ROLE_PERMISSIONS[memberRole] ?? [];
  return perms.includes(permission);
}

export function canAny(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((p) => can(role, p));
}

export function canAll(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((p) => can(role, p));
}

export const ADMIN_ROUTE_PERMISSIONS: Record<string, Permission> = {
  "/admin": "dashboard:read",
  "/admin/analytics": "analytics:read",
  "/admin/bookings": "bookings:read",
  "/admin/suppliers": "suppliers:read",
  "/admin/tours": "tours:read",
  "/admin/transport": "transport:read",
  "/admin/users": "users:read",
  "/admin/revenue": "payments:read",
  "/admin/payments": "payments:read",
  "/admin/settlements": "settlements:read",
  "/admin/commission": "commission:read",
  "/admin/content": "cms:read",
  "/admin/cms": "cms:read",
  "/admin/reviews": "reviews:read",
  "/admin/refunds": "bookings:refund",
  "/admin/enquiries": "support:read",
  "/admin/explore": "cms:read",
  "/admin/security": "activity:read",
  "/admin/support": "support:read",
  "/admin/settings": "settings:read",
  "/admin/notifications": "notifications:read",
};

export const SUPPLIER_ROUTE_PERMISSIONS: Record<string, Permission> = {
  "/supplier": "dashboard:read",
  "/supplier/onboarding": "onboarding:read",
  "/supplier/bookings": "bookings:read",
  "/supplier/tours": "tours:read",
  "/supplier/calendar": "calendar:read",
  "/supplier/customers": "customers:read",
  "/supplier/messages": "messages:read",
  "/supplier/reviews": "reviews:read",
  "/supplier/payments": "payments:read",
  "/supplier/finance": "finance:read",
  "/supplier/analytics": "analytics:read",
  "/supplier/operations": "operations:read",
  "/supplier/documents": "documents:read",
  "/supplier/team": "team:read",
  "/supplier/notifications": "notifications:read",
  "/supplier/settings": "settings:read",
};

export const TRAVELLER_ROUTE_PERMISSIONS: Record<string, Permission> = {
  "/traveller": "dashboard:read",
  "/traveller/bookings": "bookings:read",
  "/traveller/trips": "bookings:read",
  "/traveller/wishlist": "bookings:read",
  "/traveller/favourites": "bookings:read",
  "/traveller/messages": "messages:read",
  "/traveller/profile": "settings:read",
  "/traveller/payments": "payments:read",
  "/traveller/documents": "documents:read",
  "/traveller/reviews": "reviews:read",
  "/traveller/loyalty": "payments:read",
  "/traveller/notifications": "notifications:read",
  "/traveller/companions": "settings:read",
  "/traveller/support": "support:read",
  "/traveller/recommendations": "dashboard:read",
  "/traveller/analytics": "analytics:read",
  "/traveller/security": "settings:read",
};

export function permissionForAdminPath(pathname: string): Permission | null {
  const match = Object.keys(ADMIN_ROUTE_PERMISSIONS)
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname === route || pathname.startsWith(`${route}/`));
  return match ? ADMIN_ROUTE_PERMISSIONS[match] : null;
}

export function permissionForSupplierPath(pathname: string): Permission | null {
  const match = Object.keys(SUPPLIER_ROUTE_PERMISSIONS)
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname === route || pathname.startsWith(`${route}/`));
  return match ? SUPPLIER_ROUTE_PERMISSIONS[match] : null;
}

export function permissionForTravellerPath(pathname: string): Permission | null {
  const match = Object.keys(TRAVELLER_ROUTE_PERMISSIONS)
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname === route || pathname.startsWith(`${route}/`));
  return match ? TRAVELLER_ROUTE_PERMISSIONS[match] : null;
}
