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

type FaqRow = {
  id: string;
  question: string;
  category: string | null;
  status?: string;
  sortOrder: number;
};

export default function FaqsCmsPage() {
  const [items, setItems] = useState<FaqRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    setLoading(true);
    fetch(`/api/v1/admin/cms/faqs?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <>
      <PageHeader
        title="FAQ Manager"
        subtitle="Concierge FAQs organised by category with publish workflow."
        actions={
          <Link
            href="/admin/cms/faqs/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light"
          >
            <Plus className="h-4 w-4" />
            New FAQ
          </Link>
        }
      />
      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search FAQs…" />
      </Toolbar>
      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Question</Th>
              <Th>Category</Th>
              <Th>Status</Th>
              <Th>Order</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><Td colSpan={5} className="text-center text-[#64748b]">Loading…</Td></tr>
            ) : items.length === 0 ? (
              <tr>
                <Td colSpan={5} className="text-center text-[#64748b]">
                  No FAQs yet.{" "}
                  <Link href="/admin/cms/faqs/new" className="text-gold underline">Create one</Link>
                </Td>
              </tr>
            ) : (
              items.map((f) => (
                <tr key={f.id}>
                  <Td className="font-medium">
                    <Link href={`/admin/cms/faqs/${f.id}/edit`} className="hover:text-gold">{f.question}</Link>
                  </Td>
                  <Td>{f.category ?? "General"}</Td>
                  <Td><StatusBadge status={f.status ?? "PUBLISHED"} /></Td>
                  <Td>{f.sortOrder}</Td>
                  <Td>
                    <Link href={`/admin/cms/faqs/${f.id}/edit`} className="text-xs text-gold">Edit</Link>
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
