export const TOOL_PATH = "/tools/world-time-weather" as const;

export const FIJI_TIMEZONE = "Pacific/Fiji";

export const FIJI_LOCATION = {
  city: "Suva",
  country: "Fiji",
  timezone: FIJI_TIMEZONE,
  latitude: -18.1416,
  longitude: 178.4419,
} as const;

/** Curated cities for quick search chips */
export const POPULAR_CITIES = [
  { query: "London", label: "London" },
  { query: "Sydney", label: "Sydney" },
  { query: "Dubai", label: "Dubai" },
  { query: "Karachi", label: "Karachi" },
  { query: "Lahore", label: "Lahore" },
  { query: "Tokyo", label: "Tokyo" },
  { query: "Paris", label: "Paris" },
  { query: "New York", label: "New York" },
  { query: "Singapore", label: "Singapore" },
  { query: "Toronto", label: "Toronto" },
  { query: "Auckland", label: "Auckland" },
  { query: "Melbourne", label: "Melbourne" },
] as const;

export const TOOL_FAQ = [
  {
    question: "What timezone is Fiji in?",
    answer:
      "Fiji uses Fiji Standard Time (FJT), UTC+12 year-round. There is no daylight saving time in Fiji, making it straightforward to plan calls and transfers with international guests.",
  },
  {
    question: "How accurate is the Fiji weather forecast?",
    answer:
      "Forecasts are sourced from global meteorological models and refreshed every ten minutes. For resort transfers and island hops, check conditions again on the morning of travel.",
  },
  {
    question: "Can I compare my home city time with Fiji?",
    answer:
      "Yes. Search any city or country, then use the time difference tool to see whether your destination is ahead or behind — plus a suggested window for concierge calls.",
  },
  {
    question: "Which cities can I search?",
    answer:
      "Search any major city worldwide — London, Sydney, Dubai, New York, Tokyo, and hundreds more. Country names return the capital or largest matching city.",
  },
  {
    question: "Is this tool useful before booking Fiji travel?",
    answer:
      "Absolutely. Compare seasons, plan video calls with your concierge, and align flight arrivals with resort check-in windows before you confirm your itinerary.",
  },
  {
    question: "Does the tool work on mobile?",
    answer:
      "The page is fully responsive on desktop, tablet, and mobile — with live Fiji time, search, forecasts, and timezone comparison in one view.",
  },
] as const;
