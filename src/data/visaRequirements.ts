import { VISA_COUNTRIES, VISA_COUNTRY_BY_SLUG } from "@/data/visa/countries";
import type {
  VisaCountry,
  VisaDocumentId,
  VisaRecommendations,
  VisaRequirement,
  VisaStatus,
  VisaTravelRequirements,
} from "@/types/visa";

type PartialRequirement = Partial<
  Omit<VisaRequirement, "country" | "status"> & { status?: VisaStatus }
>;

/** Visa-exempt nationalities — typical Fiji visitor policy (mock; verify with official sources) */
const VISA_FREE_ISO = new Set([
  "AD", "AG", "AR", "AT", "AU", "BE", "BR", "BS", "BZ", "CA", "CH", "CL", "CY", "CZ", "DE", "DK",
  "EE", "ES", "FI", "FJ", "FR", "GB", "GR", "HK", "HR", "HU", "IE", "IS", "IT", "JM", "JP", "KR",
  "LI", "LT", "LU", "LV", "MC", "MT", "MX", "NL", "NO", "NZ", "PL", "PT", "RO", "SE", "SG", "SI",
  "SK", "SM", "US", "UY", "VA", "WS", "TO", "VU", "SB", "KI", "MH", "FM", "PW", "NR", "TV",
]);

/** Visa on arrival eligible nationalities */
const VISA_ON_ARRIVAL_ISO = new Set([
  "BD", "CN", "EG", "ID", "IN", "KE", "MY", "NP", "NG", "PH", "PK", "LK", "TH", "VN", "ZA", "MA",
  "MU", "TZ", "GH", "RW", "UG", "ZM", "ZW", "PG", "KH", "LA", "MM", "MN", "KZ", "UZ", "GE", "AM",
  "AZ", "BY", "UA", "MD", "RS", "ME", "MK", "AL", "BA", "BG", "TR", "IL", "JO", "LB", "SA", "AE",
  "QA", "KW", "BH", "OM", "TW", "MO",
]);

/** eVisa pathway nationalities */
const EVISA_ISO = new Set([
  "RU", "IR", "IQ", "AF", "SY", "YE", "SD", "SS", "SO", "ER", "ET", "DJ", "CM", "CD", "CG", "CF",
  "TD", "NE", "ML", "BF", "GN", "GW", "SL", "LR", "CI", "SN", "GM", "MR", "TN", "DZ", "LY", "HT",
  "CU", "VE", "BO", "PY", "EC", "PE", "CO", "DO", "GT", "HN", "NI", "SV", "CR", "PA", "TT", "GY",
  "SR", "KP",
]);

const DEFAULT_DOCS: Record<VisaStatus, VisaDocumentId[]> = {
  visa_free: ["passport", "return_flight", "hotel_reservation"],
  visa_on_arrival: [
    "passport",
    "passport_photos",
    "return_flight",
    "hotel_reservation",
    "proof_of_funds",
  ],
  evisa: [
    "passport",
    "passport_photos",
    "return_flight",
    "hotel_reservation",
    "bank_statement",
    "proof_of_funds",
  ],
  visa_required: [
    "passport",
    "passport_photos",
    "return_flight",
    "hotel_reservation",
    "bank_statement",
    "travel_insurance",
    "proof_of_funds",
  ],
};

const STATUS_TEMPLATES: Record<
  VisaStatus,
  Omit<VisaRequirement, "country" | "status" | "documents">
