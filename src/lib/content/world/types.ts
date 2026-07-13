export type ContinentSlug =
  | "africa"
  | "antarctica"
  | "asia"
  | "europe"
  | "north-america"
  | "oceania"
  | "south-america";

export type TravelStyle =
  | "luxury"
  | "adventure"
  | "beach"
  | "culture"
  | "wildlife"
  | "romance"
  | "family";

export type LandscapeType =
  | "beach"
  | "mountain"
  | "island"
  | "desert"
  | "forest"
  | "city"
  | "adventure";

export interface WorldContinent {
  slug: ContinentSlug;
  name: string;
  tagline: string;
  image: string;
  countryCount: number;
}

export interface WorldCountryIndex {
  slug: string;
  name: string;
  continent: ContinentSlug;
  capital: string;
  lat: number;
  lng: number;
  flag: string;
  featured?: boolean;
  trending?: boolean;
  hiddenGem?: boolean;
}

export interface WorldCity {
  slug: string;
  countrySlug: string;
  name: string;
  tagline: string;
  lat: number;
  lng: number;
  image: string;
  population?: string;
  highlights: string[];
  activities: string[];
  luxuryExperiences: string[];
  landmarks: string[];
}

export interface WorldCountry extends WorldCountryIndex {
  tagline: string;
  overview: string;
  heroImage: string;
  cardImage: string;
  bestTime: string;
  weather: string;
  visa: string;
  currency: string;
  language: string;
  budget: "budget" | "mid" | "luxury";
  travelStyles: TravelStyle[];
  landscapes: LandscapeType[];
  highlights: string[];
  attractions: string[];
  visitCount: number;
  cities: WorldCity[];
  relatedSlugs: string[];
}

export interface WorldTour {
  slug: string;
  title: string;
  countrySlug: string;
  citySlug?: string;
  image: string;
  duration: string;
  priceFrom: string;
  style: TravelStyle;
  featured?: boolean;
}
