import type { LocationWeather, TravelInsight } from "./types";
import { friendlyTimezoneName } from "./format";

export function buildTravelInsights(location: LocationWeather): TravelInsight[] {
  const isFiji =
    location.country.toLowerCase().includes("fiji") ||
    location.timezone === "Pacific/Fiji";

  const insights: TravelInsight[] = [
    {
      title: "Local Time",
      body: isFiji
        ? "Fiji operates on Fiji Standard Time (UTC+12) with no daylight saving. Resort check-in typically begins at 2:00 PM; plan international arrivals accordingly."
        : `${location.city} follows ${friendlyTimezoneName(location.timezone)}. Confirm business hours before scheduling concierge calls or tour pickups.`,
    },
    {
      title: "Timezone",
      body: isFiji
        ? "Fiji sits west of the International Date Line — you may gain or lose a calendar day when flying from North America or Asia. Allow buffer time for island transfers."
        : `When coordinating with Fiji (UTC+12), ${location.city} is ${describeOffset(location.timezone)}. Use the time difference tool above for live comparison.`,
    },
    {
      title: "Best Time to Visit",
      body: isFiji
        ? "May through October brings dry, sunny conditions ideal for diving and beach days. November to April is warmer and lush, with brief afternoon showers and fewer crowds."
        : getSeasonTip(location.latitude),
    },
    {
      title: "Weather Tips",
      body: getWeatherTip(location),
    },
    {
      title: "Travel Tips",
      body: isFiji
        ? "Pack reef-safe sunscreen, a light rain jacket for wet season, and modest attire for village visits. Most luxury resorts provide snorkelling gear and island transfer schedules."
        : `Check forecast trends before long-haul connections through ${location.city}. Layer clothing for terminal air-conditioning and local conditions upon arrival.`,
    },
  ];

  return insights;
}

function describeOffset(timezone: string): string {
  const now = new Date();
  const fijiOffset = getOffset("Pacific/Fiji", now);
  const localOffset = getOffset(timezone, now);
  const diffHours = (fijiOffset - localOffset) / 60;
  if (Math.abs(diffHours) < 0.5) return "in the same timezone offset as Fiji";
  const abs = Math.abs(diffHours);
  const label = abs === 1 ? "1 hour" : `${abs} hours`;
  return diffHours > 0 ? `${label} ahead of Fiji` : `${label} behind Fiji`;
}

function getOffset(tz: string, date: Date): number {
  const utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
  );
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? "0");
  const local = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
  );
  return Math.round((local - utc) / 60_000);
}

function getSeasonTip(latitude: number): string {
  if (latitude > 35)
    return "Northern hemisphere summers (Jun–Aug) bring long daylight hours; winters are cooler with potential snow at higher latitudes.";
  if (latitude > 0)
    return "Tropical and subtropical destinations are warm year-round. Dry seasons often align with northern winter months for comfortable travel.";
  if (latitude > -35)
    return "Southern hemisphere seasons are reversed — summer runs Dec–Feb. Shoulder months often offer pleasant weather and better availability.";
  return "High-latitude southern destinations have cool summers and cold winters. Plan layers and check daylight hours for your travel dates.";
}

function getWeatherTip(location: LocationWeather): string {
  const temp = location.temperature;
  const desc = location.description.toLowerCase();

  if (desc.includes("rain") || desc.includes("drizzle") || desc.includes("shower"))
    return `Expect ${location.description.toLowerCase()} in ${location.city}. Carry a compact umbrella and quick-dry layers; indoor spa and dining reservations are ideal today.`;

  if (desc.includes("thunder"))
    return "Thunderstorms possible — monitor updates before outdoor activities. Resort concierges can reschedule island transfers if needed.";

  if (temp >= 30)
    return `Warm conditions at ${Math.round(temp)}°C. Stay hydrated, use SPF 50+, and plan reef activities for early morning when visibility is best.`;

  if (temp <= 10)
    return `Cool conditions around ${Math.round(temp)}°C. Layer up for sightseeing and allow extra time for airport transfers in low visibility.`;

  return `${location.description} with temperatures near ${Math.round(temp)}°C. Comfortable for exploring — ideal for walking tours and open-air dining.`;
}
