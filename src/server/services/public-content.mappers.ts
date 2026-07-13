import type {
  Accommodation,
  Destination as PrismaDestination,
  TravelGuide,
  Faq,
  Testimonial,
  HomepageSection,
  Tour,
} from "@prisma/client";
import type { Destination, Guide, FAQItem, Experience, Resort } from "@/lib/content/types";
import { getResort as getStaticResort } from "@/lib/content/resorts";
import type { DestinationContentJson } from "@/lib/cms/destination-content";
import type { GuideBodyJson } from "@/lib/cms/guide-content";
import type { TourContentJson } from "@/lib/cms/tour-content";
import { getDestination as getStaticDestination } from "@/lib/content/destinations";

export type CmsDestinationRecord = {
  id?: string;
  name: string;
  slug: string;
  tagline?: string | null;
  description?: string | null;
  excerpt?: string | null;
  heroImage?: string | null;
  gallery?: string[];
  highlights?: string[] | unknown;
  content?: unknown;
  status?: string;
  sortOrder?: number;
  featured?: boolean;
};

/** DB seed slugs that differ from static content slugs */
const STATIC_DESTINATION_SLUG_ALIASES: Record<string, string> = {
  "mamanuca-islands": "mamanuca",
  "yasawa-islands": "yasawa",
};

function resolveStaticDestination(slug: string) {
  return getStaticDestination(slug) ?? getStaticDestination(STATIC_DESTINATION_SLUG_ALIASES[slug] ?? "");
}

const GUIDE_CATEGORY_LABELS: Record<string, string> = {
  FIRST_TIME: "Planning",
  VISA: "Planning",
  WEATHER: "Planning",
  CULTURE: "Style",
  TRANSPORT: "Planning",
  DINING: "Style",
  SAFETY: "Planning",
  ITINERARY: "Planning",
  GENERAL: "Planning",
};

function parseJson<T>(value: unknown, fallback: T): T {
  if (!value || typeof value !== "object") return fallback;
  return { ...fallback, ...(value as T) };
}

function mapDestinationFields(input: {
  slug: string;
  name: string;
  tagline?: string | null;
  description?: string | null;
  excerpt?: string | null;
  heroImage?: string | null;
  gallery?: string[] | null;
  highlights?: unknown;
  content?: unknown;
}): Destination {
  const content = parseJson<DestinationContentJson>(input.content ?? input.highlights, {});

  const listHighlights = Array.isArray(content.listHighlights)
    ? content.listHighlights
    : Array.isArray(input.highlights)
      ? (input.highlights as string[])
      : [];

  const staticFallback = resolveStaticDestination(input.slug);
  const heroFromDb = input.heroImage?.trim();
  const cardFromContent = content.cardImage?.trim();

  return {
    slug: input.slug,
    title: input.name,
    region: content.region ?? staticFallback?.region ?? "islands",
    tagline: input.tagline ?? staticFallback?.tagline ?? "",
    overview: input.description ?? input.excerpt ?? staticFallback?.overview ?? "",
    description: input.description ?? staticFallback?.description ?? undefined,
    heroImage: heroFromDb || staticFallback?.heroImage || "",
    cardImage:
      cardFromContent ||
      heroFromDb ||
      staticFallback?.cardImage ||
      staticFallback?.heroImage ||
      "",
    highlights: listHighlights.length ? listHighlights : staticFallback?.highlights ?? [],
    thingsToDo: content.thingsToDo ?? staticFallback?.thingsToDo ?? [],
    placesToStay: content.placesToStay ?? staticFallback?.placesToStay ?? [],
    tours: content.tours ?? staticFallback?.tours ?? [],
    beaches: content.beaches ?? staticFallback?.beaches ?? [],
    dining: content.dining ?? staticFallback?.dining ?? [],
    transport: content.transport ?? staticFallback?.transport ?? [],
    culture: content.culture ?? staticFallback?.culture ?? [],
    weather: content.weather ?? staticFallback?.weather ?? "",
    bestTimeToVisit:
      content.bestTimeToVisit ??
      staticFallback?.bestTimeToVisit ??
      staticFallback?.weather ??
      "",
    travelTips: content.travelTips ?? staticFallback?.travelTips ?? [],
    gallery:
      (input.gallery?.length ? input.gallery : undefined) ??
      staticFallback?.gallery ??
      [],
    faqs: content.faqs ?? staticFallback?.faqs ?? [],
    relatedSlugs: content.relatedSlugs ?? staticFallback?.relatedSlugs ?? [],
  };
}

export function mapCmsDestinationRecord(row: CmsDestinationRecord): Destination {
  return mapDestinationFields({
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    excerpt: row.excerpt,
    heroImage: row.heroImage,
    gallery: row.gallery,
    highlights: row.highlights,
    content: row.content,
  });
}

export function mapPrismaDestination(row: PrismaDestination): Destination {
  return mapDestinationFields({
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    excerpt: row.excerpt,
    heroImage: row.heroImage,
    gallery: row.gallery,
    highlights: row.highlights,
    content: row.content ?? row.highlights,
  });
}

export function mapPrismaGuide(row: TravelGuide): Guide {
  const body = parseJson<GuideBodyJson>(row.body, {});
  const category =
    body.categoryLabel ?? GUIDE_CATEGORY_LABELS[row.category] ?? "Planning";

  return {
    slug: row.slug,
    title: row.title,
    category,
    excerpt: row.excerpt ?? "",
    heroImage: row.featuredImage ?? "",
    overview: body.overview ?? row.excerpt ?? "",
    sections: body.sections ?? [{ title: "Overview", body: row.content }],
    faqs: body.faqs ?? [],
    relatedSlugs: body.relatedSlugs ?? [],
  };
}

