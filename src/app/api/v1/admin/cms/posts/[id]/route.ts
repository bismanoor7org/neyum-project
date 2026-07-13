import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import {
  deleteCmsPost,
  getCmsPost,
  updateCmsPost,
} from "@/server/services/cms-wp/content.service";

export const GET = apiHandler(async ({ params }) => {
  const post = await getCmsPost(params.id);
  if (!post) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  return jsonOk(post);
}, "cms:read");

export const PATCH = apiHandler(async ({ request, params, auth }) => {
  const body = await request.json();
  const post = await updateCmsPost(params.id, body);
  await withActivity(auth, "cms.post.updated", "CONTENT", post?.id);
  return jsonOk(post);
}, "cms:write");

export const DELETE = apiHandler(async ({ params, auth }) => {
  await deleteCmsPost(params.id);
  await withActivity(auth, "cms.post.deleted", "CONTENT", params.id);
  return jsonOk({ id: params.id });
}, "cms:write");
