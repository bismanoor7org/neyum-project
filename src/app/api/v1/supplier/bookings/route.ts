import type { BookingStatus } from "@prisma/client";
import { jsonOk, supplierApiHandler } from "@/server/api/handler";
import { listSupplierBookings } from "@/server/services/supplier-dashboard.service";

export const GET = supplierApiHandler(async ({ request, auth }) => {
  const url = new URL(request.url);
  const status = url.searchParams.get("status") as BookingStatus | null;
  const search = url.searchParams.get("search") ?? undefined;
  const page = Number(url.searchParams.get("page") ?? 1);
  const data = await listSupplierBookings(auth.supplierId, {
    status: status ?? undefined,
    search,
    page,
  });
  return jsonOk(data);
}, "bookings:read");
