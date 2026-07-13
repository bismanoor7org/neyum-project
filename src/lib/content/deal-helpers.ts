import type {
  DealInclusionKind,
  DealPackageDetail,
  DealPackageTag,
  DealTrustKind,
  DealUrgencyKind,
  DealValueBlock,
  FijiDeal,
} from "@/lib/content/deals";

function uniqueStrings(items: string[]): string[] {
  return [...new Set(items.map((s) => s.trim()).filter(Boolean))];
}

export function packageDealHref(slug: string) {
  return `/deals-and-offers/package-deals/${slug}`;
}

export function formatDealDuration(deal: FijiDeal): string | null {
  if (deal.duration) return deal.duration;
  if (deal.nights) return `${deal.nights} nights`;
  return null;
}

export function getDealTravelDates(deal: FijiDeal): string | undefined {
  return deal.travelDates ?? deal.packageDetail?.travelDates ?? deal.travelWindow;
}

export function getDealBookBefore(deal: FijiDeal): string | undefined {
  return deal.bookBeforeDate ?? deal.bookBefore;
}

export function getDealValueBlock(deal: FijiDeal): DealValueBlock | null {
  const block: DealValueBlock = {};
  const bonus = deal.valueBlock?.bonusValue ?? deal.bonusValue;
  const credit = deal.valueBlock?.resortCredit ?? deal.resortCredit;
  const tours =
    deal.valueBlock?.includedTours ??
    (deal.freeExcursions ? [deal.freeExcursions] : undefined);
  const experiences =
    deal.valueBlock?.includedExperiences ??
    (deal.complimentaryActivities ? [deal.complimentaryActivities] : undefined);
  const transport =
    deal.valueBlock?.includedTransportation ?? deal.packageDetail?.transportation;

  if (bonus) block.bonusValue = bonus;
  if (credit) block.resortCredit = credit;
  if (tours?.length) block.includedTours = tours;
  if (experiences?.length) block.includedExperiences = experiences;
  if (transport?.length) block.includedTransportation = transport;

  return Object.keys(block).length > 0 ? block : null;
}

export function getDealInclusionBadges(deal: FijiDeal): DealInclusionKind[] {
  const badges: DealInclusionKind[] = [];
  if (deal.flightsIncluded) badges.push("flightsIncluded");
  if (deal.transfersIncluded) badges.push("airportTransfersIncluded");
  if (deal.breakfastIncluded) badges.push("breakfastIncluded");
  if (deal.allInclusive) badges.push("allInclusive");
  if (deal.kidsStayFree) badges.push("kidsStayFree");
  if (deal.kidsEatFree) badges.push("kidsEatFree");
  if (deal.complimentaryActivities) badges.push("complimentaryActivities");
  if (deal.freeExcursions) badges.push("freeExcursions");
  if (deal.familyPackage) badges.push("familyPackage");
  if (deal.honeymoonPackage) badges.push("honeymoonPackage");
  if (deal.luxuryCollection) badges.push("luxuryCollection");
  return badges;
}

export function getDealPackageTags(deal: FijiDeal): DealPackageTag[] {
  const tags = new Set<DealPackageTag>(deal.packageTags ?? []);
  if (deal.luxuryCollection) tags.add("luxuryEscape");
  if (deal.familyPackage) tags.add("familyFavourite");
  if (deal.honeymoonPackage) tags.add("honeymoonCollection");
  if (deal.trustTags?.includes("bestSeller")) tags.add("bestSeller");
  if (deal.urgency === "limitedTime") tags.add("limitedTimeOffer");
  if (deal.featured) tags.add("exclusiveDeal");
  if (deal.urgency === "mostPopular") tags.add("mostBooked");
  return [...tags];
}

export function getDealTrustTags(deal: FijiDeal): DealTrustKind[] {
  const tags = new Set<DealTrustKind>(deal.trustTags ?? []);
  if (deal.verifiedSupplier) tags.add("verifiedPartner");
  if (deal.rating && deal.rating >= 4.85) tags.add("highlyRated");
  return [...tags];
}

export const DEAL_CARD_MAX_BADGES = 2;
export const DEAL_CARD_MAX_FEATURE_TAGS = DEAL_CARD_MAX_BADGES;
export const DEAL_CARD_MAX_TRUST_BADGES = 0;
export const DEAL_CARD_MAX_INCLUSION_BADGES = DEAL_CARD_MAX_BADGES;
export const DEAL_CARD_MAX_VALUE_ITEMS = 1;

