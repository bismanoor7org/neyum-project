import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { dealCmsSchema } from "@/lib/validations/cms";
import {
  getDealCms,
  updateDealCms,
  deleteDealCms,
  upsertSeoMeta,
} from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ params }) => {
  const row = await getDealCms(params.id);
  if (!row) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  return jsonOk(row);
}, "cms:read");

export const PATCH = apiHandler(async ({ request, auth, params }) => {
  const body = dealCmsSchema.partial().parse(await request.json());
  const { seo, ...rest } = body;
  const row = await updateDealCms(params.id, rest);
  if (seo) await upsertSeoMeta("DEAL", params.id, seo);
  await withActivity(auth, "cms.deal.updated", "CONTENT", params.id);
  return jsonOk(row);
}, "cms:write");

export const DELETE = apiHandler(async ({ auth, params }) => {
  await deleteDealCms(params.id);
  await withActivity(auth, "cms.deal.deleted", "CONTENT", params.id);
  return jsonOk({ deleted: true });
}, "cms:write");
