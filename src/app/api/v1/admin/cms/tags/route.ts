import { apiHandler, jsonCreated, jsonOk, withActivity } from "@/server/api/handler";
import { z } from "zod";
import { deleteTag, listTags, upsertTag } from "@/server/services/cms-wp/content.service";

export const GET = apiHandler(async () => jsonOk(await listTags()), "cms:read");

export const POST = apiHandler(async ({ request, auth }) => {
  const body = z
    .object({ id: z.string().optional(), name: z.string().min(1), slug: z.string().optional() })
    .parse(await request.json());
  const row = await upsertTag(body);
  await withActivity(auth, "cms.tag.upserted", "CONTENT", row.id);
  return body.id ? jsonOk(row) : jsonCreated(row);
}, "cms:write");

export const DELETE = apiHandler(async ({ request, auth }) => {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ ok: false, error: "id required" }, { status: 400 });
  await deleteTag(id);
  await withActivity(auth, "cms.tag.deleted", "CONTENT", id);
  return jsonOk({ id });
}, "cms:write");