const PACKAGE_TAG_PRIORITY: DealPackageTag[] = [
  "exclusiveDeal",
  "luxuryEscape",
  "limitedTimeOffer",
  "bestSeller",
  "mostBooked",
  "honeymoonCollection",
  "familyFavourite",
];

function packageTagPriority(tag: DealPackageTag): number {
  const index = PACKAGE_TAG_PRIORITY.indexOf(tag);
  return index === -1 ? PACKAGE_TAG_PRIORITY.length : index;
}

const INCLUSION_PRIORITY: DealInclusionKind[] = [
  "allInclusive",
  "flightsIncluded",
  "honeymoonPackage",
  "luxuryCollection",
  "breakfastIncluded",
  "airportTransfersIncluded",
  "complimentaryActivities",
  "freeExcursions",
  "familyPackage",
  "kidsStayFree",
  "kidsEatFree",
];

function inclusionPriority(kind: DealInclusionKind): number {
  const index = INCLUSION_PRIORITY.indexOf(kind);
  return index === -1 ? INCLUSION_PRIORITY.length : index;
}

export type DealCardBadge =
  | { kind: "package"; value: DealPackageTag }
  | { kind: "inclusion"; value: DealInclusionKind };

/** Card grid — two highest-priority badges; secondary badges live on the detail page */
export function getDealCardDisplayBadges(
  deal: FijiDeal,
  options?: { excludePackageTags?: DealPackageTag[] },
): DealCardBadge[] {
  const excluded = new Set(options?.excludePackageTags ?? []);
  const badges: DealCardBadge[] = [];

  const packageTags = getDealPackageTags(deal)
    .filter((tag) => !(deal.urgency === "limitedTime" && tag === "limitedTimeOffer"))
    .filter((tag) => !excluded.has(tag))
    .sort((a, b) => packageTagPriority(a) - packageTagPriority(b));

  for (const tag of packageTags) {
    badges.push({ kind: "package", value: tag });
  }

  const valueBlock = getDealValueBlock(deal);
  const inclusions = getDealInclusionBadges(deal)
    .filter((kind) => {
      if (kind === "flightsIncluded" && deal.flightsIncluded) return false;
      if (
        kind === "airportTransfersIncluded" &&
        (deal.transfersIncluded || deal.complimentaryTransfers)
      ) {
        return false;
      }
      if (kind === "freeExcursions" && valueBlock?.includedTours?.length) return false;
      if (kind === "complimentaryActivities" && valueBlock?.includedExperiences?.length) {
        return false;
      }
      return true;
    })
    .sort((a, b) => inclusionPriority(a) - inclusionPriority(b));

  for (const value of inclusions) {
    badges.push({ kind: "inclusion", value });
  }

  const ranked = badges.sort((a, b) => {
    if (a.kind === "package" && b.kind === "package") {
      return packageTagPriority(a.value) - packageTagPriority(b.value);
    }
    if (a.kind === "inclusion" && b.kind === "inclusion") {
      return inclusionPriority(a.value) - inclusionPriority(b.value);
    }
    if (a.kind === "package" && b.kind === "inclusion") return -1;
    return 1;
  });

  return ranked.slice(0, DEAL_CARD_MAX_BADGES);
}

/** Card grid — dedupe tags already shown in the booking strip or bonus box */
export function getDealCardFeatureTags(deal: FijiDeal): DealPackageTag[] {
  return getDealCardDisplayBadges(deal)
    .filter((badge): badge is { kind: "package"; value: DealPackageTag } => badge.kind === "package")
    .map((badge) => badge.value);
}

export function getDealCardTrustTags(_deal: FijiDeal): DealTrustKind[] {
  return [];
}

export function getDealCardInclusionBadges(deal: FijiDeal): DealInclusionKind[] {
  return getDealCardDisplayBadges(deal)
    .filter(
      (badge): badge is { kind: "inclusion"; value: DealInclusionKind } =>
        badge.kind === "inclusion",
    )
    .map((badge) => badge.value);
}

export type DealCardValueItem = {
  id: string;
  text: string;
  kind: "bonus" | "credit" | "activity" | "transport";
};

