import { images } from "@/lib/images";

/** Flip to `false` to restore full tool pages. */
export const TOOLS_COMING_SOON_ENABLED = false;

export type ToolComingSoonKey =
  | "fijiTime"
  | "fijiWeather"
  | "worldTimeWeather"
  | "tripCostCalculator"
  | "currencyConverter"
  | "travelBudgetPlanner"
  | "timezoneFinder";

export type ToolComingSoonConfig = {
  key: ToolComingSoonKey;
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  notifyTopic: string;
  jsonLdName: string;
  jsonLdDescription: string;
};

export const TOOL_COMING_SOON_PAGES: Record<ToolComingSoonKey, ToolComingSoonConfig> = {
  fijiTime: {
    key: "fijiTime",
    path: "/tools/fiji-time",
    eyebrow: "Local Time",
    title: "Fiji Time Now",
    description:
      "Live Fiji Standard Time with daylight details and quick conversions for Nadi, Suva, and resort transfers — arriving shortly.",
    heroImage: images.storyNadi,
    heroImageAlt: "Fiji local time and island schedule",
    notifyTopic: "Fiji Time",
    jsonLdName: "Fiji Time",
    jsonLdDescription: "Current Fiji time and timezone reference for luxury travellers.",
  },
  fijiWeather: {
    key: "fijiWeather",
    path: "/tools/fiji-weather",
    eyebrow: "Island Forecast",
    title: "Fiji Weather",
    description:
      "Resort-ready forecasts for Viti Levu, Mamanuca, and Yasawa — rainfall, humidity, and sea conditions curated for travel planning.",
    heroImage: images.weather,
    heroImageAlt: "Fiji weather and tropical skies",
    notifyTopic: "Fiji Weather",
    jsonLdName: "Fiji Weather",
    jsonLdDescription: "Fiji weather forecasts and travel-season guidance.",
  },
  worldTimeWeather: {
    key: "worldTimeWeather",
    path: "/tools/world-time-weather",
    eyebrow: "Global Reference",
    title: "World Time & Weather",
    description:
      "Compare home-city clocks with Fiji and scan global conditions before you fly — a single premium reference for international journeys.",
    heroImage: images.guideVisa,
    heroImageAlt: "World time and weather for Fiji travel",
    notifyTopic: "World Time & Weather",
    jsonLdName: "World Time & Weather",
    jsonLdDescription: "World time zones and weather comparison for Fiji-bound travellers.",
  },
  tripCostCalculator: {
    key: "tripCostCalculator",
    path: "/tools/trip-cost-calculator",
    eyebrow: "Trip Planning",
    title: "Trip Cost Calculator",
    description:
      "Estimate flights, resorts, transfers, and experiences in one elegant calculator tailored to luxury Fiji itineraries.",
    heroImage: images.travelReq,
    heroImageAlt: "Fiji trip cost planning",
    notifyTopic: "Trip Cost Calculator",
    jsonLdName: "Trip Cost Calculator",
    jsonLdDescription: "Fiji trip cost estimator for luxury travel planning.",
  },
  currencyConverter: {
    key: "currencyConverter",
    path: "/tools/currency-converter",
    eyebrow: "FX Reference",
    title: "Currency Converter",
    description:
      "Convert your home currency to Fijian dollars with live rates and resort-friendly rounding — built for confident booking decisions.",
    heroImage: images.guideHealth,
    heroImageAlt: "Currency conversion for Fiji travel",
    notifyTopic: "Currency Converter",
    jsonLdName: "Currency Converter",
    jsonLdDescription: "Fiji currency converter with live exchange rates.",
  },
  travelBudgetPlanner: {
    key: "travelBudgetPlanner",
    path: "/tools/travel-budget-planner",
    eyebrow: "Budget Planning",
    title: "Travel Budget Planner",
    description:
      "Build a day-by-day Fiji budget across stays, dining, tours, and spa time — structured for bespoke luxury escapes.",
    heroImage: images.dealResort,
    heroImageAlt: "Fiji travel budget planner",
    notifyTopic: "Travel Budget Planner",
    jsonLdName: "Travel Budget Planner",
    jsonLdDescription: "Luxury Fiji travel budget planner and cost breakdown tool.",
  },
  timezoneFinder: {
    key: "timezoneFinder",
    path: "/tools/timezone-finder",
    eyebrow: "Time Zones",
    title: "Timezone Finder",
    description:
      "Find the exact offset between your city and Fiji before you book calls, transfers, or spa appointments across the islands.",
    heroImage: images.storyNadi,
    heroImageAlt: "Timezone finder for Fiji travel",
    notifyTopic: "Timezone Finder",
    jsonLdName: "Timezone Finder",
    jsonLdDescription: "Timezone comparison tool for Fiji and international cities.",
  },
};

export function isToolComingSoon(key: ToolComingSoonKey): boolean {
  if (!TOOLS_COMING_SOON_ENABLED) return false;
  return key !== "worldTimeWeather";
}
