import { apiHandler, jsonOk } from "@/server/api/handler";
import { parseCmsListParams } from "@/server/api/cms-params";
import { listTransportServices } from "@/server/services/admin-data.service";

/** CMS view of transportation services */
export const GET = apiHandler(async ({ request }) => {
  const params = parseCmsListParams(new URL(request.url));
  const status = new URL(request.url).searchParams.get("serviceStatus") ?? undefined;
  const result = await listTransportServices({
    page: params.page,
    pageSize: params.pageSize,
    status: status as never,
  });
  return jsonOk(result);
}, "cms:read");
