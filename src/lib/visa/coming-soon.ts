import { images } from "@/lib/images";

/** Flip to `false` to restore full visa hub pages. */
export const VISA_COMING_SOON_ENABLED = false;

export type VisaComingSoonKey =
  | "aiVisaAssistant"
  | "visaRequirements"
  | "travelDocuments"
  | "entryGuide";

export type VisaComingSoonConfig = {
  key: VisaComingSoonKey;
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  notifyTopic: string;
  jsonLdName: string;
  jsonLdDescription: string;
};

export const VISA_COMING_SOON_PAGES: Record<VisaComingSoonKey, VisaComingSoonConfig> = {
  aiVisaAssistant: {
    key: "aiVisaAssistant",
    path: "/ai-fiji-visa-assistant",
    eyebrow: "AI Visa Intelligence",
    title: "Your Personal Fiji Immigration Consultant",
    description:
      "We are finalising an AI-powered eligibility engine — readiness scoring, document intelligence, and luxury trip planning tailored to your nationality. Register for early access.",
    heroImage: images.guideVisa,
    heroImageAlt: "Luxury Fiji travel planning with AI visa guidance",
    notifyTopic: "AI Fiji Visa Assistant",
    jsonLdName: "AI Fiji Visa Assistant",
    jsonLdDescription:
      "Premium AI-powered Fiji visa consultant launching soon — eligibility analysis, readiness scoring, and personalised travel checklists.",
  },
  visaRequirements: {
    key: "visaRequirements",
    path: "/fiji-visa-checker",
    eyebrow: "Visa Eligibility",
    title: "Fiji Visa Requirements by Nationality",
    description:
      "A curated eligibility hub for discerning travellers — instant visa status, document checklists, and permitted stay limits for 200+ nationalities. Arriving shortly.",
    heroImage: images.travelReq,
    heroImageAlt: "Fiji visa requirements for international travellers",
    notifyTopic: "Fiji Visa Requirements",
    jsonLdName: "Fiji Visa Eligibility Checker",
    jsonLdDescription:
      "Fiji visa requirements by nationality — launching soon with instant eligibility, documents, and luxury travel preparation.",
  },
  travelDocuments: {
    key: "travelDocuments",
    path: "/fiji-travel-requirements",
    eyebrow: "Document Preparation",
    title: "Fiji Travel Documents Checklist",
    description:
      "Your secure preparation suite — passports, visas, insurance, proof of funds, and accommodation evidence organised in one premium checklist for Fiji-bound journeys.",
    heroImage: images.guideHealth,
    heroImageAlt: "Travel documents preparation for Fiji holidays",
    notifyTopic: "Fiji Travel Documents",
    jsonLdName: "Fiji Travel Requirements",
    jsonLdDescription:
      "Fiji travel document requirements — launching soon with personalised checklists for luxury travellers.",
  },
  entryGuide: {
    key: "entryGuide",
    path: "/fiji-entry-guide",
    eyebrow: "Arrival Intelligence",
    title: "Fiji Entry Guide",
    description:
      "Immigration, customs, and arrival intelligence for a seamless Fiji welcome — from Nadi touchdown to resort transfer, curated by our concierge team.",
    heroImage: images.storyNadi,
    heroImageAlt: "Arriving in Fiji — Nadi international gateway",
    notifyTopic: "Fiji Entry Guide",
    jsonLdName: "Fiji Entry Guide",
    jsonLdDescription:
      "Fiji immigration, customs, and arrival guide — launching soon with editorial preparation for luxury visitors.",
  },
};

export function isVisaComingSoon(_key: VisaComingSoonKey): boolean {
  return VISA_COMING_SOON_ENABLED;
}
