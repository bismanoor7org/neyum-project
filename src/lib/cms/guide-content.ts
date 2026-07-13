import type { ContentSection, FAQItem } from "@/lib/content/types";

/** Structured guide body stored in Prisma `body` Json column */
export type GuideBodyJson = {
  overview?: string;
  categoryLabel?: string;
  sections?: ContentSection[];
  faqs?: FAQItem[];
  relatedSlugs?: string[];
};

export const defaultGuideBody = (): GuideBodyJson => ({
  overview: "",
  categoryLabel: "Planning",
  sections: [{ title: "Overview", body: "" }],
  faqs: [],
  relatedSlugs: [],
});
