import type { VisaCountry, VisaDocumentId, VisaRequirement, VisaStatus } from "@/types/visa";

export type TravelPurpose =
  | "tourism"
  | "business"
  | "honeymoon"
  | "family"
  | "medical";

export type TravelDuration =
  | "under_7_days"
  | "one_to_two_weeks"
  | "two_to_four_weeks"
  | "one_to_three_months";

export type RiskLevel = "low" | "medium" | "high";

export type ReadinessCategoryId =
  | "passport"
  | "documents"
  | "funds"
  | "accommodation"
  | "flight";

export interface VisaAssistantIntake {
  nationality: VisaCountry;
  departureCountry: VisaCountry;
  purpose: TravelPurpose;
  duration: TravelDuration;
  travelDates?: string;
  budget?: "economy" | "premium" | "luxury";
  travelerName?: string;
}

export interface ReadinessCategory {
  id: ReadinessCategoryId;
  label: string;
  score: number;
  status: "excellent" | "good" | "attention" | "critical";
  note: string;
}

export interface TimelineMilestone {
  daysBefore: number;
  title: string;
  tasks: string[];
}

export interface TripRecommendation {
  type: "resort" | "island" | "activity" | "package";
  title: string;
  description: string;
  href?: string;
  priceHint?: string;
}

export interface VisaAssistantAnalysis {
  requirement: VisaRequirement;
  intake: VisaAssistantIntake;
  aiSummary: string;
  travelNotes: string[];
  readinessScore: number;
  readinessCategories: ReadinessCategory[];
  requiredDocuments: VisaDocumentId[];
  recommendedDocuments: VisaDocumentId[];
  riskLevel: RiskLevel;
  riskReasons: string[];
  timeline: TimelineMilestone[];
  tripRecommendations: TripRecommendation[];
  checklistItems: { id: VisaDocumentId; label: string; required: boolean }[];
  generatedAt: string;
}

export interface VisaChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface VisaAssistantChatRequest {
  message: string;
  intake?: Partial<VisaAssistantIntake>;
  nationalitySlug?: string;
}

export interface VisaAssistantChatResponse {
  reply: string;
  suggestedQuestions?: string[];
}

export const TRAVEL_PURPOSE_LABELS: Record<TravelPurpose, string> = {
  tourism: "Tourism & Leisure",
  business: "Business Visit",
  honeymoon: "Honeymoon & Romance",
  family: "Family Holiday",
  medical: "Medical Travel",
};

export const TRAVEL_DURATION_LABELS: Record<TravelDuration, string> = {
  under_7_days: "Under 7 days",
  one_to_two_weeks: "1–2 weeks",
  two_to_four_weeks: "2–4 weeks",
  one_to_three_months: "1–3 months",
};

export const RISK_LEVEL_LABELS: Record<RiskLevel, string> = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk",
};

export const VISA_STATUS_AI_NOTES: Record<VisaStatus, string> = {
  visa_free: "Excellent news — no pre-approved visa is required for tourism visits.",
  visa_on_arrival: "You can obtain your visitor permit on arrival at Nadi or Suva airport.",
  evisa: "Apply online through Fiji Immigration before departure to avoid delays.",
  visa_required: "Plan ahead — embassy or consulate processing is required before travel.",
};
