import { checkoutStartSchema } from "@/lib/validations/checkout";
import { checkoutApiHandler, jsonCreated } from "@/server/api/handler";
import { startCheckout } from "@/server/services/checkout.service";

export const POST = checkoutApiHandler(async ({ request, travelerId }) => {
  const body = checkoutStartSchema.parse(await request.json());
  const data = await startCheckout(body.tourSlug, travelerId);
  return jsonCreated(data);
});
