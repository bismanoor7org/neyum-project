import type { CmsModuleMeta } from "@/lib/cms/types";

/** Production CMS module registry — core + WordPress-like modules */
export const CMS_MODULES: CmsModuleMeta[] = [
  {
    id: "homepage",
    label: "Homepage",
    description: "Hero, featured destinations, experiences, CTAs and banners",
    href: "/admin/cms/homepage",
    entityType: "HOMEPAGE",
    permission: "cms:write",
  },
  {
    id: "pages",
    label: "Pages",
    description: "Freeform pages with rich editor, drafts and revisions",
    href: "/admin/cms/pages",
    entityType: "PAGE",
    permission: "cms:write",
  },
  {
    id: "posts",
    label: "Blog Posts",
    description: "Articles, categories, tags, SEO and scheduled publish",
    href: "/admin/cms/posts",
    entityType: "POST",
    permission: "cms:write",
  },
  {
    id: "destinations",
    label: "Destinations",
    description: "Fiji islands and regions — listing page, editorial copy, imagery and SEO",
    href: "/admin/cms/destinations",
    entityType: "DESTINATION",
    permission: "cms:write",
  },
  {
    id: "tours",
    label: "Experiences",
    description: "Tours and experiences — categories, pricing, SEO",
    href: "/admin/cms/tours",
    entityType: "TOUR",
    permission: "cms:write",
  },
  {
    id: "accommodations",
    label: "Places to Stay",
    description: "Hotels and resorts — gallery, amenities, SEO",
    href: "/admin/cms/accommodations",
    entityType: "ACCOMMODATION",
    permission: "cms:write",
  },
  {
    id: "guides",
    label: "Fiji Guides",
    description: "Categories, articles and featured guides",
    href: "/admin/cms/guides",
    entityType: "GUIDE",
    permission: "cms:write",
  },
  {
    id: "visa",
    label: "Visa Intelligence",
    description: "Countries, visa rules, travel documents and entry guides",
    href: "/admin/cms/visa",
    permission: "cms:write",
  },
  {
    id: "deals",
    label: "Deals & Offers",
    description: "Packages, pricing and featured promotions",
    href: "/admin/cms/deals",
    entityType: "DEAL",
    permission: "cms:write",
  },
  {
    id: "categories",
    label: "Categories",
    description: "Content taxonomy for blog and pages",
    href: "/admin/cms/categories",
    permission: "cms:write",
  },
  {
    id: "tags",
    label: "Tags",
    description: "Lightweight labels for posts",
    href: "/admin/cms/tags",
    permission: "cms:write",
  },
  {
    id: "seo",
    label: "Global SEO",
    description: "Meta, Open Graph preview, redirects and coverage audit",
    href: "/admin/cms/seo",
    permission: "cms:seo",
  },
  {
    id: "media",
    label: "Media Library",
    description: "Upload, optimize and reuse Cloudinary / Supabase assets",
    href: "/admin/cms/media",
    permission: "cms:media",
  },
  {
    id: "navigation",
    label: "Navigation Menu",
    description: "Drag-and-drop mega menu builder with nesting",
    href: "/admin/cms/navigation",
    entityType: "NAVIGATION",
    permission: "cms:write",
  },
  {
    id: "workflow",
    label: "Editorial Workflow",
    description: "Pending review, approvals and publish queue",
    href: "/admin/cms/workflow",
    permission: "cms:approve",
  },
  {
    id: "ai",
    label: "AI Studio",
    description: "Meta, rewrite, summarize and SEO helpers",
    href: "/admin/cms/ai",
    permission: "cms:write",
  },
  {
    id: "settings",
    label: "Settings",
    description: "Logo, contact, social, analytics and newsletter",
    href: "/admin/cms/settings",
    permission: "cms:write",
  },
  {
    id: "users",
    label: "Users",
    description: "Staff invites, Super Admin / Admin / Editor roles",
    href: "/admin/cms/users",
    permission: "cms:read",
  },
  {
    id: "roles",
    label: "Roles & Permissions",
    description: "Granular CMS permission matrix",
    href: "/admin/cms/roles",
    permission: "cms:read",
  },
  {
    id: "sessions",
    label: "Sessions",
    description: "Login sessions and two-factor status",
    href: "/admin/cms/sessions",
    permission: "cms:read",
  },
];

/** Extended modules (operations) — still available via direct URL */
export const CMS_EXTENDED_MODULES: CmsModuleMeta[] = [
  {
    id: "faqs",
    label: "FAQs",
    description: "Concierge FAQs by category",
    href: "/admin/cms/faqs",
    entityType: "FAQ",
    permission: "cms:write",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    description: "Social proof quotes",
    href: "/admin/cms/testimonials",
    entityType: "TESTIMONIAL",
    permission: "cms:write",
  },
  {
    id: "transport",
    label: "Transport",
    description: "Transfers and private drivers",
    href: "/admin/cms/transport",
    entityType: "TRANSPORT",
    permission: "cms:write",
  },
  {
    id: "supplier-approval",
    label: "Supplier Approval",
    description: "Review supplier-submitted content",
    href: "/admin/cms/supplier-approval",
    permission: "cms:approve",
  },
];

/** Operations modules — enterprise dashboard suite */
export const CMS_OPS_MODULES: CmsModuleMeta[] = [
  {
    id: "activity",
    label: "Activity Logs",
    description: "CMS audit trail and content change history",
    href: "/admin/cms/activity",
    permission: "cms:read",
  },
  {
    id: "analytics",
    label: "CMS Analytics",
    description: "Publish velocity, content health and coverage",
    href: "/admin/cms/analytics",
    permission: "cms:read",
  },
  {
    id: "leads",
    label: "Lead Management",
    description: "Concierge enquiries and booking widget leads",
    href: "/admin/cms/leads",
    permission: "cms:read",
  },
  {
    id: "bookings",
    label: "Bookings",
    description: "Traveller reservations and payment status",
    href: "/admin/cms/bookings",
    permission: "cms:read",
  },
];

export const ALL_CMS_MODULES = [...CMS_MODULES, ...CMS_OPS_MODULES, ...CMS_EXTENDED_MODULES];

export function getCmsModule(id: string): CmsModuleMeta | undefined {
  return ALL_CMS_MODULES.find((m) => m.id === id);
}
