"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { formatCurrency, formatDateTime } from "@/lib/admin/format";

type PaymentRow = {
  id: string;
  amount: string;
  status: string;
  stripePaymentId: string | null;
  createdAt: string;
  booking: { bookingNumber: string; traveler: { email: string } };
};

export default function PaymentsAdminPage() {
  const [items, setItems] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/admin/payments", { credentials: "include" })
      .then((r) => r.json())
      .then((res) => setItems(res.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader
        title="Payments"
        subtitle="Stripe transactions — payment status, failures and refund requests."
      />
      <div className="admin-card overflow-hidden rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="admin-surface-muted text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Booking</th>
              <th className="px-4 py-3">Traveler</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Stripe ID</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="admin-text-muted px-4 py-8 text-center">
                  Loading payments…
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={6} className="admin-text-muted px-4 py-8 text-center">
                  No Stripe payments recorded yet.
                </td>
              </tr>
            )}
            {items.map((row) => (
              <tr key={row.id} className="border-t border-[var(--admin-border-soft)]">
                <td className="admin-text px-4 py-3 font-medium">{row.booking.bookingNumber}</td>
                <td className="admin-text-muted px-4 py-3">{row.booking.traveler.email}</td>
                <td className="admin-text px-4 py-3">{formatCurrency(Number(row.amount))}</td>
                <td className="admin-text-subtle px-4 py-3 font-mono text-xs">
                  {row.stripePaymentId ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status.toLowerCase()} />
                </td>
                <td className="admin-text-muted px-4 py-3">{formatDateTime(row.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
