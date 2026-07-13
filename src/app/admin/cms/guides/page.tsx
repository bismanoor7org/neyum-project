"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
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
import { formatDate } from "@/lib/admin/format";

type GuideRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  updatedAt?: string;
};

export default function GuidesCmsPage() {
  const [items, setItems] = useState<GuideRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    setLoading(true);
    fetch(`/api/v1/admin/cms/guides?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <>
      <PageHeader
        title="Travel Guides Manager"
        subtitle="Editorial guides — visa, weather, culture and planning."
        actions={
          <Link
            href="/admin/cms/guides/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light"
          >
            <Plus className="h-4 w-4" />
            New guide
          </Link>
        }
      />
      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search guides…" />
      </Toolbar>
      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Status</Th>
              <Th>Updated</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><Td colSpan={5} className="text-center text-[#64748b]">Loading…</Td></tr>
            ) : items.length === 0 ? (
              <tr>
                <Td colSpan={5} className="text-center text-[#64748b]">
                  No guides yet.{" "}
                  <Link href="/admin/cms/guides/new" className="text-gold underline">Create one</Link>
                </Td>
              </tr>
            ) : (
              items.map((g) => (
                <tr key={g.id}>
                  <Td className="font-medium">
                    <Link href={`/admin/cms/guides/${g.id}/edit`} className="hover:text-gold">{g.title}</Link>
                  </Td>
                  <Td className="text-xs text-[#64748b]">{g.category}</Td>
                  <Td><StatusBadge status={g.status} /></Td>
                  <Td className="text-xs">{g.updatedAt ? formatDate(g.updatedAt) : "—"}</Td>
                  <Td>
                    <Link href={`/admin/cms/guides/${g.id}/edit`} className="text-xs text-gold">Edit</Link>
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
