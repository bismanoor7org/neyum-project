import type {
  AdminStaffRole,
  ApprovalStatus,
  CmsEntityType,
  ContentStatus,
  GuideCategory,
  SupplierContentType,
} from "@prisma/client";

export type CmsModuleId =
  | "homepage"
  | "pages"
  | "posts"
  | "destinations"
  | "tours"
  | "accommodations"
  | "guides"
  | "deals"
  | "categories"
  | "tags"
  | "seo"
  | "media"
  | "navigation"
  | "settings"
  | "users"
  | "roles"
  | "activity"
  | "analytics"
  | "leads"
  | "bookings"
  | "transport"
  | "faqs"
  | "testimonials"
  | "supplier-approval"
  | "visa";

export type CmsModuleMeta = {
  id: CmsModuleId;
  label: string;
  description: string;
  href: string;
  entityType?: CmsEntityType;
  permission: "cms:read" | "cms:write" | "cms:approve" | "cms:seo" | "cms:media";
};

export type SeoPayload = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  canonicalUrl?: string | null;
  schemaMarkup?: Record<string, unknown> | null;
  noIndex?: boolean;
};

export type CmsListResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type HomepageSectionPayload = {
  key: string;
  title: string;
  content: Record<string, unknown>;
  status: ContentStatus;
  sortOrder?: number;
};

export type DestinationsPageConfig = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export type BannerPayload = {
  title: string;
  subtitle?: string | null;
  imageUrl: string;
  linkUrl?: string | null;
  position?: string;
  status: ContentStatus;
  sortOrder?: number;
  startsAt?: string | null;
  endsAt?: string | null;
};

export type DestinationCmsPayload = {
  name: string;
  slug: string;
  description?: string | null;
  excerpt?: string | null;
  tagline?: string | null;
  heroImage?: string | null;
  gallery?: string[];
  highlights?: unknown;
  content?: Record<string, unknown>;
  featured?: boolean;
  status?: ContentStatus;
  sortOrder?: number;
  latitude?: number | null;
  longitude?: number | null;
  seo?: SeoPayload;
};

export type GuideCmsPayload = {
  title: string;
  slug: string;
  content: string;
  body?: Record<string, unknown>;
  excerpt?: string | null;
  featuredImage?: string | null;
  category?: GuideCategory;
  status?: ContentStatus;
  sortOrder?: number;
  publishedAt?: string | null;
  seo?: SeoPayload;
};

export type FaqCmsPayload = {
  question: string;
  answer: string;
  category?: string | null;
  sortOrder?: number;
  status?: ContentStatus;
  published?: boolean;
  seo?: SeoPayload;
};

export type TestimonialPayload = {
  authorName: string;
  authorTitle?: string | null;
  authorImage?: string | null;
  location?: string | null;
  content: string;
  rating?: number;
  featured?: boolean;
  status?: ContentStatus;
  sortOrder?: number;
  publishedAt?: string | null;
};

export type MediaAssetDto = {
  id: string;
  cloudinaryId: string;
  publicId: string;
  url: string;
  secureUrl: string;
  format: string | null;
  resourceType: string;
  width: number | null;
  height: number | null;
  bytes: number | null;
  folder: string;
  altText: string | null;
  caption: string | null;
  tags: string[];
  createdAt: string;
};

export type SupplierSubmissionDto = {
  id: string;
  supplierId: string;
  supplierName: string;
  contentType: SupplierContentType;
  entityId: string | null;
  title: string;
  payload: unknown;
  status: ApprovalStatus;
  reviewNote: string | null;
  reviewedById: string | null;
  reviewedAt: string | null;
  submittedAt: string;
};

export type CmsDashboardStats = {
  homepageSections: number;
  destinations: number;
  guides: number;
  faqs: number;
  testimonials: number;
  mediaAssets: number;
  pendingSubmissions: number;
  draftContent: number;
};

export type CmsEnterpriseDashboard = CmsDashboardStats & {
  accommodations: number;
  deals: number;
  tours: number;
  scheduledContent: number;
  publishedDestinations: number;
  draftDestinations: number;
  newLeads: number;
  pendingBookings: number;
  seoHealth: {
    total: number;
    withTitle: number;
    withDescription: number;
    missing: number;
  };
  recentActivity: {
    id: string;
    action: string;
    createdAt: string;
    userName: string | null;
  }[];
  scheduledQueue: {
    id: string;
    type: string;
    title: string;
    href: string;
  }[];
};

export type { AdminStaffRole, ApprovalStatus, CmsEntityType, ContentStatus };
