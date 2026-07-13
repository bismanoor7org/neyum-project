import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import {
  deleteCmsPage,
  duplicateCmsPage,
  getCmsPage,
  updateCmsPage,
} from "@/server/services/cms-wp/content.service";

export const GET = apiHandler(async ({ params }) => {
  const page = await getCmsPage(params.id);
  if (!page) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  return jsonOk(page);
}, "cms:read");

export const PATCH = apiHandler(async ({ request, params, auth }) => {
  const body = await request.json();
  const page = await updateCmsPage(params.id, body);
  await withActivity(auth, "cms.page.updated", "CONTENT", page.id);
  return jsonOk(page);
}, "cms:write");

export const DELETE = apiHandler(async ({ params, auth }) => {
  await deleteCmsPage(params.id);
  await withActivity(auth, "cms.page.deleted", "CONTENT", params.id);
  return jsonOk({ id: params.id });
}, "cms:write");
