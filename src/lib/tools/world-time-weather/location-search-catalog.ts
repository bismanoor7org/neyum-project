import { countryIndex } from "@/lib/content/world/country-index";
import { getWorldCountry } from "@/lib/content/world/countries";
import { FIJI_GLOBE_DESTINATIONS } from "@/lib/fiji-globe-data";
import { GLOBAL_SEARCH_ENTRIES } from "@/lib/world-map-search-data";
import { POPULAR_CITIES } from "@/lib/tools/world-time-weather/constants";
import {
  COUNTRY_REFERENCE,
  COUNTRY_REFERENCE_BY_NAME,
} from "@/lib/tools/world-time-weather/country-reference";
import { resolveLocationTimezoneSync } from "@/lib/tools/world-time-weather/resolve-location-timezone";
import type { LocationKind, RankableLocation } from "@/lib/tools/world-time-weather/rank-location-search";
import { normalizeSearchText, rankLocationSearchResults } from "@/lib/tools/world-time-weather/rank-location-search";
import { resolveCountryQuery, timezoneForCountry } from "@/lib/tools/world-time-weather/location-labels";

type CatalogSeed = {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  kind: LocationKind;
  admin?: string;
  population?: number;
  iata?: string;
  timezone?: string;
  searchTerms?: string[];
  priority?: number;
};

/** Major international airports — IATA-searchable */
const MAJOR_AIRPORTS: CatalogSeed[] = [
  { kind: "airport", city: "Heathrow Airport", country: "United Kingdom", latitude: 51.47, longitude: -0.454, iata: "LHR", admin: "London", timezone: "Europe/London", searchTerms: ["london heathrow"] },
  { kind: "airport", city: "Gatwick Airport", country: "United Kingdom", latitude: 51.153, longitude: -0.182, iata: "LGW", admin: "London", timezone: "Europe/London" },
  { kind: "airport", city: "Charles de Gaulle Airport", country: "France", latitude: 49.009, longitude: 2.548, iata: "CDG", admin: "Paris", timezone: "Europe/Paris", searchTerms: ["paris cdg"] },
  { kind: "airport", city: "Dubai International Airport", country: "United Arab Emirates", latitude: 25.253, longitude: 55.365, iata: "DXB", admin: "Dubai", timezone: "Asia/Dubai", searchTerms: ["dubai airport"] },
  { kind: "airport", city: "Abu Dhabi International Airport", country: "United Arab Emirates", latitude: 24.433, longitude: 54.651, iata: "AUH", admin: "Abu Dhabi", timezone: "Asia/Dubai" },
  { kind: "airport", city: "JFK International Airport", country: "United States", latitude: 40.641, longitude: -73.778, iata: "JFK", admin: "New York", timezone: "America/New_York", searchTerms: ["new york jfk", "kennedy"] },
  { kind: "airport", city: "Los Angeles International Airport", country: "United States", latitude: 33.942, longitude: -118.408, iata: "LAX", admin: "Los Angeles", timezone: "America/Los_Angeles" },
  { kind: "airport", city: "San Francisco International Airport", country: "United States", latitude: 37.621, longitude: -122.379, iata: "SFO", admin: "San Francisco", timezone: "America/Los_Angeles" },
  { kind: "airport", city: "O'Hare International Airport", country: "United States", latitude: 41.974, longitude: -87.907, iata: "ORD", admin: "Chicago", timezone: "America/Chicago" },
  { kind: "airport", city: "Miami International Airport", country: "United States", latitude: 25.795, longitude: -80.29, iata: "MIA", admin: "Miami", timezone: "America/New_York" },
  { kind: "airport", city: "Narita International Airport", country: "Japan", latitude: 35.772, longitude: 140.393, iata: "NRT", admin: "Tokyo", timezone: "Asia/Tokyo", searchTerms: ["tokyo narita"] },
  { kind: "airport", city: "Haneda Airport", country: "Japan", latitude: 35.549, longitude: 139.78, iata: "HND", admin: "Tokyo", timezone: "Asia/Tokyo", searchTerms: ["tokyo haneda"] },
  { kind: "airport", city: "Singapore Changi Airport", country: "Singapore", latitude: 1.364, longitude: 103.991, iata: "SIN", admin: "Singapore", timezone: "Asia/Singapore" },
  { kind: "airport", city: "Hong Kong International Airport", country: "Hong Kong", latitude: 22.308, longitude: 113.918, iata: "HKG", admin: "Hong Kong", timezone: "Asia/Hong_Kong" },
  { kind: "airport", city: "Sydney Airport", country: "Australia", latitude: -33.946, longitude: 151.177, iata: "SYD", admin: "Sydney", timezone: "Australia/Sydney" },
  { kind: "airport", city: "Melbourne Airport", country: "Australia", latitude: -37.673, longitude: 144.843, iata: "MEL", admin: "Melbourne", timezone: "Australia/Melbourne" },
  { kind: "airport", city: "Perth Airport", country: "Australia", latitude: -31.938, longitude: 115.967, iata: "PER", admin: "Perth", timezone: "Australia/Perth" },
  { kind: "airport", city: "Auckland Airport", country: "New Zealand", latitude: -37.008, longitude: 174.786, iata: "AKL", admin: "Auckland", timezone: "Pacific/Auckland" },
  { kind: "airport", city: "Hamad International Airport", country: "Qatar", latitude: 25.261, longitude: 51.565, iata: "DOH", admin: "Doha", timezone: "Asia/Qatar" },
  { kind: "airport", city: "Istanbul Airport", country: "Turkey", latitude: 41.275, longitude: 28.752, iata: "IST", admin: "Istanbul", timezone: "Europe/Istanbul" },
  { kind: "airport", city: "Frankfurt Airport", country: "Germany", latitude: 50.037, longitude: 8.562, iata: "FRA", admin: "Frankfurt", timezone: "Europe/Berlin" },
  { kind: "airport", city: "Amsterdam Schiphol Airport", country: "Netherlands", latitude: 52.31, longitude: 4.768, iata: "AMS", admin: "Amsterdam", timezone: "Europe/Amsterdam" },
  { kind: "airport", city: "Munich Airport", country: "Germany", latitude: 48.354, longitude: 11.786, iata: "MUC", admin: "Munich", timezone: "Europe/Berlin" },
  { kind: "airport", city: "Zurich Airport", country: "Switzerland", latitude: 47.458, longitude: 8.555, iata: "ZRH", admin: "Zurich", timezone: "Europe/Zurich" },
  { kind: "airport", city: "Suvarnabhumi Airport", country: "Thailand", latitude: 13.69, longitude: 100.75, iata: "BKK", admin: "Bangkok", timezone: "Asia/Bangkok", searchTerms: ["bangkok airport"] },
  { kind: "airport", city: "Indira Gandhi International Airport", country: "India", latitude: 28.556, longitude: 77.1, iata: "DEL", admin: "Delhi", timezone: "Asia/Kolkata", searchTerms: ["delhi airport", "new delhi airport"] },
  { kind: "airport", city: "Chhatrapati Shivaji Airport", country: "India", latitude: 19.089, longitude: 72.868, iata: "BOM", admin: "Mumbai", timezone: "Asia/Kolkata", searchTerms: ["mumbai airport"] },
  { kind: "airport", city: "Jinnah International Airport", country: "Pakistan", latitude: 24.906, longitude: 67.161, iata: "KHI", admin: "Karachi", timezone: "Asia/Karachi", searchTerms: ["karachi airport"] },
  { kind: "airport", city: "Allama Iqbal International Airport", country: "Pakistan", latitude: 31.521, longitude: 74.404, iata: "LHE", admin: "Lahore", timezone: "Asia/Karachi", searchTerms: ["lahore airport"] },
  { kind: "airport", city: "Toronto Pearson Airport", country: "Canada", latitude: 43.677, longitude: -79.631, iata: "YYZ", admin: "Toronto", timezone: "America/Toronto" },
  { kind: "airport", city: "Vancouver International Airport", country: "Canada", latitude: 49.194, longitude: -123.184, iata: "YVR", admin: "Vancouver", timezone: "America/Vancouver" },
  { kind: "airport", city: "Nadi International Airport", country: "Fiji", latitude: -17.755, longitude: 177.443, iata: "NAN", admin: "Nadi", timezone: "Pacific/Fiji", priority: 120 },
];

