import "server-only";

import { unstable_cache } from "next/cache";
import { VISA_COUNTRIES } from "@/data/visa/countries";
import { FIJI_LOCATION } from "@/lib/tools/world-time-weather/constants";
import { searchLocationCatalog } from "@/lib/tools/world-time-weather/location-search-catalog";
import {
  resolveCountryQuery,
  resolveWeatherPlace,
  timezoneForCountry,
} from "@/lib/tools/world-time-weather/location-labels";
import {
  inferGeoKind,
  normalizeSearchText,
  rankLocationSearchResults,
  type RankableLocation,
} from "@/lib/tools/world-time-weather/rank-location-search";
import type {
  FijiLiveStatus,
  ForecastDay,
  LocationSearchResult,
  LocationWeather,
} from "@/lib/tools/world-time-weather/types";
import { wmoToWeather } from "@/lib/tools/world-time-weather/weather-codes";
import { formatShortDateInTimezone } from "@/lib/tools/world-time-weather/format";
import {
  enrichLocationTimezones,
  enrichLocationTimezonesSync,
  resolveLocationTimezoneSync,
} from "@/lib/tools/world-time-weather/resolve-location-timezone";

const CACHE_SECONDS = 600;
const FIJI_LIVE_CACHE_SECONDS = 900;
const REQUEST_TIMEOUT_MS = 12_000;

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const hits = (rateLimitMap.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_MAX) return false;
  hits.push(now);
  rateLimitMap.set(key, hits);
  return true;
}

async function fetchJson<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: CACHE_SECONDS },
    });
    if (!res.ok) throw new Error(`Upstream error ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

/* ── Open-Meteo (primary — no API key required) ── */

type MeteoGeoResult = {
  results?: Array<{
    name: string;
    country: string;
    country_code: string;
    admin1?: string;
    latitude: number;
    longitude: number;
    timezone: string;
    population?: number;
  }>;
};

type MeteoForecast = {
  timezone: string;
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
  };
};

async function searchOpenMeteoGeo(query: string, count = 20): Promise<LocationSearchResult[]> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=${count}&language=en&format=json`;
  const data = await fetchJson<MeteoGeoResult>(url);
  return enrichLocationTimezonesSync(
    (data.results ?? []).map((r) => ({
      city: r.name,
      country: r.country,
      timezone: r.timezone,
      latitude: r.latitude,
      longitude: r.longitude,
      admin: r.admin1,
      population: r.population,
    })),
  );
}

function countryHintsForQuery(query: string): string[] {
  const normalized = normalizeSearchText(query);
  if (normalized.length < 1) return [];

  return VISA_COUNTRIES.filter((country) =>
    normalizeSearchText(country.name).startsWith(normalized),
  )
    .slice(0, 4)
    .map((country) => country.name);
}

function enrichGeoResults(results: LocationSearchResult[]): RankableLocation[] {
  return results.map((result) => ({
    ...result,
    kind: result.kind ?? inferGeoKind(result),
    timezone: resolveLocationTimezoneSync(result),
  }));
}

async function fetchOpenMeteoWeather(
  lat: number,
  lon: number,
  city: string,
  country: string,
): Promise<LocationWeather> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    "&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset" +
    "&timezone=auto&forecast_days=5";

  const data = await fetchJson<MeteoForecast>(url);
  const currentCode = data.current.weather_code;
  const current = wmoToWeather(currentCode);
  const tz = data.timezone;

  const forecast: ForecastDay[] = data.daily.time.slice(0, 5).map((date, i) => {
    const code = data.daily.weather_code[i] ?? 0;
    const w = wmoToWeather(code);
    const dayDate = new Date(`${date}T12:00:00`);
    return {
      date,
      label: formatShortDateInTimezone(tz, dayDate),
      tempMax: data.daily.temperature_2m_max[i] ?? 0,
      tempMin: data.daily.temperature_2m_min[i] ?? 0,
      weatherCode: code,
      description: w.description,
      icon: w.icon,
    };
  });

  return {
    city,
    country,
    timezone: tz,
    latitude: lat,
    longitude: lon,
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    weatherCode: currentCode,
    description: current.description,
    icon: current.icon,
    sunrise: data.daily.sunrise[0] ?? "",
    sunset: data.daily.sunset[0] ?? "",
    forecast,
  };
}

/* ── Public API ── */

const searchResultCache = new Map<string, { at: number; results: LocationSearchResult[] }>();
const SEARCH_CACHE_TTL_MS = 120_000;

function getCachedSearch(query: string): LocationSearchResult[] | null {
  const key = query.trim().toLowerCase();
  const hit = searchResultCache.get(key);
  if (!hit || Date.now() - hit.at > SEARCH_CACHE_TTL_MS) return null;
  return hit.results;
}

