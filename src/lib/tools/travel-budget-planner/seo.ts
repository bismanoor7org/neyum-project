import { buildPageMetadata } from "@/lib/seo/metadata";

export const TOOL_PATH = "/tools/travel-budget-planner" as const;

export function travelBudgetPlannerMetadata() {
  return buildPageMetadata({
    title: "Travel Budget Planner",
    description:
      "Build a day-by-day Fiji travel budget with live currency conversion — accommodation, dining, tours, and transfers.",
    path: TOOL_PATH,
    keywords: ["Fiji travel budget", "luxury Fiji budget planner"],
    imageAlt: "Fiji travel budget planner",
  });
}

export function travelBudgetPlannerJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Travel Budget Planner",
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      url: `https://www.fijiluxuryexperiences.com${TOOL_PATH}`,
      description: "Day-by-day Fiji travel budget planner with live FX rates.",
    },
  ];
}
