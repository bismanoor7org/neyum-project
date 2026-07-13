import type { UserRole } from "@prisma/client";

export const ROLES = {
  TRAVELER: "TRAVELER",
  SUPPLIER: "SUPPLIER",
  ADMIN: "ADMIN",
} as const satisfies Record<string, UserRole>;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_HIERARCHY: Record<Role, number> = {
  TRAVELER: 1,
  SUPPLIER: 2,
  ADMIN: 3,
};

export function hasMinimumRole(userRole: Role, required: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[required];
}

export function isAdmin(role: Role): boolean {
  return role === ROLES.ADMIN;
}

export function isSupplier(role: Role): boolean {
  return role === ROLES.SUPPLIER || role === ROLES.ADMIN;
}
