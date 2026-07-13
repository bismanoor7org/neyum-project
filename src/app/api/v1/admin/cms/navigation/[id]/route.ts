import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { navigationItemSchema } from "@/lib/validations/cms";
import {
  getNavigationItemCms,
  updateNavigationItemCms,
  deleteNavigationItemCms,
} from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ params }) => {
  const row = await getNavigationItemCms(params.id);
  if (!row) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  return jsonOk(row);
}, "cms:read");

export const PATCH = apiHandler(async ({ request, auth, params }) => {
  const data = navigationItemSchema.partial().parse(await request.json());
  const row = await updateNavigationItemCms(params.id, data);
  await withActivity(auth, "cms.navigation.updated", "CONTENT", params.id);
  return jsonOk(row);
}, "cms:write");

export const DELETE = apiHandler(async ({ auth, params }) => {
  await deleteNavigationItemCms(params.id);
  await withActivity(auth, "cms.navigation.deleted", "CONTENT", params.id);
  return jsonOk({ deleted: true });
}, "cms:write");
