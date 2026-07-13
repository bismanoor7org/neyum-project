import { apiHandler, jsonCreated, jsonOk, withActivity } from "@/server/api/handler";
import { parseCmsListParams } from "@/server/api/cms-params";
import { guideCmsSchema } from "@/lib/validations/cms";
import {
  listGuidesCms,
  createGuideCms,
  upsertSeoMeta,
} from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ request }) => {
  const result = await listGuidesCms(parseCmsListParams(new URL(request.url)));
  return jsonOk(result);
}, "cms:read");

export const POST = apiHandler(async ({ request, auth }) => {
  const body = guideCmsSchema.parse(await request.json());
  const { seo, publishedAt, ...rest } = body;

  const guide = await createGuideCms({
    ...rest,
    publishedAt: publishedAt ? new Date(publishedAt) : undefined,
  });

  if (seo && guide.id) {
    await upsertSeoMeta("GUIDE", guide.id, seo);
  }

  await withActivity(auth, "cms.guide.created", "CONTENT", guide.id);
  return jsonCreated(guide);
}, "cms:write");
