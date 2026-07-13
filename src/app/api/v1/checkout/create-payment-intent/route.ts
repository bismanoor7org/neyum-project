import { checkoutPaymentIntentSchema } from "@/lib/validations/checkout";
import { checkoutApiHandler, jsonOk } from "@/server/api/handler";
import {
  createCheckoutPaymentIntent,
  getIdempotencyKey,
} from "@/server/services/checkout.service";

export const POST = checkoutApiHandler(async ({ request }) => {
  const body = checkoutPaymentIntentSchema.parse(await request.json());
  const data = await createCheckoutPaymentIntent(body.sessionId, getIdempotencyKey(request), {
    paymentMode: body.paymentMode,
    partialAmount: body.partialAmount,
    useWallet: body.useWallet,
    paymentMethod: body.paymentMethod,
  });
  return jsonOk(data);
});
