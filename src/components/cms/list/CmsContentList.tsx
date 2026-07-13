"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AdminButton,
  FilterSelect,
  SearchInput,
  TableShell,
  DataTable,
  Th,
  Td,
} from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

type Row = {
  id: string;
  title: string;
  slug: string;
  status: string;
  updatedAt?: string;
  publishedAt?: string | null;
};

type Props = {
  title: string;
  subtitle: string;
  apiBase: string;
  createHref: string;
  editHref: (id: string) => string;
  entity: "page" | "post";
};

export function CmsContentList({ title, subtitle, apiBase, createHref, editHref, entity }: Props) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 20;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const showHeader = Boolean(title);

  const query = useMemo(() => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (status) p.set("status", status);
    p.set("page", String(page));
    p.set("pageSize", String(pageSize));
    return p.toString();
  }, [q, status, page]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}?${query}`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || data?.error || "Failed to load");
      setRows(data.data?.items ?? data.items ?? []);
      setTotal(data.data?.total ?? data.total ?? 0);
      setSelected([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  async function runAction(action: "delete" | "duplicate" | "publish" | "draft", id?: string) {
    const ids = id ? [id] : selected;
    if (!ids.length) return;
    if (action === "delete" && !window.confirm(`Delete ${ids.length} item(s)?`)) return;
    for (const itemId of ids) {
      if (action === "delete") {
        await fetch(`${apiBase}/${itemId}`, { method: "DELETE", credentials: "include" });
      } else if (action === "duplicate") {
        await fetch(`${apiBase}/${itemId}/duplicate`, { method: "POST", credentials: "include" });
      } else {
        await fetch(`${apiBase}/bulk`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ids,
            status: action === "publish" ? "PUBLISHED" : "DRAFT",
          }),
        });
        break;
      }
    }
    await load();
  }

  return (
    <div>
      {showHeader && (
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="admin-text font-serif text-3xl tracking-tight">{title}</h1>
          <p className="admin-text-muted mt-2 text-[15px]">{subtitle}</p>
        </div>
        <Link href={createHref}>
          <AdminButton>Create {entity}</AdminButton>
        </Link>
      </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput value={q} onChange={(v) => { setQ(v); setPage(1); }} />
        <FilterSelect
          value={status}
          onChange={(v) => { setStatus(v); setPage(1); }}
          options={[
            { value: "", label: "All statuses" },
            { value: "DRAFT", label: "Draft" },
            { value: "PUBLISHED", label: "Published" },
            { value: "SCHEDULED", label: "Scheduled" },
            { value: "ARCHIVED", label: "Archived" },
          ]}
        />
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <AdminButton size="sm" variant="secondary" onClick={() => void runAction("publish")}>
              Publish
            </AdminButton>
            <AdminButton size="sm" variant="secondary" onClick={() => void runAction("draft")}>
              Draft
            </AdminButton>
            <AdminButton size="sm" variant="danger" onClick={() => void runAction("delete")}>
              Delete
            </AdminButton>
          </div>
        )}
      </div>

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>
                <input
                  type="checkbox"
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={(e) => setSelected(e.target.checked ? rows.map((r) => r.id) : [])}
                />
              </Th>
              <Th>Title</Th>
              <Th>Status</Th>
              <Th>Updated</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <Td colSpan={5}>
                  <div className="h-10 animate-pulse rounded bg-black/5" />
                </Td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <Td colSpan={5}>No {entity}s yet.</Td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <Td>
                    <input
                      type="checkbox"
                      checked={selected.includes(row.id)}
                      onChange={(e) =>
                        setSelected((s) =>
                          e.target.checked ? [...s, row.id] : s.filter((id) => id !== row.id),
                        )
                      }
                    />
                  </Td>
                  <Td>
                    <Link href={editHref(row.id)} className="font-medium hover:text-gold">
                      {row.title}
                    </Link>
                    <div className="admin-text-muted text-xs">/{row.slug}</div>
                  </Td>
                  <Td>
                    <StatusBadge status={row.status.toLowerCase()} />
                  </Td>
                  <Td className="text-xs">
                    {row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "—"}
                  </Td>
                  <Td>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Link href={editHref(row.id)} className="text-gold">
                        Edit
                      </Link>
                      <button type="button" className="text-navy/70" onClick={() => void runAction("duplicate", row.id)}>
                        Duplicate
                      </button>
                      <button type="button" className="text-red-600" onClick={() => void runAction("delete", row.id)}>
                        Delete
                      </button>
                    </div>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </DataTable>
      </TableShell>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="admin-text-muted">
          Page {page} / {totalPages} · {total} total
        </span>
        <div className="flex gap-2">
          <AdminButton size="sm" variant="secondary" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </AdminButton>
          <AdminButton
            size="sm"
            variant="secondary"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
