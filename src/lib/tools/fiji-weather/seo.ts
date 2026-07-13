import { buildPageMetadata } from "@/lib/seo/metadata";

export const TOOL_PATH = "/tools/fiji-weather" as const;

export const FIJI_WEATHER_FAQ = [
  {
    question: "How accurate is the Fiji weather forecast?",
    answer:
      "Forecasts are sourced from Open-Meteo global meteorological models and refreshed every ten minutes.",
  },
  {
    question: "Which Fiji regions are covered?",
    answer:
      "Live conditions for Suva, Nadi, Lautoka, and Denarau — the main travel hubs on Viti Levu.",
  },
] as const;

export function fijiWeatherMetadata() {
  return buildPageMetadata({
    title: "Fiji Weather",
    description:
      "Resort-ready Fiji weather forecasts for Suva, Nadi, and island gateways — live conditions and 5-day outlook.",
    path: TOOL_PATH,
    keywords: ["Fiji weather", "Fiji forecast", "Nadi weather", "Suva weather"],
    imageAlt: "Fiji weather forecast",
  });
}

export function fijiWeatherJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Fiji Weather",
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      url: `https://www.fijiluxuryexperiences.com${TOOL_PATH}`,
      description: "Live Fiji weather with 5-day forecasts from Open-Meteo.",
    },
  ];
}
