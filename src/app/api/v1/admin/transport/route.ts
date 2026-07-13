import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { paginationSchema, transportStatusSchema } from "@/lib/validations/admin";
import {
  listTransportServices,
  updateTransportStatus,
} from "@/server/services/admin-data.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const parsed = paginationSchema.parse({
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
  });

  const status = url.searchParams.get("status") ?? undefined;
  const result = await listTransportServices({ ...parsed, status: status as never });

  return jsonOk(result);
}, "transport:read");

export const PATCH = apiHandler(async ({ request, auth }) => {
  const body = transportStatusSchema.parse(await request.json());
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return Response.json({ ok: false, error: "Service id required" }, { status: 400 });
  }

  const service = await updateTransportStatus(id, body);
  await withActivity(auth, "transport.updated", "TRANSPORT", id, body);

  return jsonOk(service);
}, "transport:approve");
