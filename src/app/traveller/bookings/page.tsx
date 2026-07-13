"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { AdminButton } from "@/components/admin/ui/AdminUi";
import { formatCurrency } from "@/lib/admin/format";
import { cn } from "@/lib/utils";

type Booking = {
  id: string;
  bookingNumber: string;
  tourName: string;
  supplierName: string;
  travelDate: string | null;
  amount: number;
  bookingStatus: string;
  voucherUrl?: string;
  invoiceUrl?: string;
  timeline?: { id: string; title: string; at: string }[];
};

const TABS = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
] as const;

export default function TravellerBookingsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const filter = tab === "all" ? "" : `?filter=${tab}`;
    fetch(`/api/v1/traveller/bookings${filter}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setBookings(j.data.bookings); })
      .catch(() => {});
  }, [tab]);

  return (
    <TravellerSectionPage
      title="Bookings"
      subtitle="Upcoming, completed, and cancelled experiences — vouchers, invoices, reschedule & refund tracking."
      actions={<AdminButton variant="secondary">Download all invoices</AdminButton>}
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn("admin-tab rounded-lg px-4 py-2 text-sm font-medium", tab === t.id && "admin-tab-active")}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {bookings.map((b) => (
          <article key={b.id} className="admin-card rounded-xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="admin-text font-medium">{b.tourName}</p>
                <p className="admin-text-muted text-sm">{b.bookingNumber} · {b.supplierName}</p>
                {b.travelDate && (
                  <p className="admin-text-subtle mt-1 text-xs">
                    Travel date: {new Date(b.travelDate).toLocaleDateString("en-FJ", { dateStyle: "medium" })}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={b.bookingStatus} />
                <span className="admin-text font-semibold tabular-nums">{formatCurrency(b.amount)}</span>
              </div>
            </div>
            {b.timeline && b.timeline.length > 0 && (
              <div className="mt-4 border-t border-[var(--admin-border-soft)] pt-4">
                <p className="admin-text-subtle mb-2 text-[11px] font-semibold uppercase tracking-wide">Booking timeline</p>
                <ol className="space-y-2">
                  {b.timeline.map((e) => (
                    <li key={e.id} className="flex gap-3 text-xs">
                      <span className="admin-text-muted w-28 shrink-0 tabular-nums">
                        {new Date(e.at).toLocaleDateString()}
                      </span>
                      <span className="admin-text">{e.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {b.voucherUrl ? (
                <a href={b.voucherUrl} target="_blank" rel="noopener noreferrer">
                  <AdminButton variant="secondary">Download voucher</AdminButton>
                </a>
              ) : (
                <AdminButton variant="secondary" disabled>Download voucher</AdminButton>
              )}
              {b.invoiceUrl ? (
                <a href={b.invoiceUrl} target="_blank" rel="noopener noreferrer">
                  <AdminButton variant="secondary">Download invoice</AdminButton>
                </a>
              ) : (
                <AdminButton variant="secondary" disabled>Download invoice</AdminButton>
              )}
              <AdminButton variant="ghost">Rebook</AdminButton>
            </div>
          </article>
        ))}
        {bookings.length === 0 && (
          <div className="admin-card rounded-xl p-12 text-center">
            <p className="admin-text-muted text-sm">No bookings in this category yet.</p>
          </div>
        )}
      </div>
    </TravellerSectionPage>
  );
}
