import { checkoutConfirmSchema } from "@/lib/validations/checkout";
import { checkoutApiHandler, jsonCreated } from "@/server/api/handler";
import { confirmCheckout } from "@/server/services/checkout.service";

export const POST = checkoutApiHandler(async ({ request }) => {
  const body = checkoutConfirmSchema.parse(await request.json());
  const data = await confirmCheckout(body.sessionId, body.paymentIntentId, body.devModeConfirm ?? true);
  return jsonCreated(data);
});
