import { cache } from "react";
import type { ContentStatus, Tour } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";
import type { Destination, Guide, FAQItem, Experience, Resort } from "@/lib/content/types";
import type { DestinationsPageConfig } from "@/lib/cms/types";
import {
  destinations as staticDestinations,
  getDestination as getStaticDestination,
  getDestinationSlugs as getStaticDestinationSlugs,
} from "@/lib/content/destinations";
import {
  guides as staticGuides,
  getGuide as getStaticGuide,
  getGuideSlugs as getStaticGuideSlugs,
} from "@/lib/content/guides";
import {
  experiences as staticExperiences,
  getExperience as getStaticExperience,
  getExperienceSlugs as getStaticExperienceSlugs,
} from "@/lib/content/experiences";
import {
  resorts as staticResorts,
  getResort as getStaticResort,
  getResortSlugs as getStaticResortSlugs,
} from "@/lib/content/resorts";
import {
  mapPrismaDestination,
  mapCmsDestinationRecord,
  type CmsDestinationRecord,
  mapPrismaGuide,
  mapPrismaFaq,
  mapPrismaTour,
  mergeExperienceWithStatic,
  mapTestimonial,
  mapHomepageSection,
  mapCmsAccommodationRecord,
  mapPrismaAccommodation,
  type CmsAccommodationRecord,
} from "@/server/services/public-content.mappers";
import { listLocal } from "@/server/services/cms/cms-local-store";

const PUBLISHED: ContentStatus = "PUBLISHED";

function dbReady() {
  return isDatabaseConfigured();
}

function isDbConnectionError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (
    error.name === "PrismaClientInitializationError" ||
    error.name === "PrismaClientKnownRequestError" ||
    error.name === "PrismaClientUnknownRequestError" ||
    error.message.includes("Can't reach database server") ||
    error.message.includes("Connection refused") ||
    error.message.includes("ECONNREFUSED") ||
    error.message.includes("prepared statement") ||
    error.message.includes("42P05")
  );
}

/** Use static/empty fallback when DATABASE_URL is set but Postgres is unreachable (local dev). */
async function withDbFallback<T>(query: () => Promise<T>, fallback: () => T): Promise<T> {
  if (!dbReady()) return fallback();
  try {
    return await query();
  } catch (error) {
    if (isDbConnectionError(error)) {
      console.warn("[public-content] Database unreachable — using static fallback");
      return fallback();
    }
    throw error;
  }
}

/** When PostgreSQL is configured, content is 100% database-driven (no static fallback). */
function useStaticFallback() {
  return !dbReady();
}

async function countPublished(table: "destination" | "guide" | "faq"): Promise<number> {
  if (!dbReady()) return 0;
  if (table === "destination") return prisma.destination.count({ where: { status: PUBLISHED } });
  if (table === "guide") return prisma.travelGuide.count({ where: { status: PUBLISHED } });
  return prisma.faq.count({
    where: { OR: [{ status: PUBLISHED }, { published: true }] },
  });
}

function loadLocalDestinations(): Destination[] {
  return listLocal<CmsDestinationRecord>("destinations")
    .filter((row) => row.status === PUBLISHED)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map(mapCmsDestinationRecord);
}

function staticPublishedDestinations(options?: {
  featured?: boolean;
  region?: "mainland" | "islands";
  limit?: number;
}) {
  let list = loadLocalDestinations();
  if (!list.length) list = [...staticDestinations];
  if (options?.featured) list = list.filter((_, i) => i < 4);
  if (options?.region) list = list.filter((d) => d.region === options.region);
  if (options?.limit) list = list.slice(0, options.limit);
  return list;
}

function getStaticDestinationBySlug(slug: string): Destination | null {
  const fromCms = loadLocalDestinations().find((d) => d.slug === slug);
  return fromCms ?? getStaticDestination(slug) ?? null;
}

function getStaticDestinationSlugsList(): string[] {
  const fromCms = loadLocalDestinations().map((d) => d.slug);
  return fromCms.length ? fromCms : getStaticDestinationSlugs();
}

