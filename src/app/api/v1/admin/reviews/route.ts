import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { reviewModerationSchema } from "@/lib/validations/admin";
import { listReviews, moderateReview } from "@/server/services/admin-data.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const status = url.searchParams.get("status") ?? undefined;
  const reviews = await listReviews(status as never);
  return jsonOk(reviews);
}, "reviews:read");

export const PATCH = apiHandler(async ({ request, auth }) => {
  const body = reviewModerationSchema.parse(await request.json());
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return Response.json({ ok: false, error: "Review id required" }, { status: 400 });
  }

  const review = await moderateReview(id, body.status);
  await withActivity(auth, `review.${body.status.toLowerCase()}`, "REVIEWS", id);

  return jsonOk(review);
}, "reviews:moderate");
