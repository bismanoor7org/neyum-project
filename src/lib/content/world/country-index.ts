import type { WorldCountryIndex } from "./types";

/** Searchable world index — capitals with map coordinates */
export const countryIndex: WorldCountryIndex[] = [
  { slug: "fiji", name: "Fiji", continent: "oceania", capital: "Suva", lat: -18.141, lng: 178.442, flag: "🇫🇯", featured: true, trending: true },
  { slug: "australia", name: "Australia", continent: "oceania", capital: "Canberra", lat: -35.282, lng: 149.129, flag: "🇦🇺", trending: true },
  { slug: "new-zealand", name: "New Zealand", continent: "oceania", capital: "Wellington", lat: -41.286, lng: 174.776, flag: "🇳🇿", trending: true },
  { slug: "french-polynesia", name: "French Polynesia", continent: "oceania", capital: "Papeete", lat: -17.535, lng: -149.567, flag: "🇵🇫", hiddenGem: true },
  { slug: "japan", name: "Japan", continent: "asia", capital: "Tokyo", lat: 35.676, lng: 139.65, flag: "🇯🇵", trending: true, featured: true },
  { slug: "thailand", name: "Thailand", continent: "asia", capital: "Bangkok", lat: 13.756, lng: 100.502, flag: "🇹🇭", trending: true },
  { slug: "maldives", name: "Maldives", continent: "asia", capital: "Malé", lat: 4.175, lng: 73.509, flag: "🇲🇻", featured: true },
  { slug: "uae", name: "United Arab Emirates", continent: "asia", capital: "Abu Dhabi", lat: 24.453, lng: 54.377, flag: "🇦🇪", trending: true },
  { slug: "india", name: "India", continent: "asia", capital: "New Delhi", lat: 28.614, lng: 77.209, flag: "🇮🇳" },
  { slug: "singapore", name: "Singapore", continent: "asia", capital: "Singapore", lat: 1.352, lng: 103.82, flag: "🇸🇬", trending: true },
  { slug: "indonesia", name: "Indonesia", continent: "asia", capital: "Jakarta", lat: -6.208, lng: 106.845, flag: "🇮🇩" },
  { slug: "vietnam", name: "Vietnam", continent: "asia", capital: "Hanoi", lat: 21.028, lng: 105.854, flag: "🇻🇳", hiddenGem: true },
  { slug: "france", name: "France", continent: "europe", capital: "Paris", lat: 48.857, lng: 2.352, flag: "🇫🇷", trending: true, featured: true },
  { slug: "italy", name: "Italy", continent: "europe", capital: "Rome", lat: 41.903, lng: 12.496, flag: "🇮🇹", trending: true },
  { slug: "greece", name: "Greece", continent: "europe", capital: "Athens", lat: 37.984, lng: 23.728, flag: "🇬🇷", featured: true },
  { slug: "spain", name: "Spain", continent: "europe", capital: "Madrid", lat: 40.417, lng: -3.704, flag: "🇪🇸", trending: true },
  { slug: "switzerland", name: "Switzerland", continent: "europe", capital: "Bern", lat: 46.948, lng: 7.447, flag: "🇨🇭", featured: true },
  { slug: "united-kingdom", name: "United Kingdom", continent: "europe", capital: "London", lat: 51.507, lng: -0.128, flag: "🇬🇧", trending: true },
  { slug: "usa", name: "United States", continent: "north-america", capital: "Washington D.C.", lat: 38.907, lng: -77.037, flag: "🇺🇸", trending: true, featured: true },
  { slug: "canada", name: "Canada", continent: "north-america", capital: "Ottawa", lat: 45.421, lng: -75.697, flag: "🇨🇦" },
  { slug: "mexico", name: "Mexico", continent: "north-america", capital: "Mexico City", lat: 19.433, lng: -99.133, flag: "🇲🇽", trending: true },
  { slug: "brazil", name: "Brazil", continent: "south-america", capital: "Brasília", lat: -15.794, lng: -47.882, flag: "🇧🇷", trending: true },
  { slug: "peru", name: "Peru", continent: "south-america", capital: "Lima", lat: -12.046, lng: -77.043, flag: "🇵🇪", hiddenGem: true },
  { slug: "argentina", name: "Argentina", continent: "south-america", capital: "Buenos Aires", lat: -34.604, lng: -58.382, flag: "🇦🇷" },
  { slug: "colombia", name: "Colombia", continent: "south-america", capital: "Bogotá", lat: 4.711, lng: -74.072, flag: "🇨🇴", hiddenGem: true },
  { slug: "egypt", name: "Egypt", continent: "africa", capital: "Cairo", lat: 30.044, lng: 31.236, flag: "🇪🇬", trending: true },
  { slug: "morocco", name: "Morocco", continent: "africa", capital: "Rabat", lat: 34.021, lng: -6.822, flag: "🇲🇦", featured: true },
  { slug: "south-africa", name: "South Africa", continent: "africa", capital: "Pretoria", lat: -25.747, lng: 28.229, flag: "🇿🇦", trending: true },
  { slug: "kenya", name: "Kenya", continent: "africa", capital: "Nairobi", lat: -1.292, lng: 36.822, flag: "🇰🇪", hiddenGem: true },
  { slug: "tanzania", name: "Tanzania", continent: "africa", capital: "Dodoma", lat: -6.163, lng: 35.752, flag: "🇹🇿" },
  { slug: "iceland", name: "Iceland", continent: "europe", capital: "Reykjavik", lat: 64.146, lng: -21.942, flag: "🇮🇸", hiddenGem: true },
  { slug: "portugal", name: "Portugal", continent: "europe", capital: "Lisbon", lat: 38.722, lng: -9.139, flag: "🇵🇹" },
  { slug: "croatia", name: "Croatia", continent: "europe", capital: "Zagreb", lat: 45.815, lng: 15.982, flag: "🇭🇷", hiddenGem: true },
  { slug: "south-korea", name: "South Korea", continent: "asia", capital: "Seoul", lat: 37.566, lng: 126.978, flag: "🇰🇷" },
  { slug: "china", name: "China", continent: "asia", capital: "Beijing", lat: 39.904, lng: 116.407, flag: "🇨🇳" },
  { slug: "turkey", name: "Turkey", continent: "asia", capital: "Ankara", lat: 39.933, lng: 32.86, flag: "🇹🇷", trending: true },
  { slug: "jordan", name: "Jordan", continent: "asia", capital: "Amman", lat: 31.945, lng: 35.928, flag: "🇯🇴", hiddenGem: true },
  { slug: "costa-rica", name: "Costa Rica", continent: "north-america", capital: "San José", lat: 9.928, lng: -84.091, flag: "🇨🇷", hiddenGem: true },
  { slug: "antarctica", name: "Antarctica", continent: "antarctica", capital: "Research stations", lat: -82.862, lng: 135.0, flag: "🇦🇶" },
];

export const WORLD_COUNTRY_TOTAL = 195;

export function getCountryIndex(slug: string) {
  return countryIndex.find((c) => c.slug === slug);
}

export function getCountryIndexSlugs() {
  return countryIndex.map((c) => c.slug);
}

export function searchCountries(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return countryIndex;
  return countryIndex.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.capital.toLowerCase().includes(q) ||
      c.continent.includes(q),
  );
}
