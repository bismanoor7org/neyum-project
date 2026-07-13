/**
 * Bootstrap curated static visa data into PostgreSQL (idempotent upserts).
 */
import type { PrismaClient, VisaType } from "@prisma/client";
import { VISA_COUNTRIES } from "../src/data/visa/countries";
import { getAllVisaRequirements } from "../src/data/visaRequirements";
import { statusToVisaType } from "../src/lib/visa/mappers";

const FIJI_ENTRY_GUIDE = {
  destinationCountry: "FJ",
  arrivalProcess: `Upon landing at Nadi (NAN) or Nausori (SUV), follow signs to immigration. Have your passport, return ticket, and accommodation confirmation ready. Proceed to baggage claim after passport control.`,
  immigrationProcess: `Immigration officers verify passport validity, visa status (if applicable), return/onward ticket, and proof of accommodation. They may request evidence of sufficient funds. Answer questions about your stay purpose honestly.`,
  customsInfo: `Declare goods over FJD 10,000 equivalent. Fiji has strict biosecurity — declare all food, plant material, and animal products. Standard duty-free allowances apply for alcohol and tobacco.`,
  airportInfo: `Nadi International Airport (NAN) is Fiji's main gateway with duty-free, SIM cards, ATMs, and resort transfer desks. Nausori (SUV) serves domestic and some international flights near Suva.`,
  healthRequirements: `No mandatory vaccinations for most travellers. Yellow fever certificate required if arriving from endemic countries. Check current health advisories before travel.`,
  travelAdvice: `Book airport transfers in advance during peak season. Carry printed copies of hotel and flight confirmations. Allow extra time during holiday peaks. Contact Fiji Immigration for the latest policy updates.`,
};

function flagUrl(iso2: string) {
  return `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`;
}

function docsToFlags(requirement: ReturnType<typeof getAllVisaRequirements>[number]) {
  const docs = new Set(requirement.documents);
  return {
    passportValidity: requirement.passportValidity,
    returnTicketRequired: docs.has("return_flight"),
    hotelBookingRequired: docs.has("hotel_reservation"),
    proofOfFundsRequired: docs.has("proof_of_funds"),
    insuranceRequired: docs.has("travel_insurance"),
    passportPhotosRequired: docs.has("passport_photos"),
    bankStatementRequired: docs.has("bank_statement"),
    additionalDocuments: requirement.documents.filter(
      (d) =>
        ![
          "passport",
          "passport_photos",
          "return_flight",
          "hotel_reservation",
          "bank_statement",
          "travel_insurance",
          "proof_of_funds",
        ].includes(d),
    ),
  };
}

export async function seedVisaIntelligence(prisma: PrismaClient) {
  console.log("Seeding visa intelligence…");

  const countryIdBySlug = new Map<string, string>();

  for (const c of VISA_COUNTRIES) {
    const row = await prisma.country.upsert({
      where: { slug: c.slug },
      create: {
        name: c.name,
        code: c.iso2,
        slug: c.slug,
        flag: flagUrl(c.iso2),
      },
      update: {
        name: c.name,
        code: c.iso2,
        flag: flagUrl(c.iso2),
      },
    });
    countryIdBySlug.set(c.slug, row.id);
  }

  const requirements = getAllVisaRequirements();

  for (const req of requirements) {
    const nationalityId = countryIdBySlug.get(req.country.slug);
    if (!nationalityId) continue;

    const visaType = statusToVisaType(req.status) as VisaType;

    await prisma.visaRule.upsert({
      where: {
        nationalityId_destinationCountry: {
          nationalityId,
          destinationCountry: "FJ",
        },
      },
      create: {
        nationalityId,
        destinationCountry: "FJ",
        visaType,
        stayDuration: req.allowedStay,
        processingTime: req.processingTime,
        entryType: req.entryType,
        entryConditions: req.travelRequirements.entryRestrictions ?? null,
        notes: req.travelRequirements.immigrationNotes ?? null,
        recommendations: req.recommendations as unknown as import("@prisma/client").Prisma.InputJsonValue,
      },
      update: {
        visaType,
        stayDuration: req.allowedStay,
        processingTime: req.processingTime,
        entryType: req.entryType,
        entryConditions: req.travelRequirements.entryRestrictions ?? null,
        notes: req.travelRequirements.immigrationNotes ?? null,
        recommendations: req.recommendations as unknown as import("@prisma/client").Prisma.InputJsonValue,
      },
    });

    const docFlags = docsToFlags(req);
    await prisma.travelDocumentRequirement.upsert({
      where: { nationalityId },
      create: { nationalityId, ...docFlags },
      update: docFlags,
    });
  }

  await prisma.entryGuide.upsert({
    where: { destinationCountry: FIJI_ENTRY_GUIDE.destinationCountry },
    create: FIJI_ENTRY_GUIDE,
    update: FIJI_ENTRY_GUIDE,
  });

  console.log(
    `  ✓ ${VISA_COUNTRIES.length} countries, ${requirements.length} visa rules, entry guide`,
  );
}