/** Card grid — two premium highlights; transport capped at two segments */
export function getDealCardValueItems(deal: FijiDeal): DealCardValueItem[] {
  const block = getDealValueBlock(deal);
  if (!block) return [];

  const items: DealCardValueItem[] = [];

  if (block.bonusValue) {
    items.push({ id: "bonus", text: block.bonusValue, kind: "bonus" });
  }
  if (block.resortCredit) {
    items.push({ id: "credit", text: block.resortCredit, kind: "credit" });
  }

  const activities = [
    ...new Set([...(block.includedTours ?? []), ...(block.includedExperiences ?? [])]),
  ].slice(0, 2);
  if (activities.length && items.length < DEAL_CARD_MAX_VALUE_ITEMS) {
    items.push({ id: "activities", text: activities.join(" · "), kind: "activity" });
  }

  const hasTransferElsewhere =
    deal.transfersIncluded || deal.complimentaryTransfers || deal.flightsIncluded;
  const transport = block.includedTransportation?.slice(0, 2) ?? [];
  if (transport.length && !hasTransferElsewhere && items.length < DEAL_CARD_MAX_VALUE_ITEMS) {
    items.push({ id: "transport", text: transport.join(" · "), kind: "transport" });
  }

  return items.slice(0, DEAL_CARD_MAX_VALUE_ITEMS);
}

export function getDealUrgencyLabel(
  deal: FijiDeal,
  labels: {
    bookBefore: (date: string) => string;
    limitedTime: string;
    limitedAvailability: string;
    mostPopular: string;
    popularThisWeek: string;
    trendingPackage: string;
    packagesRemaining: (n: number) => string;
  },
): string | null {
  const bookBefore = getDealBookBefore(deal);
  if (deal.urgency === "bookBefore" && bookBefore) {
    return labels.bookBefore(bookBefore);
  }
  if (deal.urgency === "limitedTime") return labels.limitedTime;
  if (deal.urgency === "limitedAvailability") return labels.limitedAvailability;
  if (deal.urgency === "mostPopular") return labels.mostPopular;
  if (deal.urgency === "popularThisWeek") return labels.popularThisWeek;
  if (deal.urgency === "trendingPackage") return labels.trendingPackage;
  if (deal.urgency === "spotsLeft" && deal.spotsLeft) {
    return labels.packagesRemaining(deal.spotsLeft);
  }
  return null;
}

export const DEAL_PACKAGE_TAG_OPTIONS: DealPackageTag[] = [
  "luxuryEscape",
  "familyFavourite",
  "mostBooked",
  "bestSeller",
  "honeymoonCollection",
  "limitedTimeOffer",
  "exclusiveDeal",
];

export const DEAL_URGENCY_OPTIONS: DealUrgencyKind[] = [
  "bookBefore",
  "limitedTime",
  "limitedAvailability",
  "spotsLeft",
  "mostPopular",
  "popularThisWeek",
  "trendingPackage",
];

const ROOM_KEYWORDS =
  /\b(bure|suite|villa|room|lodge|bungalow|bure|retreat|pavilion|hotel|resort stay)\b/i;

function inferRoomTypes(deal: FijiDeal): string[] {
  const fromIncludes = (deal.includes ?? []).filter((item) => ROOM_KEYWORDS.test(item));
  if (fromIncludes.length > 0) return uniqueStrings(fromIncludes);

  const inferred: string[] = [];
  if (deal.honeymoonPackage) inferred.push("Beachfront bure", "Ocean-view suite");
  else if (deal.familyPackage) inferred.push("Interconnecting family bure", "Garden-view room");
  else if (deal.luxuryCollection) inferred.push("Premium suite", "Beachfront villa");
  else if (deal.resortName) inferred.push("Resort room", "Upgrade options on request");

  return uniqueStrings(inferred);
}

function deriveActivitiesFromDescription(description: string): string[] {
  const withMatch = description.match(/\bwith\s+([^.]+)/i);
  if (!withMatch) return [];

  return uniqueStrings(
    withMatch[1]
      .split(/\s*,\s*|\s+and\s+/i)
      .map((part) => part.replace(/^(plus|including)\s+/i, "").trim())
      .filter((part) => part.length > 2),
  );
}

function defaultExclusions(deal: FijiDeal, existing: string[]): string[] {
  const exclusions = [...existing];
  const has = (pattern: RegExp) => exclusions.some((item) => pattern.test(item));

  if (!deal.flightsIncluded && !has(/flight/i)) {
    exclusions.push("International flights");
  }
  if (!has(/insurance/i)) {
    exclusions.push("Travel insurance");
  }
  if (!deal.allInclusive && !has(/alcohol|beverage|drink/i)) {
    exclusions.push("Alcoholic beverages");
  }

  return uniqueStrings(exclusions);
}

