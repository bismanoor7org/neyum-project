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
import { HomepageBuilder } from "@/components/cms/HomepageBuilder";
import { formatDate } from "@/lib/admin/format";

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "ARCHIVED", label: "Archived" },
];

type Row = {
  id: string;
  key?: string;
  title?: string;
  name?: string;
  status?: string;
  updatedAt?: string;
};

export default function HomepageCmsPage() {
  const [sections, setSections] = useState<Row[]>([]);
  const [banners, setBanners] = useState<Row[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [tab, setTab] = useState<"builder" | "sections" | "banners">("builder");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tab === "builder") {
      const params = new URLSearchParams({ type: "sections" });
      setLoading(true);
      fetch(`/api/v1/admin/cms/homepage?${params}`, { credentials: "include" })
        .then((r) => r.json())
        .then((j) => setSections(j.data?.items ?? []))
        .catch(() => setSections([]))
        .finally(() => setLoading(false));
      return;
    }
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status !== "all") params.set("status", status);
    params.set("type", tab === "banners" ? "banners" : "sections");

    fetch(`/api/v1/admin/cms/homepage?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => {
        const items = j.data?.items ?? [];
        if (tab === "banners") setBanners(items);
        else setSections(items);
      })
      .catch(() => {
        if (tab === "banners") setBanners([]);
        else setSections([]);
      })
      .finally(() => setLoading(false));
  }, [search, status, tab]);

  const rows = useMemo(() => (tab === "banners" ? banners : sections), [tab, banners, sections]);

  const refresh = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status !== "all") params.set("status", status);
    params.set("type", "sections");
    fetch(`/api/v1/admin/cms/homepage?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setSections(j.data?.items ?? []));
  };

  return (
    <>
      <PageHeader
        title="Homepage Manager"
        subtitle="Hero sections, conversion blocks and promotional banners."
        actions={
          <Link
            href={tab === "banners" ? "/admin/cms/homepage/banners/new" : "/admin/cms/homepage/new"}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light"
          >
            <Plus className="h-4 w-4" />
            New {tab === "banners" ? "banner" : "section"}
          </Link>
        }
      />

      <div className="mb-4 flex gap-2">
        {(["builder", "sections", "banners"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
              tab === t ? "bg-gold/15 text-gold" : "admin-text-subtle hover:bg-black/5"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search homepage content…" />
        <FilterSelect value={status} onChange={setStatus} options={STATUS_OPTIONS} label="Status" />
      </Toolbar>

      {tab === "builder" ? (
        <HomepageBuilder sections={sections} onRefresh={refresh} />
      ) : (
      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>{tab === "banners" ? "Title" : "Section"}</Th>
              <Th>Key</Th>
              <Th>Status</Th>
              <Th>Updated</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <Td colSpan={5} className="text-center text-[#64748b]">
                  Loading…
                </Td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <Td colSpan={5} className="text-center text-[#64748b]">
                  No {tab} yet.{" "}
                  <Link href="/admin/cms/homepage/new" className="text-gold underline">
                    Create section
                  </Link>
                </Td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-[#faf9f7]/80">
                  <Td className="font-medium">
                    {tab === "sections" ? (
                      <Link href={`/admin/cms/homepage/${row.id}/edit`} className="hover:text-gold">
                        {row.title ?? row.name ?? "—"}
                      </Link>
                    ) : (
                      <Link href={`/admin/cms/homepage/banners/${row.id}/edit`} className="hover:text-gold">
                        {row.title ?? row.name ?? "—"}
                      </Link>
                    )}
                  </Td>
                  <Td className="font-mono text-xs text-[#64748b]">{row.key ?? row.id.slice(0, 8)}</Td>
                  <Td>
                    <StatusBadge status={row.status ?? "DRAFT"} />
                  </Td>
                  <Td className="text-xs">{row.updatedAt ? formatDate(row.updatedAt) : "—"}</Td>
                  <Td>
                    {tab === "sections" ? (
                      <Link href={`/admin/cms/homepage/${row.id}/edit`} className="text-xs text-gold">
                        Edit
                      </Link>
                    ) : (
                      <Link href={`/admin/cms/homepage/banners/${row.id}/edit`} className="text-xs text-gold">
                        Edit
                      </Link>
                    )}
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </DataTable>
      </TableShell>
      )}
    </>
  );
}
