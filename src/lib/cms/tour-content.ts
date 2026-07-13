import type { FAQItem } from "@/lib/content/types";

export type TourContentJson = {
  location?: string;
  category?: string;
  ages?: string;
  priceFrom?: string;
  highlights?: string[];
  included?: string[];
  itinerary?: string[];
  faqs?: FAQItem[];
  relatedSlugs?: string[];
};

export const defaultTourContent = (): TourContentJson => ({
  location: "",
  category: "Experience",
  ages: "All ages",
  highlights: [],
  included: [],
  itinerary: [],
  faqs: [],
  relatedSlugs: [],
});

/** CMS status labels mapped to TourStatus */
export const TOUR_CMS_STATUS = [
  { value: "DRAFT", label: "Draft" },
  { value: "APPROVED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
] as const;

export type TourCmsStatus = (typeof TOUR_CMS_STATUS)[number]["value"];