> = {
  visa_free: {
    allowedStay: "Up to 4 months",
    processingTime: "No visa required",
    entryType: "Multiple entry (tourism)",
    passportValidity: "6 months beyond intended stay",
    travelRequirements: {
      minPassportValidity: "6 months beyond your departure from Fiji",
      entryRestrictions: "Tourism and short business visits only",
      vaccination: "No mandatory vaccinations for most travellers",
      immigrationNotes:
        "Present return ticket and proof of accommodation. Immigration may request evidence of sufficient funds.",
      customs: "Declare goods over FJD 10,000. Strict biosecurity — declare all food and plant items.",
    },
    recommendations: {
      bestSeason: "May–October (dry season, ideal for resorts and diving)",
      popularResorts: ["Likuliku Lagoon", "Tokoriki Island", "InterContinental Fiji"],
      avgBudget: "FJD 450–1,200 per person per day (luxury)",
      suggestedItinerary: "3 nights Denarau + 4 nights Mamanuca island resort",
    },
  },
  visa_on_arrival: {
    allowedStay: "Up to 4 months",
    processingTime: "Issued at Nadi (NAN) or Nausori (SUV) airport",
    entryType: "Single or multiple entry (tourism)",
    passportValidity: "6 months beyond intended stay",
    travelRequirements: {
      minPassportValidity: "6 months beyond your departure from Fiji",
      entryRestrictions: "Visa on arrival for tourism — not for employment",
      vaccination: "Yellow fever certificate if arriving from endemic countries",
      immigrationNotes:
        "Visa fee payable on arrival (card/cash). Have printed accommodation and return flight details ready.",
      customs: "Biosecurity screening on arrival. Prohibited fresh produce and certain animal products.",
    },
    recommendations: {
      bestSeason: "April–October for calm seas and resort weather",
      popularResorts: ["Hilton Fiji Beach Resort", "Castaway Island", "Nanuku Resort"],
      avgBudget: "FJD 350–950 per person per day",
      suggestedItinerary: "1 night Nadi + 5 nights Coral Coast or Mamanuca",
    },
  },
  evisa: {
    allowedStay: "Up to 3 months",
    processingTime: "3–7 business days online",
    entryType: "Single entry (tourism/business visitor)",
    passportValidity: "6 months beyond intended stay",
    travelRequirements: {
      minPassportValidity: "6 months beyond your departure from Fiji",
      entryRestrictions: "Apply via Fiji Immigration eVisa portal before travel",
      vaccination: "Follow WHO guidance; COVID rules subject to change",
      immigrationNotes:
        "Print eVisa approval and carry supporting documents. Allow extra time at immigration.",
      customs: "Standard Fiji customs allowances — 2.25L alcohol and 250g tobacco duty-free.",
    },
    recommendations: {
      bestSeason: "June–September peak luxury season",
      popularResorts: ["Likuliku Lagoon", "Vomo Island", "Royal Davui"],
      avgBudget: "FJD 400–1,100 per person per day",
      suggestedItinerary: "7-night island-hopping: Mamanuca + Yasawa",
    },
  },
  visa_required: {
    allowedStay: "Up to 3 months (as approved)",
    processingTime: "10–21 business days via embassy or agent",
    entryType: "Single entry unless otherwise stated on visa",
    passportValidity: "6 months beyond intended stay",
    travelRequirements: {
      minPassportValidity: "6 months beyond your departure from Fiji",
      entryRestrictions: "Pre-approved visitor visa required before boarding",
      vaccination: "Medical certificate may be requested for extended stays",
      immigrationNotes:
        "Apply through Fiji High Commission or authorised visa agent. Do not travel without visa grant.",
      customs: "Retain customs declaration form. Luxury goods and jewellery should be declared.",
    },
    recommendations: {
      bestSeason: "May–October dry season; book resorts 3–6 months ahead",
      popularResorts: ["InterContinental Fiji", "Nanuku Auberge", "Six Senses Fiji"],
      avgBudget: "FJD 500–1,400 per person per day (incl. visa/agent fees)",
      suggestedItinerary: "10 nights: Nadi + Denarau + private island finale",
    },
  },
};

