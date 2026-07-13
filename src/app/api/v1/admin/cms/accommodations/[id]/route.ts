import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { accommodationCmsSchema } from "@/lib/validations/cms";
import {
  getAccommodationCms,
  updateAccommodationCms,
  deleteAccommodationCms,
  upsertSeoMeta,
} from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ params }) => {
  const row = await getAccommodationCms(params.id);
  if (!row) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  return jsonOk(row);
}, "cms:read");

export const PATCH = apiHandler(async ({ request, auth, params }) => {
  const body = accommodationCmsSchema.partial().parse(await request.json());
  const { seo, ...rest } = body;
  const row = await updateAccommodationCms(params.id, {
    ...rest,
    gallery: rest.gallery,
    amenities: rest.amenities,
    experiences: rest.experiences,
    relatedSlugs: rest.relatedSlugs,
  });
  if (seo) await upsertSeoMeta("ACCOMMODATION", params.id, seo);
  await withActivity(auth, "cms.accommodation.updated", "CONTENT", params.id);
  return jsonOk(row);
}, "cms:write");

export const DELETE = apiHandler(async ({ auth, params }) => {
  await deleteAccommodationCms(params.id);
  await withActivity(auth, "cms.accommodation.deleted", "CONTENT", params.id);
  return jsonOk({ deleted: true });
}, "cms:write");
