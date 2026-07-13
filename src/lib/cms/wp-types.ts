export type CmsWpRole = "super_admin" | "admin" | "editor";

export type CmsSeoFields = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  ogImage?: string | null;
  twitterCard?: string | null;
  robots?: string | null;
  schemaJsonLd?: Record<string, unknown> | null;
  breadcrumbs?: { label: string; href: string }[] | null;
};

export type CmsContentStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "NEEDS_CHANGES"
  | "APPROVED"
  | "PUBLISHED"
  | "SCHEDULED"
  | "ARCHIVED";

export type CmsPageRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: unknown;
  content_html: string | null;
  featured_image: string | null;
  status: CmsContentStatus;
  published_at: string | null;
  scheduled_at: string | null;
  author_id: string | null;
  parent_id: string | null;
  template: string | null;
  seo: CmsSeoFields;
  created_at: string;
  updated_at: string;
};

export type CmsPostRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: unknown;
  content_html: string | null;
  featured_image: string | null;
  category_id: string | null;
  author_id: string | null;
  status: CmsContentStatus;
  published_at: string | null;
  scheduled_at: string | null;
  featured: boolean;
  reading_time_min: number;
  seo: CmsSeoFields;
  created_at: string;
  updated_at: string;
};

export type CmsProfile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: CmsWpRole;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

export function estimateReadingTime(htmlOrText: string): number {
  const words = htmlOrText.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function mapStaffRoleToCmsRole(role: string | null | undefined): CmsWpRole {
  if (role === "SUPER_ADMIN") return "super_admin";
  if (role === "ADMIN") return "admin";
  return "editor";
}
