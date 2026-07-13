import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { destinationCmsSchema } from "@/lib/validations/cms";
import {
  getDestinationCms,
  updateDestinationCms,
  upsertSeoMeta,
  getSeoMeta,
} from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ params }) => {
  const destination = await getDestinationCms(params.id);
  if (!destination) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  const seo = await getSeoMeta("DESTINATION", params.id);
  return jsonOk({ destination, seo });
}, "cms:read");

export const PATCH = apiHandler(async ({ request, auth, params }) => {
  const body = destinationCmsSchema.partial().parse(await request.json());
  const { seo, latitude, longitude, ...rest } = body;

  const destination = await updateDestinationCms(params.id, {
    ...rest,
    latitude: latitude ?? undefined,
    longitude: longitude ?? undefined,
    highlights: rest.highlights as never,
  });

  if (seo) {
    await upsertSeoMeta("DESTINATION", params.id, seo);
  }

  await withActivity(auth, "cms.destination.updated", "CONTENT", params.id);
  return jsonOk(destination);
}, "cms:write");