/** Card/list includes — falls back to value block and package flags when `includes` is empty */
export function deriveDealIncludes(deal: FijiDeal): string[] {
  if (deal.includes?.length) return deal.includes;

  const valueBlock = getDealValueBlock(deal);
  const items: string[] = [
    ...(valueBlock?.includedTours ?? []),
    ...(valueBlock?.includedExperiences ?? []),
    ...(valueBlock?.includedTransportation ?? []),
  ];

  if (deal.breakfastIncluded) items.push("Daily breakfast");
  if (deal.allInclusive) items.push("All-inclusive dining & beverages");
  if (deal.flightsIncluded) items.push("Return flights");
  if (deal.transfersIncluded || deal.complimentaryTransfers) {
    items.push("Airport & resort transfers");
  }
  if (valueBlock?.resortCredit) items.push(valueBlock.resortCredit);
  if (valueBlock?.bonusValue) items.push(valueBlock.bonusValue);

  if (items.length === 0) {
    items.push(...deriveActivitiesFromDescription(deal.description));
  }

  return uniqueStrings(items);
}

/** Detail-page highlights — prefers explicit copy, then synthesises from package metadata */
export function deriveDealHighlights(deal: FijiDeal): string[] {
  const explicit = deal.packageDetail?.highlights ?? deal.highlights;
  if (explicit?.length) return explicit;

  const valueBlock = getDealValueBlock(deal);
  const highlights: string[] = [];

  if (deal.nights) {
    const place = deal.destination ?? deal.location;
    highlights.push(`${deal.nights}-night stay in ${place}`);
  }
  if (deal.flightsIncluded) highlights.push("Return flights included");
  if (deal.transfersIncluded || deal.complimentaryTransfers) {
    highlights.push("All transfers included");
  }
  if (valueBlock?.resortCredit) highlights.push(valueBlock.resortCredit);
  if (valueBlock?.bonusValue) highlights.push(valueBlock.bonusValue);
  valueBlock?.includedTours?.slice(0, 2).forEach((tour) => highlights.push(tour));
  valueBlock?.includedExperiences?.slice(0, 2).forEach((exp) => highlights.push(exp));

  if (highlights.length === 0 && deal.description) {
    highlights.push(deal.description);
  }

  return uniqueStrings(highlights).slice(0, 4);
}

/**
 * Full package detail for the Yasawa-style detail page — merges authored `packageDetail`
 * with derived sections so every package deal renders the same rich layout.
 */
export function resolvePackageDetail(deal: FijiDeal): DealPackageDetail {
  const authored = deal.packageDetail ?? {};
  const valueBlock = getDealValueBlock(deal);

  const activities = uniqueStrings([
    ...(authored.activities ?? []),
    ...(valueBlock?.includedTours ?? []),
    ...(valueBlock?.includedExperiences ?? []),
    ...(deal.includes ?? []).filter((item) => !ROOM_KEYWORDS.test(item)),
    ...deriveActivitiesFromDescription(deal.description),
  ]);

  const transportation = uniqueStrings([
    ...(authored.transportation ?? []),
    ...(valueBlock?.includedTransportation ?? []),
  ]);

  if (
    (deal.transfersIncluded || deal.complimentaryTransfers) &&
    !transportation.some((item) => /transfer|pickup|boat|helicopter|seaplane|flight/i.test(item))
  ) {
    transportation.push("Private airport & resort transfers");
  }
  if (
    deal.flightsIncluded &&
    !transportation.some((item) => /flight/i.test(item))
  ) {
    transportation.push("Return flights included");
  }

  const roomTypes = uniqueStrings([
    ...(authored.roomTypes ?? []),
    ...inferRoomTypes(deal),
  ]);

  return {
    overview: authored.overview ?? deal.description,
    travelDates: authored.travelDates ?? getDealTravelDates(deal),
    highlights: deriveDealHighlights(deal),
    activities: activities.length > 0 ? activities : undefined,
    transportation: transportation.length > 0 ? transportation : undefined,
    roomTypes: roomTypes.length > 0 ? roomTypes : undefined,
    exclusions: defaultExclusions(deal, authored.exclusions ?? []),
    faqs: authored.faqs,
  };
}

/** Sensible booking defaults for package detail UI — preserves explicit false */
export function withPackageDealDefaults(deal: FijiDeal): FijiDeal {
  return {
    ...deal,
    freeCancellation: deal.freeCancellation ?? true,
    instantConfirmation: deal.instantConfirmation ?? true,
  };
}
