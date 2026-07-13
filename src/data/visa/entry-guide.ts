import type { EntryGuide } from "@prisma/client";

/** Static Fiji entry guide — used when database is unavailable. */
export const FIJI_ENTRY_GUIDE_STATIC: Omit<EntryGuide, "id" | "createdAt" | "updatedAt"> = {
  destinationCountry: "FJ",
  arrivalProcess:
    "Upon landing at Nadi (NAN) or Nausori (SUV), follow signs to immigration. Have your passport, return ticket, and accommodation confirmation ready. Proceed to baggage claim after passport control.",
  immigrationProcess:
    "Immigration officers verify passport validity, visa status (if applicable), return/onward ticket, and proof of accommodation. They may request evidence of sufficient funds. Answer questions about your stay purpose honestly.",
  customsInfo:
    "Declare goods over FJD 10,000 equivalent. Fiji has strict biosecurity — declare all food, plant material, and animal products. Standard duty-free allowances apply for alcohol and tobacco.",
  airportInfo:
    "Nadi International Airport (NAN) is Fiji's main gateway with duty-free, SIM cards, ATMs, and resort transfer desks. Nausori (SUV) serves domestic and some international flights near Suva.",
  healthRequirements:
    "No mandatory vaccinations for most travellers. Yellow fever certificate required if arriving from endemic countries. Check current health advisories before travel.",
  travelAdvice:
    "Book airport transfers in advance during peak season. Carry printed copies of hotel and flight confirmations. Allow extra time during holiday peaks. Contact Fiji Immigration for the latest policy updates.",
};
