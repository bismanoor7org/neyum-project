import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { bulkUpdateStatus } from "@/server/services/cms-wp/content.service";

export const POST = apiHandler(async ({ request, auth }) => {
  const body = await request.json();
  const result = await bulkUpdateStatus("post", body.ids ?? [], body.status);
  await withActivity(auth, "cms.posts.bulk", "CONTENT");
  return jsonOk(result);
}, "cms:write");
