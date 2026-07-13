import { FIJI_GLOBE_DESTINATIONS } from "@/lib/fiji-globe-data";
import type { BookingDestination } from "@/lib/booking/types";

/** Popular destinations surface first in suggestions */
const POPULAR_RANK: Record<string, number> = {
  denarau: 1,
  mamanuca: 2,
  yasawa: 3,
  "coral-coast": 4,
  nadi: 5,
  taveuni: 6,
  "pacific-harbour": 7,
  suva: 8,
  "vanua-levu": 9,
  kadavu: 10,
};

export const BOOKING_DESTINATIONS: BookingDestination[] = FIJI_GLOBE_DESTINATIONS.map(
  (d) => {
    const rank = POPULAR_RANK[d.slug];
    return {
      slug: d.slug,
      title: d.title,
      tagline: d.tagline,
      popular: rank !== undefined,
      popularRank: rank ?? 99,
    };
  },
).sort((a, b) => a.popularRank - b.popularRank);

export function searchBookingDestinations(query: string, limit = 8): BookingDestination[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return BOOKING_DESTINATIONS.filter((d) => d.popular).slice(0, limit);
  }

  const scored = BOOKING_DESTINATIONS.map((d) => {
    const title = d.title.toLowerCase();
    const slug = d.slug.replace(/-/g, " ");
    const tagline = d.tagline.toLowerCase();
    let score = 0;

    if (title === q || slug === q) score += 100;
    else if (title.startsWith(q) || slug.startsWith(q)) score += 80;
    else if (title.includes(q) || slug.includes(q) || tagline.includes(q)) score += 50;

    if (d.popular) score += 20 - d.popularRank;

    return { d, score };
  })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ d }) => d);
}

export function getBookingDestination(slug: string) {
  return BOOKING_DESTINATIONS.find((d) => d.slug === slug);
}

export const EXPERIENCE_TYPES = [
  "Snorkelling & diving",
  "Sunset cruises",
  "Cultural village tours",
  "Island hopping",
  "Spa & wellness",
  "Adventure & hiking",
  "Private yacht charter",
  "Helicopter tours",
  "Golf & leisure",
  "Honeymoon experiences",
] as const;

export const PACKAGE_STYLES = [
  "Honeymoon escape",
  "Family adventure",
  "Island-hopping",
  "Luxury wellness retreat",
  "Diving expedition",
  "All-inclusive resort",
  "Bespoke multi-island",
  "Celebration & milestone",
] as const;

export function searchExperienceTypes(query: string, limit = 8): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...EXPERIENCE_TYPES].slice(0, limit);
  return EXPERIENCE_TYPES.filter((e) => e.toLowerCase().includes(q)).slice(0, limit);
}

export function searchPackageStyles(query: string, limit = 8): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...PACKAGE_STYLES].slice(0, limit);
  return PACKAGE_STYLES.filter((p) => p.toLowerCase().includes(q)).slice(0, limit);
}

/** Map destination slug to resort location filters */
export const DESTINATION_LOCATION_MAP: Record<string, string[]> = {
  nadi: ["Nadi", "Denarau"],
  denarau: ["Denarau"],
  "coral-coast": ["Coral Coast"],
  mamanuca: ["Mamanuca"],
  yasawa: ["Yasawa"],
  suva: ["Suva"],
  "pacific-harbour": ["Pacific Harbour", "Coral Coast"],
  taveuni: ["Taveuni"],
  "vanua-levu": ["Vanua Levu", "Savusavu"],
  kadavu: ["Kadavu"],
};
