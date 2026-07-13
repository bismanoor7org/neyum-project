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

type TransportRow = {
  id: string;
  title: string;
  type: string;
  status: string;
  supplier?: { companyName: string };
};

export default function TransportCmsPage() {
  const [items, setItems] = useState<TransportRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    setLoading(true);
    fetch(`/api/v1/admin/cms/transport?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <>
      <PageHeader
        title="Transportation Manager"
        subtitle="Airport transfers, boat services and private drivers."
        actions={
          <Link
            href="/admin/cms/transport/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light"
          >
            New service
          </Link>
        }
      />
      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search transport…" />
      </Toolbar>
      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Service</Th>
              <Th>Type</Th>
              <Th>Supplier</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><Td colSpan={5} className="text-center text-[#64748b]">Loading…</Td></tr>
            ) : items.length === 0 ? (
              <tr>
                <Td colSpan={5} className="text-center text-[#64748b]">
                  No transport services.{" "}
                  <Link href="/admin/cms/transport/new" className="text-gold underline">Create one</Link>
                </Td>
              </tr>
            ) : (
              items.map((t) => (
                <tr key={t.id}>
                  <Td className="font-medium">
                    <Link href={`/admin/cms/transport/${t.id}/edit`} className="hover:text-gold">{t.title}</Link>
                  </Td>
                  <Td className="text-xs uppercase tracking-wide text-[#64748b]">{t.type}</Td>
                  <Td>{t.supplier?.companyName ?? "—"}</Td>
                  <Td><StatusBadge status={t.status} /></Td>
                  <Td>
                    <Link href={`/admin/cms/transport/${t.id}/edit`} className="text-xs text-gold">Edit</Link>
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
