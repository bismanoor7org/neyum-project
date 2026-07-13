import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { paginationSchema } from "@/lib/validations/admin";
import { listBookings } from "@/server/services/admin-data.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const parsed = paginationSchema.parse({
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
  });

  const bookingStatus = url.searchParams.get("bookingStatus") ?? undefined;
  const paymentStatus = url.searchParams.get("paymentStatus") ?? undefined;

  const result = await listBookings({
    page: parsed.page,
    pageSize: parsed.pageSize,
    search: parsed.search,
    status: bookingStatus as never,
    paymentStatus: paymentStatus as never,
  });

  return jsonOk(result);
}, "bookings:read");
