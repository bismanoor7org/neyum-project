/** Fiji locations with real coordinates for weather/time tools */
export const FIJI_TIMEZONE = "Pacific/Fiji";

export const FIJI_REGIONS = [
  {
    city: "Suva",
    country: "Fiji",
    timezone: FIJI_TIMEZONE,
    latitude: -18.1416,
    longitude: 178.4419,
    label: "Capital — Viti Levu",
  },
  {
    city: "Nadi",
    country: "Fiji",
    timezone: FIJI_TIMEZONE,
    latitude: -17.7765,
    longitude: 177.4356,
    label: "International gateway",
  },
  {
    city: "Lautoka",
    country: "Fiji",
    timezone: FIJI_TIMEZONE,
    latitude: -17.6167,
    longitude: 177.45,
    label: "Sugar City — west coast",
  },
  {
    city: "Denarau",
    country: "Fiji",
    timezone: FIJI_TIMEZONE,
    latitude: -17.7734,
    longitude: 177.3762,
    label: "Resort marina hub",
  },
] as const;

export const FIJI_TIME_FAQ = [
  {
    question: "What timezone is Fiji in?",
    answer:
      "Fiji uses Fiji Standard Time (FJT), UTC+12 year-round. There is no daylight saving time, so scheduling calls and transfers stays consistent all year.",
  },
  {
    question: "Is Fiji time the same across all islands?",
    answer:
      "Yes. All of Fiji — Viti Levu, Vanua Levu, Mamanuca, and Yasawa — shares Pacific/Fiji (UTC+12).",
  },
  {
    question: "How do I compare my home time with Fiji?",
    answer:
      "Use the World Time & Weather tool or Timezone Finder to search your city and see the live offset from Fiji Standard Time.",
  },
] as const;

export const TOOL_PATH = "/tools/fiji-time" as const;
