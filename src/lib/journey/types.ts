export type JourneyBudget = "essential" | "premium" | "ultra" | "open";

export interface JourneyDraft {
  destinationSlug: string | null;
  destinationTitle: string | null;
  checkIn: string | null;
  checkOut: string | null;
  travellers: {
    adults: number;
    children: number;
    infants: number;
    rooms: number;
  };
  budget: JourneyBudget | null;
  experienceType: string | null;
}

export const DEFAULT_JOURNEY_DRAFT: JourneyDraft = {
  destinationSlug: null,
  destinationTitle: null,
  checkIn: null,
  checkOut: null,
  travellers: { adults: 2, children: 0, infants: 0, rooms: 1 },
  budget: null,
  experienceType: null,
};
