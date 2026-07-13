"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

type TourRow = {
  id: string;
  title: string;
  slug: string;
  status: string;
  featured?: boolean;
  supplier?: { companyName: string };
};

export default function ToursCmsPage() {
  const [items, setItems] = useState<TourRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    setLoading(true);
    fetch(`/api/v1/admin/cms/tours?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <>
      <PageHeader
        title="Tours Manager"
        subtitle="Marketplace tour listings — copy, imagery, featured placement and approval status."
        actions={
          <Link
            href="/admin/cms/tours/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light"
          >
            New tour
          </Link>
        }
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
              <Th>Status</Th>
              <Th>Featured</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><Td colSpan={5} className="text-center text-[#64748b]">Loading…</Td></tr>
            ) : items.length === 0 ? (
              <tr>
                <Td colSpan={5} className="text-center text-[#64748b]">
                  No tours found.{" "}
                  <Link href="/admin/cms/tours/new" className="text-gold underline">Create one</Link>
                </Td>
              </tr>
            ) : (
              items.map((t) => (
                <tr key={t.id}>
                  <Td className="font-medium">
                    <Link href={`/admin/cms/tours/${t.id}/edit`} className="hover:text-gold">{t.title}</Link>
                  </Td>
                  <Td>{t.supplier?.companyName ?? "—"}</Td>
                  <Td><StatusBadge status={t.status} /></Td>
                  <Td>{t.featured ? "Yes" : "—"}</Td>
                  <Td>
                    <Link href={`/admin/cms/tours/${t.id}/edit`} className="text-xs text-gold">Edit</Link>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </DataTable>
      </TableShell>
    </>
  );
}
