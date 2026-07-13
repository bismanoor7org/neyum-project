"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";

type MediaRow = {
  id: string;
  secureUrl: string;
  altText: string | null;
  folder: string;
};

export function MediaPicker({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}) {
  const [items, setItems] = useState<MediaRow[]>([]);
  const [folder, setFolder] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const params = new URLSearchParams({ pageSize: "80" });
    if (search) params.set("search", search);
    fetch(`/api/v1/admin/cms/media?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [open, search]);

  if (!open) return null;

  const folders = ["all", ...Array.from(new Set(items.map((i) => i.folder)))];
  const filtered = folder === "all" ? items : items.filter((i) => i.folder === folder);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="admin-card max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-xl">
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-gold" />
            <span className="font-semibold">Media Library</span>
          </div>
          <button type="button" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="border-b border-black/5 px-4 py-2">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media…"
            className="admin-input h-9 w-full rounded-lg px-3 text-sm"
          />
        </div>
        <div className="flex gap-2 border-b border-black/5 px-4 py-2">
          {folders.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFolder(f)}
              className={`rounded px-2 py-1 text-xs capitalize ${
                folder === f ? "bg-gold/15 text-gold" : "admin-text-subtle"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid max-h-[60vh] grid-cols-3 gap-2 overflow-auto p-4 sm:grid-cols-4">
          {loading && <p className="col-span-full text-sm text-[#64748b]">Loading…</p>}
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelect(item.secureUrl);
                onClose();
              }}
              className="group relative aspect-square overflow-hidden rounded-lg border border-black/10 hover:border-gold"
            >
              <Image
                src={item.secureUrl}
                alt={item.altText ?? ""}
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
