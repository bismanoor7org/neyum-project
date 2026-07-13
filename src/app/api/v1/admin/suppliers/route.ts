import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { paginationSchema, supplierStatusSchema } from "@/lib/validations/admin";
import { listSuppliers, updateSupplierStatus } from "@/server/services/admin-data.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const parsed = paginationSchema.parse({
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
  });

  const status = url.searchParams.get("status") ?? undefined;

  const result = await listSuppliers({
    ...parsed,
    status: status as never,
  });

  return jsonOk(result);
}, "suppliers:read");

export const PATCH = apiHandler(async ({ request, auth }) => {
  const raw = await request.json();
  const body = supplierStatusSchema.parse(raw);
  const id = (raw as { id?: string }).id ?? new URL(request.url).searchParams.get("id");

  if (!id) {
    return Response.json({ ok: false, error: "Supplier id required" }, { status: 400 });
  }

  const supplier = await updateSupplierStatus(id, body.verificationStatus);
  await withActivity(auth, `supplier.${body.verificationStatus.toLowerCase()}`, "SUPPLIERS", id);

  return jsonOk(supplier);
}, "suppliers:approve");
