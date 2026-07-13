import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/json-ld";
import { SITE_URL } from "@/lib/seo/config";
import type { VisaRequirement } from "@/types/visa";
import { VISA_STATUS_LABELS } from "@/types/visa";

export function visaCheckerHubMetadata() {
  return buildPageMetadata({
    title: "AI Fiji Visa Assistant — Eligibility, Readiness & Travel Checklist",
    description:
      "Premium AI-powered Fiji visa consultant. Instant eligibility, travel readiness score, missing document detection, personalised checklists, chat assistant, and luxury trip recommendations.",
    path: "/fiji-visa-checker",
    keywords: [
      "Fiji visa",
      "AI visa assistant",
      "Fiji visa requirements",
      "Fiji visa checker",
      "Fiji travel readiness",
      "Fiji visa checklist",
      "travel to Fiji visa",
    ],
    imageAlt: "AI Fiji visa assistant luxury travel",
  });
}

export function aiVisaAssistantMetadata() {
  return buildPageMetadata({
    title: "AI Fiji Visa Assistant — Your Personal Immigration Consultant",
    description:
      "The most advanced Fiji visa assistant — AI eligibility analysis, readiness scoring, document tracker, smart timeline, risk analysis, and luxury trip recommendations.",
    path: "/ai-fiji-visa-assistant",
    keywords: [
      "AI Fiji visa",
      "Fiji visa AI assistant",
      "Fiji immigration consultant",
      "Fiji visa eligibility AI",
    ],
    imageAlt: "AI Fiji visa consultant",
  });
}

export const AI_VISA_ASSISTANT_FAQ = [
  {
    question: "Is the AI Fiji Visa Assistant official immigration advice?",
    answer:
      "No — it provides guidance based on published Fiji entry rules and your travel profile. Always verify final requirements with Fiji Immigration before you travel.",
  },
  {
    question: "Which nationalities are supported?",
    answer:
      "The assistant covers 200+ nationalities with eligibility status, permitted stay, processing times, and personalised document checklists from our live visa database.",
  },
  {
    question: "How does the readiness score work?",
    answer:
      "Your score reflects document completeness, eligibility match, and travel risk factors. It updates instantly as you check off required documents in the tracker.",
  },
  {
    question: "Can I ask follow-up questions?",
    answer:
      "Yes — use the AI Travel Consultant chat for entry rules, family travel, proof of funds, and document questions tailored to your nationality.",
  },
] as const;

export function fijiTravelRequirementsMetadata() {
  return buildPageMetadata({
    title: "Fiji Travel Requirements — Documents, Entry Rules & Preparation",
    description:
      "Complete Fiji travel requirements guide — passports, visas, funds, insurance, accommodation proof, and AI-powered preparation tools for luxury travellers.",
    path: "/fiji-travel-requirements",
    keywords: ["Fiji travel requirements", "Fiji entry documents", "Fiji immigration documents"],
    imageAlt: "Fiji travel requirements guide",
  });
}

export function fijiEntryGuideMetadata() {
  return buildPageMetadata({
    title: "Fiji Entry Guide — Immigration, Customs & Arrival Preparation",
    description:
      "Everything you need to enter Fiji smoothly — immigration process, customs rules, arrival checklist, and AI visa assistant for personalised guidance.",
    path: "/fiji-entry-guide",
    keywords: ["Fiji entry guide", "Fiji immigration", "Fiji customs", "Fiji arrival"],
    imageAlt: "Fiji entry guide",
  });
}

export function visaCountryMetadata(requirement: VisaRequirement) {
  const { country, status } = requirement;
  const statusLabel = VISA_STATUS_LABELS[status];
  const path = `/fiji-visa-for-${country.slug}`;

  return buildPageMetadata({
    title: `Fiji Visa for ${country.name} — ${statusLabel} Requirements & Documents`,
    description: `Complete Fiji visa guide for ${country.name} passport holders — ${statusLabel.toLowerCase()}, ${requirement.allowedStay} stay, processing time, required documents and travel tips for luxury Fiji holidays.`,
    path,
    keywords: [
      `Fiji visa for ${country.name}`,
      `Fiji visa ${country.name}`,
      `${country.name} passport Fiji`,
      "Fiji visa requirements",
      "Fiji travel visa",
      statusLabel,
    ],
    imageAlt: `Fiji visa requirements for ${country.name} travellers`,
  });
}

export function visaCountryJsonLd(requirement: VisaRequirement): object[] {
  const path = `/fiji-visa-for-${requirement.country.slug}`;
  const statusLabel = VISA_STATUS_LABELS[requirement.status];

  const faqs = [
    {
      question: `Do ${requirement.country.name} citizens need a visa for Fiji?`,
      answer: `${requirement.country.name} passport holders: ${statusLabel}. ${requirement.allowedStay}. ${requirement.processingTime}.`,
    },
    {
      question: `How long can ${requirement.country.name} citizens stay in Fiji?`,
      answer: requirement.allowedStay,
    },
    {
      question: `What documents do ${requirement.country.name} travellers need for Fiji?`,
      answer: `Required documents include: ${requirement.documents.join(", ").replace(/_/g, " ")}.`,
    },
    {
      question: `What is the passport validity requirement for Fiji?`,
      answer: requirement.passportValidity,
    },
  ];

  const faq = faqSchema(faqs);

  return [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Fiji Visa Checker", path: "/fiji-visa-checker" },
      { name: `${requirement.country.name} Visa`, path },
    ]),
    webPageSchema({
      name: `Fiji Visa for ${requirement.country.name}`,
      description: `${statusLabel} — ${requirement.allowedStay}`,
      path,
    }),
    {
      "@context": "https://schema.org",
      "@type": "GovernmentService",
      name: `Fiji Visitor Visa Information — ${requirement.country.name}`,
      description: `Visa eligibility guidance for ${requirement.country.name} nationals travelling to Fiji.`,
      url: `${SITE_URL}${path}`,
      serviceType: "Visa eligibility information",
      areaServed: { "@type": "Country", name: requirement.country.name },
      provider: {
        "@type": "Organization",
        name: "Fiji Luxury Experiences",
        url: SITE_URL,
      },
    },
    ...(faq ? [faq] : []),
  ];
}

export function visaHubJsonLd(): object[] {
  return [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Fiji Visa Checker", path: "/fiji-visa-checker" },
    ]),
    webPageSchema({
      name: "Fiji Visa Eligibility Checker",
      description:
        "Instant Fiji visa requirements by nationality — documents, travel rules and concierge planning.",
      path: "/fiji-visa-checker",
    }),
  ];
}