/** Country-specific overrides — merge onto status template */
const DETAILED_OVERRIDES: Record<string, PartialRequirement> = {
  pakistan: {
    status: "visa_on_arrival",
    allowedStay: "Up to 4 months (visitor visa on arrival)",
    processingTime: "Issued at Nadi International Airport",
    documents: [
      "passport",
      "passport_photos",
      "return_flight",
      "hotel_reservation",
      "bank_statement",
      "proof_of_funds",
    ],
    travelRequirements: {
      minPassportValidity: "6 months beyond departure from Fiji",
      entryRestrictions: "Tourism and family visits — employment not permitted",
      vaccination: "Polio vaccination record may be requested",
      immigrationNotes:
        "Pakistani passport holders should confirm latest Fiji Immigration advisories before travel.",
      customs: "Declare currency over USD 10,000 equivalent.",
    },
    recommendations: {
      bestSeason: "May–October — best weather for families from South Asia",
      popularResorts: ["Hilton Fiji", "Sheraton Denarau", "Outrigger Fiji"],
      avgBudget: "USD 180–350 per person per day",
      suggestedItinerary: "5 nights Denarau + 3 nights Mamanuca cruise",
    },
  },
  india: {
    status: "visa_on_arrival",
    allowedStay: "Up to 4 months",
    processingTime: "Visa on arrival at Fiji airports",
    documents: [
      "passport",
      "passport_photos",
      "return_flight",
      "hotel_reservation",
      "proof_of_funds",
      "travel_insurance",
    ],
    recommendations: {
      bestSeason: "April–June and September–November",
      popularResorts: ["Likuliku Lagoon", "Tokoriki Island", "Warwick Fiji"],
      avgBudget: "INR 15,000–35,000 per person per day (luxury)",
      suggestedItinerary: "2 nights Nadi + 6 nights island resort honeymoon",
    },
  },
  usa: {
    status: "visa_free",
    allowedStay: "Up to 4 months without a visa",
    entryType: "Multiple entry visitor",
    recommendations: {
      bestSeason: "June–August and December holidays",
      popularResorts: ["Likuliku Lagoon", "Vomo Island", "Kokomo Private Island"],
      avgBudget: "USD 400–900 per person per day",
      suggestedItinerary: "3 nights Denarau + 4 nights Yasawa sailing",
    },
  },
  uk: {
    status: "visa_free",
    allowedStay: "Up to 4 months visa-free",
    recommendations: {
      bestSeason: "May–September (British school holidays: book early)",
      popularResorts: ["Six Senses Fiji", "Royal Davui", "Jean-Michel Cousteau"],
      avgBudget: "£250–600 per person per day",
      suggestedItinerary: "10-night multi-island luxury itinerary via concierge",
    },
  },
  australia: {
    status: "visa_free",
    allowedStay: "Up to 4 months",
    processingTime: "No visa required",
    recommendations: {
      bestSeason: "Year-round; July–August escape winter",
      popularResorts: ["Likuliku Lagoon", "Castaway Island", "Plantation Island"],
      avgBudget: "AUD 350–800 per person per day",
      suggestedItinerary: "Weekend Denarau + 5-night Mamanuca",
    },
  },
  china: {
    status: "visa_on_arrival",
    allowedStay: "Up to 30 days (extendable)",
    processingTime: "Visa on arrival for eligible PRC passport holders",
    documents: [
      "passport",
      "return_flight",
      "hotel_reservation",
      "proof_of_funds",
      "bank_statement",
    ],
    recommendations: {
      bestSeason: "October–April Chinese New Year peak — reserve early",
      popularResorts: ["InterContinental Fiji", "Nanuku Resort", "Hilton Fiji"],
      avgBudget: "CNY 2,500–6,000 per person per day",
      suggestedItinerary: "8 nights: Denarau + Coral Coast cultural tour",
    },
  },
  uae: {
    status: "visa_on_arrival",
    allowedStay: "Up to 4 months",
    recommendations: {
      bestSeason: "November–April (escape Gulf summer)",
      popularResorts: ["Kokomo Private Island", "Likuliku Lagoon", "Vomo Island"],
      avgBudget: "AED 1,500–4,000 per person per day",
      suggestedItinerary: "Private island buyout + helicopter transfer",
    },
  },
  "saudi-arabia": {
    status: "visa_on_arrival",
    allowedStay: "Up to 4 months",
    recommendations: {
      bestSeason: "November–March",
      popularResorts: ["Hilton Fiji", "Sheraton Denarau", "Outrigger"],
      avgBudget: "SAR 1,200–3,500 per person per day",
      suggestedItinerary: "7-night family-friendly Denarau + island day trips",
    },
  },
  bangladesh: {
    status: "visa_on_arrival",
    documents: [
      "passport",
      "passport_photos",
      "return_flight",
      "hotel_reservation",
      "bank_statement",
      "proof_of_funds",
    ],
  },
  philippines: {
    status: "visa_on_arrival",
    recommendations: {
      bestSeason: "Dry season May–October",
      popularResorts: ["Plantation Island", "Mana Island", "Treasure Island"],
      avgBudget: "PHP 12,000–28,000 per person per day",
      suggestedItinerary: "6-night island-hopping adventure",
    },
  },
  japan: {
    status: "visa_free",
    recommendations: {
      bestSeason: "Golden Week and Obon — book 6+ months ahead",
      popularResorts: ["Namale Resort", "Royal Davui", "Tokoriki Island"],
      avgBudget: "¥45,000–120,000 per person per day",
      suggestedItinerary: "Honeymoon: 2 nights Nadi + 5 nights adults-only resort",
    },
  },
  germany: {
    status: "visa_free",
  },
  france: {
    status: "visa_free",
  },
  canada: {
    status: "visa_free",
  },
  brazil: {
    status: "visa_free",
  },
  mexico: {
    status: "visa_free",
  },
  "south-africa": {
    status: "visa_on_arrival",
    recommendations: {
      bestSeason: "Fiji winter May–October overlaps SA winter holidays",
      popularResorts: ["Castaway Island", "Malolo Island", "Tropica Island"],
      avgBudget: "ZAR 5,500–14,000 per person per day",
      suggestedItinerary: "9-night scuba + culture itinerary",
    },
  },
  nigeria: {
    status: "visa_on_arrival",
    documents: [
      "passport",
      "passport_photos",
      "return_flight",
      "hotel_reservation",
      "bank_statement",
      "travel_insurance",
      "proof_of_funds",
    ],
  },
  indonesia: {
    status: "visa_on_arrival",
  },
  thailand: {
    status: "visa_on_arrival",
  },
  vietnam: {
    status: "visa_on_arrival",
  },
  nepal: {
    status: "visa_on_arrival",
  },
  "sri-lanka": {
    status: "visa_on_arrival",
  },
  russia: {
    status: "evisa",
    processingTime: "5–10 business days online",
  },
  iran: {
    status: "evisa",
  },
  afghanistan: {
    status: "visa_required",
  },
};

