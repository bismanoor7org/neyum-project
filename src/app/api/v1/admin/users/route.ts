import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { paginationSchema, userStatusSchema } from "@/lib/validations/admin";
import { listUsers, updateUserStatus } from "@/server/services/admin-data.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const parsed = paginationSchema.parse({
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
  });

  const role = url.searchParams.get("role") ?? undefined;
  const status = url.searchParams.get("status") ?? undefined;

  const result = await listUsers({
    ...parsed,
    role: role as never,
    status: status as never,
  });

  return jsonOk(result);
}, "users:read");

export const PATCH = apiHandler(async ({ request, auth }) => {
  const body = userStatusSchema.parse(await request.json());
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return Response.json({ ok: false, error: "User id required" }, { status: 400 });
  }

  const user = await updateUserStatus(id, body.status);
  await withActivity(auth, `user.${body.status.toLowerCase()}`, "USERS", id);

  return jsonOk(user);
}, "users:write");
