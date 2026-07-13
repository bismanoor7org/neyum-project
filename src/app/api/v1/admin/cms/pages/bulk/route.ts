import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { bulkUpdateStatus } from "@/server/services/cms-wp/content.service";

export const POST = apiHandler(async ({ request, auth }) => {
  const body = await request.json();
  const result = await bulkUpdateStatus("page", body.ids ?? [], body.status);
  await withActivity(auth, "cms.pages.bulk", "CONTENT");
  return jsonOk(result);
}, "cms:write");
