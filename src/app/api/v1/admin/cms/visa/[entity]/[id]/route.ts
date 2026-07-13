import { apiHandler, jsonError, jsonOk } from "@/server/api/handler";
import {
  deleteCountry,
  deleteVisaRule,
  getCountryById,
  getTravelDocumentRequirement,
  getVisaRuleById,
  updateCountry,
  updateVisaRule,
} from "@/server/services/visa-intelligence.service";
import { countrySchema, visaRuleSchema } from "@/lib/validations/visa-intelligence";

export const GET = apiHandler(async ({ params }) => {
  const { entity, id } = params;

  if (entity === "countries") {
    const row = await getCountryById(id);
    if (!row) return jsonError("Not found", 404);
    return jsonOk({ data: row });
  }

  if (entity === "rules") {
    const row = await getVisaRuleById(id);
    if (!row) return jsonError("Not found", 404);
    return jsonOk({ data: row });
  }

  if (entity === "travel-documents") {
    const row = await getTravelDocumentRequirement(id);
    return jsonOk({ data: row });
  }

  return jsonError("Unknown entity", 400);
}, "cms:read");

export const PATCH = apiHandler(async ({ request, params }) => {
  const { entity, id } = params;
  const body = await request.json();

  if (entity === "countries") {
    const data = countrySchema.partial().parse(body);
    const row = await updateCountry(id, data);
    return jsonOk({ data: row });
  }

  if (entity === "rules") {
    const data = visaRuleSchema.partial().parse(body);
    const { recommendations, ...rest } = data;
    const row = await updateVisaRule(id, {
      ...rest,
      recommendations: recommendations ?? undefined,
    });
    return jsonOk({ data: row });
  }

  return jsonError("Unknown entity", 400);
}, "cms:write");

export const DELETE = apiHandler(async ({ params }) => {
  const { entity, id } = params;

  if (entity === "countries") {
    await deleteCountry(id);
    return jsonOk({ ok: true });
  }

  if (entity === "rules") {
    await deleteVisaRule(id);
    return jsonOk({ ok: true });
  }

  return jsonError("Unknown entity", 400);
}, "cms:write");
