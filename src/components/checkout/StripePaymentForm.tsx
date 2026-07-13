"use client";

import { useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function PaymentForm({
  sessionId,
  onSuccess,
}: {
  sessionId?: string | null;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const returnUrl = new URL(`${window.location.origin}/checkout/processing`);
    if (sessionId) returnUrl.searchParams.set("sessionId", sessionId);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl.toString(),
      },
      redirect: "if_required",
    });

    if (submitError) {
      setError(submitError.message ?? "Payment failed");
      setLoading(false);
      return;
    }

    onSuccess();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <PaymentElement options={{ layout: "tabs" }} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={!stripe || loading} className="checkout-btn-primary w-full">
        {loading ? "Processing…" : "Pay securely"}
      </button>
    </form>
  );
}

export function StripePaymentForm({
  clientSecret,
  publishableKey,
  sessionId,
  onSuccess,
}: {
  clientSecret: string;
  publishableKey: string;
  sessionId?: string | null;
  onSuccess: () => void;
}) {
  const stripePromise = loadStripe(publishableKey);

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
      <PaymentForm sessionId={sessionId} onSuccess={onSuccess} />
    </Elements>
  );
}
