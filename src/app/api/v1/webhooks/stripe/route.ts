import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db/prisma";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(request: Request) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("[stripe webhook]", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const intent = event.data.object as Stripe.PaymentIntent;
      const bookingId = intent.metadata?.bookingId;

      if (bookingId) {
        await prisma.$transaction([
          prisma.payment.updateMany({
            where: { stripeIntentId: intent.id },
            data: { status: "SUCCEEDED" },
          }),
          prisma.booking.update({
            where: { id: bookingId },
            data: { paymentStatus: "PAID", bookingStatus: "CONFIRMED" },
          }),
        ]);
      }
      break;
    }

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      const paymentIntentId =
        typeof charge.payment_intent === "string"
          ? charge.payment_intent
          : charge.payment_intent?.id;

      if (paymentIntentId) {
        await prisma.payment.updateMany({
          where: { stripeIntentId: paymentIntentId },
          data: {
            status: "CANCELED",
            refundedAmount: charge.amount_refunded / 100,
          },
        });
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
