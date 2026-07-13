import { apiHandler, jsonOk } from "@/server/api/handler";
import { parseCmsListParams } from "@/server/api/cms-params";
import { listTours } from "@/server/services/admin-data.service";

/** CMS view of marketplace tours — editorial + approval context */
export const GET = apiHandler(async ({ request }) => {
  const params = parseCmsListParams(new URL(request.url));
  const status = new URL(request.url).searchParams.get("tourStatus") ?? undefined;
  const result = await listTours({
    page: params.page,
    pageSize: params.pageSize,
    search: params.search,
    status: status as never,
  });
  return jsonOk(result);
}, "cms:read");
