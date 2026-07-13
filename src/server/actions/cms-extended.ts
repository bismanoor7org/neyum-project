"use server";

import { revalidatePath } from "next/cache";
import type { AdminStaffRole, ContentStatus, Prisma } from "@prisma/client";
import type { ActionResult } from "@/lib/cms/action-utils";
import { actionError, linesToList, listToLines, toSlug } from "@/lib/cms/action-utils";
import type { SeoPayload } from "@/lib/cms/types";
import { fijiDealToPrismaPackageFields } from "@/lib/cms/deal-mapper";
import { requireCmsAction } from "@/server/auth/cms-action-auth";
import { upsertSeoMeta } from "@/server/services/cms/cms.service";
import {
  createAccommodationCms,
  createDealCms,
  createNavigationItemCms,
  deleteAccommodationCms,
  deleteBannerCms,
  deleteDealCms,
  deleteNavigationItemCms,
  getAccommodationCms,
  reorderNavigationItems,
  updateAccommodationCms,
  updateDealCms,
  updateNavigationItemCms,
  upsertAdminStaffProfile,
} from "@/server/services/cms/cms-extended.service";
import { createBanner, updateBanner } from "@/server/services/cms/cms.service";

async function saveSeoExtended(
  entityType: Parameters<typeof upsertSeoMeta>[0],
  entityId: string,
  seo?: SeoPayload,
) {
  if (!seo) return;
  const hasValue = Object.values(seo).some((v) => v !== undefined && v !== null && v !== "");
  if (!hasValue) return;
  await upsertSeoMeta(entityType, entityId, seo);
}

function revalidateAccommodation(slug: string) {
  revalidatePath("/places-to-stay");
  revalidatePath(`/places-to-stay/${slug}`);
  revalidatePath("/");
}

function revalidateDeal(slug: string) {
  revalidatePath("/deals-and-offers");
  revalidatePath(`/deals-and-offers/package-deals/${slug}`);
  revalidatePath("/");
}

function revalidateNavigation() {
  revalidatePath("/", "layout");
}

// ── Banners ─────────────────────────────────────────────────────────────────

export type BannerFormInput = {
  id?: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  position?: string;
  status: ContentStatus;
  sortOrder?: number;
  startsAt?: string | null;
  endsAt?: string | null;
};

export async function saveBannerAction(
  input: BannerFormInput,
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireCmsAction("cms:write");
    const data = {
      title: input.title.trim(),
      subtitle: input.subtitle?.trim() || null,
      imageUrl: input.imageUrl.trim(),
      linkUrl: input.linkUrl?.trim() || null,
      position: input.position ?? "homepage",
      status: input.status,
      sortOrder: input.sortOrder ?? 0,
      startsAt: input.startsAt ? new Date(input.startsAt) : null,
      endsAt: input.endsAt ? new Date(input.endsAt) : null,
    };
    const row = input.id
      ? await updateBanner(input.id, data)
      : await createBanner(data);
    if (!row?.id) return { ok: false, error: "Failed to save banner" };
    revalidatePath("/");
    return { ok: true, data: { id: row.id } };
  } catch (e) {
    return actionError(e);
  }
}

export async function deleteBannerAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    await deleteBannerCms(id);
    revalidatePath("/");
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function publishBannerAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:publish");
    await updateBanner(id, { status: "PUBLISHED" });
    revalidatePath("/");
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

// ── Accommodations ──────────────────────────────────────────────────────────

export type AccommodationFormInput = {
  id?: string;
  title: string;
  slug?: string;
  location: string;
  stars?: number;
  priceFrom?: string;
  overview: string;
  heroImage?: string;
  gallery?: string[];
  amenities?: string[];
  experiences?: string[];
  collection?: string;
  relatedSlugs?: string[];
  featured?: boolean;
  status: ContentStatus;
  sortOrder?: number;
  seo?: SeoPayload;
};

export async function saveAccommodationAction(
  input: AccommodationFormInput,
): Promise<ActionResult<{ id: string; slug: string }>> {
  try {
    await requireCmsAction("cms:write");
    const slug = toSlug(input.slug || input.title);
    if (!slug) return { ok: false, error: "Slug is required" };

    const data = {
      title: input.title.trim(),
      slug,
      location: input.location.trim(),
      stars: input.stars ?? 5,
      priceFrom: input.priceFrom?.trim() || null,
      overview: input.overview.trim(),
      heroImage: input.heroImage?.trim() || null,
      gallery: input.gallery ?? [],
      amenities: input.amenities ?? [],
      experiences: input.experiences ?? [],
      collection: input.collection?.trim() || null,
      relatedSlugs: input.relatedSlugs ?? [],
      featured: input.featured ?? false,
      status: input.status,
      sortOrder: input.sortOrder ?? 0,
    };

    const row = input.id
      ? await updateAccommodationCms(input.id, data as Prisma.AccommodationUpdateInput)
      : await createAccommodationCms(data as Prisma.AccommodationCreateInput);

    if (!row?.id) return { ok: false, error: "Failed to save accommodation" };
    await saveSeoExtended("ACCOMMODATION", row.id, input.seo);
    revalidateAccommodation(slug);
    return { ok: true, data: { id: row.id, slug } };
  } catch (e) {
    return actionError(e);
  }
}