export const getPublishedDestinations = cache(
  async (options?: { featured?: boolean; region?: "mainland" | "islands"; limit?: number }) =>
    withDbFallback(async () => {
      const rows = await prisma.destination.findMany({
        where: {
          status: PUBLISHED,
          ...(options?.featured ? { featured: true } : {}),
        },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        ...(options?.limit ? { take: options.limit } : {}),
      });
      let mapped = rows.map(mapPrismaDestination);
      if (options?.region) mapped = mapped.filter((d) => d.region === options.region);
      return mapped;
    }, () => staticPublishedDestinations(options)),
);

export const getDestinationBySlug = cache(
  async (slug: string, options?: { allowDraft?: boolean }): Promise<Destination | null> =>
    withDbFallback(async () => {
      const row = await prisma.destination.findUnique({ where: { slug } });
      if (!row) return null;
      if (row.status === PUBLISHED || options?.allowDraft) {
        return mapPrismaDestination(row);
      }
      return null;
    }, () => getStaticDestinationBySlug(slug)),
);

export const getDestinationSlugs = cache(async (): Promise<string[]> =>
  withDbFallback(
    async () => {
      const rows = await prisma.destination.findMany({
        where: { status: PUBLISHED },
        select: { slug: true },
      });
      return rows.map((r) => r.slug);
    },
    () => getStaticDestinationSlugsList(),
  ),
);

export const getPublishedGuides = cache(async (options?: { limit?: number }) =>
  withDbFallback(
    async () => {
      const rows = await prisma.travelGuide.findMany({
        where: { status: PUBLISHED },
        orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
        ...(options?.limit ? { take: options.limit } : {}),
      });
      return rows.map(mapPrismaGuide);
    },
    () => {
      const list = [...staticGuides];
      return options?.limit ? list.slice(0, options.limit) : list;
    },
  ),
);

export const getGuideBySlug = cache(
  async (slug: string, options?: { allowDraft?: boolean }): Promise<Guide | null> =>
    withDbFallback(async () => {
      const row = await prisma.travelGuide.findUnique({ where: { slug } });
      if (!row) return null;
      if (row.status === PUBLISHED || options?.allowDraft) {
        return mapPrismaGuide(row);
      }
      return null;
    }, () => getStaticGuide(slug) ?? null),
);

export const getGuideSlugs = cache(async (): Promise<string[]> =>
  withDbFallback(
    async () => {
      const rows = await prisma.travelGuide.findMany({
        where: { status: PUBLISHED },
        select: { slug: true },
      });
      return rows.map((r) => r.slug);
    },
    () => getStaticGuideSlugs(),
  ),
);

