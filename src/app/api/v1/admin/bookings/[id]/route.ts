import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { bookingUpdateSchema } from "@/lib/validations/admin";
import {
  cancelBooking,
  getBookingById,
  refundBooking,
  updateBooking,
} from "@/server/services/admin-data.service";

export const GET = apiHandler(async ({ params }) => {
  const booking = await getBookingById(params.id);
  return jsonOk(booking);
}, "bookings:read");

export const PATCH = apiHandler(async ({ request, auth, params }) => {
  const body = bookingUpdateSchema.parse(await request.json());
  const action = body.bookingStatus;

  let booking;
  if (action === "CANCELLED") {
    booking = await cancelBooking(params.id, body.cancelReason);
    await withActivity(auth, "booking.cancelled", "BOOKINGS", params.id, body);
  } else if (action === "REFUNDED" || body.paymentStatus === "REFUNDED") {
    booking = await refundBooking(params.id);
    await withActivity(auth, "booking.refunded", "BOOKINGS", params.id, body);
  } else {
    booking = await updateBooking(params.id, {
      ...body,
      travelDate: body.travelDate ? new Date(body.travelDate) : undefined,
    });
    await withActivity(auth, "booking.updated", "BOOKINGS", params.id, body);
  }

  return jsonOk(booking);
}, "bookings:write");
