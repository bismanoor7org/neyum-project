import "server-only";

import type { Prisma, VisaType } from "@prisma/client";
import {
  getVisaRequirement as getStaticVisaRequirement,
  searchVisaCountries as searchStaticVisaCountries,
} from "@/data/visaRequirements";
import { prisma } from "@/lib/db/prisma";
import { isDatabaseConfigured } from "@/lib/db/is-database-configured";
import {
  buildVisaRequirement,
  countryToVisaCountry,
  FIJI_DESTINATION,
  statusToVisaType,
  visaTypeToStatus,
} from "@/lib/visa/mappers";
import type { VisaCountry, VisaRequirement } from "@/types/visa";
import { VISA_STATUS_LABELS } from "@/types/visa";

export type VisaSearchResult = {
  countries: VisaCountry[];
  requirements: Array<{
    country: VisaCountry;
    visaType: string;
    stayDuration: string;
    processingTime: string;
  }>;
};

function assertDatabase() {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is required for visa intelligence");
  }
}

/** Try Prisma; fall back to bundled static visa data when DB is offline. */
async function withVisaFallback<T>(
  operation: () => Promise<T>,
  fallback: () => T,
): Promise<T> {
  if (!isDatabaseConfigured()) return fallback();
  try {
    return await operation();
  } catch {
    return fallback();
  }
}

export async function listVisaCountries(search?: string): Promise<VisaCountry[]> {
  const q = search?.trim();
  return withVisaFallback(
    async () => {
      assertDatabase();
      const rows = await prisma.country.findMany({
        where: q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { slug: { contains: q.toLowerCase() } },
                { code: { equals: q.toUpperCase() } },
              ],
            }
          : undefined,
        orderBy: { name: "asc" },
      });
      return rows.map(countryToVisaCountry);
    },
    () => searchStaticVisaCountries(q ?? ""),
  );
}

export async function listCountryRecords(search?: string) {
  assertDatabase();
  const q = search?.trim();
  return prisma.country.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { slug: { contains: q.toLowerCase() } },
            { code: { contains: q.toUpperCase() } },
          ],
        }
      : undefined,
    orderBy: { name: "asc" },
    include: {
      _count: { select: { visaRules: true } },
    },
  });
}

export async function getCountryById(id: string) {
  assertDatabase();
  return prisma.country.findUnique({ where: { id } });
}

export async function getCountryBySlug(slug: string) {
  assertDatabase();
  return prisma.country.findUnique({ where: { slug } });
}

export async function getAllCountrySlugs(): Promise<string[]> {
  assertDatabase();
  const rows = await prisma.country.findMany({ select: { slug: true }, orderBy: { name: "asc" } });
  return rows.map((r) => r.slug);
}

export async function createCountry(data: {
  name: string;
  code: string;
  slug: string;
  flag?: string | null;
}) {
  assertDatabase();
  return prisma.country.create({ data });
}

export async function updateCountry(
  id: string,
  data: Partial<{ name: string; code: string; slug: string; flag: string | null }>,
) {
  assertDatabase();
  return prisma.country.update({ where: { id }, data });
}

export async function deleteCountry(id: string) {
  assertDatabase();
  return prisma.country.delete({ where: { id } });
}

export async function listVisaRules(search?: string, destination = FIJI_DESTINATION) {
  assertDatabase();
  const q = search?.trim();
  return prisma.visaRule.findMany({
    where: {
      destinationCountry: destination,
      ...(q
        ? {
            nationality: {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { slug: { contains: q.toLowerCase() } },
                { code: { contains: q.toUpperCase() } },
              ],
            },
          }
        : {}),
    },
    include: { nationality: true },
    orderBy: { nationality: { name: "asc" } },
  });
}

export async function getVisaRuleById(id: string) {
  assertDatabase();
  return prisma.visaRule.findUnique({
    where: { id },
    include: { nationality: true },
  });
}

export async function createVisaRule(data: {
  nationalityId: string;
  destinationCountry?: string;
  visaType: VisaType;
  stayDuration: string;
  processingTime: string;
  entryType?: string | null;
  entryConditions?: string | null;
  notes?: string | null;
  recommendations?: Prisma.InputJsonValue;
}) {
  assertDatabase();
  return prisma.visaRule.create({
    data: {
      nationalityId: data.nationalityId,
      destinationCountry: data.destinationCountry ?? FIJI_DESTINATION,
      visaType: data.visaType,
      stayDuration: data.stayDuration,
      processingTime: data.processingTime,
      entryType: data.entryType,
      entryConditions: data.entryConditions,
      notes: data.notes,
      recommendations: data.recommendations,
    },
    include: { nationality: true },
  });
}

export async function updateVisaRule(
  id: string,
  data: Partial<{
    nationalityId: string;
    destinationCountry: string;
    visaType: VisaType;
    stayDuration: string;
    processingTime: string;
    entryType: string | null;
    entryConditions: string | null;
    notes: string | null;
    recommendations: Prisma.InputJsonValue;
  }>,
) {
  assertDatabase();
  return prisma.visaRule.update({
    where: { id },
    data,
    include: { nationality: true },
  });
}

export async function deleteVisaRule(id: string) {
  assertDatabase();
  return prisma.visaRule.delete({ where: { id } });
}

export async function getTravelDocumentRequirement(nationalityId: string) {
  assertDatabase();
  return prisma.travelDocumentRequirement.findUnique({
    where: { nationalityId },
    include: { nationality: true },
  });
}

