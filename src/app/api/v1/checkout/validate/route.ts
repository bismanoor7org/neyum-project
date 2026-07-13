import { checkoutValidateSchema } from "@/lib/validations/checkout";
import { checkoutApiHandler, jsonOk } from "@/server/api/handler";
import { validateCheckoutSelection } from "@/server/services/checkout.service";

export const POST = checkoutApiHandler(async ({ request }) => {
  const body = checkoutValidateSchema.parse(await request.json());
  const data = await validateCheckoutSelection(body.sessionId, body.selection);
  return jsonOk(data);
});
