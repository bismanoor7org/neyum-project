import { countryIndex } from "@/lib/content/world/country-index";
import { getWorldCountry } from "@/lib/content/world/countries";
import { FIJI_GLOBE_DESTINATIONS } from "@/lib/fiji-globe-data";
import { FIJI_MAP_CENTER } from "@/lib/fiji-map";
import { greatCircleDistanceKm, bearingDegrees } from "@/lib/fiji-globe-math";
import { GLOBAL_SEARCH_ENTRIES } from "@/lib/world-map-search-data";

export interface MapSearchResult {
  id: string;
  type: "country" | "city" | "landmark" | "fiji" | "island" | "region";
  name: string;
  subtitle?: string;
  lat: number;
  lng: number;
  zoom: number;
  slug?: string;
  /** Opens Fiji destination card when set */
  fijiSlug?: string;
  score?: number;
}

interface IndexedEntry extends MapSearchResult {
  searchText: string;
  aliases: string[];
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''`]/g, "")
    .trim();
}

/** Lightweight Levenshtein for typo tolerance */
function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      const val =
        a[i - 1] === b[j - 1]
          ? row[j - 1]
          : Math.min(row[j - 1], row[j], prev) + 1;
      row[j - 1] = prev;
      prev = val;
    }
    row[b.length] = prev;
  }
  return row[b.length];
}

function scoreEntry(query: string, entry: IndexedEntry): number {
  const q = normalize(query);
  if (!q) return 0;

  const name = normalize(entry.name);
  const subtitle = entry.subtitle ? normalize(entry.subtitle) : "";
  const combined = entry.searchText;

  if (name === q) return 200;
  if (name.startsWith(q)) return 150;
  if (name.includes(q)) return 120;

  if (subtitle === q) return 110;
  if (subtitle.startsWith(q)) return 100;
  if (subtitle.includes(q)) return 85;

  if (combined.includes(q)) return 75;

  for (const alias of entry.aliases) {
    const a = normalize(alias);
    if (a === q) return 130;
    if (a.startsWith(q)) return 115;
    if (a.includes(q)) return 90;
  }

  if (q.length >= 3) {
    const nameDist = levenshtein(q, name.slice(0, Math.max(name.length, q.length)));
    const maxDist = q.length <= 4 ? 1 : q.length <= 6 ? 2 : 3;
    if (nameDist <= maxDist) return 55 - nameDist * 5;

    for (const word of name.split(/\s+/)) {
      if (word.length >= 3) {
        const wd = levenshtein(q, word);
        if (wd <= 1) return 50;
      }
    }

    for (const alias of entry.aliases) {
      const a = normalize(alias);
      if (levenshtein(q, a) <= 1) return 48;
    }
  }

  return 0;
}

function buildIndexedSearch(): IndexedEntry[] {
  const seen = new Set<string>();
  const entries: IndexedEntry[] = [];

  const add = (
    item: Omit<MapSearchResult, "id"> & { aliases?: string[] },
    idPrefix: string,
  ) => {
    const id = `${idPrefix}-${item.name}-${item.lat}`;
    if (seen.has(id)) return;
    seen.add(id);

    const aliases = item.aliases ?? [];
    const searchText = normalize(
      [item.name, item.subtitle, ...aliases].filter(Boolean).join(" "),
    );

    entries.push({
      ...item,
      id,
      aliases,
      searchText,
      type: item.type === "island" || item.type === "region" ? "landmark" : item.type,
    });
  };

  for (const c of countryIndex) {
    add(
      {
        type: "country",
        name: c.name,
        subtitle: c.capital,
        lat: c.lat,
        lng: c.lng,
        zoom: c.slug === "fiji" ? 6.5 : 5,
        slug: c.slug,
        fijiSlug: c.slug === "fiji" ? "nadi" : undefined,
      },
      "country",
    );
  }

  for (const c of countryIndex) {
    const country = getWorldCountry(c.slug);
    if (!country) continue;
    for (const city of country.cities) {
      add(
        {
          type: "city",
          name: city.name,
          subtitle: country.name,
          lat: city.lat,
          lng: city.lng,
          zoom: 10,
          slug: c.slug,
        },
        "city",
      );
    }
  }

  for (const d of FIJI_GLOBE_DESTINATIONS) {
    add(
      {
        type: "fiji",
        name: d.title,
        subtitle: "Fiji Islands",
        lat: d.lat,
        lng: d.lng,
        zoom: 8.5,
        slug: d.slug,
        fijiSlug: d.slug,
      },
      "fiji",
    );
    for (const h of d.highlights) {
      add(
        {
          type: "landmark",
          name: h,
          subtitle: d.title,
          lat: d.lat,
          lng: d.lng,
          zoom: 9,
          fijiSlug: d.slug,
        },
        "fiji-h",
      );
    }
  }

  for (const item of GLOBAL_SEARCH_ENTRIES) {
    add(item, "global");
  }

  return entries;
}

const SEARCH_INDEX = buildIndexedSearch();

export function searchWorldMap(query: string, limit = 10): MapSearchResult[] {
  const q = query.trim();
  if (q.length < 1) return [];

  const scored = SEARCH_INDEX.map((entry) => ({
    entry,
    score: scoreEntry(q, entry),
  }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ entry, score }) => {
    const { searchText: _s, aliases: _a, ...result } = entry;
    return { ...result, score };
  });
}

/** True when viewport is focused on Fiji archipelago */
export function isViewNearFiji(
  centerLat: number,
  centerLng: number,
  zoom: number,
): boolean {
  const dist = greatCircleDistanceKm(
    centerLat,
    centerLng,
    FIJI_MAP_CENTER.lat,
    FIJI_MAP_CENTER.lng,
  );
  if (zoom >= 6) return dist < 900;
  if (zoom >= 5) return dist < 700;
  if (zoom >= 4) return dist < 500;
  return dist < 350 && zoom >= 3;
}

export function getFijiGuideFromView(
  centerLat: number,
  centerLng: number,
): { distanceKm: number; bearing: number } {
  return {
    distanceKm: greatCircleDistanceKm(
      centerLat,
      centerLng,
      FIJI_MAP_CENTER.lat,
      FIJI_MAP_CENTER.lng,
    ),
    bearing: bearingDegrees(
      centerLat,
      centerLng,
      FIJI_MAP_CENTER.lat,
      FIJI_MAP_CENTER.lng,
    ),
  };
}

export function resolveFijiSlug(result: MapSearchResult): string | undefined {
  if (result.fijiSlug) return result.fijiSlug;
  if (result.type === "fiji" && result.slug) return result.slug;
  return undefined;
}
