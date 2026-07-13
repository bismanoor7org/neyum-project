import { apiHandler, jsonCreated, jsonOk, withActivity } from "@/server/api/handler";
import { parseCmsListParams } from "@/server/api/cms-params";
import { faqCmsSchema } from "@/lib/validations/cms";
import {
  listFaqsCms,
  createFaqCms,
  updateFaqCms,
  deleteFaqCms,
  upsertSeoMeta,
} from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ request }) => {
  const result = await listFaqsCms(parseCmsListParams(new URL(request.url)));
  return jsonOk(result);
}, "cms:read");

export const POST = apiHandler(async ({ request, auth }) => {
  const body = faqCmsSchema.parse(await request.json());
  const { seo, ...rest } = body;

  const faq = await createFaqCms({
    ...rest,
    published: rest.published ?? rest.status === "PUBLISHED",
  });

  if (seo && faq.id) {
    await upsertSeoMeta("FAQ", faq.id, seo);
  }

  await withActivity(auth, "cms.faq.created", "CONTENT", faq.id);
  return jsonCreated(faq);
}, "cms:write");

export const PATCH = apiHandler(async ({ request, auth }) => {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return Response.json({ ok: false, error: "id required" }, { status: 400 });
  }

  const body = faqCmsSchema.partial().parse(await request.json());
  const { seo, ...rest } = body;

  const faq = await updateFaqCms(id, {
    ...rest,
    published: rest.published ?? (rest.status === "PUBLISHED" ? true : undefined),
  });

  if (seo) {
    await upsertSeoMeta("FAQ", id, seo);
  }

  await withActivity(auth, "cms.faq.updated", "CONTENT", id);
  return jsonOk(faq);
}, "cms:write");

export const DELETE = apiHandler(async ({ request, auth }) => {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return Response.json({ ok: false, error: "id required" }, { status: 400 });
  }
  await deleteFaqCms(id);
  await withActivity(auth, "cms.faq.deleted", "CONTENT", id);
  return jsonOk({ deleted: true });
}, "cms:write");
