import { z } from "zod";

export const cmsPaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
  search: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]).optional(),
});

export const seoMetaSchema = z.object({
  metaTitle: z.string().max(70).optional().nullable(),
  metaDescription: z.string().max(320).optional().nullable(),
  ogTitle: z.string().max(95).optional().nullable(),
  ogDescription: z.string().max(320).optional().nullable(),
  ogImage: z.string().url().optional().nullable(),
  canonicalUrl: z.string().url().optional().nullable(),
  schemaMarkup: z.record(z.unknown()).optional().nullable(),
  noIndex: z.boolean().optional(),
});

export const homepageSectionSchema = z.object({
  key: z.string().min(1).max(80),
  title: z.string().min(1).max(200),
  content: z.record(z.unknown()),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]).default("DRAFT"),
  sortOrder: z.number().int().min(0).optional(),
});

export const bannerSchema = z.object({
  title: z.string().min(1).max(200),
  subtitle: z.string().max(300).optional().nullable(),
  imageUrl: z.string().min(1),
  linkUrl: z.string().url().optional().nullable(),
  position: z.string().default("homepage"),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]).default("DRAFT"),
  sortOrder: z.number().int().min(0).optional(),
  startsAt: z.string().datetime().optional().nullable(),
  endsAt: z.string().datetime().optional().nullable(),
});

export const destinationCmsSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  description: z.string().optional().nullable(),
  excerpt: z.string().max(500).optional().nullable(),
  tagline: z.string().max(200).optional().nullable(),
  heroImage: z.string().optional().nullable(),
  gallery: z.array(z.string()).optional(),
  highlights: z.unknown().optional(),
  featured: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]).optional(),
  sortOrder: z.number().int().min(0).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  seo: seoMetaSchema.optional(),
});

export const guideCmsSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  content: z.string().min(1),
  excerpt: z.string().max(500).optional().nullable(),
  featuredImage: z.string().optional().nullable(),
  category: z
    .enum([
      "FIRST_TIME",
      "VISA",
      "WEATHER",
      "CULTURE",
      "TRANSPORT",
      "DINING",
      "SAFETY",
      "ITINERARY",
      "GENERAL",
    ])
    .optional(),
  featured: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]).optional(),
  sortOrder: z.number().int().min(0).optional(),
  publishedAt: z.string().datetime().optional().nullable(),
  seo: seoMetaSchema.optional(),
});

export const faqCmsSchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1),
  category: z.string().max(80).optional().nullable(),
  sortOrder: z.number().int().min(0).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]).optional(),
  published: z.boolean().optional(),
  seo: seoMetaSchema.optional(),
});

export const testimonialSchema = z.object({
  authorName: z.string().min(1).max(120),
  authorTitle: z.string().max(120).optional().nullable(),
  authorImage: z.string().optional().nullable(),
  location: z.string().max(120).optional().nullable(),
  content: z.string().min(1),
  rating: z.number().int().min(1).max(5).optional(),
  featured: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]).optional(),
  sortOrder: z.number().int().min(0).optional(),
  publishedAt: z.string().datetime().optional().nullable(),
});

export const mediaUpdateSchema = z.object({
  altText: z.string().max(200).optional().nullable(),
  caption: z.string().max(500).optional().nullable(),
  tags: z.array(z.string()).optional(),
  folder: z.string().max(120).optional(),
  isFavorite: z.boolean().optional(),
});

export const mediaBulkSchema = z.object({
  ids: z.array(z.string().min(1)).min(1).max(100),
  action: z.enum(["delete", "move", "favorite", "unfavorite"]),
  folder: z.string().max(120).optional(),
});

export const supplierSubmissionReviewSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "REVISION_REQUESTED"]),
  reviewNote: z.string().max(2000).optional().nullable(),
});

export const seoUpsertSchema = seoMetaSchema.extend({
  entityType: z.enum([
    "HOMEPAGE",
    "DESTINATION",
    "TOUR",
    "TRANSPORT",
    "GUIDE",
    "FAQ",
    "TESTIMONIAL",
    "BANNER",
    "ACCOMMODATION",
    "DEAL",
    "NAVIGATION",
    "PAGE",
  ]),
  entityId: z.string().min(1),
});

export const accommodationCmsSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  location: z.string().min(1).max(200),
  stars: z.number().int().min(1).max(5).optional(),
  priceFrom: z.string().max(80).optional().nullable(),
  overview: z.string().min(1),
  heroImage: z.string().optional().nullable(),
  gallery: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  experiences: z.array(z.string()).optional(),
  collection: z.string().max(80).optional().nullable(),
  relatedSlugs: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]).optional(),
  sortOrder: z.number().int().min(0).optional(),
  seo: seoMetaSchema.optional(),
});

export const dealCmsSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  description: z.string().min(1),
  location: z.string().min(1).max(200),
  price: z.string().min(1).max(80),
  priceNote: z.string().max(120).optional().nullable(),
  image: z.string().optional().nullable(),
  category: z.enum(["PACKAGE", "ACCOMMODATION", "EXPERIENCE"]).optional(),
  includes: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]).optional(),
  sortOrder: z.number().int().min(0).optional(),
  seo: seoMetaSchema.optional(),
});

export const navigationItemSchema = z.object({
  label: z.string().min(1).max(120),
  href: z.string().min(1).max(500),
  description: z.string().max(300).optional().nullable(),
  location: z.enum(["PRIMARY", "MEGA_MENU", "FOOTER"]).default("PRIMARY"),
  parentKey: z.string().max(80).optional().nullable(),
  icon: z.string().max(40).optional().nullable(),
  image: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]).optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export const navigationReorderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().min(1),
      sortOrder: z.number().int().min(0),
    }),
  ),
});

export const staffRoleSchema = z.object({
  userId: z.string().min(1),
  staffRole: z.enum(["SUPER_ADMIN", "EDITOR", "CONTENT_MANAGER", "SUPPORT_MANAGER"]),
});
