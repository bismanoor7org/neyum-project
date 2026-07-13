import type { Destination, Experience, Guide, Resort } from "@/lib/content/types";
import type { FijiDeal } from "@/lib/content/deals";
import type { Locale } from "@/lib/i18n/messages";
import { mergeContent } from "./merge-content";
import { allContentPacks } from "./packs";
import type { ContentLocale } from "./types";

function isContentLocale(locale: Locale): locale is ContentLocale {
  return locale !== "en" && locale in allContentPacks;
}

export function localizeGuideCategory(category: string, locale: Locale): string {
  if (!isContentLocale(locale)) return category;
  return allContentPacks[locale]?.guideCategories?.[category] ?? category;
}

export function localizeGuide(guide: Guide, locale: Locale): Guide {
  if (!isContentLocale(locale)) return guide;
  const pack = allContentPacks[locale]?.guides[guide.slug];
  if (!pack) return guide;

  const merged = mergeContent(guide, pack);
  merged.category = pack.category
    ? pack.category
    : localizeGuideCategory(guide.category, locale);
  return merged;
}

export function localizeDestination(
  destination: Destination,
  locale: Locale,
): Destination {
  if (!isContentLocale(locale)) return destination;
  const pack = allContentPacks[locale]?.destinations[destination.slug];
  if (!pack) return destination;
  return mergeContent(destination, pack);
}

export function localizeExperience(
  experience: Experience,
  locale: Locale,
): Experience {
  if (!isContentLocale(locale)) return experience;
  const pack = allContentPacks[locale]?.experiences[experience.slug];
  if (!pack) return experience;
  return mergeContent(experience, pack);
}

export function localizeDeal(deal: FijiDeal, locale: Locale): FijiDeal {
  if (!isContentLocale(locale)) return deal;
  const pack = allContentPacks[locale]?.deals[deal.slug];
  if (!pack) return deal;
  return mergeContent(deal, pack);
}

export function localizeResort(resort: Resort, locale: Locale): Resort {
  if (!isContentLocale(locale)) return resort;
  const pack = allContentPacks[locale]?.resorts[resort.slug];
  if (!pack) return resort;
  return mergeContent(resort, pack);
}

export {
  CONTENT_DESTINATION_SLUGS,
  CONTENT_GUIDE_SLUGS,
} from "./packs/slugs";
