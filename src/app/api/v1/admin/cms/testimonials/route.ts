import { apiHandler, jsonCreated, jsonOk, withActivity } from "@/server/api/handler";
import { parseCmsListParams } from "@/server/api/cms-params";
import { testimonialSchema } from "@/lib/validations/cms";
import {
  listTestimonialsCms,
  createTestimonialCms,
  updateTestimonialCms,
} from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ request }) => {
  const result = await listTestimonialsCms(parseCmsListParams(new URL(request.url)));
  return jsonOk(result);
}, "cms:read");

export const POST = apiHandler(async ({ request, auth }) => {
  const body = testimonialSchema.parse(await request.json());
  const testimonial = await createTestimonialCms({
    ...body,
    publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
  });
  await withActivity(auth, "cms.testimonial.created", "CONTENT", testimonial.id);
  return jsonCreated(testimonial);
}, "cms:write");

export const PATCH = apiHandler(async ({ request, auth }) => {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return Response.json({ ok: false, error: "id required" }, { status: 400 });
  }
  const body = testimonialSchema.partial().parse(await request.json());
  const testimonial = await updateTestimonialCms(id, {
    ...body,
    publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
  });
  await withActivity(auth, "cms.testimonial.updated", "CONTENT", id);
  return jsonOk(testimonial);
}, "cms:write");
