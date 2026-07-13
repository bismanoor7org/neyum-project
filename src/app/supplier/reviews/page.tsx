"use client";

import { useEffect, useState } from "react";
import { DataTable, PageHeader, TableShell, Td, Th } from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

export default function SupplierReviewsPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    fetch("/api/v1/supplier/profile?section=reviews", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setItems(j.data.items ?? []); });
  }, []);

  return (
    <>
      <PageHeader title="Reviews" subtitle="Collect, moderate, and respond to guest reviews." />
      <TableShell>
        <DataTable>
          <thead><tr><Th>Tour</Th><Th>Rating</Th><Th>Review</Th><Th>Status</Th></tr></thead>
          <tbody>
            {items.map((r) => (
              <tr key={String(r.id)}>
                <Td>{String(r.tourTitle ?? (typeof r.tour === "object" && r.tour && "title" in r.tour ? String((r.tour as { title: unknown }).title) : null) ?? "—")}</Td>
                <Td>{String(r.rating)} ★</Td>
                <Td className="max-w-xs truncate">{String(r.review ?? "")}</Td>
                <Td><StatusBadge status={String(r.status)} /></Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </TableShell>
    </>
  );
}