export const getPublishedFaqs = cache(async (options?: { category?: string; limit?: number }) =>
  withDbFallback(async () => {
    const rows = await prisma.faq.findMany({
      where: {
        OR: [{ status: PUBLISHED }, { published: true }],
        ...(options?.category ? { category: options.category } : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      ...(options?.limit ? { take: options.limit } : {}),
    });
    return rows.map(mapPrismaFaq);
  }, () => []),
);

export const getPublishedTestimonials = cache(async (options?: { featured?: boolean; limit?: number }) =>
  withDbFallback(async () => {
    const rows = await prisma.testimonial.findMany({
      where: {
        status: PUBLISHED,
        ...(options?.featured ? { featured: true } : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      ...(options?.limit ? { take: options.limit } : {}),
    });
    return rows.map(mapTestimonial);
  }, () => []),
);

export const getHomepageSectionByKey = cache(async (key: string) =>
  withDbFallback(async () => {
    const row = await prisma.homepageSection.findUnique({ where: { key } });
    if (!row || row.status !== PUBLISHED) return null;
    return mapHomepageSection(row);
  }, () => null),
);

export const getPublishedHomepageSections = cache(async () =>
  withDbFallback(
    async () => {
      const rows = await prisma.homepageSection.findMany({
        where: { status: PUBLISHED },
        orderBy: [{ sortOrder: "asc" }, { key: "asc" }],
      });
      return rows.map(mapHomepageSection);
    },
    () => [],
  ),
);

export type HomeHeroConfig = {
  titleAccent?: string;
  titleMain?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type { DestinationsPageConfig } from "@/lib/cms/types";

export const getDestinationsPageConfig = cache(async (): Promise<DestinationsPageConfig | null> => {
  const section = await getHomepageSectionByKey("destinations_hub");
  if (section?.content) {
    const c = section.content as Record<string, string>;
    return {
      eyebrow: c.eyebrow,
      title: c.title ?? section.title,
      subtitle: c.subtitle,
    };
  }

  if (!dbReady()) {
    const { listLocal } = await import("@/server/services/cms/cms-local-store");
    const row = listLocal<{
      key: string;
      title: string;
      content: Record<string, string>;
      status: string;
    }>("homepage-sections").find((s) => s.key === "destinations_hub" && s.status === "PUBLISHED");
    if (row?.content) {
      return {
        eyebrow: row.content.eyebrow,
        title: row.content.title ?? row.title,
        subtitle: row.content.subtitle,
      };
    }
  }

  return null;
});

export const getHomeHeroConfig = cache(async (): Promise<HomeHeroConfig | null> => {
  const section = await getHomepageSectionByKey("hero");
  if (!section?.content) return null;
  const c = section.content as Record<string, string>;
  return {
    titleAccent: c.titleAccent,
    titleMain: c.titleMain ?? c.title,
    subtitle: c.subtitle,
    ctaLabel: c.ctaLabel,
    ctaHref: c.ctaHref,
  };
});

async function countPublishedTours(): Promise<number> {
  if (!dbReady()) return 0;
  return prisma.tour.count({ where: { status: "APPROVED" } });
}

export const getPublishedExperiences = cache(async (options?: { limit?: number }): Promise<Experience[]> =>
  withDbFallback(
    async () => {
      const rows = await prisma.tour.findMany({
        where: { status: "APPROVED" },
        orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
        ...(options?.limit ? { take: options.limit } : {}),
      });
      return rows.map((r) => mapPrismaTour(r as Tour & { content?: unknown }));
    },
    () => {
      const list = [...staticExperiences];
      return options?.limit ? list.slice(0, options.limit) : list;
    },
  ),
);

export const getExperienceBySlug = cache(
  async (slug: string, options?: { allowDraft?: boolean }): Promise<Experience | null> =>
    withDbFallback(async () => {
      const staticExp = getStaticExperience(slug);
      const row = await prisma.tour.findUnique({ where: { slug } });
      if (!row) return staticExp ?? null;
      if (row.status === "APPROVED" || (options?.allowDraft && row.status === "DRAFT")) {
        const cmsExp = mapPrismaTour(row as Tour & { content?: unknown });
        return staticExp ? mergeExperienceWithStatic(staticExp, cmsExp) : cmsExp;
      }
      return staticExp ?? null;
    }, () => getStaticExperience(slug) ?? null),
);

export const getExperienceSlugs = cache(async (): Promise<string[]> =>
  withDbFallback(
    async () => {
      const rows = await prisma.tour.findMany({
        where: { status: "APPROVED" },
        select: { slug: true },
      });
      return rows.map((r) => r.slug);
    },
    () => getStaticExperienceSlugs(),
  ),
);

/** Resolve entity DB id by slug for SEO lookups */
export const getDestinationIdBySlug = cache(async (slug: string) =>
  withDbFallback(
    async () => {
      const row = await prisma.destination.findUnique({ where: { slug }, select: { id: true } });
      return row?.id ?? null;
    },
    () => {
      const row = listLocal<CmsDestinationRecord>("destinations").find((d) => d.slug === slug);
      return row?.id ?? null;
    },
  ),
);

export const getGuideIdBySlug = cache(async (slug: string) =>
  withDbFallback(
    async () => {
      const row = await prisma.travelGuide.findUnique({ where: { slug }, select: { id: true } });
      return row?.id ?? null;
    },
    () => null,
  ),
);

export const getTourIdBySlug = cache(async (slug: string) =>
  withDbFallback(
    async () => {
      const row = await prisma.tour.findUnique({ where: { slug }, select: { id: true } });
      return row?.id ?? null;
    },
    () => null,
  ),
);

function loadLocalAccommodations(): Resort[] {
  return listLocal<CmsAccommodationRecord>("accommodations")
    .filter((row) => row.status === PUBLISHED)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map(mapCmsAccommodationRecord);
}

function staticPublishedAccommodations(options?: { featured?: boolean; limit?: number }): Resort[] {
  let list = loadLocalAccommodations();
  if (!list.length) list = [...staticResorts];
  if (options?.featured) {
    const featuredSlugs = listLocal<CmsAccommodationRecord>("accommodations")
      .filter((row) => row.status === PUBLISHED && row.featured)
      .map((row) => row.slug);
    if (featuredSlugs.length) {
      list = list.filter((r) => featuredSlugs.includes(r.slug));
    } else {
      list = list.slice(0, 6);
    }
  }
  if (options?.limit) list = list.slice(0, options.limit);
  return list;
}

function getStaticAccommodationBySlug(slug: string): Resort | null {
  const fromCms = loadLocalAccommodations().find((r) => r.slug === slug);
  return fromCms ?? getStaticResort(slug) ?? null;
}

function getStaticAccommodationSlugsList(): string[] {
  const fromCms = loadLocalAccommodations().map((r) => r.slug);
  return fromCms.length ? fromCms : getStaticResortSlugs();
}

export const getPublishedAccommodations = cache(
  async (options?: { featured?: boolean; limit?: number }): Promise<Resort[]> =>
    withDbFallback(async () => {
      const rows = await prisma.accommodation.findMany({
        where: {
          status: PUBLISHED,
          ...(options?.featured ? { featured: true } : {}),
        },
        orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
        ...(options?.limit ? { take: options.limit } : {}),
      });
      return rows.map(mapPrismaAccommodation);
    }, () => staticPublishedAccommodations(options)),
);

export const getAccommodationBySlug = cache(
  async (slug: string, options?: { allowDraft?: boolean }): Promise<Resort | null> =>
    withDbFallback(async () => {
      const staticStay = getStaticResort(slug);
      const row = await prisma.accommodation.findUnique({ where: { slug } });
      if (!row) return staticStay ?? null;
      if (row.status === PUBLISHED || (options?.allowDraft && row.status === "DRAFT")) {
        const cmsStay = mapPrismaAccommodation(row);
        return staticStay
          ? {
              ...cmsStay,
              heroImage: cmsStay.heroImage || staticStay.heroImage,
              priceFrom: cmsStay.priceFrom || staticStay.priceFrom,
            }
          : cmsStay;
      }
      return staticStay ?? null;
    }, () => getStaticAccommodationBySlug(slug)),
);

export const getAccommodationSlugs = cache(async (): Promise<string[]> =>
  withDbFallback(
    async () => {
      const rows = await prisma.accommodation.findMany({
        where: { status: PUBLISHED },
        select: { slug: true },
      });
      return rows.map((r) => r.slug);
    },
    () => getStaticAccommodationSlugsList(),
  ),
);

export const getAccommodationIdBySlug = cache(async (slug: string) =>
  withDbFallback(
    async () => {
      const row = await prisma.accommodation.findUnique({ where: { slug }, select: { id: true } });
      return row?.id ?? null;
    },
    () => {
      const row = listLocal<CmsAccommodationRecord>("accommodations").find((a) => a.slug === slug);
      return row?.id ?? null;
    },
  ),
);

export async function getRelatedAccommodations(
  slugs: string[],
  allAccommodations?: Resort[],
): Promise<Resort[]> {
  const pool = allAccommodations ?? (await getPublishedAccommodations());
  return slugs
    .map((s) => pool.find((r) => r.slug === s))
    .filter((r): r is Resort => Boolean(r));
}

/** Live CMS blog posts (Supabase Postgres via Prisma) */
export const getPublishedBlogPosts = cache(async (options?: { limit?: number }) =>
  withDbFallback(
    async () => {
      const { getPublishedPosts } = await import("@/server/services/cms-wp/content.service");
      return getPublishedPosts(options?.limit ?? 12);
    },
    () => [],
  ),
);

export const getPublishedBlogPostBySlug = cache(async (slug: string) =>
  withDbFallback(
    async () => {
      const { getPublishedPostBySlug } = await import("@/server/services/cms-wp/content.service");
      return getPublishedPostBySlug(slug);
    },
    () => null,
  ),
);

export const getPublishedCmsPageBySlug = cache(async (slug: string) =>
  withDbFallback(
    async () => {
      const { getPublishedPageBySlug } = await import("@/server/services/cms-wp/content.service");
      return getPublishedPageBySlug(slug);
    },
    () => null,
  ),
);
