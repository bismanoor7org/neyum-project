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

const CATEGORY_OPTIONS = [
  { value: "all", label: "All categories" },
  { value: "PACKAGE", label: "Package Deals" },
  { value: "ACCOMMODATION", label: "Accommodation" },
  { value: "EXPERIENCE", label: "Experiences" },
];

type Row = {
  id: string;
  title: string;
  slug: string;
  category: string;
  price: string;
  status?: string;
  featured?: boolean;
  updatedAt?: string;
};

export default function DealsCmsPage() {
  const [items, setItems] = useState<Row[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status !== "all") params.set("status", status);
    if (category !== "all") params.set("category", category);
    setLoading(true);
    fetch(`/api/v1/admin/cms/deals?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [search, status, category]);

  const filtered = useMemo(() => items, [items]);

  return (
    <>
      <PageHeader
        title="Deals & Offers"
        subtitle="Packages, pricing and featured promotions for the deals hub."
        actions={
          <Link
            href="/admin/cms/deals/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light"
          >
            <Plus className="h-4 w-4" />
            New deal
          </Link>
        }
      />
      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search deals…" />
        <FilterSelect value={status} onChange={setStatus} options={STATUS_OPTIONS} label="Status" />
        <FilterSelect value={category} onChange={setCategory} options={CATEGORY_OPTIONS} label="Category" />
      </Toolbar>
      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Deal</Th>
              <Th>Category</Th>
              <Th>Price</Th>
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
                  No deals yet.{" "}
                  <Link href="/admin/cms/deals/new" className="text-gold underline">
                    Create one
                  </Link>
                </Td>
              </tr>
            ) : (
              filtered.map((d) => (
                <tr key={d.id} className="hover:bg-[#faf9f7]/80">
                  <Td className="font-medium">
                    <Link href={`/admin/cms/deals/${d.id}/edit`} className="hover:text-gold">
                      {d.title}
                    </Link>
                  </Td>
                  <Td>{d.category}</Td>
                  <Td>{d.price}</Td>
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
