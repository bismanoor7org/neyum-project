"use client";

import { useEffect, useState } from "react";
import { DataTable, PageHeader, SearchInput, TableShell, Td, Th, Toolbar } from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { formatCurrency } from "@/lib/admin/format";

export default function SupplierBookingsPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/v1/supplier/bookings", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setItems(j.data.items ?? []); });
  }, []);

  const filtered = items.filter((b) => {
    const q = search.toLowerCase();
    return !q || String(b.bookingNumber ?? "").toLowerCase().includes(q) || String(b.travelerName ?? "").toLowerCase().includes(q);
  });

  return (
    <>
      <PageHeader title="Bookings" subtitle="Manage booking requests, confirmations, modifications, and cancellations." />
      <Toolbar><SearchInput value={search} onChange={setSearch} placeholder="Search bookings…" /></Toolbar>
      <TableShell>
        <DataTable>
          <thead><tr><Th>Reference</Th><Th>Guest</Th><Th>Tour</Th><Th>Status</Th><Th className="text-right">Amount</Th></tr></thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={String(b.id)}>
                <Td className="font-mono text-xs">{String(b.bookingNumber ?? b.id)}</Td>
                <Td>{String(b.travelerName ?? "—")}</Td>
                <Td>{String(b.tourName ?? "—")}</Td>
                <Td><StatusBadge status={String(b.bookingStatus ?? "PENDING")} /></Td>
                <Td className="text-right tabular-nums">{formatCurrency(Number(b.amount ?? 0))}</Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </TableShell>
    </>
  );
}
