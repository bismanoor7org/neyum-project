import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { buildPageMetadata } from "./metadata";

const experienceKeywords: Record<string, string[]> = {
  "snorkelling-crystal-waters": [
    "Fiji snorkelling",
    "Mamanuca snorkelling",
    "Fiji diving experiences",
    "things to do in Fiji",
  ],
  "sunset-cruises": [
    "Fiji sunset cruise",
    "Denarau sailing",
    "Fiji island hopping",
    "things to do in Fiji",
  ],
  "hiking-waterfalls": [
    "Taveuni waterfalls",
    "Fiji adventure tours",
    "Bouma National Heritage Park",
    "things to do in Fiji",
  ],
  "village-tours": [
    "Fiji cultural experiences",
    "Fijian village tour",
    "Coral Coast culture",
    "things to do in Fiji",
  ],
  "island-hopping": [
    "Fiji island hopping",
    "Mamanuca Yasawa tour",
    "Fiji luxury travel",
    "Fiji island vacations",
  ],
};

const experienceAlts: Record<string, string> = {
  "snorkelling-crystal-waters": "Snorkelling in crystal waters Mamanuca Islands Fiji",
  "sunset-cruises": "Luxury sunset cruise Denarau Marina Fiji",
  "hiking-waterfalls": "Tavoro waterfalls hiking Taveuni Fiji Garden Island",
  "village-tours": "Traditional Fijian village tour Coral Coast Fiji",
  "island-hopping": "Fiji island hopping Mamanuca and Yasawa luxury adventure",
};

export function getExperienceMetadata(exp: {
  slug: string;
  title: string;
  overview: string;
  heroImage: string;
  location: string;
  category: string;
}) {
  return buildPageMetadata({
    title: `${exp.title} in Fiji — ${exp.location} Luxury Experience`,
    description: exp.overview,
    path: CMS_ROUTES.tours.detail(exp.slug),
    keywords: experienceKeywords[exp.slug] ?? [
      "things to do in Fiji",
      "Fiji luxury travel",
      exp.category.toLowerCase(),
    ],
    image: exp.heroImage,
    imageAlt: experienceAlts[exp.slug] ?? `${exp.title} Fiji luxury experience`,
    type: "article",
  });
}

export function getGuideMetadata(guide: {
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
  category: string;
}) {
  const categoryKeywords: Record<string, string[]> = {
    Planning: ["Fiji travel guide", "Fiji travel planning", "visiting Fiji"],
    Style: ["Fiji luxury travel", "Fiji honeymoon packages", "Fiji family holidays"],
    Activities: ["Fiji adventure tours", "Fiji diving guide", "Fiji island hopping"],
  };

  return buildPageMetadata({
    title: `${guide.title} — Fiji Travel Guide`,
    description: guide.excerpt,
    path: `/guides/${guide.slug}`,
    keywords: [
      "Fiji travel guide",
      ...(categoryKeywords[guide.category] ?? []),
      guide.title,
    ],
    image: guide.heroImage,
    imageAlt: `${guide.title} Fiji travel guide luxury planning`,
    type: "article",
  });
}

export function getExperienceHeroAlt(slug: string, title: string) {
  return experienceAlts[slug] ?? `${title} Fiji luxury experience`;
}

export function getGuideHeroAlt(slug: string, title: string) {
  return `${title} Fiji travel guide luxury planning`;
}

export function getResortHeroAlt(slug: string, title: string, location: string) {
  return `${title} Fiji luxury resort ${location}`;
}

export function getExploreCountryMetadata(country: {
  slug: string;
  name: string;
  overview: string;
  heroImage?: string;
}) {
  return buildPageMetadata({
    title: `${country.name} Luxury Travel Guide — Destinations & Experiences`,
    description: country.overview,
    path: `/explore/${country.slug}`,
    keywords: [
      `${country.name} luxury travel`,
      `${country.name} travel guide`,
      "luxury destinations",
      "Fiji luxury travel",
    ],
    image: country.heroImage,
    imageAlt: `${country.name} luxury travel destination`,
  });
}

export function getResortMetadata(resort: {
  slug: string;
  title: string;
  overview: string;
  heroImage: string;
  location: string;
}) {
  return buildPageMetadata({
    title: `${resort.title} — Fiji Luxury Resort & Accommodation`,
    description: resort.overview,
    path: CMS_ROUTES.stays.detail(resort.slug),
    keywords: [
      "Fiji resorts",
      "Fiji luxury accommodation",
      resort.location,
      "Fiji honeymoon packages",
    ],
    image: resort.heroImage,
    imageAlt: `${resort.title} Fiji luxury resort ${resort.location}`,
  });
}
