import type { ContentSection, FAQItem } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/messages";

/** All non-English locales with content translations */
export type ContentLocale = Exclude<Locale, "en">;

export type GuideContentPack = {
  title: string;
  excerpt: string;
  category?: string;
  overview?: string;
  sections?: ContentSection[];
  faqs?: FAQItem[];
};

export type DestinationContentPack = {
  title: string;
  tagline: string;
  overview?: string;
  highlights?: string[];
  thingsToDo?: string[];
  placesToStay?: string[];
  tours?: string[];
  beaches?: string[];
  dining?: string[];
  transport?: string[];
  culture?: string[];
  weather?: string;
  faqs?: FAQItem[];
};

export type ExperienceContentPack = {
  title: string;
  category?: string;
  duration?: string;
  ages?: string;
  overview?: string;
  highlights?: string[];
  included?: string[];
  itinerary?: string[];
  faqs?: FAQItem[];
};

export type DealContentPack = {
  title: string;
  description: string;
  includes?: string[];
};

export type ResortContentPack = {
  title: string;
  overview?: string;
  amenities?: string[];
  experiences?: string[];
};

export type LocaleContentPack = {
  guideCategories?: Record<string, string>;
  guides: Record<string, GuideContentPack>;
  destinations: Record<string, DestinationContentPack>;
  experiences: Record<string, ExperienceContentPack>;
  deals: Record<string, DealContentPack>;
  resorts: Record<string, ResortContentPack>;
};
