import { apiHandler, jsonCreated, jsonOk, withActivity } from "@/server/api/handler";
import {
  bulkUpdateStatus,
  createCmsPost,
  listCmsPosts,
} from "@/server/services/cms-wp/content.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const result = await listCmsPosts({
    q: url.searchParams.get("q") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    categoryId: url.searchParams.get("categoryId") ?? undefined,
    page: Number(url.searchParams.get("page") ?? 1),
    pageSize: Number(url.searchParams.get("pageSize") ?? 20),
  });
  return jsonOk(result);
}, "cms:read");

export const POST = apiHandler(async ({ request, auth }) => {
  const body = await request.json();
  const post = await createCmsPost(body, auth.user.id);
  await withActivity(auth, "cms.post.created", "CONTENT", post?.id);
  return jsonCreated(post);
}, "cms:write");
