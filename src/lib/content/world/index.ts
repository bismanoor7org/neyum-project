export * from "./types";
export { continents } from "./continents";
export {
  countryIndex,
  WORLD_COUNTRY_TOTAL,
  getCountryIndex,
  getCountryIndexSlugs,
  searchCountries,
} from "./country-index";
export {
  showcaseCountries,
  worldTours,
  getWorldCountry,
  getWorldCountrySlugs,
  getCity,
} from "./countries";

import type { ContinentSlug, TravelStyle } from "./types";
import { countryIndex } from "./country-index";
import { getWorldCountry } from "./countries";

export function getTrendingCountries() {
  return countryIndex.filter((c) => c.trending).map((c) => getWorldCountry(c.slug)!);
}

export function getFeaturedCountries() {
  return countryIndex.filter((c) => c.featured).map((c) => getWorldCountry(c.slug)!);
}

export function getHiddenGems() {
  return countryIndex.filter((c) => c.hiddenGem).map((c) => getWorldCountry(c.slug)!);
}

export function getMostVisitedCountries() {
  return [...countryIndex]
    .map((c) => getWorldCountry(c.slug)!)
    .sort((a, b) => b.visitCount - a.visitCount)
    .slice(0, 8);
}

export function filterCountries(opts: {
  continent?: ContinentSlug;
  style?: TravelStyle;
  query?: string;
}) {
  let list = countryIndex;
  if (opts.continent) list = list.filter((c) => c.continent === opts.continent);
  if (opts.query) {
    const q = opts.query.toLowerCase();
    list = list.filter(
      (c) => c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q),
    );
  }
  if (opts.style) {
    return list
      .map((c) => getWorldCountry(c.slug)!)
      .filter((c) => c.travelStyles.includes(opts.style!));
  }
  return list.map((c) => getWorldCountry(c.slug)!);
}

export function searchAll(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return { countries: [], cities: [] as { countrySlug: string; city: import("./types").WorldCity }[] };
  const countries = countryIndex.filter(
    (c) => c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q),
  );
  const cities: { countrySlug: string; city: import("./types").WorldCity }[] = [];
  for (const c of countryIndex) {
    const country = getWorldCountry(c.slug);
    if (!country) continue;
    for (const city of country.cities) {
      if (city.name.toLowerCase().includes(q)) {
        cities.push({ countrySlug: c.slug, city });
      }
    }
  }
  return { countries, cities };
}
