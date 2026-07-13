import { apiHandler, jsonCreated, withActivity } from "@/server/api/handler";
import { duplicateCmsPost } from "@/server/services/cms-wp/content.service";

export const POST = apiHandler(async ({ params, auth }) => {
  const post = await duplicateCmsPost(params.id);
  await withActivity(auth, "cms.post.duplicated", "CONTENT", post?.id);
  return jsonCreated(post);
}, "cms:write");
