import type { VisaType } from "@prisma/client";
import type {
  VisaCountry,
  VisaDocumentId,
  VisaRecommendations,
  VisaRequirement,
  VisaStatus,
  VisaTravelRequirements,
} from "@/types/visa";
import type { TravelDocumentRequirement, VisaRule, Country, EntryGuide } from "@prisma/client";

export const FIJI_DESTINATION = "FJ";

export function visaTypeToStatus(type: VisaType): VisaStatus {
  switch (type) {
    case "VISA_FREE":
      return "visa_free";
    case "VISA_ON_ARRIVAL":
      return "visa_on_arrival";
    case "EVISA":
      return "evisa";
    case "VISA_REQUIRED":
      return "visa_required";
  }
}

export function statusToVisaType(status: VisaStatus): VisaType {
  switch (status) {
    case "visa_free":
      return "VISA_FREE";
    case "visa_on_arrival":
      return "VISA_ON_ARRIVAL";
    case "evisa":
      return "EVISA";
    case "visa_required":
      return "VISA_REQUIRED";
  }
}

export function countryToVisaCountry(country: Country): VisaCountry {
  return {
    iso2: country.code,
    name: country.name,
    slug: country.slug,
  };
}

function documentsFromRequirement(doc: TravelDocumentRequirement | null): VisaDocumentId[] {
  if (!doc) return ["passport", "return_flight", "hotel_reservation"];

  const docs: VisaDocumentId[] = ["passport"];
  if (doc.passportPhotosRequired) docs.push("passport_photos");
  if (doc.returnTicketRequired) docs.push("return_flight");
  if (doc.hotelBookingRequired) docs.push("hotel_reservation");
  if (doc.bankStatementRequired) docs.push("bank_statement");
  if (doc.insuranceRequired) docs.push("travel_insurance");
  if (doc.proofOfFundsRequired) docs.push("proof_of_funds");

  const extra = doc.additionalDocuments;
  if (Array.isArray(extra)) {
    for (const item of extra) {
      if (typeof item === "string" && !docs.includes(item as VisaDocumentId)) {
        docs.push(item as VisaDocumentId);
      }
    }
  }

  return docs;
}

function parseRecommendations(value: VisaRule["recommendations"]): VisaRecommendations {
  const fallback: VisaRecommendations = {
    bestSeason: "May–October (dry season)",
    popularResorts: ["Likuliku Lagoon", "InterContinental Fiji", "Tokoriki Island"],
    avgBudget: "FJD 450–1,200 per person per day",
    suggestedItinerary: "3 nights Denarau + 4 nights Mamanuca island resort",
  };

  if (!value || typeof value !== "object" || Array.isArray(value)) return fallback;

  const rec = value as Partial<VisaRecommendations>;
  return {
    bestSeason: rec.bestSeason ?? fallback.bestSeason,
    popularResorts: Array.isArray(rec.popularResorts) ? rec.popularResorts : fallback.popularResorts,
    avgBudget: rec.avgBudget ?? fallback.avgBudget,
    suggestedItinerary: rec.suggestedItinerary ?? fallback.suggestedItinerary,
  };
}

export function buildVisaRequirement(params: {
  country: Country;
  rule: VisaRule;
  travelDocs: TravelDocumentRequirement | null;
  entryGuide: EntryGuide | null;
}): VisaRequirement {
  const { country, rule, travelDocs, entryGuide } = params;
  const status = visaTypeToStatus(rule.visaType);

  const travelRequirements: VisaTravelRequirements = {
    minPassportValidity: travelDocs?.passportValidity ?? "6 months beyond your departure from Fiji",
    entryRestrictions: rule.entryConditions ?? undefined,
    vaccination: entryGuide?.healthRequirements ?? undefined,
    immigrationNotes: entryGuide?.immigrationProcess ?? rule.notes ?? undefined,
    customs: entryGuide?.customsInfo ?? undefined,
  };

  return {
    country: countryToVisaCountry(country),
    status,
    allowedStay: rule.stayDuration,
    processingTime: rule.processingTime,
    entryType: rule.entryType ?? "Visitor entry",
    passportValidity: travelDocs?.passportValidity ?? "6 months beyond intended stay",
    documents: documentsFromRequirement(travelDocs),
    travelRequirements,
    recommendations: parseRecommendations(rule.recommendations),
  };
}