export async function getTravelDocumentRequirementBySlug(slug: string) {
  assertDatabase();
  const country = await prisma.country.findUnique({ where: { slug } });
  if (!country) return null;

  const doc = await prisma.travelDocumentRequirement.findUnique({
    where: { nationalityId: country.id },
    include: { nationality: true },
  });
  if (!doc) return null;

  return {
    country: countryToVisaCountry(country),
    passportValidity: doc.passportValidity,
    returnTicketRequired: doc.returnTicketRequired,
    hotelBookingRequired: doc.hotelBookingRequired,
    proofOfFundsRequired: doc.proofOfFundsRequired,
    insuranceRequired: doc.insuranceRequired,
    passportPhotosRequired: doc.passportPhotosRequired,
    bankStatementRequired: doc.bankStatementRequired,
    additionalDocuments: Array.isArray(doc.additionalDocuments)
      ? (doc.additionalDocuments as string[])
      : [],
  };
}

export async function listTravelDocumentRequirements(search?: string) {
  assertDatabase();
  const q = search?.trim();
  return prisma.travelDocumentRequirement.findMany({
    where: q
      ? {
          nationality: {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { slug: { contains: q.toLowerCase() } },
            ],
          },
        }
      : undefined,
    include: { nationality: true },
    orderBy: { nationality: { name: "asc" } },
  });
}

export async function upsertTravelDocumentRequirement(data: {
  nationalityId: string;
  passportValidity: string;
  returnTicketRequired: boolean;
  hotelBookingRequired: boolean;
  proofOfFundsRequired: boolean;
  insuranceRequired: boolean;
  passportPhotosRequired?: boolean;
  bankStatementRequired?: boolean;
  additionalDocuments?: Prisma.InputJsonValue;
}) {
  assertDatabase();
  const { nationalityId, ...rest } = data;
  return prisma.travelDocumentRequirement.upsert({
    where: { nationalityId },
    create: { nationalityId, ...rest },
    update: rest,
    include: { nationality: true },
  });
}

export async function getEntryGuide(destination = FIJI_DESTINATION) {
  assertDatabase();
  return prisma.entryGuide.findUnique({ where: { destinationCountry: destination } });
}

export async function upsertEntryGuide(data: {
  destinationCountry?: string;
  arrivalProcess: string;
  immigrationProcess: string;
  customsInfo: string;
  airportInfo: string;
  healthRequirements: string;
  travelAdvice: string;
}) {
  assertDatabase();
  const destinationCountry = data.destinationCountry ?? FIJI_DESTINATION;
  const { arrivalProcess, immigrationProcess, customsInfo, airportInfo, healthRequirements, travelAdvice } =
    data;
  return prisma.entryGuide.upsert({
    where: { destinationCountry },
    create: {
      destinationCountry,
      arrivalProcess,
      immigrationProcess,
      customsInfo,
      airportInfo,
      healthRequirements,
      travelAdvice,
    },
    update: {
      arrivalProcess,
      immigrationProcess,
      customsInfo,
      airportInfo,
      healthRequirements,
      travelAdvice,
    },
  });
}

export async function getVisaRequirement(
  slug: string,
  destination = FIJI_DESTINATION,
): Promise<VisaRequirement | null> {
  return withVisaFallback(
    async () => {
      assertDatabase();

      const country = await prisma.country.findUnique({ where: { slug } });
      if (!country) return null;

      const rule = await prisma.visaRule.findUnique({
        where: {
          nationalityId_destinationCountry: {
            nationalityId: country.id,
            destinationCountry: destination,
          },
        },
      });
      if (!rule) return null;

      const [travelDocs, entryGuide] = await Promise.all([
        prisma.travelDocumentRequirement.findUnique({ where: { nationalityId: country.id } }),
        prisma.entryGuide.findUnique({ where: { destinationCountry: destination } }),
      ]);

      return buildVisaRequirement({ country, rule, travelDocs, entryGuide });
    },
    () => getStaticVisaRequirement(slug),
  );
}

export async function searchVisaIntelligence(query: string): Promise<VisaSearchResult> {
  const q = query.trim();

  return withVisaFallback(
    async () => {
      assertDatabase();
      if (!q) {
        const countries = await listVisaCountries();
        return { countries: countries.slice(0, 50), requirements: [] };
      }

      const countries = await listVisaCountries(q);
      const rules = await listVisaRules(q);

      return {
        countries,
        requirements: rules.map((rule) => ({
          country: countryToVisaCountry(rule.nationality),
          visaType: VISA_STATUS_LABELS[visaTypeToStatus(rule.visaType)],
          stayDuration: rule.stayDuration,
          processingTime: rule.processingTime,
        })),
      };
    },
    () => {
      const countries = searchStaticVisaCountries(q).slice(0, q ? undefined : 50);
      return {
        countries,
        requirements: countries
          .map((country) => getStaticVisaRequirement(country.slug))
          .filter((req): req is VisaRequirement => Boolean(req))
          .map((req) => ({
            country: req.country,
            visaType: VISA_STATUS_LABELS[req.status],
            stayDuration: req.allowedStay,
            processingTime: req.processingTime,
          })),
      };
    },
  );
}

export async function getVisaIntelligenceStats() {
  assertDatabase();
  const [countries, rules, travelDocs, entryGuide] = await Promise.all([
    prisma.country.count(),
    prisma.visaRule.count({ where: { destinationCountry: FIJI_DESTINATION } }),
    prisma.travelDocumentRequirement.count(),
    prisma.entryGuide.findUnique({ where: { destinationCountry: FIJI_DESTINATION } }),
  ]);

  return {
    countries,
    rules,
    travelDocs,
    hasEntryGuide: Boolean(entryGuide),
  };
}
