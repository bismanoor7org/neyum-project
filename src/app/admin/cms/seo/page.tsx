"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import {
  AdminButton,
  DataTable,
  PageHeader,
  SearchInput,
  TableShell,
  Td,
  Th,
  Toolbar,
} from "@/components/admin/ui/AdminUi";
import { SeoEditor } from "@/components/cms/SeoEditor";
import type { SeoPayload } from "@/lib/cms/types";
import type { CmsEntityType } from "@prisma/client";
import { saveSeoAction } from "@/server/actions/cms";
import { formatDate } from "@/lib/admin/format";
import type { CmsEnterpriseDashboard } from "@/lib/cms/types";
import { useCmsToast } from "@/components/cms/platform/CmsToast";

type SeoRow = {
  id: string;
  entityType: string;
  entityId: string;
  metaTitle: string | null;
  canonicalUrl: string | null;
  updatedAt?: string;
};

type RedirectRow = {
  id: string;
  fromPath: string;
  toPath: string;
  statusCode: number;
  isActive: boolean;
};

const emptySeo: SeoPayload = {
  metaTitle: "",
  metaDescription: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  canonicalUrl: "",
  schemaMarkup: null,
  noIndex: false,
};

export default function SeoCmsPage() {
  const { toast } = useCmsToast();
  const [items, setItems] = useState<SeoRow[]>([]);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState<SeoPayload>(emptySeo);
  const [entityType, setEntityType] = useState<CmsEntityType>("PAGE");
  const [entityId, setEntityId] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState<CmsEnterpriseDashboard["seoHealth"] | null>(null);
  const [redirects, setRedirects] = useState<RedirectRow[]>([]);
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");
  const [statusCode, setStatusCode] = useState(301);

  useEffect(() => {
    fetch("/api/v1/admin/cms/dashboard", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setHealth(j.data?.seoHealth ?? null))
      .catch(() => setHealth(null));

    fetch("/api/v1/admin/cms/redirects", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setRedirects(j.data?.items ?? []))
      .catch(() => setRedirects([]));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    setLoading(true);
    fetch(`/api/v1/admin/cms/seo?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [search]);

  const auditGaps = useMemo(
    () =>
      items.filter(
        (r) => !r.metaTitle || !r.canonicalUrl,
      ).slice(0, 12),
    [items],
  );

  const save = async () => {
    if (!entityId.trim()) return;
    setSaving(true);
    setSaveError(null);
    const result = await saveSeoAction({ entityType, entityId, ...draft });
    setSaving(false);
    if (!result.ok) {
      setSaveError(result.error);
      toast({ title: "SEO save failed", tone: "error" });
    } else {
      toast({ title: "SEO saved", tone: "success" });
    }
  };

  async function addRedirect() {
    if (!fromPath.trim() || !toPath.trim()) return;
    const res = await fetch("/api/v1/admin/cms/redirects", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromPath, toPath, statusCode }),
    });
    const json = await res.json();
    if (!res.ok) {
      toast({ title: "Redirect failed", description: json?.error, tone: "error" });
      return;
    }
    setRedirects((prev) => [json.data.item, ...prev.filter((r) => r.id !== json.data.item.id)]);
    setFromPath("");
    setToPath("");
    toast({ title: "Redirect saved", tone: "success" });
  }

  async function deleteRedirect(id: string) {
    const res = await fetch(`/api/v1/admin/cms/redirects?id=${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      toast({ title: "Delete failed", tone: "error" });
      return;
    }
    setRedirects((prev) => prev.filter((r) => r.id !== id));
    toast({ title: "Redirect removed", tone: "success" });
  }

  const ogTitle = draft.ogTitle || draft.metaTitle || "Page title";
  const ogDesc = draft.ogDescription || draft.metaDescription || "Meta description preview…";

  return (
    <>
      <PageHeader
        title="SEO Manager"
        subtitle="Meta, Open Graph preview, redirects, and coverage audit — public templates untouched."
        actions={
          <AdminButton onClick={save} disabled={saving || !entityId}>
            <Save className="h-4 w-4" />
            {saving ? "Saving…" : "Save SEO"}
          </AdminButton>
        }
      />

      {saveError && (
        <p className="admin-card mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {saveError}
        </p>
      )}

      {health && (
        <div className="admin-card mb-6 grid gap-4 rounded-xl p-5 sm:grid-cols-4">
          <div>
            <p className="admin-text-subtle text-xs">SEO records</p>
            <p className="text-2xl font-semibold">{health.total}</p>
          </div>
          <div>
            <p className="admin-text-subtle text-xs">With meta title</p>
            <p className="text-2xl font-semibold text-gold">
              {health.withTitle} / {health.total}
            </p>
          </div>
          <div>
            <p className="admin-text-subtle text-xs">With description</p>
            <p className="text-2xl font-semibold">
              {health.withDescription} / {health.total}
            </p>
          </div>
          <div>
            <p className="admin-text-subtle text-xs">Missing coverage</p>
            <p className="text-2xl font-semibold text-amber-700">{health.missing}</p>
          </div>
        </div>
      )}

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <div className="admin-card space-y-3 rounded-xl p-5">
          <label className="block space-y-1">
            <span className="admin-text-subtle text-xs font-medium">Entity type</span>
            <select
              className="admin-input w-full"
              value={entityType}
              onChange={(e) => setEntityType(e.target.value as CmsEntityType)}
            >
              {["HOMEPAGE", "DESTINATION", "TOUR", "TRANSPORT", "GUIDE", "FAQ", "TESTIMONIAL", "BANNER", "PAGE", "POST"].map(
                (t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ),
              )}
            </select>
          </label>
          <label className="block space-y-1">
            <span className="admin-text-subtle text-xs font-medium">Entity ID / slug</span>
            <input
              className="admin-input w-full"
              value={entityId}
              onChange={(e) => setEntityId(e.target.value)}
              placeholder="cuid or slug e.g. yasawa-islands"
            />
          </label>
        </div>
        <SeoEditor value={draft} onChange={setDraft} entityType={entityType} entityId={entityId} />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <div className="admin-card rounded-xl p-5">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            Open Graph preview
          </p>
          <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
            {draft.ogImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={draft.ogImage} alt="" className="h-40 w-full object-cover" />
            ) : (
              <div className="flex h-40 items-center justify-center bg-navy/5 text-xs text-navy/40">
                No OG image
              </div>
            )}
            <div className="space-y-1 p-3">
              <p className="text-[10px] uppercase tracking-wide text-navy/40">
                {draft.canonicalUrl || "myfijitour.com"}
              </p>
              <p className="line-clamp-2 font-semibold text-[#1a0dab]">{ogTitle}</p>
              <p className="line-clamp-2 text-sm text-navy/60">{ogDesc}</p>
            </div>
          </div>
        </div>

        <div className="admin-card space-y-3 rounded-xl p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">URL redirects</p>
          <div className="grid gap-2 sm:grid-cols-[1fr_1fr_5rem_auto]">
            <input
              className="admin-input h-9 rounded-lg px-3 text-sm"
              placeholder="/old-path"
              value={fromPath}
              onChange={(e) => setFromPath(e.target.value)}
            />
            <input
              className="admin-input h-9 rounded-lg px-3 text-sm"
              placeholder="/new-path"
              value={toPath}
              onChange={(e) => setToPath(e.target.value)}
            />
            <select
              className="admin-input h-9 rounded-lg px-2 text-sm"
              value={statusCode}
              onChange={(e) => setStatusCode(Number(e.target.value))}
            >
              <option value={301}>301</option>
              <option value={302}>302</option>
              <option value={307}>307</option>
              <option value={308}>308</option>
            </select>
            <AdminButton size="sm" onClick={() => void addRedirect()}>
              <Plus className="h-3.5 w-3.5" />
              Add
            </AdminButton>
          </div>
          <ul className="max-h-48 space-y-2 overflow-auto text-sm">
            {redirects.length === 0 ? (
              <li className="text-navy/45">No redirects yet.</li>
            ) : (
              redirects.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-2 rounded-lg bg-black/[0.02] px-2 py-1.5">
                  <span className="truncate font-mono text-xs">
                    {r.statusCode} {r.fromPath} → {r.toPath}
                  </span>
                  <button type="button" onClick={() => void deleteRedirect(r.id)} aria-label="Delete">
                    <Trash2 className="h-3.5 w-3.5 text-red-600" />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {auditGaps.length > 0 && (
        <div className="admin-card mb-6 rounded-xl p-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            Coverage audit — missing title or canonical
          </p>
          <ul className="space-y-1 text-sm">
            {auditGaps.map((row) => (
              <li key={row.id} className="flex justify-between gap-3 font-mono text-xs">
                <span>
                  {row.entityType}:{row.entityId}
                </span>
                <span className="text-amber-700">
                  {!row.metaTitle ? "no title" : ""}
                  {!row.metaTitle && !row.canonicalUrl ? " · " : ""}
                  {!row.canonicalUrl ? "no canonical" : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search SEO records…" />
      </Toolbar>

      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Entity</Th>
              <Th>Meta title</Th>
              <Th>Canonical</Th>
              <Th>Updated</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <Td colSpan={4} className="text-center text-[#64748b]">
                  Loading…
                </Td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <Td colSpan={4} className="text-center text-[#64748b]">
                  No SEO records yet.
                </Td>
              </tr>
            ) : (
              items.map((row) => (
                <tr
                  key={row.id}
                  className="cursor-pointer hover:bg-[#faf9f7]/80"
                  onClick={async () => {
                    setEntityType(row.entityType as CmsEntityType);
                    setEntityId(row.entityId);
                    setSaveError(null);
                    try {
                      const params = new URLSearchParams({
                        entityType: row.entityType,
                        entityId: row.entityId,
                      });
                      const res = await fetch(`/api/v1/admin/cms/seo?${params}`, {
                        credentials: "include",
                      });
                      const json = await res.json();
                      const seo = json.data?.seo;
                      setDraft(
                        seo
                          ? {
                              metaTitle: seo.metaTitle ?? "",
                              metaDescription: seo.metaDescription ?? "",
                              ogTitle: seo.ogTitle ?? "",
                              ogDescription: seo.ogDescription ?? "",
                              ogImage: seo.ogImage ?? "",
                              canonicalUrl: seo.canonicalUrl ?? "",
                              schemaMarkup: seo.schemaMarkup ?? null,
                              noIndex: seo.noIndex ?? false,
                            }
                          : {
                              metaTitle: row.metaTitle ?? "",
                              canonicalUrl: row.canonicalUrl ?? "",
                            },
                      );
                    } catch {
                      setDraft({
                        metaTitle: row.metaTitle ?? "",
                        canonicalUrl: row.canonicalUrl ?? "",
                      });
                    }
                  }}
                >
                  <Td className="font-mono text-xs">
                    {row.entityType}:{row.entityId}
                  </Td>
                  <Td>{row.metaTitle ?? "—"}</Td>
                  <Td className="truncate text-xs text-[#64748b]">{row.canonicalUrl ?? "—"}</Td>
                  <Td className="text-xs">{row.updatedAt ? formatDate(row.updatedAt) : "—"}</Td>
                </tr>
              ))
            )}
          </tbody>
        </DataTable>
      </TableShell>
    </>
  );
}
