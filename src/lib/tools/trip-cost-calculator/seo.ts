import { buildPageMetadata } from "@/lib/seo/metadata";

export const TOOL_PATH = "/tools/trip-cost-calculator" as const;

export function tripCostCalculatorMetadata() {
  return buildPageMetadata({
    title: "Trip Cost Calculator",
    description:
      "Estimate your Fiji trip cost — flights, accommodation, dining, activities, and transfers with live currency conversion.",
    path: TOOL_PATH,
    keywords: ["Fiji trip cost", "Fiji vacation budget", "Fiji travel calculator"],
    imageAlt: "Fiji trip cost calculator",
  });
}

export function tripCostCalculatorJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Trip Cost Calculator",
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      url: `https://www.fijiluxuryexperiences.com${TOOL_PATH}`,
      description: "Fiji trip cost estimator with live exchange rates.",
    },
  ];
}
