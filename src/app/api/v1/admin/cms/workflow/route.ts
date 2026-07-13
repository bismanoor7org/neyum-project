import { apiHandler, jsonOk } from "@/server/api/handler";
import {
  listWorkflowQueue,
  transitionWorkflow,
  workflowTransitionSchema,
} from "@/server/services/cms-wp/workflow.service";

export const GET = apiHandler(async ({ request }) => {
  const status = new URL(request.url).searchParams.get("status") ?? undefined;
  const data = await listWorkflowQueue(status);
  return jsonOk(data);
}, "cms:read");

export const POST = apiHandler(async ({ request, auth }) => {
  const body = workflowTransitionSchema.parse(await request.json());
  const needsApprove =
    body.status === "APPROVED" ||
    body.status === "PUBLISHED" ||
    body.status === "NEEDS_CHANGES";
  // Moderators/admins use cms:approve path via enterprise guard on cms:publish for publish
  const updated = await transitionWorkflow(body, auth.user.id);
  return jsonOk({ item: updated, requiresApprove: needsApprove });
}, "cms:write");
