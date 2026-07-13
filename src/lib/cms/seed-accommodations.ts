import type { ContentStatus } from "@prisma/client";
import { resorts as staticResorts } from "@/lib/content/resorts";

export type AccommodationCmsSeedRecord = {
  title: string;
  slug: string;
  location: string;
  stars: number;
  priceFrom: string | null;
  overview: string;
  heroImage: string | null;
  gallery: string[];
  amenities: string[];
  experiences: string[];
  relatedSlugs: string[];
  collection: string | null;
  featured: boolean;
  status: ContentStatus;
  sortOrder: number;
};

export function buildAccommodationCmsSeedRecords(): AccommodationCmsSeedRecord[] {
  return staticResorts.map((resort, index) => ({
    title: resort.title,
    slug: resort.slug,
    location: resort.location,
    stars: resort.stars,
    priceFrom: resort.priceFrom,
    overview: resort.overview,
    heroImage: resort.heroImage,
    gallery: [],
    amenities: resort.amenities,
    experiences: resort.experiences,
    relatedSlugs: resort.relatedSlugs,
    collection: null,
    featured: index < 6,
    status: "PUBLISHED",
    sortOrder: index,
  }));
}
