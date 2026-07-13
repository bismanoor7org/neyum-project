import { dealCategorySlugs } from "@/lib/content/deals";
import { getDestinationSlugs } from "@/lib/content/destinations";
import { getExperienceSlugs } from "@/lib/content/experiences";
import { getGuideSlugs } from "@/lib/content/guides";
import { getResortSlugs } from "@/lib/content/resorts";
import { getWorldCountry, getWorldCountrySlugs } from "@/lib/content/world";
import { SITE_URL } from "./config";

export interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

const DEAL_CATEGORIES = Object.values(dealCategorySlugs);

/** All indexable public routes for sitemap generation */
export function getPublicSitemapEntries(): SitemapEntry[] {
  const now = new Date();
  const entries: SitemapEntry[] = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/places-to-go`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/things-to-do`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/places-to-stay`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/guides`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/deals-and-offers`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/events`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/itineraries`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/things-to-know`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/explore`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/explore-map`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/search`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/sitemap`, changeFrequency: "monthly", priority: 0.3 },
  ];

  for (const slug of getDestinationSlugs()) {
    entries.push({
      url: `${SITE_URL}/places-to-go/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  for (const slug of getExperienceSlugs()) {
    entries.push({
      url: `${SITE_URL}/things-to-do/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const slug of getResortSlugs()) {
    entries.push({
      url: `${SITE_URL}/places-to-stay/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const slug of getGuideSlugs()) {
    entries.push({
      url: `${SITE_URL}/guides/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const category of DEAL_CATEGORIES) {
    entries.push({
      url: `${SITE_URL}/deals-and-offers/${category}`,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  for (const slug of getWorldCountrySlugs()) {
    entries.push({
      url: `${SITE_URL}/explore/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
    });
    const country = getWorldCountry(slug);
    if (country) {
      for (const city of country.cities) {
        entries.push({
          url: `${SITE_URL}/explore/${slug}/${city.slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.45,
        });
      }
    }
  }

  return entries;
}

/** Guide category clusters for blog-style SEO architecture */
export const guideSeoClusters = {
  planning: ["first-time-fiji", "visa-guide", "best-time-to-visit", "weather-guide", "transportation", "travel-planning"],
  style: ["luxury-travel", "honeymoon", "family-travel", "wellness", "culture", "food-drink"],
  activities: ["adventure", "diving", "surfing", "island-hopping"],
} as const;

export const guideCategorySeo: Record<string, { label: string; description: string }> = {
  Planning: {
    label: "Fiji Travel Planning Guides",
    description: "Visas, seasons, weather, transport and first-time Fiji essentials.",
  },
  Style: {
    label: "Fiji Luxury & Lifestyle Guides",
    description: "Honeymoon, family, wellness, culture and food & drink in Fiji.",
  },
  Activities: {
    label: "Fiji Adventure & Activity Guides",
    description: "Diving, surfing, adventure and island hopping across Fiji.",
  },
};
