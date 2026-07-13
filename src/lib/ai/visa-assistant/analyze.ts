import "server-only";

import { getVisaRequirement as getVisaRequirementFromDb } from "@/server/services/visa-intelligence.service";
import type { VisaRequirement } from "@/types/visa";
import type { VisaDocumentId, VisaStatus } from "@/types/visa";
import { VISA_DOCUMENT_CATALOG, VISA_STATUS_LABELS } from "@/types/visa";
import type {
  ReadinessCategory,
  RiskLevel,
  TimelineMilestone,
  TravelDuration,
  TravelPurpose,
  TripRecommendation,
  VisaAssistantAnalysis,
  VisaAssistantIntake,
} from "@/types/visa-assistant";
import {
  TRAVEL_DURATION_LABELS,
  TRAVEL_PURPOSE_LABELS,
  VISA_STATUS_AI_NOTES,
} from "@/types/visa-assistant";

const EXTRA_RECOMMENDED: VisaDocumentId[] = ["travel_insurance", "proof_of_funds"];

function durationRisk(duration: TravelDuration): number {
  switch (duration) {
    case "under_7_days":
      return 0;
    case "one_to_two_weeks":
      return 5;
    case "two_to_four_weeks":
      return 10;
    case "one_to_three_months":
      return 18;
  }
}

function purposeNote(purpose: TravelPurpose): string {
  switch (purpose) {
    case "tourism":
      return "Tourism visits are the most straightforward pathway for Fiji entry.";
    case "business":
      return "Business visitors should carry invitation letters and proof of meetings.";
    case "honeymoon":
      return "Honeymoon travellers often qualify for resort packages with bundled transfers.";
    case "family":
      return "Families should ensure minors have consent letters if travelling with one parent.";
    case "medical":
      return "Medical travellers should carry treatment letters and comprehensive insurance.";
  }
}

function computeRisk(
  status: VisaStatus,
  duration: TravelDuration,
  departureDiffers: boolean,
): { level: RiskLevel; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  if (status === "visa_required") {
    score += 40;
    reasons.push("Pre-approved visa required before departure");
  } else if (status === "evisa") {
    score += 22;
    reasons.push("eVisa must be approved before boarding");
  } else if (status === "visa_on_arrival") {
    score += 12;
    reasons.push("Visa fee and documents checked at immigration on arrival");
  }

  score += durationRisk(duration);
  if (duration === "one_to_three_months") {
    reasons.push("Extended stays may trigger additional immigration scrutiny");
  }

  if (departureDiffers) {
    score += 8;
    reasons.push("Departing from a different country — carry residency proof if applicable");
  }

  const level: RiskLevel = score >= 35 ? "high" : score >= 18 ? "medium" : "low";
  if (level === "low" && reasons.length === 0) {
    reasons.push("Standard tourism pathway with clear entry requirements");
  }

  return { level, reasons };
}

function buildReadinessCategories(
  requirement: VisaRequirement | null | undefined,
  checkedDocs: Set<VisaDocumentId>,
): ReadinessCategory[] {
  const required = new Set(requirement?.documents ?? []);
  const docScore = required.size
    ? Math.round(
        ([...required].filter((d) => checkedDocs.has(d)).length / required.size) * 100,
      )
    : 70;

  const hasFunds = checkedDocs.has("proof_of_funds") || checkedDocs.has("bank_statement");
  const hasAccommodation = checkedDocs.has("hotel_reservation");
  const hasFlight = checkedDocs.has("return_flight");
  const hasPassport = checkedDocs.has("passport");

  return [
    {
      id: "passport",
      label: "Passport Status",
      score: hasPassport ? 96 : 42,
      status: hasPassport ? "excellent" : "critical",
      note: requirement?.passportValidity ?? "6 months validity recommended",
    },
    {
      id: "documents",
      label: "Documents",
      score: docScore,
      status: docScore >= 85 ? "excellent" : docScore >= 60 ? "good" : "attention",
      note: `${[...required].filter((d) => checkedDocs.has(d)).length} of ${required.size} required documents confirmed`,
    },
    {
      id: "funds",
      label: "Funds",
      score: hasFunds ? 88 : 52,
      status: hasFunds ? "good" : "attention",
      note: hasFunds ? "Proof of funds documented" : "Bank statement or proof of funds recommended",
    },
    {
      id: "accommodation",
      label: "Accommodation",
      score: hasAccommodation ? 94 : 48,
      status: hasAccommodation ? "excellent" : "attention",
      note: hasAccommodation ? "Resort booking confirmed" : "Hotel reservation required for immigration",
    },
    {
      id: "flight",
      label: "Flight Readiness",
      score: hasFlight ? 92 : 45,
      status: hasFlight ? "excellent" : "critical",
      note: hasFlight ? "Return ticket secured" : "Confirmed return or onward ticket required",
    },
  ];
}

