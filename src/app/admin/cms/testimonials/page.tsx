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

type TestimonialRow = {
  id: string;
  authorName: string;
  authorTitle: string | null;
  status: string;
  featured: boolean;
  rating: number;
};

export default function TestimonialsCmsPage() {
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/v1/admin/cms/testimonials", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <>
      <PageHeader
        title="Testimonials Manager"
        subtitle="Curated traveller quotes for homepage and landing pages."
        actions={
          <Link
            href="/admin/cms/testimonials/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light"
          >
            <Plus className="h-4 w-4" />
            New testimonial
          </Link>
        }
      />
      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search testimonials…" />
      </Toolbar>
      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Author</Th>
              <Th>Title</Th>
              <Th>Rating</Th>
              <Th>Featured</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><Td colSpan={6} className="text-center text-[#64748b]">Loading…</Td></tr>
            ) : items.length === 0 ? (
              <tr>
                <Td colSpan={6} className="text-center text-[#64748b]">
                  No testimonials yet.{" "}
                  <Link href="/admin/cms/testimonials/new" className="text-gold underline">Create one</Link>
                </Td>
              </tr>
            ) : (
              items.map((t) => (
                <tr key={t.id}>
                  <Td className="font-medium">
                    <Link href={`/admin/cms/testimonials/${t.id}/edit`} className="hover:text-gold">{t.authorName}</Link>
                  </Td>
                  <Td>{t.authorTitle ?? "—"}</Td>
                  <Td>{t.rating}★</Td>
                  <Td>{t.featured ? "Yes" : "—"}</Td>
                  <Td><StatusBadge status={t.status} /></Td>
                  <Td>
                    <Link href={`/admin/cms/testimonials/${t.id}/edit`} className="text-xs text-gold">Edit</Link>
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
