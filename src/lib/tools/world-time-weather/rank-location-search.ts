import { POPULAR_CITIES } from "@/lib/tools/world-time-weather/constants";
import type { LocationSearchResult } from "@/lib/tools/world-time-weather/types";

export type LocationKind = "country" | "city" | "airport" | "region" | "destination";

export type RankableLocation = LocationSearchResult & {
  population?: number;
  kind?: LocationKind;
  searchTerms?: string[];
  priority?: number;
};

const KIND_BOOST: Record<LocationKind, number> = {
  country: 4000,
  city: 2500,
  airport: 1500,
  region: 800,
  destination: 600,
};

export function normalizeSearchText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[''`]/g, "")
    .trim();
}

function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      const val =
        a[i - 1] === b[j - 1] ? row[j - 1] : Math.min(row[j - 1], row[j], prev) + 1;
      row[j - 1] = prev;
      prev = val;
    }
    row[b.length] = prev;
  }
  return row[b.length];
}

function matchField(query: string, raw: string, allowFuzzy = true): number {
  const field = normalizeSearchText(raw);
  if (!field) return 0;

  if (field === query) return 1000;
  if (field.startsWith(query)) return 750;

  for (const word of field.split(/\s+/)) {
    if (word === query) return 680;
    if (word.startsWith(query)) return 620;
  }

  if (query.length >= 4 && field.includes(query)) return 220;

  if (!allowFuzzy || query.length < 3 || query.length >= 7) return 0;

  const maxDist = query.length <= 4 ? 1 : query.length <= 6 ? 2 : query.length <= 8 ? 2 : 3;
  const dist = levenshtein(query, field.slice(0, Math.max(field.length, query.length)));
  if (dist <= maxDist) return 180 - dist * 20;

  for (const word of field.split(/\s+/)) {
    if (word.length >= 3) {
      const wordDist = levenshtein(query, word);
      if (wordDist <= 1) return 160;
    }
  }

  return 0;
}

function scoreLocation(query: string, result: RankableLocation): number {
  const kind = result.kind ?? inferGeoKind(result);
  const fields =
    kind === "country"
      ? [result.city, ...(result.searchTerms ?? [])]
      : kind === "city"
        ? [result.city, result.country, ...(result.searchTerms ?? [])]
        : kind === "airport"
          ? [result.city, result.iata ?? "", result.admin ?? "", result.country, ...(result.searchTerms ?? [])]
          : [result.city, result.country, result.admin ?? "", ...(result.searchTerms ?? [])];

  const allowFuzzy = kind !== "country";

  let bestMatch = 0;
  for (const field of fields) {
    bestMatch = Math.max(bestMatch, matchField(query, field, allowFuzzy));
  }

  if (bestMatch === 0) return -1;

  if (query.length === 1 && bestMatch < 620) return -1;
  if (query.length === 2 && bestMatch < 620) return -1;
  if (query.length === 3 && bestMatch < 620) return -1;

  let score = bestMatch + KIND_BOOST[kind];

  if (kind === "city" && normalizeSearchText(result.city) === query) {
    score += 600;
  }

  if (result.priority) score += result.priority;

  const pop = result.population ?? 0;
  if (pop > 0 && kind === "city") {
    score += Math.min(280, Math.log10(pop + 1) * 55);
  }

  if (query.length >= 3 && kind === "city") {
    const city = normalizeSearchText(result.city);
    if (city.length <= 3 && pop < 100_000) score -= 500;
    if (city.startsWith(query) && city.length <= 3 && pop < 250_000) score -= 350;
  }

  const cityNorm = normalizeSearchText(result.city);
  const isPopular = POPULAR_CITIES.some((entry) => {
    const label = normalizeSearchText(entry.label);
    const q = normalizeSearchText(entry.query);
    if (cityNorm === label || cityNorm === q) return true;
    if (label.startsWith(query) || q.startsWith(query)) {
      return cityNorm === label || cityNorm.startsWith(query);
    }
    return false;
  });
  if (isPopular) score += 380;

  if (kind === "country" && normalizeSearchText(result.city).startsWith(query)) {
    score += 280;
  }

  if (kind === "city" && result.priority && result.priority >= 60) {
    score += 200;
  }

  const countryNorm = normalizeSearchText(result.country);
  if (kind === "city" && countryNorm.startsWith(query) && query.length >= 3) {
    score += 320;
  }

  if (kind === "airport" && result.iata && normalizeSearchText(result.iata).startsWith(query)) {
    score += 240;
  }

  return score;
}

export function inferGeoKind(result: LocationSearchResult): LocationKind {
  const city = normalizeSearchText(result.city);
  const country = normalizeSearchText(result.country);

  if (/airport|intl|international/i.test(result.city)) return "airport";
  if (city === country || result.city === result.country) return "country";
  if (/region|coast|islands|caribbean|mediterranean/i.test(`${result.city} ${result.admin ?? ""}`)) {
    return "region";
  }
  return "city";
}

function dedupeKey(result: RankableLocation): string {
  const kind = result.kind ?? inferGeoKind(result);
  const city = normalizeSearchText(result.city);
  const country = normalizeSearchText(result.country);
  const iata = result.iata ? normalizeSearchText(result.iata) : "";

  if (kind === "airport" && iata) return `airport|${iata}`;
  if (kind === "country") return `country|${city}`;

  const lat = result.latitude.toFixed(1);
  const lng = result.longitude.toFixed(1);
  return `${kind}|${city}|${country}|${lat}|${lng}`;
}

function isNearDuplicate(a: RankableLocation, b: RankableLocation): boolean {
  const cityA = normalizeSearchText(a.city);
  const cityB = normalizeSearchText(b.city);
  if (cityA !== cityB) return false;

  const countryA = normalizeSearchText(a.country);
  const countryB = normalizeSearchText(b.country);
  if (countryA && countryB && countryA !== countryB) return false;

  const distLat = Math.abs(a.latitude - b.latitude);
  const distLng = Math.abs(a.longitude - b.longitude);
  return distLat < 0.35 && distLng < 0.35;
}

export function rankLocationSearchResults(
  query: string,
  results: RankableLocation[],
  resultLimit = 10,
): LocationSearchResult[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];

  const minScore = normalizedQuery.length <= 1 ? 2800 : normalizedQuery.length <= 3 ? 2900 : 2000;

  const scored = results
    .map((result) => ({ result, score: scoreLocation(normalizedQuery, result) }))
    .filter((entry) => entry.score >= minScore)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const priorityDiff = (b.result.priority ?? 0) - (a.result.priority ?? 0);
      if (priorityDiff !== 0) return priorityDiff;
      return (b.result.population ?? 0) - (a.result.population ?? 0);
    });

  const kindLimits: Partial<Record<LocationKind, number>> =
    normalizedQuery.length === 1
      ? { country: 1, city: 5, airport: 1, region: 1, destination: 1 }
      : normalizedQuery.length === 2
        ? { country: 2, city: 5, airport: 2, region: 1, destination: 1 }
        : {};

  const kindCounts: Record<LocationKind, number> = {
    country: 0,
    city: 0,
    airport: 0,
    region: 0,
    destination: 0,
  };

  const seen = new Set<string>();
  const ranked: LocationSearchResult[] = [];

  for (const { result } of scored) {
    const kind = result.kind ?? inferGeoKind(result);
    const kindCap = kindLimits[kind];
    if (kindCap !== undefined && kindCounts[kind] >= kindCap) continue;

    const key = dedupeKey(result);
    if (seen.has(key)) continue;

    const duplicate = ranked.some((existing) => isNearDuplicate(existing, result));
    if (duplicate) continue;

    seen.add(key);
    kindCounts[kind] += 1;
    ranked.push({
      city: result.city,
      country: result.country,
      timezone: result.timezone,
      latitude: result.latitude,
      longitude: result.longitude,
      admin: result.admin,
      population: result.population,
      kind,
      iata: result.iata,
    });
    if (ranked.length >= resultLimit) break;
  }

  return ranked;
}