export async function deleteAccommodationAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    await deleteAccommodationCms(id);
    revalidatePath("/places-to-stay");
    revalidatePath("/");
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function publishAccommodationAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:publish");
    const existing = await getAccommodationCms(id);
    await updateAccommodationCms(id, { status: "PUBLISHED" });
    revalidatePath("/places-to-stay");
    revalidatePath("/");
    const slug =
      existing && typeof existing === "object" && "slug" in existing
        ? String((existing as { slug: string }).slug)
        : null;
    if (slug) revalidateAccommodation(slug);
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

// ── Deals ───────────────────────────────────────────────────────────────────

export type DealFormInput = {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  location: string;
  price: string;
  priceNote?: string;
  image?: string;
  category?: "PACKAGE" | "ACCOMMODATION" | "EXPERIENCE";
  includes?: string[];
  featured?: boolean;
  status: ContentStatus;
  sortOrder?: number;
  content?: import("@/lib/cms/deal-content").DealContentJson;
  packageDestination?: string;
  resortName?: string;
  duration?: string;
  travelDates?: string;
  bookBeforeDate?: string;
  bonusValue?: string;
  resortCredit?: string;
  includedFlights?: boolean;
  includedTransfers?: boolean;
  includedMeals?: string;
  includedActivities?: string[];
  packageTags?: string[];
  seo?: SeoPayload;
};

export async function saveDealAction(
  input: DealFormInput,
): Promise<ActionResult<{ id: string; slug: string }>> {
  try {
    await requireCmsAction("cms:write");
    const slug = toSlug(input.slug || input.title);
    if (!slug) return { ok: false, error: "Slug is required" };

    const packageFields =
      input.category === "PACKAGE"
        ? fijiDealToPrismaPackageFields({
            ...input.content,
      destination: input.packageDestination ?? input.content?.destination,
            resortName: input.resortName ?? input.content?.resortName,
            duration: input.duration ?? input.content?.duration,
            travelDates: input.travelDates ?? input.content?.travelDates,
            bookBeforeDate: input.bookBeforeDate ?? input.content?.bookBeforeDate,
            bonusValue: input.bonusValue ?? input.content?.bonusValue,
            resortCredit: input.resortCredit ?? input.content?.resortCredit,
            flightsIncluded: input.includedFlights ?? input.content?.flightsIncluded,
            transfersIncluded: input.includedTransfers ?? input.content?.transfersIncluded,
            packageTags: (input.packageTags ?? input.content?.packageTags) as import("@/lib/content/deals").DealPackageTag[],
          })
        : {};

    const data = {
      title: input.title.trim(),
      slug,
      description: input.description.trim(),
      location: input.location.trim(),
      price: input.price.trim(),
      priceNote: input.priceNote?.trim() || null,
      image: input.image?.trim() || null,
      category: input.category ?? "PACKAGE",
      includes: input.includes ?? [],
      featured: input.featured ?? false,
      status: input.status,
      sortOrder: input.sortOrder ?? 0,
      content: input.content ?? undefined,
      ...packageFields,
    };

    const row = input.id
      ? await updateDealCms(input.id, data as Prisma.DealUpdateInput)
      : await createDealCms(data as Prisma.DealCreateInput);

    if (!row?.id) return { ok: false, error: "Failed to save deal" };
    await saveSeoExtended("DEAL", row.id, input.seo);
    revalidateDeal(slug);
    return { ok: true, data: { id: row.id, slug } };
  } catch (e) {
    return actionError(e);
  }
}

export async function deleteDealAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    await deleteDealCms(id);
    revalidatePath("/deals-and-offers");
    revalidatePath("/");
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function publishDealAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:publish");
    await updateDealCms(id, { status: "PUBLISHED" });
    revalidatePath("/deals-and-offers");
    revalidatePath("/");
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

// ── Navigation ──────────────────────────────────────────────────────────────

export type NavigationFormInput = {
  id?: string;
  label: string;
  href: string;
  description?: string;
  location: "PRIMARY" | "MEGA_MENU" | "FOOTER";
  parentKey?: string;
  icon?: string;
  image?: string;
  featured?: boolean;
  status: ContentStatus;
  sortOrder?: number;
};

export async function saveNavigationAction(
  input: NavigationFormInput,
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireCmsAction("cms:write");
    const data = {
      label: input.label.trim(),
      href: input.href.trim(),
      description: input.description?.trim() || null,
      location: input.location,
      parentKey: input.parentKey?.trim() || null,
      icon: input.icon?.trim() || null,
      image: input.image?.trim() || null,
      featured: input.featured ?? false,
      status: input.status,
      sortOrder: input.sortOrder ?? 0,
    };

    const row = input.id
      ? await updateNavigationItemCms(input.id, data as Prisma.NavigationItemUpdateInput)
      : await createNavigationItemCms(data as Prisma.NavigationItemCreateInput);

    if (!row?.id) return { ok: false, error: "Failed to save navigation item" };
    revalidateNavigation();
    return { ok: true, data: { id: row.id } };
  } catch (e) {
    return actionError(e);
  }
}

export async function deleteNavigationAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    await deleteNavigationItemCms(id);
    revalidateNavigation();
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function reorderNavigationAction(
  items: { id: string; sortOrder: number }[],
): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    await reorderNavigationItems(items);
    revalidateNavigation();
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

// ── Staff roles ─────────────────────────────────────────────────────────────

export async function assignStaffRoleAction(input: {
  userId: string;
  staffRole: AdminStaffRole;
}): Promise<ActionResult> {
  try {
    await requireCmsAction("settings:write");
    await upsertAdminStaffProfile(input.userId, input.staffRole);
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export { listToLines, linesToList };
