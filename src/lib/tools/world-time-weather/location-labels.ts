import {
  COUNTRY_ALIAS_INDEX,
  COUNTRY_REFERENCE_BY_NAME,
} from "@/lib/tools/world-time-weather/country-reference";
import { lookupCountryDefault } from "@/lib/tools/world-time-weather/resolve-location-timezone";
import { normalizeSearchText } from "@/lib/tools/world-time-weather/rank-location-search";
import type { LocationSearchResult } from "./types";

/** Label for search inputs and suggestion dropdowns. */
export function formatLocationSearchLabel(item: LocationSearchResult): string {
  if (item.kind === "country") return item.city;

  if (item.kind === "airport") {
    const code = item.iata ? ` (${item.iata})` : "";
    const place = item.admin ?? item.city.replace(/\s+Airport$/i, "");
    return `${place}${code}, ${item.country}`;
  }

  if (item.kind === "region" || item.kind === "destination") {
    return item.country ? `${item.city}, ${item.country}` : item.city;
  }

  return item.admin
    ? `${item.city}, ${item.admin}, ${item.country}`
    : `${item.city}, ${item.country}`;
}

/** Human-readable place name for cards and headings. */
export function formatLocationDisplayName(
  item: Pick<LocationSearchResult, "city" | "country" | "admin" | "kind">,
): string {
  if (item.kind === "country") {
    return item.admin ? `${item.admin}, ${item.city}` : item.city;
  }

  if (item.city === item.country) return item.city;
  return `${item.city}, ${item.country}`;
}

/** City/country pair passed to the weather API. */
export function resolveWeatherPlace(item: LocationSearchResult): {
  city: string;
  country: string;
} {
  if (item.kind === "country") {
    return {
      city: item.admin && item.admin !== item.city ? item.admin : item.city,
      country: item.city,
    };
  }

  if (item.kind === "airport") {
    const place =
      item.admin ??
      item.city.replace(/\s+International\s+Airport$/i, "").replace(/\s+Airport$/i, "");
    return { city: place, country: item.country };
  }

  return {
    city: item.city,
    country: item.country,
  };
}

/** Resolve shorthand queries (UK, USA, UAE) to canonical country names. */
export function resolveCountryQuery(query: string): string | null {
  const normalized = normalizeSearchText(query);
  if (!normalized) return null;

  const alias = COUNTRY_ALIAS_INDEX.find((entry) => entry.alias === normalized);
  if (alias) return alias.country;

  const direct = COUNTRY_REFERENCE_BY_NAME.get(normalized);
  if (direct) return direct.name;

  return null;
}

export function timezoneForCountry(countryName: string): string | undefined {
  const ref = COUNTRY_REFERENCE_BY_NAME.get(normalizeSearchText(countryName));
  if (ref?.timezone && ref.timezone !== "UTC") return ref.timezone;

  const fromMap = lookupCountryDefault(countryName);
  if (fromMap) return fromMap;

  return undefined;
}

export function validateWeatherPayload(data: {
  timezone?: string;
  temperature?: number;
  feelsLike?: number;
  humidity?: number;
  windSpeed?: number;
  sunrise?: string;
  sunset?: string;
  forecast?: unknown[];
}): string[] {
  const issues: string[] = [];
  if (!data.timezone || data.timezone === "UTC") issues.push("timezone");
  if (data.temperature === undefined || Number.isNaN(data.temperature)) issues.push("temperature");
  if (data.feelsLike === undefined || Number.isNaN(data.feelsLike)) issues.push("feelsLike");
  if (data.humidity === undefined || Number.isNaN(data.humidity)) issues.push("humidity");
  if (data.windSpeed === undefined || Number.isNaN(data.windSpeed)) issues.push("windSpeed");
  if (!data.sunrise) issues.push("sunrise");
  if (!data.sunset) issues.push("sunset");
  if (!Array.isArray(data.forecast) || data.forecast.length < 5) issues.push("forecast");
  return issues;
}
