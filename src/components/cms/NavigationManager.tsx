"use client";

import { useCallback, useEffect, useMemo, useState, type DragEvent } from "react";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import {
  DataTable,
  PageHeader,
  TableShell,
  Td,
  Th,
  Toolbar,
} from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import type { ContentStatus } from "@prisma/client";
import {
  deleteNavigationAction,
  reorderNavigationAction,
  saveNavigationAction,
} from "@/server/actions/cms-extended";
import { useCmsToast } from "@/components/cms/platform/CmsToast";
import { cn } from "@/lib/utils";

type NavRow = {
  id: string;
  label: string;
  href: string;
  description?: string | null;
  location: "PRIMARY" | "MEGA_MENU" | "FOOTER";
  parentKey?: string | null;
  image?: string | null;
  featured?: boolean;
  sortOrder: number;
  status: ContentStatus;
};

const LOCATIONS = [
  { value: "PRIMARY", label: "Primary navigation" },
  { value: "MEGA_MENU", label: "Mega menu items" },
  { value: "FOOTER", label: "Footer links" },
] as const;

export function NavigationManager() {
  const { toast } = useCmsToast();
  const [location, setLocation] = useState<"PRIMARY" | "MEGA_MENU" | "FOOTER">("PRIMARY");
  const [items, setItems] = useState<NavRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`/api/v1/admin/cms/navigation?location=${location}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [location]);

  useEffect(() => {
    load();
  }, [load]);

  const tree = useMemo(() => {
    const roots = items.filter((i) => !i.parentKey);
    const childrenOf = (key: string) => items.filter((i) => i.parentKey === key);
    return { roots, childrenOf };
  }, [items]);

  async function persistOrder(next: NavRow[]) {
    setItems(next);
    await reorderNavigationAction(next.map((item, i) => ({ id: item.id, sortOrder: i })));
  }

  async function addItem(parentKey?: string | null) {
    setSaving(true);
    setError(null);
    const result = await saveNavigationAction({
      label: parentKey ? "Child link" : "New link",
      href: "/",
      location,
      parentKey: parentKey || undefined,
      status: "DRAFT",
      sortOrder: items.length,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      toast({ title: "Could not add link", description: result.error, tone: "error" });
      return;
    }
    toast({ title: "Link added", tone: "success" });
    load();
  }

  async function updateItem(id: string, patch: Partial<NavRow>) {
    setSaving(true);
    const row = items.find((i) => i.id === id);
    if (!row) return;
    const result = await saveNavigationAction({
      id,
      label: patch.label ?? row.label,
      href: patch.href ?? row.href,
      description: patch.description ?? row.description ?? undefined,
      location: patch.location ?? row.location,
      parentKey: patch.parentKey !== undefined ? patch.parentKey ?? undefined : row.parentKey ?? undefined,
      image: patch.image ?? row.image ?? undefined,
      featured: patch.featured ?? row.featured ?? undefined,
      status: patch.status ?? row.status,
      sortOrder: patch.sortOrder ?? row.sortOrder,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      toast({ title: "Update failed", description: result.error, tone: "error" });
    } else {
      load();
    }
  }

  async function removeItem(id: string) {
    if (!confirm("Remove this navigation item?")) return;
    setSaving(true);
    const result = await deleteNavigationAction(id);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      toast({ title: "Delete failed", tone: "error" });
    } else {
      toast({ title: "Link removed", tone: "success" });
      load();
    }
  }

  async function moveItem(id: string, direction: -1 | 1) {
    const idx = items.findIndex((i) => i.id === id);
    const swapIdx = idx + direction;
    if (idx < 0 || swapIdx < 0 || swapIdx >= items.length) return;
    const next = [...items];
    const [row] = next.splice(idx, 1);
    next.splice(swapIdx, 0, row);
    await persistOrder(next.map((item, i) => ({ ...item, sortOrder: i })));
  }

  function onDragStart(e: DragEvent, id: string) {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  }

  function onDragOver(e: DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  async function onDrop(e: DragEvent, targetId: string) {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain") || dragId;
    setDragId(null);
    if (!sourceId || sourceId === targetId) return;
    const from = items.findIndex((i) => i.id === sourceId);
    const to = items.findIndex((i) => i.id === targetId);
    if (from < 0 || to < 0) return;
    const next = [...items];
    const [row] = next.splice(from, 1);
    next.splice(to, 0, row);
    await persistOrder(next.map((item, i) => ({ ...item, sortOrder: i })));
    toast({ title: "Menu reordered", tone: "success" });
  }

  async function nestUnder(childId: string, parentKey: string | null) {
    await updateItem(childId, { parentKey });
    toast({ title: parentKey ? "Nested under parent" : "Moved to root", tone: "success" });
  }

  function renderRow(row: NavRow, depth: number) {
    const parentOptions = items.filter((i) => i.id !== row.id && !i.parentKey);
    return (
      <tr
        key={row.id}
        draggable
        onDragStart={(e) => onDragStart(e, row.id)}
        onDragOver={onDragOver}
        onDrop={(e) => void onDrop(e, row.id)}
        className={cn("hover:bg-[#faf9f7]/80", dragId === row.id && "opacity-50")}
      >
        <Td>
          <div className="flex items-center gap-1" style={{ paddingLeft: depth * 16 }}>
            <GripVertical className="h-4 w-4 cursor-grab text-navy/30" />
            <button
              type="button"
              disabled={saving}
              onClick={() => void moveItem(row.id, -1)}
              className="rounded border px-2 text-xs"
            >
              ↑
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => void moveItem(row.id, 1)}
              className="rounded border px-2 text-xs"
            >
              ↓
            </button>
          </div>
        </Td>
        <Td>
          <input
            className="w-full rounded border px-2 py-1 text-sm"
            defaultValue={row.label}
            onBlur={(e) => {
              if (e.target.value !== row.label) void updateItem(row.id, { label: e.target.value });
            }}
          />
        </Td>
        <Td>
          <input
            className="w-full rounded border px-2 py-1 font-mono text-xs"
            defaultValue={row.href}
            onBlur={(e) => {
              if (e.target.value !== row.href) void updateItem(row.id, { href: e.target.value });
            }}
          />
        </Td>
        <Td>
          <select
            className="w-full rounded border px-2 py-1 font-mono text-xs"
            value={row.parentKey ?? ""}
            onChange={(e) => void nestUnder(row.id, e.target.value || null)}
          >
            <option value="">— root —</option>
            {parentOptions.map((p) => (
              <option key={p.id} value={p.href.replace(/^\//, "") || p.label.toLowerCase()}>
                {p.label}
              </option>
            ))}
            {row.parentKey && !parentOptions.some((p) => (p.href.replace(/^\//, "") || p.label.toLowerCase()) === row.parentKey) && (
              <option value={row.parentKey}>{row.parentKey}</option>
            )}
          </select>
          <input
            className="mt-1 w-full rounded border px-2 py-1 font-mono text-[10px]"
            defaultValue={row.parentKey ?? ""}
            placeholder="or type parent key"
            onBlur={(e) => {
              const v = e.target.value || null;
              if (v !== (row.parentKey ?? null)) void nestUnder(row.id, v);
            }}
          />
        </Td>
        {location === "MEGA_MENU" && (
          <Td>
            <input
              className="w-full rounded border px-2 py-1 font-mono text-xs"
              defaultValue={row.image ?? ""}
              placeholder="https://…"
              onBlur={(e) => {
                const v = e.target.value || null;
                if (v !== (row.image ?? null)) void updateItem(row.id, { image: v ?? undefined });
              }}
            />
          </Td>
        )}
        <Td>
          <StatusBadge status={row.status} />
        </Td>
        <Td>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void addItem(row.href.replace(/^\//, "") || row.label.toLowerCase())}
              className="text-xs text-gold hover:underline"
              title="Add child"
            >
              + child
            </button>
            <button
              type="button"
              onClick={() => void removeItem(row.id)}
              className="text-red-600 hover:text-red-800"
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </Td>
      </tr>
    );
  }

  const orderedRows: { row: NavRow; depth: number }[] = [];
  for (const root of tree.roots.length ? tree.roots : items.filter((i) => !i.parentKey)) {
    orderedRows.push({ row: root, depth: 0 });
    const key = root.href.replace(/^\//, "") || root.label.toLowerCase();
    for (const child of tree.childrenOf(key).concat(tree.childrenOf(root.label.toLowerCase()))) {
      if (!orderedRows.some((o) => o.row.id === child.id)) {
        orderedRows.push({ row: child, depth: 1 });
      }
    }
  }
  for (const item of items) {
    if (!orderedRows.some((o) => o.row.id === item.id)) {
      orderedRows.push({ row: item, depth: item.parentKey ? 1 : 0 });
    }
  }

  return (
    <>
      <PageHeader
        title="Navigation Manager"
        subtitle="Drag to reorder · nest children under parents for mega menus · ↑↓ still works."
        actions={
          <button
            type="button"
            onClick={() => void addItem()}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            Add link
          </button>
        }
      />

      <Toolbar>
        <div className="flex flex-wrap gap-2">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.value}
              type="button"
              onClick={() => setLocation(loc.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                location === loc.value ? "bg-gold/15 text-gold" : "admin-text-subtle hover:bg-black/5"
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>
      </Toolbar>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Order</Th>
              <Th>Label</Th>
              <Th>URL</Th>
              <Th>Parent</Th>
              {location === "MEGA_MENU" && <Th>Featured image</Th>}
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <Td colSpan={location === "MEGA_MENU" ? 7 : 6} className="text-center text-[#64748b]">
                  Loading…
                </Td>
              </tr>
            ) : orderedRows.length === 0 ? (
              <tr>
                <Td colSpan={location === "MEGA_MENU" ? 7 : 6} className="text-center text-[#64748b]">
                  No items for this location. Add a link to get started.
                </Td>
              </tr>
            ) : (
              orderedRows.map(({ row, depth }) => renderRow(row, depth))
            )}
          </tbody>
        </DataTable>
      </TableShell>
    </>
  );
}
