import { apiHandler, jsonCreated, jsonOk, withActivity } from "@/server/api/handler";
import { parseCmsListParams } from "@/server/api/cms-params";
import { accommodationCmsSchema } from "@/lib/validations/cms";
import {
  listAccommodationsCms,
  createAccommodationCms,
  upsertSeoMeta,
} from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ request }) => {
  const params = parseCmsListParams(new URL(request.url));
  const result = await listAccommodationsCms(params);
  return jsonOk(result);
}, "cms:read");

export const POST = apiHandler(async ({ request, auth }) => {
  const body = accommodationCmsSchema.parse(await request.json());
  const { seo, ...rest } = body;
  const row = await createAccommodationCms({
    ...rest,
    gallery: rest.gallery ?? [],
    amenities: rest.amenities ?? [],
    experiences: rest.experiences ?? [],
    relatedSlugs: rest.relatedSlugs ?? [],
  });
  if (seo && row.id) await upsertSeoMeta("ACCOMMODATION", row.id, seo);
  await withActivity(auth, "cms.accommodation.created", "CONTENT", row.id);
  return jsonCreated(row);
}, "cms:write");
