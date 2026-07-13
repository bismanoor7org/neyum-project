"use server";

import { revalidatePath } from "next/cache";
import type { ContentStatus, GuideCategory, Prisma } from "@prisma/client";
import type { ActionResult } from "@/lib/cms/action-utils";
import { actionError, toSlug } from "@/lib/cms/action-utils";
import type { DestinationContentJson } from "@/lib/cms/destination-content";
import type { GuideBodyJson } from "@/lib/cms/guide-content";
import type { SeoPayload } from "@/lib/cms/types";
import { requireCmsAction } from "@/server/auth/cms-action-auth";
import {
  createDestinationCms,
  createFaqCms,
  createGuideCms,
  createTestimonialCms,
  createTourCms,
  createTransportCms,
  deleteDestinationCms,
  deleteFaqCms,
  deleteGuideCms,
  deleteHomepageSectionCms,
  deleteMediaAsset,
  deleteTestimonialCms,
  deleteTourCms,
  deleteTransportCms,
  updateDestinationCms,
  updateFaqCms,
  updateGuideCms,
  updateMediaAsset,
  updateTestimonialCms,
  updateTourCms,
  updateTransportCms,
  upsertHomepageSection,
  upsertSeoMeta,
} from "@/server/services/cms/cms.service";
import { resolveCmsSupplierId } from "@/server/services/cms/cms-platform.service";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";
import type { CmsEntityType, TransportType } from "@prisma/client";
import type { TourCmsStatus } from "@/lib/cms/tour-content";
import type { TransportCmsStatus } from "@/lib/cms/transport-content";
import type { TourContentJson } from "@/lib/cms/tour-content";

function revalidateDestination(slug: string) {
  revalidatePath("/");
  revalidatePath("/destinations");
  revalidatePath(`/destinations/${slug}`);
  revalidatePath("/places-to-go");
  revalidatePath(`/places-to-go/${slug}`);
}

function revalidateGuide(slug: string) {
  revalidatePath("/guides");
  revalidatePath(`/guides/${slug}`);
  revalidatePath("/");
}

function revalidateFaq() {
  revalidatePath("/faq");
  revalidatePath("/");
}

function revalidateHomepage() {
  revalidatePath("/");
}

function revalidateDestinationsPage() {
  revalidatePath("/destinations");
  revalidatePath("/places-to-go");
}

async function saveSeo(
  entityType: CmsEntityType,
  entityId: string,
  seo?: SeoPayload,
) {
  if (!seo) return;
  const hasValue = Object.values(seo).some((v) => v !== undefined && v !== null && v !== "");
  if (!hasValue) return;
  await upsertSeoMeta(entityType, entityId, seo);
}

// ── Destinations ────────────────────────────────────────────────────────────

export type DestinationFormInput = {
  id?: string;
  name: string;
  slug?: string;
  tagline?: string;
  description?: string;
  excerpt?: string;
  heroImage?: string;
  cardImage?: string;
  region?: "mainland" | "islands";
  listHighlights?: string[];
  thingsToDo?: string[];
  placesToStay?: string[];
  tours?: string[];
  beaches?: string[];
  dining?: string[];
  transport?: string[];
  culture?: string[];
  weather?: string;
  bestTimeToVisit?: string;
  travelTips?: string[];
  relatedSlugs?: string[];
  gallery?: string[];
  faqs?: { question: string; answer: string }[];
  latitude?: number | null;
  longitude?: number | null;
  featured?: boolean;
  status: ContentStatus;
  sortOrder?: number;
  seo?: SeoPayload;
};

