import { checkoutApiHandler, jsonOk } from "@/server/api/handler";
import { getInvoicePayload } from "@/server/services/checkout.service";

export const GET = checkoutApiHandler(async ({ params }) => {
  const data = getInvoicePayload(params.id);
  return jsonOk(data);
});
