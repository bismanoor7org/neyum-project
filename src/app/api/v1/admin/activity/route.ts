import { apiHandler, jsonOk } from "@/server/api/handler";
import { listActivityLogs } from "@/server/services/admin-data.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? 50);
  const activityModule = url.searchParams.get("module") as import("@prisma/client").ActivityModule | null;
  const items = await listActivityLogs({
    limit,
    ...(activityModule ? { module: activityModule } : {}),
  });
  return jsonOk({ items, total: items.length });
}, "activity:read");