export async function saveDestinationAction(
  input: DestinationFormInput,
): Promise<ActionResult<{ id: string; slug: string }>> {
  try {
    const { userId } = await requireCmsAction("cms:write");
    const slug = toSlug(input.slug || input.name);
    if (!slug) return { ok: false, error: "Slug is required" };

    const content: DestinationContentJson = {
      region: input.region ?? "islands",
      cardImage: input.cardImage,
      listHighlights: input.listHighlights ?? [],
      thingsToDo: input.thingsToDo ?? [],
      placesToStay: input.placesToStay ?? [],
      tours: input.tours ?? [],
      beaches: input.beaches ?? [],
      dining: input.dining ?? [],
      transport: input.transport ?? [],
      culture: input.culture ?? [],
      weather: input.weather ?? "",
      bestTimeToVisit: input.bestTimeToVisit ?? "",
      travelTips: input.travelTips ?? [],
      faqs: input.faqs ?? [],
      relatedSlugs: input.relatedSlugs ?? [],
    };

    const data = {
      name: input.name.trim(),
      slug,
      tagline: input.tagline?.trim() || null,
      description: input.description?.trim() || null,
      excerpt: input.excerpt?.trim() || null,
      heroImage: input.heroImage?.trim() || null,
      gallery: input.gallery ?? [],
      content: content as Prisma.InputJsonValue,
      highlights: (input.listHighlights ?? []) as Prisma.InputJsonValue,
      latitude: input.latitude ?? undefined,
      longitude: input.longitude ?? undefined,
      featured: input.featured ?? false,
      status: input.status,
      sortOrder: input.sortOrder ?? 0,
      updatedById: userId,
    };

    let record;
    if (input.id) {
      record = await updateDestinationCms(input.id, data);
    } else {
      record = await createDestinationCms(data);
    }
    if (!record) return { ok: false, error: "Failed to save destination" };

    const id = record.id as string;
    await saveSeo("DESTINATION", id, input.seo);
    revalidateDestination(slug);
    return { ok: true, data: { id, slug } };
  } catch (e) {
    return actionError(e);
  }
}

export async function deleteDestinationAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    const { getDestinationCms } = await import("@/server/services/cms/cms.service");
    const existing = await getDestinationCms(id);
    if (!existing) return { ok: false, error: "Destination not found" };
    await deleteDestinationCms(id);
    revalidateDestination((existing as { slug: string }).slug);
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function publishDestinationAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:publish");
    const { getDestinationCms } = await import("@/server/services/cms/cms.service");
    const existing = await getDestinationCms(id);
    if (!existing) return { ok: false, error: "Destination not found" };
    await updateDestinationCms(id, { status: "PUBLISHED" });
    revalidateDestination((existing as { slug: string }).slug);
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

// ── Guides ──────────────────────────────────────────────────────────────────

export type GuideFormInput = {
  id?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  featuredImage?: string;
  overview?: string;
  sectionTitle?: string;
  sectionBody?: string;
  category: GuideCategory;
  categoryLabel?: string;
  status: ContentStatus;
  sortOrder?: number;
  relatedSlugs?: string[];
  seo?: SeoPayload;
};

export async function saveGuideAction(
  input: GuideFormInput,
): Promise<ActionResult<{ id: string; slug: string }>> {
  try {
    await requireCmsAction("cms:write");
    const slug = toSlug(input.slug || input.title);
    if (!slug) return { ok: false, error: "Slug is required" };

    const body: GuideBodyJson = {
      overview: input.overview ?? "",
      categoryLabel: input.categoryLabel ?? "Planning",
      sections: [
        {
          title: input.sectionTitle?.trim() || "Overview",
          body: input.sectionBody?.trim() || input.overview?.trim() || "",
        },
      ],
      relatedSlugs: input.relatedSlugs ?? [],
      faqs: [],
    };

    const data = {
      title: input.title.trim(),
      slug,
      excerpt: input.excerpt?.trim() || null,
      featuredImage: input.featuredImage?.trim() || null,
      content: input.sectionBody?.trim() || input.overview?.trim() || "",
      body: body as Prisma.InputJsonValue,
      category: input.category,
      status: input.status,
      sortOrder: input.sortOrder ?? 0,
      publishedAt: input.status === "PUBLISHED" ? new Date() : null,
    };

    let record;
    if (input.id) {
      record = await updateGuideCms(input.id, data);
    } else {
      record = await createGuideCms(data);
    }
    if (!record) return { ok: false, error: "Failed to save guide" };

    const id = record.id as string;
    await saveSeo("GUIDE", id, input.seo);
    revalidateGuide(slug);
    return { ok: true, data: { id, slug } };
  } catch (e) {
    return actionError(e);
  }
}

