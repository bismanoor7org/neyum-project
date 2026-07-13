import { apiHandler, jsonCreated, jsonOk, withActivity } from "@/server/api/handler";
import { navigationItemSchema, navigationReorderSchema } from "@/lib/validations/cms";
import {
  listNavigationCms,
  createNavigationItemCms,
  reorderNavigationItems,
} from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const location = url.searchParams.get("location");
  const parentKey = url.searchParams.get("parentKey");
  const result = await listNavigationCms({
    page: 1,
    pageSize: 200,
    location: location as "PRIMARY" | "MEGA_MENU" | "FOOTER" | undefined,
    parentKey: parentKey === "" ? undefined : parentKey ?? undefined,
  });
  return jsonOk(result);
}, "cms:read");

export const POST = apiHandler(async ({ request, auth }) => {
  const url = new URL(request.url);
  const action = url.searchParams.get("action");

  if (action === "reorder") {
    const { items } = navigationReorderSchema.parse(await request.json());
    await reorderNavigationItems(items);
    await withActivity(auth, "cms.navigation.reordered", "CONTENT");
    return jsonOk({ reordered: true });
  }

  const data = navigationItemSchema.parse(await request.json());
  const row = await createNavigationItemCms(data);
  await withActivity(auth, "cms.navigation.created", "CONTENT", row.id);
  return jsonCreated(row);
}, "cms:write");