function buildTimeline(intake: VisaAssistantIntake, status: VisaStatus): TimelineMilestone[] {
  const visaTask =
    status === "visa_free"
      ? "Confirm passport validity and print accommodation details"
      : status === "visa_on_arrival"
        ? "Prepare visa fee payment and printed hotel/flight confirmations"
        : status === "evisa"
          ? "Submit eVisa application via Fiji Immigration portal"
          : "Apply at nearest Fiji embassy — allow 2–4 weeks processing";

  return [
    {
      daysBefore: 30,
      title: "30 Days Before Travel",
      tasks: [
        visaTask,
        "Book refundable resort or hotel accommodation",
        "Arrange comprehensive travel insurance",
        `Purpose: ${TRAVEL_PURPOSE_LABELS[intake.purpose]} — gather supporting documents`,
      ],
    },
    {
      daysBefore: 15,
      title: "15 Days Before Travel",
      tasks: [
        "Confirm return flights and save boarding pass copies",
        "Prepare bank statements (last 3 months) if required",
        "Check passport expiry against Fiji's 6-month rule",
        "Notify your bank of international travel dates",
      ],
    },
    {
      daysBefore: 7,
      title: "7 Days Before Travel",
      tasks: [
        "Complete document checklist and save PDF copy",
        "Pre-arrange Nadi airport transfer with your resort",
        "Download offline maps and Fiji immigration contact details",
        "Pack modest attire for any village visits planned",
      ],
    },
    {
      daysBefore: 1,
      title: "1 Day Before Travel",
      tasks: [
        "Carry printed copies of hotel, flights, and insurance",
        "Keep visa fee funds accessible (card + cash backup)",
        "Confirm check-in times for inter-island transfers",
        `Duration: ${TRAVEL_DURATION_LABELS[intake.duration]} — ensure itinerary matches entry permit`,
      ],
    },
  ];
}

function buildTripRecommendations(
  intake: VisaAssistantIntake,
  requirement: VisaRequirement,
): TripRecommendation[] {
  const budget = intake.budget ?? "luxury";
  const recs = requirement.recommendations;

  const resorts: TripRecommendation[] = recs.popularResorts.map((title) => ({
    type: "resort" as const,
    title,
    description: `Handpicked for ${intake.nationality.name} travellers — ${recs.avgBudget}`,
    href: "/places-to-stay",
    priceHint: budget === "luxury" ? "From FJD 1,200/night" : "From FJD 650/night",
  }));

  const islands: TripRecommendation[] = [
    {
      type: "island",
      title: "Mamanuca Islands",
      description: "Crystal lagoons and overwater bures — ideal for first-time visitors",
      href: "/destinations/mamanuca",
    },
    {
      type: "island",
      title: "Yasawa Islands",
      description: "Remote island chain for extended stays and diving",
      href: "/destinations/yasawa",
    },
  ];

  const activities: TripRecommendation[] = [
    {
      type: "activity",
      title: "Island Hopping Adventure",
      description: recs.suggestedItinerary,
      href: "/tours/island-hopping",
    },
    {
      type: "activity",
      title: "Snorkelling in Crystal Waters",
      description: `Best season: ${recs.bestSeason}`,
      href: "/tours/snorkelling-crystal-waters",
    },
  ];

  const packages: TripRecommendation[] = [
    {
      type: "package",
      title: `${intake.nationality.name} Luxury Fiji Package`,
      description: `Curated ${TRAVEL_DURATION_LABELS[intake.duration]} itinerary with concierge support`,
      href: "/deals-and-offers/package-deals",
      priceHint: recs.avgBudget,
    },
  ];

  return [...resorts.slice(0, 2), ...islands, ...activities, ...packages];
}

export async function buildVisaAssistantAnalysis(
  intake: VisaAssistantIntake,
  checkedDocuments: VisaDocumentId[] = [],
): Promise<VisaAssistantAnalysis | null> {
  const requirement = await getVisaRequirementFromDb(intake.nationality.slug);
  if (!requirement) return null;

  const checkedSet = new Set(checkedDocuments);
  const requiredDocuments = requirement.documents;
  const recommendedDocuments = [
    ...new Set([...requiredDocuments, ...EXTRA_RECOMMENDED]),
  ] as VisaDocumentId[];

  const readinessCategories = buildReadinessCategories(requirement, checkedSet);
  const readinessScore = Math.round(
    readinessCategories.reduce((sum, c) => sum + c.score, 0) / readinessCategories.length,
  );

  const departureDiffers =
    intake.departureCountry.iso2 !== intake.nationality.iso2;
  const { level: riskLevel, reasons: riskReasons } = computeRisk(
    requirement.status,
    intake.duration,
    departureDiffers,
  );

  const travelNotes = [
    VISA_STATUS_AI_NOTES[requirement.status],
    purposeNote(intake.purpose),
    `Allowed stay: ${requirement.allowedStay}`,
    requirement.travelRequirements.immigrationNotes ??
      "Present return ticket and proof of accommodation at immigration.",
  ];

  const aiSummary = `As a ${intake.nationality.name} passport holder travelling for ${TRAVEL_PURPOSE_LABELS[intake.purpose].toLowerCase()} (${TRAVEL_DURATION_LABELS[intake.duration]}), your Fiji entry status is ${VISA_STATUS_LABELS[requirement.status]}. ${VISA_STATUS_AI_NOTES[requirement.status]} Your travel readiness score is ${readinessScore}/100.`;

  return {
    requirement,
    intake,
    aiSummary,
    travelNotes,
    readinessScore,
    readinessCategories,
    requiredDocuments,
    recommendedDocuments,
    riskLevel,
    riskReasons,
    timeline: buildTimeline(intake, requirement.status),
    tripRecommendations: buildTripRecommendations(intake, requirement),
    checklistItems: recommendedDocuments.map((id) => ({
      id,
      label: VISA_DOCUMENT_CATALOG[id].label,
      required: requiredDocuments.includes(id),
    })),
    generatedAt: new Date().toISOString(),
  };
}

export function detectMissingDocuments(
  analysis: VisaAssistantAnalysis,
  checkedDocuments: VisaDocumentId[],
): VisaDocumentId[] {
  const checked = new Set(checkedDocuments);
  return analysis.recommendedDocuments.filter((id) => !checked.has(id));
}
