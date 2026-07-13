import type { MetadataRoute } from "next";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { SITE_URL } from "@/lib/seo/config";
import {
  getDestinationSlugs,
  getExperienceSlugs,
  getGuideSlugs,
} from "@/server/services/public-content.service";
import { getAllCountrySlugs } from "@/server/services/visa-intelligence.service";

/** Dynamic sitemap — every published CMS slug gets indexed automatically */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [destinations, tours, guides] = await Promise.all([
    getDestinationSlugs(),
    getExperienceSlugs(),
    getGuideSlugs(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}${CMS_ROUTES.destinations.index}`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}${CMS_ROUTES.tours.index}`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}${CMS_ROUTES.guides.index}`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}${CMS_ROUTES.faq}`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/ai-fiji-visa-assistant`, changeFrequency: "weekly", priority: 0.9 },
  ];

  let visaSlugs: string[] = [];
  try {
    visaSlugs = await getAllCountrySlugs();
  } catch {
    visaSlugs = [];
  }

  const visaCountryEntries = visaSlugs.map((slug) => ({
    url: `${SITE_URL}/fiji-visa-for-${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.82,
  }));

  const destinationEntries = destinations.map((slug) => ({
    url: `${SITE_URL}${CMS_ROUTES.destinations.detail(slug)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const tourEntries = tours.map((slug) => ({
    url: `${SITE_URL}${CMS_ROUTES.tours.detail(slug)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const guideEntries = guides.map((slug) => ({
    url: `${SITE_URL}${CMS_ROUTES.guides.detail(slug)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...visaCountryEntries,
    ...destinationEntries,
    ...tourEntries,
    ...guideEntries,
  ];
}
