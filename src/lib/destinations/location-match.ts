/** Keywords used to match marketplace entities to destination slugs */
export const DESTINATION_LOCATION_KEYWORDS: Record<string, string[]> = {
  nadi: ["nadi", "denarau", "sabeto", "wailoaloa", "sleeping giant"],
  denarau: ["denarau"],
  "coral-coast": ["coral coast", "natadola", "sigatoka", "korotogo"],
  mamanuca: ["mamanuca"],
  yasawa: ["yasawa"],
  suva: ["suva"],
  "pacific-harbour": ["pacific harbour", "pacific harbor"],
  taveuni: ["taveuni"],
  savusavu: ["savusavu"],
  "vanua-levu": ["vanua levu", "savusavu", "labasa"],
  kadavu: ["kadavu"],
  "beqa-island": ["beqa"],
  "mana-island": ["mana island", "mana"],
  "malolo-island": ["malolo"],
  "tokoriki-island": ["tokoriki"],
};

const SLUG_ALIASES: Record<string, string> = {
  "mamanuca-islands": "mamanuca",
  "yasawa-islands": "yasawa",
};

export function normalizeDestinationSlug(slug: string): string {
  return SLUG_ALIASES[slug] ?? slug;
}

export function locationMatchesDestination(
  location: string | null | undefined,
  destinationSlug: string,
): boolean {
  if (!location?.trim()) return false;
  const slug = normalizeDestinationSlug(destinationSlug);
  const keywords = DESTINATION_LOCATION_KEYWORDS[slug];
  if (!keywords?.length) return false;
  const haystack = location.toLowerCase();
  return keywords.some((kw) => haystack.includes(kw));
}

/** Match marketplace rows by location and/or destination label (e.g. deal.destination). */
export function marketplaceEntityMatchesDestination(
  fields: { location?: string | null; destination?: string | null },
  destinationSlug: string,
): boolean {
  return (
    locationMatchesDestination(fields.location, destinationSlug) ||
    locationMatchesDestination(fields.destination, destinationSlug)
  );
}

export function parsePriceAmount(price: string | null | undefined): number | null {
  if (!price?.trim()) return null;
  const digits = price.replace(/[^\d.]/g, "");
  const n = Number.parseFloat(digits);
  return Number.isFinite(n) ? n : null;
}

export function formatStartingPrice(amount: number | null, currency = "FJD"): string | null {
  if (amount == null || amount <= 0) return null;
  return `${currency} ${Math.round(amount).toLocaleString("en-US")}`;
}
