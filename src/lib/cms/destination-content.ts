import type { FAQItem } from "@/lib/content/types";

/** Extended destination fields stored in Prisma `content` Json column */
export type DestinationContentJson = {
  region?: "mainland" | "islands";
  cardImage?: string;
  listHighlights?: string[];
  thingsToDo?: string[];
  placesToStay?: string[];
  tours?: string[];
  beaches?: string[];
  dining?: string[];
  transport?: string[];
  culture?: string[];
  weather?: string;
  bestTimeToVisit?: string;
  travelTips?: string[];
  faqs?: FAQItem[];
  relatedSlugs?: string[];
};

export const defaultDestinationContent = (): DestinationContentJson => ({
  region: "islands",
  listHighlights: [],
  thingsToDo: [],
  placesToStay: [],
  tours: [],
  beaches: [],
  dining: [],
  transport: [],
  culture: [],
  weather: "",
  bestTimeToVisit: "",
  travelTips: [],
  faqs: [],
  relatedSlugs: [],
});
