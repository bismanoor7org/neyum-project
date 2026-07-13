"use client";

import { useEffect, useState } from "react";
import type { SeoPayload } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

type SeoEditorProps = {
  value: SeoPayload;
  onChange: (next: SeoPayload) => void;
  entityType?: string;
  entityId?: string;
};

type SeoTab = "meta" | "social" | "technical";

const TABS: { id: SeoTab; label: string }[] = [
  { id: "meta", label: "Meta" },
  { id: "social", label: "Open Graph" },
  { id: "technical", label: "Technical" },
];

export function SeoEditor({ value, onChange }: SeoEditorProps) {
  const [tab, setTab] = useState<SeoTab>("meta");
  const [schemaText, setSchemaText] = useState(() =>
    value.schemaMarkup ? JSON.stringify(value.schemaMarkup, null, 2) : "",
  );

  useEffect(() => {
    setSchemaText(value.schemaMarkup ? JSON.stringify(value.schemaMarkup, null, 2) : "");
  }, [value.schemaMarkup]);

  const update = (key: keyof SeoPayload, val: string | boolean | Record<string, unknown> | null) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <div className="admin-card space-y-4 rounded-xl p-5">
      <div>
        <h3 className="admin-text font-semibold">SEO Manager</h3>
        <p className="admin-text-subtle mt-1 text-xs">
          Meta title, Open Graph, canonical URL and JSON-LD schema markup.
        </p>
      </div>

      <div className="flex gap-1 rounded-lg border border-[var(--admin-border-soft)] bg-[var(--admin-bg-subtle)] p-1">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "admin-tab flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors",
              tab === id && "admin-tab-active",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "meta" && (
        <div className="space-y-4">
          <label className="block space-y-1">
            <span className="admin-text-subtle text-xs font-medium">Meta title</span>
            <input
              className="admin-input w-full"
              value={value.metaTitle ?? ""}
              maxLength={70}
              onChange={(e) => update("metaTitle", e.target.value)}
              placeholder="Luxury Fiji Tours | My Fiji Tour"
            />
            <span className="admin-text-subtle text-[10px]">{(value.metaTitle ?? "").length}/70</span>
          </label>

          <label className="block space-y-1">
            <span className="admin-text-subtle text-xs font-medium">Meta description</span>
            <textarea
              className="admin-input min-h-20 w-full"
              value={value.metaDescription ?? ""}
              maxLength={320}
              onChange={(e) => update("metaDescription", e.target.value)}
              placeholder="Bespoke luxury journeys across the Yasawa Islands, Coral Coast and beyond."
            />
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={value.noIndex ?? false}
              onChange={(e) => update("noIndex", e.target.checked)}
            />
            <span className="admin-text-subtle text-xs">No index (hide from search engines)</span>
          </label>
        </div>
      )}

      {tab === "social" && (
        <div className="space-y-4">
          <label className="block space-y-1">
            <span className="admin-text-subtle text-xs font-medium">Open Graph title</span>
            <input
              className="admin-input w-full"
              value={value.ogTitle ?? ""}
              onChange={(e) => update("ogTitle", e.target.value)}
            />
          </label>

          <label className="block space-y-1">
            <span className="admin-text-subtle text-xs font-medium">Open Graph description</span>
            <textarea
              className="admin-input min-h-16 w-full"
              value={value.ogDescription ?? ""}
              onChange={(e) => update("ogDescription", e.target.value)}
            />
          </label>

          <label className="block space-y-1">
            <span className="admin-text-subtle text-xs font-medium">OG image URL</span>
            <input
              className="admin-input w-full"
              value={value.ogImage ?? ""}
              onChange={(e) => update("ogImage", e.target.value)}
              placeholder="https://res.cloudinary.com/..."
            />
          </label>
        </div>
      )}

      {tab === "technical" && (
        <div className="space-y-4">
          <label className="block space-y-1">
            <span className="admin-text-subtle text-xs font-medium">Canonical URL</span>
            <input
              className="admin-input w-full"
              value={value.canonicalUrl ?? ""}
              onChange={(e) => update("canonicalUrl", e.target.value)}
              placeholder="https://myfijitour.com/guides/first-time"
            />
          </label>

          <label className="block space-y-1">
            <span className="admin-text-subtle text-xs font-medium">Schema markup (JSON-LD)</span>
            <textarea
              className="admin-input min-h-28 w-full font-mono text-xs"
              value={schemaText}
              onChange={(e) => {
                const next = e.target.value;
                setSchemaText(next);
                if (!next.trim()) {
                  update("schemaMarkup", null);
                  return;
                }
                try {
                  update("schemaMarkup", JSON.parse(next) as Record<string, unknown>);
                } catch {
                  /* keep local draft until JSON is valid */
                }
              }}
              placeholder='{"@context":"https://schema.org","@type":"Article",...}'
            />
          </label>
        </div>
      )}
    </div>
  );
}
