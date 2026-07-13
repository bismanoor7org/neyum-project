import { apiHandler, jsonCreated, jsonOk, withActivity } from "@/server/api/handler";
import { z } from "zod";
import {
  deleteCategory,
  listCategories,
  upsertCategory,
} from "@/server/services/cms-wp/content.service";

export const GET = apiHandler(async () => jsonOk(await listCategories()), "cms:read");

export const POST = apiHandler(async ({ request, auth }) => {
  const body = z
    .object({
      id: z.string().optional(),
      name: z.string().min(1),
      slug: z.string().optional(),
      description: z.string().optional(),
    })
    .parse(await request.json());
  const row = await upsertCategory(body);
  await withActivity(auth, "cms.category.upserted", "CONTENT", row.id);
  return body.id ? jsonOk(row) : jsonCreated(row);
}, "cms:write");

export const DELETE = apiHandler(async ({ request, auth }) => {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ ok: false, error: "id required" }, { status: 400 });
  await deleteCategory(id);
  await withActivity(auth, "cms.category.deleted", "CONTENT", id);
  return jsonOk({ id });
}, "cms:write");
