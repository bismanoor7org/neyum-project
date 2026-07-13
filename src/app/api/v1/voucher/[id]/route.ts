import { checkoutApiHandler, jsonOk } from "@/server/api/handler";
import { getVoucherPayload } from "@/server/services/checkout.service";

export const GET = checkoutApiHandler(async ({ params }) => {
  const data = getVoucherPayload(params.id);
  return jsonOk(data);
});
