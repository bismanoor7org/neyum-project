export type BookingTab = "stay" | "experiences" | "packages";

export interface BookingDestination {
  slug: string;
  title: string;
  tagline: string;
  popular: boolean;
  popularRank: number;
}

export interface TravellerCounts {
  adults: number;
  children: number;
  infants: number;
  rooms: number;
}

export interface BookingDraft {
  tab: BookingTab;
  destinationSlug: string | null;
  destinationTitle: string | null;
  checkIn: string | null;
  checkOut: string | null;
  travellers: TravellerCounts;
  experienceType: string | null;
  packageStyle: string | null;
}

export interface BookingSearchParams {
  tab: BookingTab;
  destination: string;
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  infants: number;
  rooms: number;
  experience?: string;
  package?: string;
}

export interface RecentSearch {
  id: string;
  tab: BookingTab;
  destinationSlug: string;
  destinationTitle: string;
  searchedAt: number;
}

export interface ValidationErrors {
  destination?: string;
  dates?: string;
  travellers?: string;
  experience?: string;
  package?: string;
  general?: string;
}

export const DEFAULT_TRAVELLERS: TravellerCounts = {
  adults: 2,
  children: 0,
  infants: 0,
  rooms: 1,
};

export const DEFAULT_BOOKING_DRAFT: BookingDraft = {
  tab: "stay",
  destinationSlug: null,
  destinationTitle: null,
  checkIn: null,
  checkOut: null,
  travellers: DEFAULT_TRAVELLERS,
  experienceType: null,
  packageStyle: null,
};
