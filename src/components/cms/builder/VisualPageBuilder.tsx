"use client";

import { useMemo, useState, useCallback, type DragEvent } from "react";
import {
  createSectionFromPreset,
  createSectionId,
  PAGE_BUILDER_SECTION_PRESETS,
  type PageBuilderSection,
  type PageBuilderBlockType,
} from "@/lib/cms/page-builder";
import { AdminButton } from "@/components/admin/ui/AdminUi";
import { MediaPicker } from "@/components/cms/MediaPicker";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, GripVertical, ImageIcon, Monitor, Plus, Trash2 } from "lucide-react";

type PageBuilderProps = {
  value: PageBuilderSection[];
  onChange: (sections: PageBuilderSection[]) => void;
};

const IMAGE_PROP_KEYS = new Set([
  "image",
  "imageUrl",
  "backgroundImage",
  "bgImage",
  "poster",
  "src",
  "thumbnail",
  "cover",
]);

function buildPreviewHtml(sections: PageBuilderSection[]): string {
  const blocks = sections
    .filter((s) => !s.hidden)
    .map((section) => {
      const block = section.blocks[0];
      if (!block) return "";
      const p = block.props as Record<string, unknown>;
      const title = String(p.title ?? p.heading ?? section.name);
      const body = String(p.body ?? p.text ?? p.description ?? "");
      const img = String(p.image ?? p.imageUrl ?? p.backgroundImage ?? "");
      return `
        <section style="padding:28px 24px;border-bottom:1px solid #e8e4dc;font-family:Georgia,serif">
          <p style="margin:0;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#b8860b">${block.type}</p>
          <h2 style="margin:8px 0 6px;font-size:28px;color:#0a1628">${escapeHtml(title)}</h2>
          ${body ? `<p style="margin:0;color:#445;line-height:1.55">${escapeHtml(body)}</p>` : ""}
          ${img ? `<img src="${escapeAttr(img)}" alt="" style="margin-top:16px;width:100%;max-height:280px;object-fit:cover;border-radius:8px" />` : ""}
        </section>`;
    })
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;background:#faf8f4;color:#0a1628}</style></head><body>${blocks || "<p style='padding:40px;text-align:center;color:#888'>No visible sections</p>"}</body></html>`;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttr(s: string) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

export function VisualPageBuilder({ value, onChange }: PageBuilderProps) {
  const [selectedId, setSelectedId] = useState<string | null>(value[0]?.id ?? null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [mediaPropKey, setMediaPropKey] = useState<string | null>(null);

  const selected = useMemo(
    () => value.find((s) => s.id === selectedId) ?? null,
    [value, selectedId],
  );

  const previewDoc = useMemo(() => buildPreviewHtml(value), [value]);

  function addSection(type: PageBuilderBlockType) {
    const section = createSectionFromPreset(type);
    const next = [...value, section];
    onChange(next);
    setSelectedId(section.id);
  }

  function updateSelected(patch: Partial<PageBuilderSection>) {
    if (!selected) return;
    onChange(value.map((s) => (s.id === selected.id ? { ...s, ...patch } : s)));
  }

  function updateBlockProp(key: string, propValue: unknown) {
    if (!selected) return;
    const blocks = selected.blocks.map((b, idx) =>
      idx === 0 ? { ...b, props: { ...b.props, [key]: propValue } } : b,
    );
    updateSelected({ blocks });
  }

  function move(id: string, dir: -1 | 1) {
    const idx = value.findIndex((s) => s.id === id);
    const target = idx + dir;
    if (idx < 0 || target < 0 || target >= value.length) return;
    const next = [...value];
    const [item] = next.splice(idx, 1);
    next.splice(target, 0, item);
    onChange(next);
  }

  function duplicate(id: string) {
    const section = value.find((s) => s.id === id);
    if (!section) return;
    const copy: PageBuilderSection = {
      ...structuredClone(section),
      id: createSectionId(),
      name: `${section.name} (Copy)`,
    };
    onChange([...value, copy]);
  }

  const onDragStart = useCallback((e: DragEvent, id: string) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  }, []);

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: DragEvent, targetId: string) => {
      e.preventDefault();
      const sourceId = e.dataTransfer.getData("text/plain") || dragId;
      setDragId(null);
      if (!sourceId || sourceId === targetId) return;
      const from = value.findIndex((s) => s.id === sourceId);
      const to = value.findIndex((s) => s.id === targetId);
      if (from < 0 || to < 0) return;
      const next = [...value];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      onChange(next);
    },
    [dragId, onChange, value],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-navy/50">Drag sections by the grip handle · inspector supports media pick</p>
        <AdminButton size="sm" variant="secondary" onClick={() => setPreview((v) => !v)}>
          <Monitor className="h-3.5 w-3.5" />
          {preview ? "Edit mode" : "Live preview"}
        </AdminButton>
      </div>

      {preview ? (
        <div className="admin-card overflow-hidden rounded-xl">
          <iframe
            title="Page preview"
            className="h-[70vh] w-full border-0 bg-white"
            srcDoc={previewDoc}
            sandbox=""
          />
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[16rem_minmax(0,1fr)_18rem]">
          <aside className="admin-card space-y-2 rounded-xl p-3">
            <p className="px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Add section</p>
            {PAGE_BUILDER_SECTION_PRESETS.map((p) => (
              <button
                key={p.type}
                type="button"
                onClick={() => addSection(p.type)}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-gold/10"
              >
                <Plus className="h-3.5 w-3.5 text-gold" />
                {p.label}
              </button>
            ))}
          </aside>

          <div className="space-y-3">
            {value.length === 0 ? (
              <div className="admin-card rounded-xl p-10 text-center text-sm text-navy/55">
                Add a section to start building this page.
              </div>
            ) : (
              value.map((section, index) => (
                <div
                  key={section.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, section.id)}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, section.id)}
                  onClick={() => setSelectedId(section.id)}
                  className={cn(
                    "admin-card w-full cursor-grab rounded-xl p-4 text-left transition active:cursor-grabbing",
                    selectedId === section.id ? "ring-2 ring-gold/40" : "hover:bg-black/[0.02]",
                    section.hidden && "opacity-50",
                    dragId === section.id && "opacity-60",
                  )}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <GripVertical className="h-4 w-4 text-navy/30" />
                      {section.name}
                    </div>
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <AdminButton size="sm" variant="ghost" onClick={() => move(section.id, -1)}>
                        ↑
                      </AdminButton>
                      <AdminButton size="sm" variant="ghost" onClick={() => move(section.id, 1)}>
                        ↓
                      </AdminButton>
                      <AdminButton
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          onChange(
                            value.map((s) =>
                              s.id === section.id ? { ...s, hidden: !s.hidden } : s,
                            ),
                          )
                        }
                      >
                        {section.hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </AdminButton>
                      <AdminButton size="sm" variant="ghost" onClick={() => duplicate(section.id)}>
                        Copy
                      </AdminButton>
                      <AdminButton
                        size="sm"
                        variant="ghost"
                        onClick={() => onChange(value.filter((s) => s.id !== section.id))}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-red-600" />
                      </AdminButton>
                    </div>
                  </div>
                  <p className="text-xs text-navy/50">
                    Section {index + 1} · {section.blocks[0]?.type ?? "empty"}
                  </p>
                  {section.blocks[0]?.type === "hero" && (
                    <div className="mt-3 rounded-lg bg-navy/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-gold">
                        {String(section.blocks[0].props.eyebrow ?? "")}
                      </p>
                      <p className="mt-1 font-serif text-xl">
                        {String(section.blocks[0].props.title ?? "")}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <aside className="admin-card space-y-3 rounded-xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Inspector</p>
            {!selected ? (
              <p className="text-sm text-navy/50">Select a section</p>
            ) : (
              <>
                <input
                  className="admin-input h-9 w-full rounded-lg px-3 text-sm"
                  value={selected.name}
                  onChange={(e) => updateSelected({ name: e.target.value })}
                />
                {Object.entries(selected.blocks[0]?.props ?? {}).map(([key, val]) => {
                  const isImage = IMAGE_PROP_KEYS.has(key) || /image|url|src|cover|poster/i.test(key);
                  return (
                    <label key={key} className="block space-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-navy/45">
                        {key}
                      </span>
                      {isImage ? (
                        <div className="space-y-2">
                          <input
                            className="admin-input h-9 w-full rounded-lg px-3 text-sm"
                            value={typeof val === "string" ? val : ""}
                            onChange={(e) => updateBlockProp(key, e.target.value)}
                          />
                          <AdminButton
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              setMediaPropKey(key);
                              setMediaOpen(true);
                            }}
                          >
                            <ImageIcon className="h-3.5 w-3.5" />
                            Pick media
                          </AdminButton>
                          {typeof val === "string" && val && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={val} alt="" className="h-20 w-full rounded-lg object-cover" />
                          )}
                        </div>
                      ) : (
                        <textarea
                          className="admin-input min-h-16 w-full rounded-lg px-3 py-2 text-sm"
                          value={typeof val === "string" ? val : JSON.stringify(val)}
                          onChange={(e) => {
                            const raw = e.target.value;
                            if (typeof val === "string") {
                              updateBlockProp(key, raw);
                              return;
                            }
                            try {
                              updateBlockProp(key, JSON.parse(raw));
                            } catch {
                              updateBlockProp(key, raw);
                            }
                          }}
                        />
                      )}
                    </label>
                  );
                })}
              </>
            )}
          </aside>
        </div>
      )}

      <MediaPicker
        open={mediaOpen}
        onClose={() => setMediaOpen(false)}
        onSelect={(url) => {
          if (mediaPropKey) updateBlockProp(mediaPropKey, url);
          setMediaOpen(false);
          setMediaPropKey(null);
        }}
      />
    </div>
  );
}