export async function deleteGuideAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    const { getGuideCms } = await import("@/server/services/cms/cms.service");
    const existing = await getGuideCms(id);
    if (!existing) return { ok: false, error: "Guide not found" };
    await deleteGuideCms(id);
    revalidateGuide((existing as { slug: string }).slug);
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function publishGuideAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:publish");
    const { getGuideCms } = await import("@/server/services/cms/cms.service");
    const existing = await getGuideCms(id);
    if (!existing) return { ok: false, error: "Guide not found" };
    await updateGuideCms(id, { status: "PUBLISHED", publishedAt: new Date() });
    revalidateGuide((existing as { slug: string }).slug);
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

// ── FAQs ──────────────────────────────────────────────────────────────────────

export type FaqFormInput = {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  sortOrder?: number;
  status: ContentStatus;
  seo?: SeoPayload;
};

export async function saveFaqAction(
  input: FaqFormInput,
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireCmsAction("cms:write");
    const data = {
      question: input.question.trim(),
      answer: input.answer.trim(),
      category: input.category?.trim() || null,
      sortOrder: input.sortOrder ?? 0,
      status: input.status,
      published: input.status === "PUBLISHED",
    };

    let record;
    if (input.id) {
      record = await updateFaqCms(input.id, data);
    } else {
      record = await createFaqCms(data);
    }
    if (!record) return { ok: false, error: "Failed to save FAQ" };

    const id = record.id as string;
    await saveSeo("FAQ", id, input.seo);
    revalidateFaq();
    return { ok: true, data: { id } };
  } catch (e) {
    return actionError(e);
  }
}

export async function deleteFaqAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    await deleteFaqCms(id);
    revalidateFaq();
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function publishFaqAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:publish");
    await updateFaqCms(id, { status: "PUBLISHED", published: true });
    revalidateFaq();
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

// ── Homepage sections ───────────────────────────────────────────────────────

export type HomepageSectionFormInput = {
  id?: string;
  key: string;
  title: string;
  contentJson: string;
  status: ContentStatus;
  sortOrder?: number;
};

export async function saveHomepageSectionAction(
  input: HomepageSectionFormInput,
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireCmsAction("cms:write");
    let content: Record<string, unknown> = {};
    if (input.contentJson.trim()) {
      try {
        content = JSON.parse(input.contentJson) as Record<string, unknown>;
      } catch {
        return { ok: false, error: "Content must be valid JSON" };
      }
    }

    const record = await upsertHomepageSection(input.id ?? null, {
      key: toSlug(input.key),
      title: input.title.trim(),
      content,
      status: input.status,
      sortOrder: input.sortOrder ?? 0,
    });
    if (!record) return { ok: false, error: "Failed to save homepage section" };

    const id = record.id as string;
    await saveSeo("HOMEPAGE", id, undefined);
    revalidateHomepage();
    if (input.key === "destinations_hub") revalidateDestinationsPage();
    return { ok: true, data: { id } };
  } catch (e) {
    return actionError(e);
  }
}

export type DestinationsPageFormInput = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  status: ContentStatus;
};

export async function saveDestinationsPageAction(
  input: DestinationsPageFormInput,
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireCmsAction("cms:write");
    const record = await upsertHomepageSection(input.id ?? null, {
      key: "destinations_hub",
      title: input.title.trim(),
      content: {
        eyebrow: input.eyebrow.trim(),
        title: input.title.trim(),
        subtitle: input.subtitle.trim(),
      },
      status: input.status,
      sortOrder: 0,
    });
    if (!record) return { ok: false, error: "Failed to save destinations page" };
    revalidateDestinationsPage();
    return { ok: true, data: { id: record.id as string } };
  } catch (e) {
    return actionError(e);
  }
}

export async function deleteHomepageSectionAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    await deleteHomepageSectionCms(id);
    revalidateHomepage();
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function publishHomepageSectionAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:publish");
    const { getHomepageSectionCms } = await import("@/server/services/cms/cms.service");
    const existing = await getHomepageSectionCms(id);
    if (!existing) return { ok: false, error: "Section not found" };
    await upsertHomepageSection(id, {
      key: (existing as { key: string }).key,
      title: (existing as { title: string }).title,
      content: (existing as { content: Record<string, unknown> }).content,
      status: "PUBLISHED",
      sortOrder: (existing as { sortOrder?: number }).sortOrder,
    });
    revalidateHomepage();
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export type TestimonialFormInput = {
  id?: string;
  authorName: string;
  authorTitle?: string;
  authorImage?: string;
  location?: string;
  content: string;
  rating?: number;
  featured?: boolean;
  status: ContentStatus;
  sortOrder?: number;
};

