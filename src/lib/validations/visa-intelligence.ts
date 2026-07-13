import { z } from "zod";

export const visaTypeSchema = z.enum([
  "VISA_FREE",
  "VISA_ON_ARRIVAL",
  "EVISA",
  "VISA_REQUIRED",
]);

export const countrySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(120),
  code: z.string().length(2).transform((v) => v.toUpperCase()),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/),
  flag: z.string().url().optional().nullable(),
});

export const visaRuleSchema = z.object({
  id: z.string().optional(),
  nationalityId: z.string().min(1),
  destinationCountry: z.string().length(2).default("FJ"),
  visaType: visaTypeSchema,
  stayDuration: z.string().min(1).max(200),
  processingTime: z.string().min(1).max(200),
  entryType: z.string().max(200).optional().nullable(),
  entryConditions: z.string().max(5000).optional().nullable(),
  notes: z.string().max(5000).optional().nullable(),
  recommendations: z
    .object({
      bestSeason: z.string(),
      popularResorts: z.array(z.string()),
      avgBudget: z.string(),
      suggestedItinerary: z.string(),
    })
    .optional()
    .nullable(),
});

export const travelDocumentSchema = z.object({
  nationalityId: z.string().min(1),
  passportValidity: z.string().min(1).max(500),
  returnTicketRequired: z.boolean(),
  hotelBookingRequired: z.boolean(),
  proofOfFundsRequired: z.boolean(),
  insuranceRequired: z.boolean(),
  passportPhotosRequired: z.boolean().default(false),
  bankStatementRequired: z.boolean().default(false),
  additionalDocuments: z.array(z.string()).optional().nullable(),
});

export const entryGuideSchema = z.object({
  destinationCountry: z.string().length(2).default("FJ"),
  arrivalProcess: z.string().min(1),
  immigrationProcess: z.string().min(1),
  customsInfo: z.string().min(1),
  airportInfo: z.string().min(1),
  healthRequirements: z.string().min(1),
  travelAdvice: z.string().min(1),
});

export const visaSearchSchema = z.object({
  q: z.string().max(120).optional(),
});
