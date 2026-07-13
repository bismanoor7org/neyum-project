"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container, Section } from "@/components/shared";

export function CheckoutProcessingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get("sessionId");
    const paymentIntentId =
      searchParams.get("payment_intent") ?? searchParams.get("paymentIntentId");

    if (!sessionId) {
      setError("Checkout session missing. Please return to checkout and try again.");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/v1/checkout/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, paymentIntentId: paymentIntentId ?? undefined }),
        });
        const json = (await res.json()) as {
          ok?: boolean;
          data?: { booking?: { id: string } };
          error?: string;
        };

        if (cancelled) return;

        if (!res.ok || !json.ok || !json.data?.booking?.id) {
          setError(json.error ?? "Payment confirmation failed. Please contact concierge.");
          return;
        }

        router.replace(`/checkout/confirmation/${json.data.booking.id}`);
      } catch {
        if (!cancelled) setError("Payment confirmation failed. Please contact concierge.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  return (
    <PageLayout navbarVariant="light">
      <Section compact>
        <Container>
          <div className="mx-auto max-w-md py-20 text-center">
            {error ? (
              <p className="text-red-700">{error}</p>
            ) : (
              <>
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-navy" />
                <h1 className="mt-6 font-serif text-2xl text-navy">Confirming your payment</h1>
                <p className="mt-2 text-sm text-foreground/60">Please wait while we secure your booking…</p>
              </>
            )}
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