export async function saveTestimonialAction(
  input: TestimonialFormInput,
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireCmsAction("cms:write");
    const data = {
      authorName: input.authorName.trim(),
      authorTitle: input.authorTitle?.trim() || null,
      authorImage: input.authorImage?.trim() || null,
      location: input.location?.trim() || null,
      content: input.content.trim(),
      rating: input.rating ?? 5,
      featured: input.featured ?? false,
      status: input.status,
      sortOrder: input.sortOrder ?? 0,
      publishedAt: input.status === "PUBLISHED" ? new Date() : null,
    };
    let record;
    if (input.id) record = await updateTestimonialCms(input.id, data);
    else record = await createTestimonialCms(data);
    if (!record) return { ok: false, error: "Failed to save testimonial" };
    revalidatePath("/");
    return { ok: true, data: { id: record.id as string } };
  } catch (e) {
    return actionError(e);
  }
}

export async function deleteTestimonialAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    await deleteTestimonialCms(id);
    revalidatePath("/");
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function publishTestimonialAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:publish");
    await updateTestimonialCms(id, { status: "PUBLISHED", publishedAt: new Date() });
    revalidatePath("/");
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

// ── Tours ─────────────────────────────────────────────────────────────────────

export type TourFormInput = {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  duration: string;
  price: number;
  currency?: string;
  featuredImage?: string;
  destinationId: string;
  supplierId?: string;
  location?: string;
  category?: string;
  ages?: string;
  priceFrom?: string;
  highlights?: string[];
  included?: string[];
  itinerary?: string[];
  featured?: boolean;
  status: TourCmsStatus;
  seo?: SeoPayload;
};

function revalidateTour(slug: string) {
  revalidatePath("/tours");
  revalidatePath(`/tours/${slug}`);
  revalidatePath("/things-to-do");
  revalidatePath(`/things-to-do/${slug}`);
  revalidatePath("/");
}

export async function saveTourAction(
  input: TourFormInput,
): Promise<ActionResult<{ id: string; slug: string }>> {
  try {
    await requireCmsAction("cms:write");
    const slug = toSlug(input.slug || input.title);
    if (!slug) return { ok: false, error: "Slug is required" };

    const supplierId = await resolveCmsSupplierId(input.supplierId);
    if (isDatabaseConfigured() && !supplierId) {
      return { ok: false, error: "No supplier available. Add a supplier in admin first." };
    }

    const content: TourContentJson = {
      location: input.location ?? "",
      category: input.category ?? "Experience",
      ages: input.ages ?? "All ages",
      priceFrom: input.priceFrom,
      highlights: input.highlights ?? [],
      included: input.included ?? [],
      itinerary: input.itinerary ?? [],
      relatedSlugs: [],
      faqs: [],
    };

    const data = {
      title: input.title.trim(),
      slug,
      description: input.description.trim(),
      duration: input.duration.trim(),
      price: input.price,
      currency: input.currency ?? "FJD",
      featuredImage: input.featuredImage?.trim() || null,
      featured: input.featured ?? false,
      status: input.status,
      content: content as Prisma.InputJsonValue,
      supplier: { connect: { id: supplierId } },
      destination: { connect: { id: input.destinationId } },
    };

    let record;
    if (!isDatabaseConfigured()) {
      const localData = {
        title: input.title.trim(),
        slug,
        description: input.description.trim(),
        duration: input.duration.trim(),
        price: input.price,
        currency: input.currency ?? "FJD",
        featuredImage: input.featuredImage?.trim() || null,
        featured: input.featured ?? false,
        status: input.status,
        content,
        destinationId: input.destinationId,
        supplierName: "Platform",
      };
      record = input.id
        ? await updateTourCms(input.id, localData as never)
        : await createTourCms(localData as never);
    } else if (input.id) {
      record = await updateTourCms(input.id, {
        title: data.title,
        slug: data.slug,
        description: data.description,
        duration: data.duration,
        price: data.price,
        currency: data.currency,
        featuredImage: data.featuredImage,
        featured: data.featured,
        status: data.status,
        content: data.content,
        destination: { connect: { id: input.destinationId } },
      } as Prisma.TourUpdateInput);
    } else {
      record = await createTourCms({
        ...data,
        supplier: { connect: { id: supplierId! } },
      } as Prisma.TourCreateInput);
    }
    if (!record) return { ok: false, error: "Failed to save tour" };

    const id = record.id as string;
    await saveSeo("TOUR", id, input.seo);
    revalidateTour(slug);
    return { ok: true, data: { id, slug } };
  } catch (e) {
    return actionError(e);
  }
}

