import { apiHandler, jsonCreated, jsonError, jsonOk } from "@/server/api/handler";
import {
  countrySchema,
  entryGuideSchema,
  travelDocumentSchema,
  visaRuleSchema,
} from "@/lib/validations/visa-intelligence";
import {
  createCountry,
  createVisaRule,
  deleteCountry,
  deleteVisaRule,
  getCountryById,
  getEntryGuide,
  getTravelDocumentRequirement,
  getVisaIntelligenceStats,
  getVisaRuleById,
  listCountryRecords,
  listTravelDocumentRequirements,
  listVisaRules,
  updateCountry,
  updateVisaRule,
  upsertEntryGuide,
  upsertTravelDocumentRequirement,
} from "@/server/services/visa-intelligence.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") ?? undefined;
  const section = url.searchParams.get("section");

  if (section === "stats") {
    return jsonOk(await getVisaIntelligenceStats());
  }

  if (section === "countries") {
    return jsonOk({ items: await listCountryRecords(search) });
  }

  if (section === "rules") {
    return jsonOk({ items: await listVisaRules(search) });
  }

  if (section === "travel-documents") {
    return jsonOk({ items: await listTravelDocumentRequirements(search) });
  }

  if (section === "entry-guide") {
    return jsonOk({ item: await getEntryGuide() });
  }

  return jsonOk({
    countries: await listCountryRecords(search),
    rules: await listVisaRules(search),
    stats: await getVisaIntelligenceStats(),
  });
}, "cms:read");

export const POST = apiHandler(async ({ request }) => {
  const body = await request.json();
  const type = body.type as string;

  if (type === "country") {
    const data = countrySchema.parse(body.data);
    const row = data.id
      ? await updateCountry(data.id, data)
      : await createCountry(data);
    return jsonCreated(row);
  }

  if (type === "visa-rule") {
    const data = visaRuleSchema.parse(body.data);
    const rec = data.recommendations ?? undefined;
    const row = data.id
      ? await updateVisaRule(data.id, { ...data, recommendations: rec })
      : await createVisaRule({ ...data, recommendations: rec });
    return jsonCreated(row);
  }

  if (type === "travel-document") {
    const data = travelDocumentSchema.parse(body.data);
    const row = await upsertTravelDocumentRequirement({
      ...data,
      additionalDocuments: data.additionalDocuments ?? undefined,
    });
    return jsonCreated(row);
  }

  if (type === "entry-guide") {
    const data = entryGuideSchema.parse(body.data);
    const row = await upsertEntryGuide(data);
    return jsonCreated(row);
  }

  return jsonError("Unknown type", 400);
}, "cms:write");
