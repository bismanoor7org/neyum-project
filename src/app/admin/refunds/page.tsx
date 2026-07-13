"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { AdminButton, DataTable, PageHeader, TableShell, Td, Th } from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { formatCurrency, formatDateTime } from "@/lib/admin/format";

type RefundRow = {
  id: string;
  bookingNumber: string;
  tourName: string;
  travelerName: string;
  amount: number;
  reason: string;
  status: string;
  createdAt: string;
};

export default function RefundsPage() {
  const [items, setItems] = useState<RefundRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/v1/admin/refunds", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: "APPROVED" | "REJECTED" | "COMPLETED") => {
    await fetch(`/api/v1/admin/refunds/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  return (
    <>
      <PageHeader
        title="Refund Center"
        subtitle="Review refund requests — approve, reject, or complete partial and full refunds."
      />

      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Booking</Th>
              <Th>Experience</Th>
              <Th>Traveller</Th>
              <Th>Amount</Th>
              <Th>Reason</Th>
              <Th>Status</Th>
              <Th>Requested</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={8} className="admin-text-muted px-4 py-8 text-center">Loading…</td></tr>}
            {!loading && items.length === 0 && <tr><td colSpan={8} className="admin-text-muted px-4 py-8 text-center">No refund requests.</td></tr>}
            {items.map((r) => (
              <tr key={r.id}>
                <Td className="font-mono text-xs">{r.bookingNumber}</Td>
                <Td>{r.tourName}</Td>
                <Td>{r.travelerName}</Td>
                <Td className="font-semibold">{formatCurrency(r.amount)}</Td>
                <Td className="max-w-xs truncate text-xs">{r.reason}</Td>
                <Td><StatusBadge status={r.status} /></Td>
                <Td className="text-xs">{formatDateTime(r.createdAt)}</Td>
                <Td>
                  {r.status === "REQUESTED" && (
                    <div className="flex gap-1">
                      <AdminButton variant="ghost" onClick={() => updateStatus(r.id, "APPROVED")}>
                        <Check className="h-3.5 w-3.5" /> Approve
                      </AdminButton>
                      <AdminButton variant="ghost" onClick={() => updateStatus(r.id, "REJECTED")}>
                        <X className="h-3.5 w-3.5" /> Reject
                      </AdminButton>
                    </div>
                  )}
                  {r.status === "APPROVED" && (
                    <AdminButton variant="ghost" onClick={() => updateStatus(r.id, "COMPLETED")}>Complete</AdminButton>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </TableShell>
    </>
  );
}