export function mapPrismaFaq(row: Faq): FAQItem & { id: string; category: string | null } {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    category: row.category,
  };
}

export function mapTestimonial(row: Testimonial) {
  return {
    id: row.id,
    authorName: row.authorName,
    authorTitle: row.authorTitle,
    authorImage: row.authorImage,
    location: row.location,
    content: row.content,
    rating: row.rating,
    featured: row.featured,
    publishedAt: row.publishedAt,
  };
}

/** Prefer CMS values when present; fall back to curated static content for empty fields. */
export function mergeExperienceWithStatic(staticExp: Experience, cmsExp: Experience): Experience {
  return {
    ...staticExp,
    ...cmsExp,
    title: cmsExp.title || staticExp.title,
    location: cmsExp.location || staticExp.location,
    category: cmsExp.category !== "Experience" ? cmsExp.category : staticExp.category,
    duration: cmsExp.duration || staticExp.duration,
    ages: cmsExp.ages || staticExp.ages,
    priceFrom: cmsExp.priceFrom || staticExp.priceFrom,
    heroImage: cmsExp.heroImage || staticExp.heroImage,
    overview: cmsExp.overview || staticExp.overview,
    highlights: cmsExp.highlights.length > 0 ? cmsExp.highlights : staticExp.highlights,
    included: cmsExp.included.length > 0 ? cmsExp.included : staticExp.included,
    itinerary: cmsExp.itinerary.length > 0 ? cmsExp.itinerary : staticExp.itinerary,
    faqs: cmsExp.faqs.length > 0 ? cmsExp.faqs : staticExp.faqs,
    relatedSlugs:
      cmsExp.relatedSlugs.length > 0 ? cmsExp.relatedSlugs : staticExp.relatedSlugs,
    rating: {
      score: cmsExp.rating.score || staticExp.rating.score,
      count: cmsExp.rating.count > 0 ? cmsExp.rating.count : staticExp.rating.count,
    },
  };
}

export function mapPrismaTour(row: Tour & { content?: unknown }): Experience {
  const content = parseJson<TourContentJson>(row.content, {});
  const price = typeof row.price === "object" && row.price !== null && "toString" in row.price
    ? (row.price as { toString: () => string }).toString()
    : String(row.price);
  return {
    slug: row.slug,
    title: row.title,
    location: content.location ?? "",
    category: content.category ?? "Experience",
    duration: row.duration,
    ages: content.ages ?? "All ages",
    priceFrom: content.priceFrom ?? `${row.currency} ${price}`,
    rating: {
      score: typeof row.rating === "object" && row.rating !== null && "toString" in row.rating
        ? (row.rating as { toString: () => string }).toString()
        : String(row.rating),
      count: row.reviewCount,
    },
    heroImage: row.featuredImage ?? "",
    overview: row.description,
    highlights: content.highlights ?? [],
    included: content.included ?? [],
    itinerary: content.itinerary ?? [],
    faqs: content.faqs ?? [],
    relatedSlugs: content.relatedSlugs ?? [],
  };
}

export function mapHomepageSection(row: HomepageSection) {
  return {
    key: row.key,
    title: row.title,
    content: row.content as Record<string, unknown>,
    status: row.status,
  };
}

export type CmsAccommodationRecord = {
  id?: string;
  title: string;
  slug: string;
  location: string;
  stars?: number;
  priceFrom?: string | null;
  overview: string;
  heroImage?: string | null;
  amenities?: string[];
  experiences?: string[];
  relatedSlugs?: string[];
  status?: string;
  sortOrder?: number;
  featured?: boolean;
};

function mapAccommodationFields(input: {
  slug: string;
  title: string;
  location: string;
  stars?: number;
  priceFrom?: string | null;
  overview: string;
  heroImage?: string | null;
  amenities?: string[];
  experiences?: string[];
  relatedSlugs?: string[];
}): Resort {
  const staticFallback = getStaticResort(input.slug);
  const heroFromDb = input.heroImage?.trim();

  return {
    slug: input.slug,
    title: input.title,
    location: input.location,
    stars: input.stars ?? staticFallback?.stars ?? 5,
    priceFrom: input.priceFrom ?? staticFallback?.priceFrom ?? "",
    heroImage: heroFromDb || staticFallback?.heroImage || "",
    overview: input.overview || staticFallback?.overview || "",
    amenities: input.amenities?.length
      ? input.amenities
      : staticFallback?.amenities ?? [],
    experiences: input.experiences?.length
      ? input.experiences
      : staticFallback?.experiences ?? [],
    relatedSlugs: input.relatedSlugs?.length
      ? input.relatedSlugs
      : staticFallback?.relatedSlugs ?? [],
  };
}

export function mapCmsAccommodationRecord(row: CmsAccommodationRecord): Resort {
  return mapAccommodationFields({
    slug: row.slug,
    title: row.title,
    location: row.location,
    stars: row.stars,
    priceFrom: row.priceFrom,
    overview: row.overview,
    heroImage: row.heroImage,
    amenities: row.amenities,
    experiences: row.experiences,
    relatedSlugs: row.relatedSlugs,
  });
}

export function mapPrismaAccommodation(row: Accommodation): Resort {
  return mapAccommodationFields({
    slug: row.slug,
    title: row.title,
    location: row.location,
    stars: row.stars,
    priceFrom: row.priceFrom,
    overview: row.overview,
    heroImage: row.heroImage,
    amenities: row.amenities,
    experiences: row.experiences,
    relatedSlugs: row.relatedSlugs,
  });
}