function resolveStatus(iso2: string): VisaStatus {
  if (VISA_FREE_ISO.has(iso2)) return "visa_free";
  if (VISA_ON_ARRIVAL_ISO.has(iso2)) return "visa_on_arrival";
  if (EVISA_ISO.has(iso2)) return "evisa";
  return "visa_required";
}

function mergeTravelRequirements(
  base: VisaTravelRequirements,
  override?: Partial<VisaTravelRequirements>,
): VisaTravelRequirements {
  return { ...base, ...override };
}

function mergeRecommendations(
  base: VisaRecommendations,
  override?: Partial<VisaRecommendations>,
): VisaRecommendations {
  return { ...base, ...override };
}

export function getVisaStatusForCountry(country: VisaCountry): VisaStatus {
  const override = DETAILED_OVERRIDES[country.slug];
  return override?.status ?? resolveStatus(country.iso2);
}

export function getVisaRequirement(slug: string): VisaRequirement | null {
  const country = VISA_COUNTRY_BY_SLUG[slug];
  if (!country) return null;

  const status = getVisaStatusForCountry(country);
  const template = STATUS_TEMPLATES[status];
  const override = DETAILED_OVERRIDES[slug] ?? {};

  return {
    country,
    status: override.status ?? status,
    allowedStay: override.allowedStay ?? template.allowedStay,
    processingTime: override.processingTime ?? template.processingTime,
    entryType: override.entryType ?? template.entryType,
    passportValidity: override.passportValidity ?? template.passportValidity,
    documents: override.documents ?? DEFAULT_DOCS[override.status ?? status],
    travelRequirements: mergeTravelRequirements(
      template.travelRequirements,
      override.travelRequirements,
    ),
    recommendations: mergeRecommendations(
      template.recommendations,
      override.recommendations,
    ),
  };
}

export function getAllVisaRequirements(): VisaRequirement[] {
  return VISA_COUNTRIES.map((c) => getVisaRequirement(c.slug)!);
}

export function searchVisaCountries(query: string): VisaCountry[] {
  const q = query.trim().toLowerCase();
  if (!q) return VISA_COUNTRIES;
  return VISA_COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.slug.includes(q) ||
      c.iso2.toLowerCase() === q,
  );
}

export type { VisaCountry };
