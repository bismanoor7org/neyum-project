import "server-only";

import type { VisaChatContext } from "@/lib/ai/visa-assistant/context";
import type { VisaQuestionIntent } from "@/lib/ai/visa-assistant/intent";
import { VISA_DOCUMENT_CATALOG, VISA_STATUS_LABELS } from "@/types/visa";
import {
  TRAVEL_DURATION_LABELS,
  TRAVEL_PURPOSE_LABELS,
  VISA_STATUS_AI_NOTES,
} from "@/types/visa-assistant";

function sourceRef(countryName?: string): string {
  const label = countryName
    ? `Fiji Visa Intelligence — ${countryName}`
    : "Fiji Visa Intelligence Database";
  return `\n\n*Source: ${label}*`;
}

function docLabel(id: string): string {
  const item = VISA_DOCUMENT_CATALOG[id as keyof typeof VISA_DOCUMENT_CATALOG];
  return item?.label ?? id.replace(/_/g, " ");
}

function warning(text: string): string {
  return `⚠️ **Important:** ${text}`;
}

function bullets(items: string[]): string {
  return items.map((item) => `• ${item}`).join("\n");
}

export function buildSuggestedQuestions(ctx: VisaChatContext): string[] {
  const country = ctx.requirement?.country.name;
  const visaQ = country
    ? `Do ${country} citizens need a visa for Fiji?`
    : "Do Pakistanis need a visa for Fiji?";

  const pool: string[] = [
    visaQ,
    "What documents are required?",
    "Can I travel with my family?",
    "Passport validity requirements?",
    "Visa on arrival information?",
    "Return ticket requirements?",
    "Entry restrictions?",
    "How much money should I show?",
  ];

  if (ctx.requirement?.status === "visa_on_arrival") {
    return [
      "Visa on arrival information?",
      "What documents are required?",
      "Passport validity requirements?",
    ];
  }

  if (ctx.requirement?.status === "visa_free") {
    return [
      "What documents are required?",
      "Passport validity requirements?",
      "Can I travel with my family?",
    ];
  }

  if (ctx.intent === "family_travel" || ctx.intent === "child_travel") {
    return [
      "What documents are required?",
      "Passport validity requirements?",
      "Entry restrictions?",
    ];
  }

  return pool.slice(0, 4);
}

