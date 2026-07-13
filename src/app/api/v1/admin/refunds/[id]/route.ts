import { z } from "zod";
import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { updateRefundStatus } from "@/server/services/admin-data.service";

const schema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "COMPLETED"]),
});

export const PATCH = apiHandler(async ({ request, auth, params }) => {
  const body = schema.parse(await request.json());
  const refund = await updateRefundStatus(params.id, body.status);
  await withActivity(auth, `refund.${body.status.toLowerCase()}`, "BOOKINGS", params.id, body);
  return jsonOk(refund);
}, "bookings:refund");
