import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { guideCmsSchema } from "@/lib/validations/cms";
import {
  getGuideCms,
  updateGuideCms,
  deleteGuideCms,
  getSeoMeta,
  upsertSeoMeta,
} from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ params }) => {
  const guide = await getGuideCms(params.id);
  if (!guide) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  const seo = await getSeoMeta("GUIDE", params.id);
  return jsonOk({ guide, seo });
}, "cms:read");

export const PATCH = apiHandler(async ({ request, auth, params }) => {
  const body = guideCmsSchema.partial().parse(await request.json());
  const { seo, publishedAt, ...rest } = body;

  const guide = await updateGuideCms(params.id, {
    ...rest,
    publishedAt: publishedAt ? new Date(publishedAt) : undefined,
  });

  if (seo) {
    await upsertSeoMeta("GUIDE", params.id, seo);
  }

  await withActivity(auth, "cms.guide.updated", "CONTENT", params.id);
  return jsonOk(guide);
}, "cms:write");

export const DELETE = apiHandler(async ({ auth, params }) => {
  await deleteGuideCms(params.id);
  await withActivity(auth, "cms.guide.deleted", "CONTENT", params.id);
  return jsonOk({ deleted: true });
}, "cms:write");
