import "server-only";

import type { VisaCountry } from "@/types/visa";

export type VisaQuestionIntent =
  | "visa_requirements"
  | "documents"
  | "family_travel"
  | "child_travel"
  | "passport_validity"
  | "return_ticket"
  | "visa_on_arrival"
  | "entry_restrictions"
  | "transit"
  | "funds"
  | "insurance"
  | "customs"
  | "immigration"
  | "health"
  | "arrival"
  | "travel_advice"
  | "stay_duration"
  | "processing"
  | "greeting"
  | "general";

/** Demonyms and aliases → country slug */
const NATIONALITY_ALIASES: Record<string, string> = {
  pakistani: "pakistan",
  pakistanis: "pakistan",
  indian: "india",
  indians: "india",
  british: "uk",
  english: "uk",
  scottish: "uk",
  welsh: "uk",
  uk: "uk",
  american: "usa",
  americans: "usa",
  australian: "australia",
  australians: "australia",
  kiwi: "new-zealand",
  kiwis: "new-zealand",
  canadian: "canada",
  canadians: "canada",
  chinese: "china",
  japanese: "japan",
  filipino: "philippines",
  filipinos: "philippines",
  singaporean: "singapore",
  singaporeans: "singapore",
  malaysian: "malaysia",
  malaysians: "malaysia",
  indonesian: "indonesia",
  indonesians: "indonesia",
  german: "germany",
  french: "france",
  italian: "italy",
  spanish: "spain",
  russian: "russia",
  saudi: "saudi-arabia",
  emirati: "uae",
  emiratis: "uae",
};

const COUNTRY_NAME_ALIASES: Record<string, string> = {
  "united kingdom": "uk",
  "great britain": "uk",
  "united states": "usa",
  "united states of america": "usa",
  "new zealand": "new-zealand",
  "south korea": "south-korea",
  "united arab emirates": "uae",
  "hong kong": "hong-kong",
  "sri lanka": "sri-lanka",
  "south africa": "south-africa",
};

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function detectNationalitySlug(
  message: string,
  countries: VisaCountry[],
  explicitSlug?: string | null,
): string | null {
  if (explicitSlug) return explicitSlug;

  const normalized = normalize(message);

  for (const [alias, slug] of Object.entries(NATIONALITY_ALIASES)) {
    if (new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(normalized)) {
      return slug;
    }
  }

  if (/\buk\b/i.test(normalized)) return "uk";

  for (const [name, slug] of Object.entries(COUNTRY_NAME_ALIASES)) {
    if (normalized.includes(name)) return slug;
  }

  for (const country of countries) {
    const name = country.name.toLowerCase();
    if (normalized.includes(name)) return country.slug;
    const slugWords = country.slug.replace(/-/g, " ");
    if (slugWords.length > 3 && normalized.includes(slugWords)) return country.slug;
  }

  return null;
}

export function detectIntent(message: string): VisaQuestionIntent {
  const q = normalize(message);

  if (/^(hi|hello|hey|bula)\b/.test(q) || q === "hi" || q === "hello") {
    return "greeting";
  }

  if (
    q.includes("transit") ||
    q.includes("layover") ||
    q.includes("connecting flight") ||
    q.includes("stopover")
  ) {
    return "transit";
  }

  if (
    q.includes("child") ||
    q.includes("minor") ||
    q.includes("infant") ||
    q.includes("baby") ||
    q.includes("unaccompanied")
  ) {
    return "child_travel";
  }

  if (
    q.includes("family") ||
    q.includes("spouse") ||
    q.includes("wife") ||
    q.includes("husband") ||
    q.includes("parents") ||
    q.includes("kids")
  ) {
    return "family_travel";
  }

  if (
    q.includes("passport valid") ||
    q.includes("passport expiry") ||
    q.includes("passport expiration") ||
    q.includes("how long passport") ||
    q.includes("passport requirement")
  ) {
    return "passport_validity";
  }

  if (
    q.includes("return ticket") ||
    q.includes("return flight") ||
    q.includes("onward ticket") ||
    q.includes("proof of departure")
  ) {
    return "return_ticket";
  }

  if (
    q.includes("visa on arrival") ||
    q.includes("voa") ||
    q.includes("on arrival visa") ||
    q.includes("get visa at airport")
  ) {
    return "visa_on_arrival";
  }

  if (
    q.includes("entry restriction") ||
    q.includes("not allowed") ||
    q.includes("banned") ||
    q.includes("prohibited") ||
    q.includes("employment") ||
    q.includes("work permit")
  ) {
    return "entry_restrictions";
  }

  if (
    q.includes("document") ||
    q.includes("paperwork") ||
    q.includes("what do i need") ||
    q.includes("what do i bring") ||
    q.includes("required to bring")
  ) {
    return "documents";
  }

  if (
    q.includes("customs") ||
    q.includes("declare") ||
    q.includes("biosecurity") ||
    q.includes("duty free")
  ) {
    return "customs";
  }

  if (
    q.includes("immigration") ||
    q.includes("border officer") ||
    q.includes("immigration officer")
  ) {
    return "immigration";
  }

  if (
    q.includes("health") ||
    q.includes("vaccin") ||
    q.includes("yellow fever") ||
    q.includes("medical requirement")
  ) {
    return "health";
  }

  if (
    q.includes("airport") ||
    q.includes("nadi") ||
    q.includes("nausori") ||
    q.includes("arrival process") ||
    q.includes("when i land") ||
    q.includes("when i arrive")
  ) {
    return "arrival";
  }

  if (q.includes("insurance")) {
    return "insurance";
  }

  if (
    q.includes("money") ||
    q.includes("fund") ||
    q.includes("bank") ||
    q.includes("how much") ||
    q.includes("financial")
  ) {
    return "funds";
  }

  if (
    q.includes("how long") ||
    q.includes("stay duration") ||
    q.includes("maximum stay") ||
    q.includes("extend")
  ) {
    return "stay_duration";
  }

  if (
    q.includes("processing") ||
    q.includes("evisa") ||
    q.includes("e-visa") ||
    q.includes("apply") ||
    q.includes("how long does it take")
  ) {
    return "processing";
  }

  if (
    q.includes("tip") ||
    q.includes("advice") ||
    q.includes("prepare") ||
    q.includes("before travel") ||
    q.includes("before i travel")
  ) {
    return "travel_advice";
  }

  if (
    q.includes("need a visa") ||
    q.includes("visa for fiji") ||
    q.includes("visa required") ||
    q.includes("do i need visa") ||
    q.includes("visa free") ||
    q.includes("visa requirement")
  ) {
    return "visa_requirements";
  }

  return "general";
}
