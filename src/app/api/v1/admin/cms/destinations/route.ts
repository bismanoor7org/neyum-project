import { apiHandler, jsonCreated, jsonOk, withActivity } from "@/server/api/handler";
import { parseCmsListParams } from "@/server/api/cms-params";
import { destinationCmsSchema } from "@/lib/validations/cms";
import {
  listDestinationsCms,
  createDestinationCms,
  getDestinationCms,
  updateDestinationCms,
  upsertSeoMeta,
} from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ request }) => {
  const params = parseCmsListParams(new URL(request.url));
  const result = await listDestinationsCms(params);
  return jsonOk(result);
}, "cms:read");

export const POST = apiHandler(async ({ request, auth }) => {
  const body = destinationCmsSchema.parse(await request.json());
  const { seo, latitude, longitude, ...rest } = body;

  const destination = await createDestinationCms({
    ...rest,
    latitude: latitude ?? undefined,
    longitude: longitude ?? undefined,
    gallery: rest.gallery ?? [],
    highlights: rest.highlights as never,
  });

  if (seo && destination.id) {
    await upsertSeoMeta("DESTINATION", destination.id, seo);
  }

  await withActivity(auth, "cms.destination.created", "CONTENT", destination.id);
  return jsonCreated(destination);
}, "cms:write");
