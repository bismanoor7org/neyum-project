import { buildPageMetadata } from "@/lib/seo/metadata";

export const TOOL_PATH = "/tools/timezone-finder" as const;

export function timezoneFinderMetadata() {
  return buildPageMetadata({
    title: "Timezone Finder",
    description:
      "Find IANA timezones for any city, compare offsets with Fiji, and calculate time differences for travel planning.",
    path: TOOL_PATH,
    keywords: ["Fiji timezone", "timezone converter", "time difference calculator"],
    imageAlt: "Timezone finder for Fiji travel",
  });
}

export function timezoneFinderJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Timezone Finder",
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      url: `https://www.fijiluxuryexperiences.com${TOOL_PATH}`,
      description: "City and country timezone search with IANA support.",
    },
  ];
}
