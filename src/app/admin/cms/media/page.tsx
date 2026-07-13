"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Copy,
  FolderPlus,
  HardDrive,
  Heart,
  RefreshCw,
  Star,
  Trash2,
  Upload,
  Crop,
} from "lucide-react";
import {
  AdminButton,
  FilterSelect,
  PageHeader,
  SearchInput,
} from "@/components/admin/ui/AdminUi";
import { cn } from "@/lib/utils";

type MediaRow = {
  id: string;
  publicId: string;
  secureUrl: string;
  folder: string;
  altText: string | null;
  caption: string | null;
  format: string | null;
  width: number | null;
  height: number | null;
  bytes: number | null;
  isFavorite?: boolean;
  createdAt?: string;
};

type UsageRow = { type: string; id: string; title: string; href: string };

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaCmsPage() {
  const [items, setItems] = useState<MediaRow[]>([]);
  const [folders, setFolders] = useState<string[]>(["mft"]);
  const [stats, setStats] = useState({ count: 0, bytes: 0, favorites: 0 });
  const [search, setSearch] = useState("");
  const [folder, setFolder] = useState("all");
  const [sort, setSort] = useState("newest");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [active, setActive] = useState<MediaRow | null>(null);
  const [usages, setUsages] = useState<UsageRow[]>([]);
  const [transforms, setTransforms] = useState<{ webp?: string; avif?: string; thumb?: string; url?: string }>({});
  const [cloudinaryOk, setCloudinaryOk] = useState(true);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [newFolder, setNewFolder] = useState("");
  const [moveFolder, setMoveFolder] = useState("mft");
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("pageSize", "100");
    params.set("sort", sort);
    if (search) params.set("search", search);
    if (folder !== "all") params.set("folder", folder);
    if (favoritesOnly) params.set("favorites", "1");
    try {
      const res = await fetch(`/api/v1/admin/cms/media?${params}`, { credentials: "include" });
      const j = await res.json();
      setItems(j.data?.items ?? []);
      setFolders(j.data?.folders?.length ? j.data.folders : ["mft"]);
      setStats(j.data?.stats ?? { count: 0, bytes: 0, favorites: 0 });
      setCloudinaryOk(j.data?.cloudinaryConfigured ?? true);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [search, folder, sort, favoritesOnly]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!active) {
      setUsages([]);
      setTransforms({});
      return;
    }
    void fetch(`/api/v1/admin/cms/media?view=usage&id=${active.id}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setUsages(j.data?.usages ?? []));
    void fetch(`/api/v1/admin/cms/media?view=transform&id=${active.id}&w=1200&crop=limit&format=auto`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((j) => setTransforms(j.data ?? {}));
  }, [active]);

  async function uploadFiles(files: FileList | File[] | null, replaceId?: string) {
    if (!files || (files as FileList).length === 0) return;
    setUploading(true);
    setMessage(null);
    try {
      const list = Array.from(files as FileList);
      for (const file of list) {
        const form = new FormData();
        form.append("file", file);
        form.append("folder", folder === "all" ? "mft" : folder);
        if (replaceId) form.append("replaceId", replaceId);
        await fetch("/api/v1/admin/cms/media", {
          method: "POST",
          credentials: "include",
          body: form,
        });
      }
      setMessage(replaceId ? "File replaced" : `Uploaded ${list.length} file(s)`);
      await load();
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
      if (replaceRef.current) replaceRef.current.value = "";
    }
  }

  async function bulk(action: "delete" | "move" | "favorite" | "unfavorite") {
    if (!selected.length) return;
    if (action === "delete" && !window.confirm(`Delete ${selected.length} asset(s)?`)) return;
    await fetch("/api/v1/admin/cms/media", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ids: selected,
        action,
        folder: action === "move" ? moveFolder : undefined,
      }),
    });
    setSelected([]);
    setMessage(`Bulk ${action} complete`);
    await load();
  }

  async function saveMeta(patch: Partial<MediaRow>) {
    if (!active) return;
    const res = await fetch(`/api/v1/admin/cms/media?id=${active.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const j = await res.json();
    if (res.ok) {
      setActive(j.data);
      setMessage("Saved");
      await load();
    }
  }

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    setMessage("Copied to clipboard");
  }

  const folderOptions = useMemo(
    () => [{ value: "all", label: "All folders" }, ...folders.map((f) => ({ value: f, label: f }))],
    [folders],
  );

  return (
    <>
      <PageHeader
        title="Media Library"
        subtitle="Enterprise Cloudinary library — folders, bulk actions, transforms, usage tracking."
        actions={
          <>
            <input
              ref={inputRef}
              type="file"
              accept="image/*,video/*,application/pdf"
              multiple
              className="hidden"
              onChange={(e) => void uploadFiles(e.target.files)}
            />
            <input
              ref={replaceRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => void uploadFiles(e.target.files, active?.id)}
            />
            <AdminButton onClick={() => inputRef.current?.click()} disabled={uploading || !cloudinaryOk}>
              <Upload className="h-4 w-4" />
              {uploading ? "Uploading…" : "Upload"}
            </AdminButton>
          </>
        }
      />

      {!cloudinaryOk && (
        <p className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Cloudinary env vars missing — uploads disabled.
        </p>
      )}

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="admin-card rounded-xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-navy/45">Assets</p>
          <p className="mt-1 font-serif text-2xl">{stats.count}</p>
        </div>
        <div className="admin-card rounded-xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-navy/45">Storage</p>
          <p className="mt-1 flex items-center gap-2 font-serif text-2xl">
            <HardDrive className="h-5 w-5 text-gold" />
            {formatBytes(stats.bytes)}
          </p>
        </div>
        <div className="admin-card rounded-xl p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-navy/45">Favorites</p>
          <p className="mt-1 font-serif text-2xl">{stats.favorites}</p>
        </div>
      </div>

      <div
        className={cn(
          "mb-4 rounded-xl border border-dashed px-4 py-8 text-center transition",
          dragOver ? "border-gold bg-gold/10" : "border-[var(--border)] bg-black/[0.02]",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          void uploadFiles(e.dataTransfer.files);
        }}
      >
        <p className="text-sm text-navy/70">Drag & drop files here, or use Upload</p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <SearchInput value={search} onChange={setSearch} placeholder="Search media…" />
        <FilterSelect value={folder} onChange={setFolder} options={folderOptions} label="Folder" />
        <FilterSelect
          value={sort}
          onChange={setSort}
          options={[
            { value: "newest", label: "Newest" },
            { value: "oldest", label: "Oldest" },
            { value: "name", label: "Name" },
            { value: "size", label: "Size" },
          ]}
          label="Sort"
        />
        <AdminButton
          size="sm"
          variant={favoritesOnly ? "primary" : "secondary"}
          onClick={() => setFavoritesOnly((v) => !v)}
        >
          <Star className="h-3.5 w-3.5" />
          Favorites
        </AdminButton>
        <div className="flex items-center gap-1">
          <input
            className="admin-input h-9 w-36 rounded-lg px-2 text-sm"
            placeholder="new/folder"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
          />
          <AdminButton
            size="sm"
            variant="secondary"
            onClick={() => {
              if (!newFolder.trim()) return;
              setFolder(newFolder.trim());
              setFolders((f) => Array.from(new Set([...f, newFolder.trim()])).sort());
              setNewFolder("");
              setMessage("Folder selected — uploads will go here");
            }}
          >
            <FolderPlus className="h-3.5 w-3.5" />
            Folder
          </AdminButton>
        </div>
      </div>

      {selected.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-gold/20 bg-gold/5 px-3 py-2">
          <span className="text-sm">{selected.length} selected</span>
          <input
            className="admin-input h-8 w-32 rounded-lg px-2 text-xs"
            value={moveFolder}
            onChange={(e) => setMoveFolder(e.target.value)}
            placeholder="Move to folder"
          />
          <AdminButton size="sm" variant="secondary" onClick={() => void bulk("move")}>
            Move
          </AdminButton>
          <AdminButton size="sm" variant="secondary" onClick={() => void bulk("favorite")}>
            Favorite
          </AdminButton>
          <AdminButton size="sm" variant="secondary" onClick={() => void bulk("unfavorite")}>
            Unfavorite
          </AdminButton>
          <AdminButton size="sm" variant="danger" onClick={() => void bulk("delete")}>
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </AdminButton>
        </div>
      )}

      {message && <p className="mb-3 text-sm text-navy/65">{message}</p>}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-xl bg-black/5" />
            ))
          ) : items.length === 0 ? (
            <p className="col-span-full py-12 text-center text-sm text-navy/50">No media yet.</p>
          ) : (
            items.map((item) => {
              const checked = selected.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border bg-white",
                    active?.id === item.id ? "border-gold ring-2 ring-gold/30" : "border-black/10",
                  )}
                >
                  <button
                    type="button"
                    className="absolute left-2 top-2 z-10 rounded bg-white/90 p-1"
                    onClick={() =>
                      setSelected((s) =>
                        checked ? s.filter((id) => id !== item.id) : [...s, item.id],
                      )
                    }
                  >
                    <input type="checkbox" readOnly checked={checked} />
                  </button>
                  {item.isFavorite && (
                    <Heart className="absolute right-2 top-2 z-10 h-4 w-4 fill-gold text-gold" />
                  )}
                  <button type="button" className="block w-full" onClick={() => setActive(item)}>
                    <div className="relative aspect-square">
                      <Image
                        src={item.secureUrl}
                        alt={item.altText || item.publicId}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                  </button>
                  <div className="truncate px-2 py-1.5 text-[11px] text-navy/60">{item.folder}</div>
                </div>
              );
            })
          )}
        </div>

        <aside className="admin-card h-fit space-y-3 rounded-xl p-4 lg:sticky lg:top-4">
          {!active ? (
            <p className="text-sm text-navy/50">Select an asset for details, transforms, and usage.</p>
          ) : (
            <>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image src={active.secureUrl} alt={active.altText || ""} fill className="object-cover" />
              </div>
              <p className="truncate text-xs text-navy/55">{active.publicId}</p>
              <p className="text-xs text-navy/55">
                {active.width}×{active.height} · {active.format} · {formatBytes(active.bytes ?? 0)}
              </p>
              <label className="block space-y-1 text-xs">
                <span className="font-semibold uppercase tracking-wide text-navy/45">Alt text</span>
                <input
                  className="admin-input h-9 w-full rounded-lg px-3 text-sm"
                  value={active.altText ?? ""}
                  onChange={(e) => setActive({ ...active, altText: e.target.value })}
                  onBlur={() => void saveMeta({ altText: active.altText })}
                />
              </label>
              <label className="block space-y-1 text-xs">
                <span className="font-semibold uppercase tracking-wide text-navy/45">Caption</span>
                <input
                  className="admin-input h-9 w-full rounded-lg px-3 text-sm"
                  value={active.caption ?? ""}
                  onChange={(e) => setActive({ ...active, caption: e.target.value })}
                  onBlur={() => void saveMeta({ caption: active.caption })}
                />
              </label>
              <label className="block space-y-1 text-xs">
                <span className="font-semibold uppercase tracking-wide text-navy/45">Folder</span>
                <input
                  className="admin-input h-9 w-full rounded-lg px-3 text-sm"
                  value={active.folder}
                  onChange={(e) => setActive({ ...active, folder: e.target.value })}
                  onBlur={() => void saveMeta({ folder: active.folder })}
                />
              </label>
              <div className="flex flex-wrap gap-2">
                <AdminButton size="sm" variant="secondary" onClick={() => void copyText(active.secureUrl)}>
                  <Copy className="h-3.5 w-3.5" />
                  Copy URL
                </AdminButton>
                <AdminButton
                  size="sm"
                  variant="secondary"
                  onClick={() => void saveMeta({ isFavorite: !active.isFavorite })}
                >
                  <Heart className="h-3.5 w-3.5" />
                  {active.isFavorite ? "Unfavorite" : "Favorite"}
                </AdminButton>
                <AdminButton size="sm" variant="secondary" onClick={() => replaceRef.current?.click()}>
                  <RefreshCw className="h-3.5 w-3.5" />
                  Replace
                </AdminButton>
              </div>
              <div className="space-y-1 border-t border-black/5 pt-3">
                <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  <Crop className="h-3 w-3" /> CDN transforms
                </p>
                {transforms.webp && (
                  <button
                    type="button"
                    className="block w-full truncate text-left text-xs text-navy/70 hover:text-gold"
                    onClick={() => void copyText(transforms.webp!)}
                  >
                    WebP — copy
                  </button>
                )}
                {transforms.avif && (
                  <button
                    type="button"
                    className="block w-full truncate text-left text-xs text-navy/70 hover:text-gold"
                    onClick={() => void copyText(transforms.avif!)}
                  >
                    AVIF — copy
                  </button>
                )}
                {transforms.thumb && (
                  <button
                    type="button"
                    className="block w-full truncate text-left text-xs text-navy/70 hover:text-gold"
                    onClick={() => void copyText(transforms.thumb!)}
                  >
                    Thumb 320 — copy
                  </button>
                )}
              </div>
              <div className="space-y-1 border-t border-black/5 pt-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Used in</p>
                {usages.length === 0 ? (
                  <p className="text-xs text-navy/45">No CMS references found</p>
                ) : (
                  usages.map((u) => (
                    <Link key={`${u.type}-${u.id}`} href={u.href} className="block text-xs text-gold hover:underline">
                      {u.type}: {u.title}
                    </Link>
                  ))
                )}
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
