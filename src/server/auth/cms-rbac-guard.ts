import {
  canCms,
  mapLegacyStaffToEnterprise,
  type CmsPermissionKey,
} from "@/lib/cms/enterprise-rbac";
import type { AuthContext } from "@/server/auth/context";
import { AppError } from "@/server/errors";
import type { Permission } from "@/lib/auth/permissions";

/** Map legacy cms:* API guards to enterprise permission keys. */
export function legacyCmsPermissionToEnterprise(
  permission: Permission,
): CmsPermissionKey | null {
  switch (permission) {
    case "cms:read":
      return "content.read";
    case "cms:write":
      return "content.edit";
    case "cms:publish":
      return "content.publish";
    case "cms:media":
      return "media.manage";
    case "cms:seo":
      return "seo.manage";
    case "cms:approve":
      return "content.approve";
    default:
      return null;
  }
}

/**
 * Enforce enterprise RBAC when staffRole is present.
 * Super-admin / missing staff profile keeps legacy Permission checks as primary.
 */
export function assertEnterpriseCmsAccess(
  auth: AuthContext,
  legacyPermission: Permission,
): void {
  const mapped = legacyCmsPermissionToEnterprise(legacyPermission);
  if (!mapped) return;
  if (!auth.staffRole) return; // legacy admin without staff profile
  const role = mapLegacyStaffToEnterprise(auth.staffRole);
  if (!canCms(role, mapped)) {
    throw new AppError("FORBIDDEN", "Insufficient CMS permission for this action");
  }
}
