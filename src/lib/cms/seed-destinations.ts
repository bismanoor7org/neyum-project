import type { ContentStatus } from "@prisma/client";
import type { DestinationContentJson } from "@/lib/cms/destination-content";
import { destinations as staticDestinations } from "@/lib/content/destinations";
import type { Destination } from "@/lib/content/types";

export type DestinationCmsSeedRecord = {
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  excerpt: string | null;
  heroImage: string | null;
  gallery: string[];
  featured: boolean;
  status: ContentStatus;
  sortOrder: number;
  content: DestinationContentJson;
  highlights: string[];
  latitude?: number | null;
  longitude?: number | null;
};

/** Approximate map coordinates for seeded destinations */
const COORDS: Record<string, { latitude: number; longitude: number }> = {
  nadi: { latitude: -17.7765, longitude: 177.4356 },
  denarau: { latitude: -17.7734, longitude: 177.3762 },
  "coral-coast": { latitude: -18.1416, longitude: 177.5069 },
  mamanuca: { latitude: -17.6752, longitude: 177.1973 },
  yasawa: { latitude: -16.7588, longitude: 177.4127 },
  taveuni: { latitude: -16.9512, longitude: -179.8677 },
  "pacific-harbour": { latitude: -18.2603, longitude: 178.0665 },
  suva: { latitude: -18.1416, longitude: 178.4419 },
  "vanua-levu": { latitude: -16.6268, longitude: 179.0122 },
  kadavu: { latitude: -19.0536, longitude: 178.1569 },
  savusavu: { latitude: -16.7798, longitude: 179.3382 },
};

function mapStaticDestination(dest: Destination, index: number): DestinationCmsSeedRecord {
  const content: DestinationContentJson = {
    region: dest.region,
    cardImage: dest.cardImage,
    listHighlights: dest.highlights,
    thingsToDo: dest.thingsToDo,
    placesToStay: dest.placesToStay,
    tours: dest.tours,
    beaches: dest.beaches,
    dining: dest.dining,
    transport: dest.transport,
    culture: dest.culture,
    weather: dest.weather,
    bestTimeToVisit: dest.bestTimeToVisit ?? dest.weather,
    travelTips: dest.travelTips ?? [],
    faqs: dest.faqs,
    relatedSlugs: dest.relatedSlugs ?? [],
  };

  const coords = COORDS[dest.slug];

  return {
    name: dest.title,
    slug: dest.slug,
    tagline: dest.tagline || null,
    description: dest.overview || null,
    excerpt: (dest.description ?? dest.overview).slice(0, 500) || null,
    heroImage: dest.heroImage || null,
    gallery: dest.gallery ?? (dest.cardImage ? [dest.cardImage] : []),
    featured: index < 5,
    status: "PUBLISHED",
    sortOrder: index + 1,
    content,
    highlights: dest.highlights,
    latitude: coords?.latitude ?? null,
    longitude: coords?.longitude ?? null,
  };
}

export function buildDestinationCmsSeedRecords(): DestinationCmsSeedRecord[] {
  return staticDestinations.map(mapStaticDestination);
}

export const DESTINATIONS_HUB_DEFAULTS = {
  key: "destinations_hub",
  title: "Choose your Fiji address",
  content: {
    eyebrow: "Luxury marketplace",
    title: "Choose your Fiji address",
    subtitle:
      "Every destination connects to curated experiences, resorts, packages and private transfers.",
  },
  status: "PUBLISHED" as ContentStatus,
  sortOrder: 0,
};
