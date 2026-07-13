"use server";

import type { LocationSearchResult, SearchActionResult } from "@/lib/tools/world-time-weather/types";
import { resolveWeatherPlace } from "@/lib/tools/world-time-weather/location-labels";
import {
  getFijiWeather,
  getLocationWeather,
  searchAndFetchWeather,
  searchLocations,
} from "@/server/services/world-time-weather.service";

export async function fetchFijiDashboardAction() {
  try {
    const location = await getFijiWeather();
    return {
      ok: true as const,
      data: { location, fetchedAt: new Date().toISOString() },
    };
  } catch (err) {
    return {
      ok: false as const,
      error: err instanceof Error ? err.message : "Unable to load Fiji weather.",
    };
  }
}

export async function searchLocationAction(query: string): Promise<SearchActionResult> {
  const trimmed = query.trim();
  if (trimmed.length < 1) {
    return { ok: false, error: "Enter a city or country to search." };
  }

  try {
    const data = await searchAndFetchWeather(trimmed);
    return { ok: true, data };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Search failed. Please try again.",
    };
  }
}

export async function searchLocationsAction(query: string): Promise<LocationSearchResult[]> {
  try {
    return await searchLocations(query);
  } catch {
    return [];
  }
}

export async function fetchLocationWeatherAction(
  lat: number,
  lon: number,
  city: string,
  country: string,
  hint?: Pick<LocationSearchResult, "kind" | "admin" | "timezone" | "iata">,
): Promise<SearchActionResult> {
  try {
    const target = hint
      ? resolveWeatherPlace({
          city,
          country,
          latitude: lat,
          longitude: lon,
          timezone: hint.timezone ?? "UTC",
          kind: hint.kind,
          admin: hint.admin,
          iata: hint.iata,
        })
      : { city, country };

    const data = await getLocationWeather(lat, lon, target.city, target.country);
    return {
      ok: true,
      data: {
        ...data,
        timezone: data.timezone || hint?.timezone || "UTC",
      },
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unable to load weather data.",
    };
  }
}
