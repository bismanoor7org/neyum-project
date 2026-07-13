export interface ContentSection {
  title: string;
  body: string;
  items?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Destination {
  slug: string;
  title: string;
  region: "mainland" | "islands";
  tagline: string;
  overview: string;
  description?: string;
  heroImage: string;
  cardImage: string;
  gallery?: string[];
  highlights: string[];
  thingsToDo: string[];
  placesToStay: string[];
  tours: string[];
  beaches: string[];
  dining: string[];
  transport: string[];
  culture: string[];
  weather: string;
  bestTimeToVisit?: string;
  travelTips?: string[];
  faqs: FAQItem[];
  relatedSlugs: string[];
}

export interface DestinationMarketplaceStats {
  experiences: number;
  stays: number;
  packages: number;
  tours: number;
  transport: number;
  startingPrice: string | null;
}

export interface DestinationListingItem extends Destination {
  stats: DestinationMarketplaceStats;
}

export interface DestinationMarketplaceExperience {
  slug: string;
  title: string;
  location: string;
  image: string;
  priceFrom: string;
  duration: string;
  category: string;
  href: string;
}

export interface DestinationMarketplaceStay {
  slug: string;
  title: string;
  location: string;
  image: string;
  priceFrom: string;
  stars: number;
  href: string;
}

export interface DestinationMarketplacePackage {
  slug: string;
  title: string;
  location: string;
  image: string;
  price: string;
  href: string;
}

export interface DestinationMarketplaceTransport {
  title: string;
  description?: string;
  href: string;
}

export interface DestinationMarketplaceData {
  stats: DestinationMarketplaceStats;
  experiences: DestinationMarketplaceExperience[];
  tours: DestinationMarketplaceExperience[];
  packages: DestinationMarketplacePackage[];
  stays: DestinationMarketplaceStay[];
  transport: DestinationMarketplaceTransport[];
  transfers: DestinationMarketplaceTransport[];
}

export interface Experience {
  slug: string;
  title: string;
  location: string;
  category: string;
  duration: string;
  ages: string;
  priceFrom: string;
  rating: { score: string; count: number };
  heroImage: string;
  overview: string;
  highlights: string[];
  included: string[];
  itinerary: string[];
  faqs: FAQItem[];
  relatedSlugs: string[];
}

export interface Guide {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  heroImage: string;
  overview: string;
  sections: ContentSection[];
  faqs: FAQItem[];
  relatedSlugs: string[];
}

export interface Resort {
  slug: string;
  title: string;
  location: string;
  stars: number;
  priceFrom: string;
  heroImage: string;
  overview: string;
  amenities: string[];
  experiences: string[];
  relatedSlugs: string[];
}
