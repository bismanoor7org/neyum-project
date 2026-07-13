"use client";

import { useEffect, useState } from "react";
import {
  DataTable,
  PageHeader,
  SearchInput,
  TableShell,
  Td,
  Th,
  Toolbar,
} from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { formatCurrency } from "@/lib/admin/format";

type TourRow = {
  id: string;
  slug: string;
  title: string;
  status: string;
  featured: boolean;
  basePrice: number;
  supplier: { companyName: string };
  destination: { name: string };
  _count: { bookings: number };
};

export default function ToursPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<TourRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    setLoading(true);
    fetch(`/api/v1/admin/tours?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <>
      <PageHeader
        title="Tour Management"
        subtitle="Approve, feature and monitor marketplace experiences from live catalogue."
      />

      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search tours…" />
      </Toolbar>

      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Tour</Th>
              <Th>Supplier</Th>
              <Th>Destination</Th>
              <Th>Price</Th>
              <Th>Bookings</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="admin-text-muted px-4 py-8 text-center">Loading…</td></tr>}
            {!loading && items.length === 0 && <tr><td colSpan={6} className="admin-text-muted px-4 py-8 text-center">No tours found.</td></tr>}
            {items.map((t) => (
              <tr key={t.id}>
                <Td className="font-medium">{t.title}</Td>
                <Td>{t.supplier.companyName}</Td>
                <Td>{t.destination.name}</Td>
                <Td>{formatCurrency(t.basePrice)}</Td>
                <Td>{t._count.bookings}</Td>
                <Td><StatusBadge status={t.status} /></Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </TableShell>
    </>
  );
}
