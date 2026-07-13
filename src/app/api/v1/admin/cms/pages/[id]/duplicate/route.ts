import { apiHandler, jsonCreated, withActivity } from "@/server/api/handler";
import { duplicateCmsPage } from "@/server/services/cms-wp/content.service";

export const POST = apiHandler(async ({ params, auth }) => {
  const page = await duplicateCmsPage(params.id);
  await withActivity(auth, "cms.page.duplicated", "CONTENT", page.id);
  return jsonCreated(page);
}, "cms:write");
