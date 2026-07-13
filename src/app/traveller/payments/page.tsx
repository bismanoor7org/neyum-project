"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";
import { formatCurrency } from "@/lib/admin/format";

type Payments = {
  walletBalance: number;
  currency: string;
  methods: { id: string; brand: string; last4: string; isDefault: boolean }[];
  invoices: { id: string; invoiceNumber: string; amount: number; issuedAt: string; bookingNumber?: string }[];
};

export default function TravellerPaymentsPage() {
  const [data, setData] = useState<Payments | null>(null);

  useEffect(() => {
    fetch("/api/v1/traveller/payments", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setData(j.data); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage title="Payments & Billing" subtitle="Wallet, saved cards, invoices & refund history.">
      <div className="admin-card rounded-xl p-6">
        <p className="admin-text-subtle text-xs uppercase">Wallet balance</p>
        <p className="admin-text mt-2 font-serif text-3xl text-gold">
          {formatCurrency(data?.walletBalance ?? 0, data?.currency ?? "FJD")}
        </p>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="admin-card rounded-xl p-6">
          <h3 className="admin-text font-serif text-lg">Payment methods</h3>
          <div className="mt-4 space-y-3">
            {(data?.methods ?? []).map((m) => (
              <div key={m.id} className="admin-surface-muted flex items-center justify-between rounded-lg px-4 py-3 text-sm">
                <span>{m.brand} ···· {m.last4}</span>
                {m.isDefault && <span className="text-xs text-gold">Default</span>}
              </div>
            ))}
          </div>
        </section>
        <section className="admin-card rounded-xl p-6">
          <h3 className="admin-text font-serif text-lg">Invoices</h3>
          <div className="mt-4 divide-y divide-[var(--admin-border-soft)]">
            {(data?.invoices ?? []).map((inv) => (
              <div key={inv.id} className="flex justify-between py-3 text-sm">
                <div>
                  <p className="admin-text font-medium">{inv.invoiceNumber}</p>
                  <p className="admin-text-muted text-xs">{inv.bookingNumber}</p>
                </div>
                <span className="font-semibold">{formatCurrency(inv.amount)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </TravellerSectionPage>
  );
}