export async function deleteTourAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    const { getTourCms } = await import("@/server/services/cms/cms.service");
    const existing = await getTourCms(id);
    if (!existing) return { ok: false, error: "Tour not found" };
    await deleteTourCms(id);
    revalidateTour((existing as { slug: string }).slug);
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function publishTourAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:publish");
    const { getTourCms } = await import("@/server/services/cms/cms.service");
    const existing = await getTourCms(id);
    if (!existing) return { ok: false, error: "Tour not found" };
    await updateTourCms(id, { status: "APPROVED" });
    revalidateTour((existing as { slug: string }).slug);
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

// ── Transport ─────────────────────────────────────────────────────────────────

export type TransportFormInput = {
  id?: string;
  title: string;
  type: TransportType;
  description?: string;
  capacity: number;
  price: number;
  currency?: string;
  image?: string;
  supplierId?: string;
  featured?: boolean;
  status: TransportCmsStatus;
};

function revalidateTransport() {
  revalidatePath("/things-to-know");
  revalidatePath("/");
}

export async function saveTransportAction(
  input: TransportFormInput,
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireCmsAction("cms:write");
    const supplierId = await resolveCmsSupplierId(input.supplierId);
    if (isDatabaseConfigured() && !supplierId) {
      return { ok: false, error: "No supplier available. Add a supplier in admin first." };
    }

    let record;
    if (!isDatabaseConfigured()) {
      const localData = {
        title: input.title.trim(),
        type: input.type,
        description: input.description?.trim() || null,
        capacity: input.capacity,
        price: input.price,
        currency: input.currency ?? "FJD",
        image: input.image?.trim() || null,
        featured: input.featured ?? false,
        status: input.status,
        supplierName: "Platform",
      };
      record = input.id
        ? await updateTransportCms(input.id, localData as never)
        : await createTransportCms(localData as never);
    } else {
      const data = {
        title: input.title.trim(),
        type: input.type,
        description: input.description?.trim() || null,
        capacity: input.capacity,
        price: input.price,
        currency: input.currency ?? "FJD",
        image: input.image?.trim() || null,
        featured: input.featured ?? false,
        status: input.status,
        supplier: { connect: { id: supplierId! } },
      };

      record = input.id
        ? await updateTransportCms(input.id, {
            title: data.title,
            type: data.type,
            description: data.description,
            capacity: data.capacity,
            price: data.price,
            currency: data.currency,
            image: data.image,
            featured: data.featured,
            status: data.status,
          })
        : await createTransportCms(data);
    }
    if (!record) return { ok: false, error: "Failed to save transport service" };
    revalidateTransport();
    return { ok: true, data: { id: record.id as string } };
  } catch (e) {
    return actionError(e);
  }
}

export async function deleteTransportAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    await deleteTransportCms(id);
    revalidateTransport();
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function publishTransportAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:publish");
    await updateTransportCms(id, { status: "APPROVED" });
    revalidateTransport();
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

// ── SEO ───────────────────────────────────────────────────────────────────────

export type SeoFormInput = SeoPayload & {
  entityType: CmsEntityType;
  entityId: string;
};

export async function saveSeoAction(input: SeoFormInput): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:seo");
    const { entityType, entityId, ...seo } = input;
    if (!entityId.trim()) return { ok: false, error: "Entity ID is required" };
    await upsertSeoMeta(entityType, entityId.trim(), seo);
    revalidatePath("/");
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

// ── Media ─────────────────────────────────────────────────────────────────────

export async function updateMediaAction(
  id: string,
  data: { altText?: string | null; caption?: string | null; tags?: string[] },
): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:media");
    await updateMediaAsset(id, data);
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function deleteMediaAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:media");
    await deleteMediaAsset(id);
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}
