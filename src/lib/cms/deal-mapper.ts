import type { DealCategory as PrismaDealCategory } from "@prisma/client";
import type { DealContentJson } from "@/lib/cms/deal-content";
import type { DealCategory, FijiDeal } from "@/lib/content/deals";

const CATEGORY_MAP: Record<PrismaDealCategory, DealCategory> = {
  PACKAGE: "Package Deals",
  ACCOMMODATION: "Accommodation",
  EXPERIENCE: "Experiences",
};

type DealRow = {
  slug: string;
  title: string;
  description: string;
  location: string;
  price: string;
  priceNote?: string | null;
  image?: string | null;
  category: PrismaDealCategory;
  includes?: string[];
  featured?: boolean;
  content?: DealContentJson | null;
  packageDestination?: string | null;
  resortName?: string | null;
  duration?: string | null;
  travelDates?: string | null;
  bookBeforeDate?: string | null;
  bonusValue?: string | null;
  resortCredit?: string | null;
  includedFlights?: boolean;
  includedTransfers?: boolean;
  includedMeals?: string | null;
  includedActivities?: string[];
  packageTags?: string[];
};

function mealsToFlags(meals: string | null | undefined) {
  const normalized = meals?.toLowerCase() ?? "";
  return {
    breakfastIncluded:
      normalized.includes("breakfast") || normalized === "half_board",
    allInclusive: normalized.includes("all inclusive") || normalized === "all_inclusive",
  };
}

export function prismaDealToFijiDeal(row: DealRow): FijiDeal {
  const content = (row.content ?? {}) as DealContentJson;
  const mealFlags = mealsToFlags(row.includedMeals);
  const packageDetail = content.packageDetail ?? {};

  if (row.includedActivities?.length && !packageDetail.activities?.length) {
    packageDetail.activities = row.includedActivities;
  }

  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    location: row.location,
    price: row.price,
    priceNote: row.priceNote ?? undefined,
    image: row.image ?? "",
    category: CATEGORY_MAP[row.category],
    featured: row.featured,
    includes: row.includes ?? [],
    destination: row.packageDestination ?? content.destination ?? row.location,
    resortName: row.resortName ?? content.resortName,
    duration: row.duration ?? content.duration,
    travelDates: row.travelDates ?? content.travelDates,
    bookBeforeDate: row.bookBeforeDate ?? content.bookBeforeDate ?? content.bookBefore,
    bookBefore: row.bookBeforeDate ?? content.bookBefore,
    nights: content.nights,
    flightsIncluded: row.includedFlights ?? content.flightsIncluded,
    transfersIncluded: row.includedTransfers ?? content.transfersIncluded,
    breakfastIncluded: mealFlags.breakfastIncluded || content.breakfastIncluded,
    allInclusive: mealFlags.allInclusive || content.allInclusive,
    kidsStayFree: content.kidsStayFree,
    kidsEatFree: content.kidsEatFree,
    familyPackage: content.familyPackage,
    honeymoonPackage: content.honeymoonPackage,
    luxuryCollection: content.luxuryCollection,
    freeCancellation: content.freeCancellation,
    instantConfirmation: content.instantConfirmation,
    travelWindow: content.travelWindow,
    urgency: content.urgency,
    spotsLeft: content.spotsLeft,
    packageTags: (row.packageTags?.length
      ? row.packageTags
      : content.packageTags) as FijiDeal["packageTags"],
    verifiedSupplier: content.verifiedSupplier,
    trustTags: content.trustTags,
    rating: content.rating,
    reviewCount: content.reviewCount,
    originalPrice: content.originalPrice,
    discountLabel: content.discountLabel,
    resortCredit: row.resortCredit ?? content.resortCredit,
    bonusValue: row.bonusValue ?? content.bonusValue,
    valueBlock: content.valueBlock,
    complimentaryActivities: content.complimentaryActivities,
    complimentaryTransfers: content.complimentaryTransfers,
    freeExcursions: content.freeExcursions,
    highlights: content.highlights ?? packageDetail.highlights,
    packageDetail,
    ctaPrimary: content.ctaPrimary,
    ctaSecondary: content.ctaSecondary,
  };
}

export function fijiDealToPrismaPackageFields(
  content: DealContentJson = {},
): Pick<
  DealRow,
  | "packageDestination"
  | "resortName"
  | "duration"
  | "travelDates"
  | "bookBeforeDate"
  | "bonusValue"
  | "resortCredit"
  | "includedFlights"
  | "includedTransfers"
  | "includedMeals"
  | "includedActivities"
  | "packageTags"
> {
  let includedMeals: string | null = null;
  if (content.allInclusive) includedMeals = "all_inclusive";
  else if (content.breakfastIncluded) includedMeals = "breakfast";

  const includedActivities =
    content.packageDetail?.activities ??
    content.valueBlock?.includedExperiences ??
  [];

  return {
    packageDestination: content.destination ?? null,
    resortName: content.resortName ?? null,
    duration: content.duration ?? (content.nights ? `${content.nights} nights` : null),
    travelDates: content.travelDates ?? content.travelWindow ?? null,
    bookBeforeDate: content.bookBeforeDate ?? content.bookBefore ?? null,
    bonusValue: content.bonusValue ?? content.valueBlock?.bonusValue ?? null,
    resortCredit: content.resortCredit ?? content.valueBlock?.resortCredit ?? null,
    includedFlights: content.flightsIncluded ?? false,
    includedTransfers: content.transfersIncluded ?? false,
    includedMeals,
    includedActivities,
    packageTags: content.packageTags ?? [],
  };
}
