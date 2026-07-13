import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { parseCmsListParams } from "@/server/api/cms-params";
import { supplierSubmissionReviewSchema } from "@/lib/validations/cms";
import {
  listSupplierSubmissions,
  reviewSupplierSubmission,
} from "@/server/services/cms-data.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const params = parseCmsListParams(url);
  const approvalStatus = url.searchParams.get("status") ?? undefined;
  const result = await listSupplierSubmissions({ ...params, approvalStatus });
  return jsonOk(result);
}, "cms:read");

export const PATCH = apiHandler(async ({ request, auth }) => {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return Response.json({ ok: false, error: "id required" }, { status: 400 });
  }

  const body = supplierSubmissionReviewSchema.parse(await request.json());
  const submission = await reviewSupplierSubmission(id, body, auth.user.id);
  await withActivity(auth, `cms.supplier_submission.${body.status.toLowerCase()}`, "CONTENT", id, body);
  return jsonOk(submission);
}, "cms:approve");
