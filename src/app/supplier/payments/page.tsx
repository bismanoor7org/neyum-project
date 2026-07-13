"use client";

import { useEffect, useState } from "react";
import { DataTable, PageHeader, TableShell, Td, Th } from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { formatCurrency } from "@/lib/admin/format";

export default function SupplierPaymentsPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    fetch("/api/v1/supplier/profile?section=payments", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setItems(j.data.items ?? []); });
  }, []);

  return (
    <>
      <PageHeader title="Payments" subtitle="Stripe, settlements, escrow, and transaction logs." />
      <TableShell>
        <DataTable>
          <thead><tr><Th>Invoice</Th><Th>Period</Th><Th>Status</Th><Th className="text-right">Payout</Th></tr></thead>
          <tbody>
            {items.map((s) => (
              <tr key={String(s.id)}>
                <Td>{String(s.invoiceNumber)}</Td>
                <Td>{s.periodStart ? new Date(String(s.periodStart)).toLocaleDateString() : "—"}</Td>
                <Td><StatusBadge status={String(s.status)} /></Td>
                <Td className="text-right tabular-nums">{formatCurrency(Number(s.amount ?? 0))}</Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </TableShell>
    </>
  );
}
