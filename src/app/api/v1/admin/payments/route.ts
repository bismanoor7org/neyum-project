import { apiHandler, jsonOk } from "@/server/api/handler";
import { paginationSchema } from "@/lib/validations/admin";
import { listPayments } from "@/server/services/admin-data.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const parsed = paginationSchema.parse({
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
  });

  const status = url.searchParams.get("status") ?? undefined;
  const result = await listPayments({ ...parsed, status: status as never });

  return jsonOk(result);
}, "payments:read");
