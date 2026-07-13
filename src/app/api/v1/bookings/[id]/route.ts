import { checkoutApiHandler, jsonOk } from "@/server/api/handler";
import { getBookingById } from "@/server/services/checkout.service";

export const GET = checkoutApiHandler(async ({ params }) => {
  const data = getBookingById(params.id);
  return jsonOk(data);
});
