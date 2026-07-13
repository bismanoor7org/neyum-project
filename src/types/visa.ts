/** Fiji visa eligibility — scalable types for future API integration */

export type VisaStatus = "visa_free" | "visa_on_arrival" | "evisa" | "visa_required";

export type VisaDocumentId =
  | "passport"
  | "passport_photos"
  | "return_flight"
  | "hotel_reservation"
  | "bank_statement"
  | "travel_insurance"
  | "proof_of_funds";

export interface VisaDocumentItem {
  id: VisaDocumentId;
  label: string;
  description?: string;
}

export interface VisaTravelRequirements {
  minPassportValidity: string;
  entryRestrictions?: string;
  vaccination?: string;
  immigrationNotes?: string;
  customs?: string;
}

export interface VisaRecommendations {
  bestSeason: string;
  popularResorts: string[];
  avgBudget: string;
  suggestedItinerary: string;
}

export interface VisaCountry {
  iso2: string;
  name: string;
  slug: string;
}

export interface VisaRequirement {
  country: VisaCountry;
  status: VisaStatus;
  allowedStay: string;
  processingTime: string;
  entryType: string;
  passportValidity: string;
  documents: VisaDocumentId[];
  travelRequirements: VisaTravelRequirements;
  recommendations: VisaRecommendations;
}

export const VISA_STATUS_LABELS: Record<VisaStatus, string> = {
  visa_free: "Visa Free",
  visa_on_arrival: "Visa On Arrival",
  evisa: "eVisa",
  visa_required: "Visa Required",
};

export const VISA_DOCUMENT_CATALOG: Record<VisaDocumentId, VisaDocumentItem> = {
  passport: {
    id: "passport",
    label: "Valid Passport",
    description: "Machine-readable passport valid for your entire stay",
  },
  passport_photos: {
    id: "passport_photos",
    label: "Passport Photos",
    description: "Two recent passport-size photographs",
  },
  return_flight: {
    id: "return_flight",
    label: "Return Flight Ticket",
    description: "Confirmed onward or return air ticket",
  },
  hotel_reservation: {
    id: "hotel_reservation",
    label: "Hotel Reservation",
    description: "Confirmed resort or hotel booking in Fiji",
  },
  bank_statement: {
    id: "bank_statement",
    label: "Bank Statement",
    description: "Recent bank statements (last 3 months)",
  },
  travel_insurance: {
    id: "travel_insurance",
    label: "Travel Insurance",
    description: "Comprehensive travel and medical cover",
  },
  proof_of_funds: {
    id: "proof_of_funds",
    label: "Proof of Funds",
    description: "Evidence of sufficient funds for your trip",
  },
};
