"use client";

import { useEffect, useState } from "react";
import { AdminButton, DataTable, PageHeader, TableShell, Td, Th } from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { formatCurrency } from "@/lib/admin/format";

export default function SupplierToursPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    fetch("/api/v1/supplier/tours", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setItems(j.data.items ?? []); });
  }, []);

  return (
    <>
      <PageHeader title="Tours" subtitle="Create, manage, and submit tours for platform approval." actions={<AdminButton>Create tour</AdminButton>} />
      <TableShell>
        <DataTable>
          <thead><tr><Th>Title</Th><Th>Status</Th><Th>Reviews</Th><Th className="text-right">Price</Th></tr></thead>
          <tbody>
            {items.map((t) => (
              <tr key={String(t.id)}>
                <Td className="font-medium">{String(t.title)}</Td>
                <Td><StatusBadge status={String(t.status)} /></Td>
                <Td>{String(t.reviewCount ?? 0)}</Td>
                <Td className="text-right tabular-nums">{formatCurrency(Number(t.price ?? 0))}</Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </TableShell>
    </>
  );
}
