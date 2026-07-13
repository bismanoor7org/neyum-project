import { refundRequestSchema } from "@/lib/validations/checkout";
import { checkoutApiHandler, jsonCreated } from "@/server/api/handler";
import { requestRefund } from "@/server/services/checkout.service";

export const POST = checkoutApiHandler(async ({ request }) => {
  const body = refundRequestSchema.parse(await request.json());
  const data = await requestRefund(body.bookingId, body.reason, body.amount);
  return jsonCreated(data);
});