function setCachedSearch(query: string, results: LocationSearchResult[]): void {
  const key = query.trim().toLowerCase();
  searchResultCache.set(key, { at: Date.now(), results });
  if (searchResultCache.size > 200) {
    const oldest = [...searchResultCache.entries()].sort((a, b) => a[1].at - b[1].at)[0];
    if (oldest) searchResultCache.delete(oldest[0]);
  }
}

async function finalizeSearchResults(
  query: string,
  merged: RankableLocation[],
): Promise<LocationSearchResult[]> {
  const ranked = rankLocationSearchResults(query, merged, 12);
  const enriched = await enrichLocationTimezones(ranked);
  return enriched.map((result) => ({
    ...result,
    timezone: resolveLocationTimezoneSync(result),
  }));
}

export async function searchLocations(query: string): Promise<LocationSearchResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 1) return [];
  if (!checkRateLimit(`search:${trimmed.toLowerCase()}`)) {
    throw new Error("Too many requests. Please wait a moment and try again.");
  }

  const cached = getCachedSearch(trimmed);
  if (cached) return cached;

  const catalogResults = searchLocationCatalog(trimmed, 16);
  const resolvedCountry = resolveCountryQuery(trimmed);
  const geoQuery = resolvedCountry ?? trimmed;

  if (trimmed.length < 2) {
    const results = await finalizeSearchResults(trimmed, catalogResults);
    setCachedSearch(trimmed, results);
    return results;
  }

  try {
    const countryHints = countryHintsForQuery(geoQuery);
    const [primary, ...countryResults] = await Promise.all([
      searchOpenMeteoGeo(geoQuery, 25),
      ...countryHints
        .filter((name) => name.toLowerCase() !== geoQuery.toLowerCase())
        .map((name) => searchOpenMeteoGeo(name, 6)),
    ]);

    const geoResults = enrichGeoResults([...primary, ...countryResults.flat()]);
    const results = await finalizeSearchResults(trimmed, [...catalogResults, ...geoResults]);
    setCachedSearch(trimmed, results);
    return results;
  } catch {
    const fallback = enrichGeoResults(await searchOpenMeteoGeo(geoQuery, 25));
    const results = await finalizeSearchResults(trimmed, [...catalogResults, ...fallback]);
    setCachedSearch(trimmed, results);
    return results;
  }
}

export async function searchAndFetchWeather(query: string): Promise<LocationWeather> {
  const trimmed = query.trim();
  if (trimmed.length < 1) {
    throw new Error("Enter a city or country to search.");
  }

  const results = await searchLocations(trimmed);
  if (results.length === 0) {
    throw new Error(`No results found for "${trimmed}". Try another city or country.`);
  }

  const best = results[0];
  const target = resolveWeatherPlace(best);
  const weather = await getLocationWeather(
    best.latitude,
    best.longitude,
    target.city,
    target.country,
  );

  return {
    ...weather,
    timezone: weather.timezone || best.timezone || resolveLocationTimezoneSync(best),
  };
}

const getCachedWeather = (lat: number, lon: number, city: string, country: string) =>
  unstable_cache(
    async () => fetchOpenMeteoWeather(lat, lon, city, country),
    [`wtw-weather-${lat.toFixed(2)}-${lon.toFixed(2)}`],
    { revalidate: CACHE_SECONDS, tags: [`wtw-weather-${lat}-${lon}`] },
  )();

export async function getLocationWeather(
  lat: number,
  lon: number,
  city: string,
  country: string,
): Promise<LocationWeather> {
  if (!checkRateLimit(`weather:${lat},${lon}`)) {
    throw new Error("Too many requests. Please wait a moment and try again.");
  }
  return getCachedWeather(lat, lon, city, country);
}

export async function getFijiWeather(): Promise<LocationWeather> {
  return getLocationWeather(
    FIJI_LOCATION.latitude,
    FIJI_LOCATION.longitude,
    FIJI_LOCATION.city,
    FIJI_LOCATION.country,
  );
}

const getCachedFijiLiveStatus = unstable_cache(
  async (): Promise<FijiLiveStatus> => {
    const weather = await fetchOpenMeteoWeather(
      FIJI_LOCATION.latitude,
      FIJI_LOCATION.longitude,
      FIJI_LOCATION.city,
      FIJI_LOCATION.country,
    );
    return {
      temperature: weather.temperature,
      description: weather.description,
      icon: weather.icon,
      weatherCode: weather.weatherCode,
      fetchedAt: new Date().toISOString(),
    };
  },
  ["fiji-live-status"],
  { revalidate: FIJI_LIVE_CACHE_SECONDS, tags: ["fiji-live-status"] },
);

export async function getFijiLiveStatus(): Promise<FijiLiveStatus> {
  return getCachedFijiLiveStatus();
}
