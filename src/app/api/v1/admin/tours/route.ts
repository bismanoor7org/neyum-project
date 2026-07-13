import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { paginationSchema, tourStatusSchema } from "@/lib/validations/admin";
import {
  deleteTour,
  listTours,
  updateTourStatus,
} from "@/server/services/admin-data.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const parsed = paginationSchema.parse({
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
  });

  const status = url.searchParams.get("status") ?? undefined;
  const featured = url.searchParams.get("featured");

  const result = await listTours({
    ...parsed,
    status: status as never,
    featured: featured === "true" ? true : featured === "false" ? false : undefined,
  });

  return jsonOk(result);
}, "tours:read");

export const PATCH = apiHandler(async ({ request, auth }) => {
  const body = tourStatusSchema.parse(await request.json());
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const action = url.searchParams.get("action");

  if (!id) {
    return Response.json({ ok: false, error: "Tour id required" }, { status: 400 });
  }

  if (action === "delete") {
    const tour = await deleteTour(id);
    await withActivity(auth, "tour.archived", "TOURS", id);
    return jsonOk(tour);
  }

  const tour = await updateTourStatus(id, body);
  await withActivity(auth, "tour.updated", "TOURS", id, body);

  return jsonOk(tour);
}, "tours:approve");
