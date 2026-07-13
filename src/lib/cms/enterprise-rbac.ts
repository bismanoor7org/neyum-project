export type CmsEnterpriseRole =
  | "super_admin"
  | "admin"
  | "editor"
  | "seo_manager"
  | "content_writer"
  | "moderator";

export type CmsPermissionKey =
  | "content.read"
  | "content.create"
  | "content.edit"
  | "content.delete"
  | "content.publish"
  | "content.schedule"
  | "content.approve"
  | "content.restore"
  | "media.manage"
  | "seo.manage"
  | "users.manage"
  | "settings.manage"
  | "analytics.read"
  | "bookings.manage"
  | "ai.use";

export const CMS_PERMISSION_KEYS: CmsPermissionKey[] = [
  "content.read",
  "content.create",
  "content.edit",
  "content.delete",
  "content.publish",
  "content.schedule",
  "content.approve",
  "content.restore",
  "media.manage",
  "seo.manage",
  "users.manage",
  "settings.manage",
  "analytics.read",
  "bookings.manage",
  "ai.use",
];

export const CMS_ROLE_PERMISSIONS: Record<CmsEnterpriseRole, CmsPermissionKey[]> = {
  super_admin: [...CMS_PERMISSION_KEYS],
  admin: CMS_PERMISSION_KEYS.filter((k) => k !== "users.manage"),
  editor: [
    "content.read",
    "content.create",
    "content.edit",
    "content.publish",
    "content.schedule",
    "content.restore",
    "media.manage",
    "seo.manage",
    "ai.use",
  ],
  seo_manager: ["content.read", "content.edit", "seo.manage", "analytics.read", "ai.use"],
  content_writer: ["content.read", "content.create", "content.edit", "media.manage", "ai.use"],
  moderator: ["content.read", "content.approve", "content.delete"],
};

export function canCms(role: CmsEnterpriseRole | null | undefined, permission: CmsPermissionKey): boolean {
  if (!role) return false;
  return CMS_ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function mapLegacyStaffToEnterprise(
  role: string | null | undefined,
): CmsEnterpriseRole {
  switch (role) {
    case "SUPER_ADMIN":
      return "super_admin";
    case "ADMIN":
      return "admin";
    case "EDITOR":
    case "CONTENT_MANAGER":
      return "editor";
    case "SUPPORT_MANAGER":
      return "moderator";
    default:
      return "content_writer";
  }
}
