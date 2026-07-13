"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Download, QrCode } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container, Section } from "@/components/shared";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type Booking = {
  id: string;
  bookingNumber: string;
  tourTitle: string;
  supplierName: string;
  travelDate: string;
  timeSlot: string;
  pickupLocation: string;
  guestCount: number;
  pricing: { grandTotal: number; currency: string; amountSaved: number };
  invoiceNumber: string;
  voucherNumber: string;
  qrCodeData: string;
};

export default function CheckoutConfirmationPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setBookingId(p.bookingId));
  }, [params]);

  useEffect(() => {
    if (!bookingId) return;
    fetch(`/api/v1/bookings/${bookingId}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.ok) setBooking(json.data);
        else setError(json.error ?? "Booking not found");
      })
      .catch(() => setError("Failed to load booking"));
  }, [bookingId]);

  return (
    <PageLayout navbarVariant="light">
      <Section compact>
        <Container>
          <div className="mx-auto max-w-2xl">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">{error}</div>
          )}

          {booking && (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h1 className={cn(ds.headingSection, "mt-6")}>Booking confirmed</h1>
              <p className="mt-2 text-foreground/60">
                Confirmation sent to your email. Your Fiji adventure awaits.
              </p>

              <div className="mt-10 rounded-2xl border border-gold/25 bg-white p-8 text-left shadow-[var(--shadow-card)]">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">Booking reference</p>
                <p className="mt-1 font-serif text-2xl font-bold text-navy">{booking.bookingNumber}</p>

                <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  <Info label="Experience" value={booking.tourTitle} />
                  <Info label="Supplier" value={booking.supplierName} />
                  <Info label="Date" value={new Date(booking.travelDate).toLocaleDateString()} />
                  <Info label="Time" value={booking.timeSlot} />
                  <Info label="Pickup" value={booking.pickupLocation} />
                  <Info label="Guests" value={String(booking.guestCount)} />
                  <Info
                    label="Total paid"
                    value={`${booking.pricing.currency} ${booking.pricing.grandTotal.toLocaleString()}`}
                  />
                  {booking.pricing.amountSaved > 0 && (
                    <Info label="You saved" value={`${booking.pricing.currency} ${booking.pricing.amountSaved}`} />
                  )}
                </div>

                <div className="mt-8 flex flex-col items-center rounded-xl bg-cream/80 p-6">
                  <QrCode className="h-8 w-8 text-navy" />
                  <p className="mt-2 text-xs text-foreground/50">Voucher · {booking.voucherNumber}</p>
                  <pre className="mt-3 max-w-full overflow-x-auto rounded-lg bg-white p-3 text-[10px] text-foreground/40">
                    {booking.qrCodeData}
                  </pre>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`/api/v1/voucher/${booking.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="checkout-btn-secondary"
                  >
                    <Download className="h-4 w-4" /> Download voucher
                  </a>
                  <a
                    href={`/api/v1/invoice/${booking.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="checkout-btn-secondary"
                  >
                    <Download className="h-4 w-4" /> Download invoice
                  </a>
                  <Link href="/traveller/bookings" className="checkout-btn-primary">
                    View in dashboard
                  </Link>
                </div>
              </div>
            </div>
          )}
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-foreground/50">{label}</p>
      <p className="font-medium text-navy">{value}</p>
    </div>
  );
}