/** High-priority cities missing from world content datasets */
const SUPPLEMENTAL_MAJOR_CITIES: CatalogSeed[] = [
  { kind: "city", city: "Bangalore", country: "India", latitude: 12.972, longitude: 77.594, timezone: "Asia/Kolkata", population: 8_400_000, priority: 140, searchTerms: ["bengaluru"] },
  { kind: "city", city: "Hyderabad", country: "India", latitude: 17.385, longitude: 78.487, timezone: "Asia/Kolkata", population: 7_700_000, priority: 100 },
  { kind: "city", city: "Chennai", country: "India", latitude: 13.083, longitude: 80.271, timezone: "Asia/Kolkata", population: 7_100_000, priority: 100 },
  { kind: "city", city: "Kolkata", country: "India", latitude: 22.573, longitude: 88.364, timezone: "Asia/Kolkata", population: 14_800_000, priority: 100, searchTerms: ["calcutta"] },
];

const FEATURED_COUNTRY_PRIORITY = new Map(
  countryIndex.map((c) => [c.name, c.featured ? 80 : c.trending ? 40 : 0]),
);

function resolveSeedTimezone(seed: CatalogSeed): string {
  return resolveLocationTimezoneSync({
    city: seed.city,
    country: seed.country,
    timezone: seed.timezone ?? "UTC",
    kind: seed.kind,
    admin: seed.admin,
  });
}

