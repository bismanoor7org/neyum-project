import { checkoutApplyCouponSchema } from "@/lib/validations/checkout";
import { checkoutApiHandler, jsonOk } from "@/server/api/handler";
import { applyCheckoutCoupon } from "@/server/services/checkout.service";

export const POST = checkoutApiHandler(async ({ request }) => {
  const body = checkoutApplyCouponSchema.parse(await request.json());
  const data = await applyCheckoutCoupon(body.sessionId, body.code, {
    paymentMode: body.paymentMode,
    partialAmount: body.partialAmount,
    useWallet: body.useWallet,
  });
  return jsonOk(data);
});
