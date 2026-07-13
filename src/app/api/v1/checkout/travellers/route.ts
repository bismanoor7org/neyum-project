import { checkoutSaveTravellersSchema } from "@/lib/validations/checkout";
import { checkoutApiHandler, jsonOk } from "@/server/api/handler";
import { saveCheckoutTravellers } from "@/server/services/checkout.service";

export const POST = checkoutApiHandler(async ({ request }) => {
  const body = checkoutSaveTravellersSchema.parse(await request.json());
  const data = await saveCheckoutTravellers(body.sessionId, body.travellers);
  return jsonOk(data);
});