function seedToRankable(seed: CatalogSeed): RankableLocation {
  return {
    city: seed.city,
    country: seed.country,
    latitude: seed.latitude,
    longitude: seed.longitude,
    timezone: resolveSeedTimezone(seed),
    admin: seed.admin,
    population: seed.population,
    kind: seed.kind,
    iata: seed.iata,
    searchTerms: seed.searchTerms,
    priority: seed.priority,
  };
}

function buildCatalog(): RankableLocation[] {
  const seen = new Set<string>();
  const entries: RankableLocation[] = [];

  const add = (seed: CatalogSeed) => {
    const key = `${seed.kind}|${normalizeSearchText(seed.city)}|${normalizeSearchText(seed.country)}|${seed.iata ?? ""}`;
    if (seen.has(key)) {
      const existing = entries.find(
        (entry) =>
          `${entry.kind}|${normalizeSearchText(entry.city)}|${normalizeSearchText(entry.country)}|${entry.iata ?? ""}` ===
          key,
      );
      if (existing) {
        existing.priority = Math.max(existing.priority ?? 0, seed.priority ?? 0);
        existing.population = Math.max(existing.population ?? 0, seed.population ?? 0);
        if (seed.searchTerms?.length) {
          existing.searchTerms = [...new Set([...(existing.searchTerms ?? []), ...seed.searchTerms])];
        }
        if (seed.timezone && seed.timezone !== "UTC") existing.timezone = seed.timezone;
      }
      return;
    }
    seen.add(key);
    entries.push(seedToRankable(seed));
  };

  for (const airport of MAJOR_AIRPORTS) add(airport);
  for (const city of SUPPLEMENTAL_MAJOR_CITIES) add(city);

  for (const ref of COUNTRY_REFERENCE) {
    if (!ref.lat && !ref.lng) continue;
    add({
      kind: "country",
      city: ref.name,
      country: ref.name,
      latitude: ref.lat,
      longitude: ref.lng,
      admin: ref.capital !== ref.name ? ref.capital : undefined,
      timezone: ref.timezone,
      searchTerms: ref.aliases,
      population: 3_000_000,
      priority: (FEATURED_COUNTRY_PRIORITY.get(ref.name) ?? 0) + (ref.name === "Pakistan" ? 160 : 0),
    });
  }

  for (const c of countryIndex) {
    const country = getWorldCountry(c.slug);
    if (!country) continue;
    for (const city of country.cities) {
      add({
        kind: "city",
        city: city.name,
        country: country.name,
        latitude: city.lat,
        longitude: city.lng,
        timezone: timezoneForCountry(country.name),
        population: city.name === country.capital ? 2_000_000 : 800_000,
        priority: city.name === country.capital ? 60 : 0,
      });
    }
  }

  for (const entry of GLOBAL_SEARCH_ENTRIES) {
    const kind: LocationKind =
      entry.type === "country"
        ? "country"
        : entry.type === "city"
          ? "city"
          : entry.type === "fiji"
            ? "destination"
            : entry.subtitle === "Region"
              ? "region"
              : "destination";

    if (entry.type === "country") continue;

    add({
      kind,
      city: entry.name,
      country: entry.subtitle ?? "",
      latitude: entry.lat,
      longitude: entry.lng,
      admin: entry.subtitle,
      timezone: entry.subtitle ? timezoneForCountry(entry.subtitle) : undefined,
      searchTerms: entry.aliases,
      population: kind === "city" ? 1_000_000 : undefined,
      priority: entry.type === "fiji" ? 90 : 0,
    });
  }

  for (const dest of FIJI_GLOBE_DESTINATIONS) {
    add({
      kind: "destination",
      city: dest.title,
      country: "Fiji",
      latitude: dest.lat,
      longitude: dest.lng,
      timezone: "Pacific/Fiji",
      priority: 100,
    });
  }

  for (const city of POPULAR_CITIES) {
    const match = entries.find(
      (e) =>
        e.kind === "city" &&
        normalizeSearchText(e.city) === normalizeSearchText(city.label),
    );
    if (match) {
      match.priority = (match.priority ?? 0) + 200;
      match.searchTerms = [...(match.searchTerms ?? []), city.query];
    }
  }

  return entries;
}

const LOCATION_CATALOG = buildCatalog();

export function searchLocationCatalog(query: string, limit = 12): RankableLocation[] {
  const trimmed = query.trim();
  const resolvedCountry = resolveCountryQuery(trimmed);
  const queries = resolvedCountry && resolvedCountry !== trimmed ? [trimmed, resolvedCountry] : [trimmed];
  const merged = queries.flatMap((q) =>
    rankLocationSearchResults(q, LOCATION_CATALOG, limit),
  );

  const seen = new Set<string>();
  const unique: RankableLocation[] = [];
  for (const item of merged) {
    const key = `${item.kind}|${item.city}|${item.country}|${item.iata ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
    if (unique.length >= limit) break;
  }
  return unique;
}
