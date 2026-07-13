/** Curated knowledge-hub taxonomy — four editorial pillars */
export const guideHubCategories = [
  {
    key: "visaEntry",
    slugs: ["visa-guide", "first-time-fiji"],
  },
  {
    key: "exploreFiji",
    slugs: ["culture", "food-drink", "adventure", "diving", "surfing", "island-hopping"],
  },
  {
    key: "travelPlanning",
    slugs: ["travel-planning", "best-time-to-visit", "weather-guide", "transportation"],
  },
  {
    key: "travelAdvice",
    slugs: ["luxury-travel", "honeymoon", "family-travel", "wellness"],
  },
] as const;

export type GuideHubCategoryKey = (typeof guideHubCategories)[number]["key"];

export const featuredGuideSlug = "visa-guide";
