import { apiHandler, jsonCreated, jsonOk, withActivity } from "@/server/api/handler";
import { parseCmsListParams } from "@/server/api/cms-params";
import { seoUpsertSchema } from "@/lib/validations/cms";
import { listSeoMeta, upsertSeoMeta, getSeoMeta } from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const entityType = url.searchParams.get("entityType");
  const entityId = url.searchParams.get("entityId");

  if (entityType && entityId) {
    const seo = await getSeoMeta(entityType as never, entityId);
    return jsonOk({ seo });
  }

  const result = await listSeoMeta(parseCmsListParams(url));
  return jsonOk(result);
}, "cms:read");

export const PUT = apiHandler(async ({ request, auth }) => {
  const body = seoUpsertSchema.parse(await request.json());
  const { entityType, entityId, ...seo } = body;
  const record = await upsertSeoMeta(entityType, entityId, seo);
  await withActivity(auth, "cms.seo.upserted", "CONTENT", `${entityType}:${entityId}`);
  return jsonCreated(record);
}, "cms:seo");

export const PATCH = apiHandler(async ({ request, auth }) => {
  const body = seoUpsertSchema.parse(await request.json());
  const { entityType, entityId, ...seo } = body;
  const record = await upsertSeoMeta(entityType, entityId, seo);
  await withActivity(auth, "cms.seo.updated", "CONTENT", `${entityType}:${entityId}`);
  return jsonOk(record);
}, "cms:seo");
