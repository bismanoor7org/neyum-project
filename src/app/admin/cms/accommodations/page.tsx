"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  DataTable,
  FilterSelect,
  PageHeader,
  SearchInput,
  TableShell,
  Td,
  Th,
  Toolbar,
} from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { formatDate } from "@/lib/admin/format";

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
];

type Row = {
  id: string;
  title: string;
  slug: string;
  location: string;
  status?: string;
  featured?: boolean;
  updatedAt?: string;
};

export default function AccommodationsCmsPage() {
  const [items, setItems] = useState<Row[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status !== "all") params.set("status", status);
    setLoading(true);
    fetch(`/api/v1/admin/cms/accommodations?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [search, status]);

  const filtered = useMemo(() => items, [items]);

  return (
    <>
      <PageHeader
        title="Places to Stay"
        subtitle="Hotels, resorts and villas — gallery, pricing and SEO."
        actions={
          <Link
            href="/admin/cms/accommodations/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light"
          >
            <Plus className="h-4 w-4" />
            New property
          </Link>
        }
      />
      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search properties…" />
        <FilterSelect value={status} onChange={setStatus} options={STATUS_OPTIONS} label="Status" />
      </Toolbar>
      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Property</Th>
              <Th>Slug</Th>
              <Th>Location</Th>
              <Th>Status</Th>
              <Th>Featured</Th>
              <Th>Updated</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <Td colSpan={6} className="text-center text-[#64748b]">Loading…</Td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <Td colSpan={6} className="text-center text-[#64748b]">
                  No properties yet.{" "}
                  <Link href="/admin/cms/accommodations/new" className="text-gold underline">
                    Add one
                  </Link>
                </Td>
              </tr>
            ) : (
              filtered.map((d) => (
                <tr key={d.id} className="hover:bg-[#faf9f7]/80">
                  <Td className="font-medium">
                    <Link href={`/admin/cms/accommodations/${d.id}/edit`} className="hover:text-gold">
                      {d.title}
                    </Link>
                  </Td>
                  <Td className="font-mono text-xs text-[#64748b]">{d.slug}</Td>
                  <Td>{d.location}</Td>
                  <Td>
                    <StatusBadge status={d.status ?? "DRAFT"} />
                  </Td>
                  <Td>{d.featured ? "Yes" : "—"}</Td>
                  <Td className="text-xs">{d.updatedAt ? formatDate(d.updatedAt) : "—"}</Td>
                </tr>
              ))
            )}
          </tbody>
        </DataTable>
      </TableShell>
    </>
  );
}
