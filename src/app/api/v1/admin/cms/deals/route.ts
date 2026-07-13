import { apiHandler, jsonCreated, jsonOk, withActivity } from "@/server/api/handler";
import { parseCmsListParams } from "@/server/api/cms-params";
import { dealCmsSchema } from "@/lib/validations/cms";
import { listDealsCms, createDealCms, upsertSeoMeta } from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const params = parseCmsListParams(url);
  const category = url.searchParams.get("category");
  const result = await listDealsCms({
    ...params,
    category: category as "PACKAGE" | "ACCOMMODATION" | "EXPERIENCE" | undefined,
  });
  return jsonOk(result);
}, "cms:read");

export const POST = apiHandler(async ({ request, auth }) => {
  const body = dealCmsSchema.parse(await request.json());
  const { seo, ...rest } = body;
  const row = await createDealCms({ ...rest, includes: rest.includes ?? [] });
  if (seo && row.id) await upsertSeoMeta("DEAL", row.id, seo);
  await withActivity(auth, "cms.deal.created", "CONTENT", row.id);
  return jsonCreated(row);
}, "cms:write");