export function formatVisaResponse(ctx: VisaChatContext, intent: VisaQuestionIntent): string {
  const { requirement, entryGuide, travelDocuments } = ctx;
  const country = requirement?.country.name ?? "your nationality";

  if (!requirement && intent !== "greeting" && intent !== "general") {
    if (ctx.mentionedSlug) {
      return [
        `I could not find verified visa rules for **${ctx.mentionedSlug.replace(/-/g, " ")}** in our database.`,
        "",
        warning(
          "I will not guess visa requirements. Please select your nationality in the form above, or ask about a supported country.",
        ),
        "",
        "Supported lookups include Pakistan, India, UK, USA, Australia, New Zealand, and 90+ other nationalities.",
        sourceRef(),
      ].join("\n");
    }
  }

  switch (intent) {
    case "greeting":
      return [
        "Bula! I'm your **AI Fiji Visa Consultant**.",
        "",
        "I provide database-backed guidance on:",
        bullets([
          "Visa requirements by nationality",
          "Required travel documents",
          "Family and child travel rules",
          "Passport validity and return ticket requirements",
          "Visa on arrival and entry restrictions",
        ]),
        "",
        "Select your nationality above or mention your country (e.g. \"Do Indians need a visa?\") for personalised answers.",
        sourceRef("Fiji Entry Intelligence"),
      ].join("\n");

    case "visa_requirements":
    case "visa_on_arrival":
    case "processing": {
      if (!requirement) {
        return [
          "To check **visa requirements**, please select your nationality or mention your country.",
          "",
          "Example: \"Do Pakistanis need a visa for Fiji?\"",
          sourceRef(),
        ].join("\n");
      }
      const isVoa = requirement.status === "visa_on_arrival";
      const lines = [
        `**${country} → Fiji Visa Status**`,
        "",
        bullets([
          `Status: **${VISA_STATUS_LABELS[requirement.status]}**`,
          `Allowed stay: ${requirement.allowedStay}`,
          `Processing: ${requirement.processingTime}`,
          `Entry type: ${requirement.entryType}`,
        ]),
        "",
        VISA_STATUS_AI_NOTES[requirement.status],
      ];
      if (isVoa) {
        lines.push(
          "",
          warning(
            "Visa on arrival is issued at Nadi (NAN) or Nausori (SUV) airports. Have all documents ready before immigration.",
          ),
        );
      }
      if (requirement.travelRequirements.entryRestrictions) {
        lines.push("", `**Entry conditions:** ${requirement.travelRequirements.entryRestrictions}`);
      }
      lines.push(sourceRef(country));
      return lines.join("\n");
    }

    case "documents": {
      if (!requirement) {
        return [
          "Select your nationality for a **personalised document checklist** from our travel document database.",
          sourceRef(),
        ].join("\n");
      }
      const docItems = requirement.documents.map((id) => {
        const catalog = VISA_DOCUMENT_CATALOG[id];
        return catalog?.description
          ? `**${catalog.label}** — ${catalog.description}`
          : `**${docLabel(id)}**`;
      });
      const lines = [
        `**Required documents — ${country} travellers to Fiji**`,
        "",
        bullets(docItems),
        "",
        `**Passport validity:** ${requirement.passportValidity}`,
      ];
      if (travelDocuments) {
        const flags: string[] = [];
        if (travelDocuments.returnTicketRequired) flags.push("Return/onward ticket required");
        if (travelDocuments.hotelBookingRequired) flags.push("Hotel/resort booking required");
        if (travelDocuments.proofOfFundsRequired) flags.push("Proof of funds may be requested");
        if (travelDocuments.insuranceRequired) flags.push("Travel insurance required");
        if (travelDocuments.bankStatementRequired) flags.push("Bank statements recommended");
        if (flags.length) {
          lines.push("", bullets(flags));
        }
        if (travelDocuments.additionalDocuments.length) {
          lines.push(
            "",
            "**Additional documents:**",
            bullets(travelDocuments.additionalDocuments),
          );
        }
      }
      if (requirement.travelRequirements.immigrationNotes) {
        lines.push("", requirement.travelRequirements.immigrationNotes);
      }
      lines.push(sourceRef(`${country} travel documents`));
      return lines.join("\n");
    }

    case "passport_validity": {
      if (!requirement) {
        return [
          "**Passport validity for Fiji:**",
          bullets([
            "Passport must be valid for the duration of your stay",
            "Most nationalities require 6 months validity beyond departure from Fiji",
          ]),
          "",
          "Select your nationality for country-specific rules.",
          sourceRef("Fiji entry requirements"),
        ].join("\n");
      }
      return [
        `**Passport validity — ${country} passport holders**`,
        "",
        bullets([
          requirement.passportValidity,
          requirement.travelRequirements.minPassportValidity,
          "Passport must be machine-readable with blank pages for entry stamps",
        ]),
        "",
        warning("Immigration may deny entry if your passport expires too soon."),
        sourceRef(country),
      ].join("\n");
    }

    case "return_ticket": {
      const required =
        travelDocuments?.returnTicketRequired ??
        requirement?.documents.includes("return_flight") ??
        true;
      const lines = [
        `**Return / onward ticket — ${country} travellers**`,
        "",
        required
          ? bullets([
              "A confirmed return or onward flight ticket is **required**",
              "Immigration may ask to see your ticket at the border",
              "Open-jaw or multi-city itineraries are acceptable if they show departure from Fiji",
            ])
          : bullets([
              "A return or onward ticket is strongly recommended",
              "Immigration may still request proof of departure plans",
            ]),
      ];
      if (entryGuide) {
        lines.push("", `*At arrival:* ${entryGuide.arrivalProcess.slice(0, 200)}…`);
      }
      lines.push(sourceRef("Fiji entry requirements"));
      return lines.join("\n");
    }

    case "family_travel":
    case "child_travel": {
      const lines = [
        `**Family travel to Fiji${requirement ? ` — ${country} passport holders` : ""}**`,
        "",
        bullets([
          "Each traveller, including infants, needs their **own valid passport**",
          "Children travelling with one parent should carry a **notarised consent letter** from the absent parent",
          "Birth certificates may be requested to prove relationship",
          "Minors follow the same visa rules as adults for their nationality",
        ]),
      ];
      if (requirement) {
        lines.push(
          "",
          `**Visa status for ${country}:** ${VISA_STATUS_LABELS[requirement.status]} — ${requirement.allowedStay}`,
        );
      }
      if (intent === "child_travel") {
        lines.push(
          "",
          warning(
            "Infants and children are not exempt from passport or visa requirements. Plan document preparation for every family member.",
          ),
        );
      }
      lines.push(sourceRef("Fiji family travel policy"));
      return lines.join("\n");
    }

    case "entry_restrictions": {
      const restrictions = requirement?.travelRequirements.entryRestrictions;
      const lines = [
        `**Entry restrictions — Fiji${requirement ? ` (${country})` : ""}**`,
        "",
        restrictions
          ? bullets([restrictions])
          : bullets([
              "Visitor permits do not allow employment or paid work in Fiji",
              "Overstaying may result in fines or future entry bans",
              "Criminal convictions should be declared if asked by immigration",
            ]),
      ];
      if (requirement?.travelRequirements.immigrationNotes) {
        lines.push("", requirement.travelRequirements.immigrationNotes);
      }
      lines.push(
        "",
        warning("Always verify current restrictions with Fiji Immigration before travel."),
        sourceRef(country),
      );
      return lines.join("\n");
    }

    case "transit": {
      return [
        "**Transit through Fiji**",
        "",
        bullets([
          "Airside transit without clearing immigration typically does not require a Fiji visa",
          "If you leave the airport or collect baggage, standard entry rules apply for your nationality",
          "Confirm transit visa rules with your airline and Fiji Immigration for your specific itinerary",
        ]),
        requirement
          ? `\n**If entering Fiji (${country}):** ${VISA_STATUS_LABELS[requirement.status]}`
          : "",
        sourceRef("Fiji transit policy"),
      ].join("\n");
    }

    case "funds": {
      const fundsRequired = requirement?.documents.includes("proof_of_funds");
      return [
        `**Proof of funds — Fiji entry${requirement ? ` (${country})` : ""}**`,
        "",
        bullets([
          "Immigration may request evidence of sufficient funds",
          "Typical guideline: **FJD 150–200 per day** of your stay",
          "Accepted: recent bank statements (3 months), credit card with available limit, or sponsor letter",
          fundsRequired
            ? `Proof of funds is **commonly required** for ${country} passport holders`
            : "Requirements vary by nationality — check your specific rules",
        ]),
        sourceRef("Fiji immigration policy"),
      ].join("\n");
    }

    case "insurance": {
      const required = requirement?.documents.includes("travel_insurance");
      return [
        `**Travel insurance — Fiji${requirement ? ` (${country})` : ""}**`,
        "",
        required
          ? bullets([
              `Travel insurance is **required** for ${country} passport holders`,
              "Policy should cover medical treatment and emergency evacuation",
              "Carry a copy of your insurance certificate for immigration",
            ])
          : bullets([
              "Travel insurance is strongly recommended for Fiji",
              "Island resorts may require evacuation cover for water activities",
              "Medical facilities on outer islands are limited",
            ]),
        sourceRef("Fiji travel policy"),
      ].join("\n");
    }

    case "stay_duration": {
      if (!requirement) {
        return [
          "Most visitors to Fiji may stay **up to 4 months** on a visitor permit.",
          "Extensions require Fiji Immigration approval.",
          sourceRef(),
        ].join("\n");
      }
      return [
        `**Stay duration — ${country} visitors**`,
        "",
        bullets([
          `Maximum stay: **${requirement.allowedStay}**`,
          `Entry pathway: ${VISA_STATUS_LABELS[requirement.status]}`,
          "Extensions beyond your permit require application to Fiji Immigration in Suva",
        ]),
        sourceRef(country),
      ].join("\n");
    }

    case "customs":
      return entryGuide
        ? [
            "**Customs & biosecurity — Fiji**",
            "",
            entryGuide.customsInfo,
            "",
            warning("Fiji has strict biosecurity. Undeclared food or plant material may result in fines."),
            sourceRef("Fiji entry guide"),
          ].join("\n")
        : "Customs information is temporarily unavailable. Please check Fiji Revenue & Customs Service.";

    case "immigration":
      return entryGuide
        ? [
            "**Immigration at arrival — Fiji**",
            "",
            entryGuide.immigrationProcess,
            requirement
              ? `\n**Your visa status (${country}):** ${VISA_STATUS_LABELS[requirement.status]}`
              : "",
            sourceRef("Fiji entry guide"),
          ].join("\n")
        : "Immigration information is temporarily unavailable.";

    case "health":
      return entryGuide
        ? [
            "**Health requirements — Fiji**",
            "",
            entryGuide.healthRequirements,
            requirement?.travelRequirements.vaccination
              ? `\n**For ${country}:** ${requirement.travelRequirements.vaccination}`
              : "",
            sourceRef("Fiji health requirements"),
          ].join("\n")
        : "Health requirement data is temporarily unavailable.";

    case "arrival":
      return entryGuide
        ? [
            "**Arrival process — Fiji**",
            "",
            entryGuide.arrivalProcess,
            "",
            `**Airports:** ${entryGuide.airportInfo}`,
            sourceRef("Fiji entry guide"),
          ].join("\n")
        : "Arrival information is temporarily unavailable.";

    case "travel_advice":
      return entryGuide
        ? [
            "**Travel advice — Fiji**",
            "",
            entryGuide.travelAdvice,
            requirement
              ? `\n**Best season for ${country} visitors:** ${requirement.recommendations.bestSeason}`
              : "",
            sourceRef("Fiji entry guide"),
          ].join("\n")
        : "Travel advice is temporarily unavailable.";

    case "general":
    default: {
      if (requirement) {
        return [
          `**${country} → Fiji summary**`,
          "",
          bullets([
            `Visa: **${VISA_STATUS_LABELS[requirement.status]}**`,
            `Stay: ${requirement.allowedStay}`,
            `Documents: ${requirement.documents.map(docLabel).join(", ")}`,
            `Passport: ${requirement.passportValidity}`,
          ]),
          "",
          "Ask me about documents, family travel, visa on arrival, passport rules, or entry restrictions.",
          sourceRef(country),
        ].join("\n");
      }
      return [
        "I'm your **Fiji Visa & Entry Intelligence Assistant**.",
        "",
        "Mention your nationality or select it above — for example:",
        bullets([
          "Do Pakistanis need a visa for Fiji?",
          "What documents are required?",
          "Can I travel with my family?",
        ]),
        sourceRef(),
      ].join("\n");
    }
  }
}

export function formatIntakeContext(
  intake: import("@/types/visa-assistant").VisaAssistantIntake | Partial<import("@/types/visa-assistant").VisaAssistantIntake> | undefined,
): string | null {
  if (!intake?.purpose && !intake?.duration) return null;
  const parts: string[] = [];
  if (intake.purpose) parts.push(`Purpose: ${TRAVEL_PURPOSE_LABELS[intake.purpose]}`);
  if (intake.duration) parts.push(`Duration: ${TRAVEL_DURATION_LABELS[intake.duration]}`);
  if (intake.budget) parts.push(`Budget: ${intake.budget}`);
  return parts.join(" · ");
}
