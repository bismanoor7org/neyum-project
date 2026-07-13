import { apiHandler, jsonCreated, jsonOk, withActivity } from "@/server/api/handler";
import {
  bulkUpdateStatus,
  createCmsPage,
  listCmsPages,
} from "@/server/services/cms-wp/content.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const result = await listCmsPages({
    q: url.searchParams.get("q") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    page: Number(url.searchParams.get("page") ?? 1),
    pageSize: Number(url.searchParams.get("pageSize") ?? 20),
  });
  return jsonOk(result);
}, "cms:read");

export const POST = apiHandler(async ({ request, auth }) => {
  const body = await request.json();
  if (Array.isArray(body?.ids) && body?.status) {
    const result = await bulkUpdateStatus("page", body.ids, body.status);
    await withActivity(auth, "cms.pages.bulk", "CONTENT");
    return jsonOk(result);
  }
  const page = await createCmsPage(body, auth.user.id);
  await withActivity(auth, "cms.page.created", "CONTENT", page.id);
  return jsonCreated(page);
}, "cms:write");
