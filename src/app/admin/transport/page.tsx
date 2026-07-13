"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { formatCurrency } from "@/lib/admin/format";

type TransportRow = {
  id: string;
  title: string;
  type: string;
  status: string;
  featured: boolean;
  price: string;
  supplier: { companyName: string };
};

export default function TransportAdminPage() {
  const [items, setItems] = useState<TransportRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/admin/transport", { credentials: "include" })
      .then((r) => r.json())
      .then((res) => setItems(res.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader
        title="Transportation"
        subtitle="Approve, feature and manage airport transfers, boat services and private drivers."
      />
      <div className="admin-card overflow-hidden rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="admin-surface-muted text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Supplier</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="admin-text-muted px-4 py-8 text-center">
                  Loading from database…
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={5} className="admin-text-muted px-4 py-8 text-center">
                  No transportation services yet. Suppliers can submit via the supplier portal.
                </td>
              </tr>
            )}
            {items.map((row) => (
              <tr key={row.id} className="border-t border-[var(--admin-border-soft)]">
                <td className="admin-text px-4 py-3 font-medium">{row.title}</td>
                <td className="admin-text-muted px-4 py-3">{row.supplier.companyName}</td>
                <td className="admin-text-muted px-4 py-3">{row.type.replace(/_/g, " ")}</td>
                <td className="admin-text px-4 py-3">{formatCurrency(Number(row.price))}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status.toLowerCase()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
