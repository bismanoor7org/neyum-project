"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "@/components/cms/editor/RichTextEditor";
import { AdminButton } from "@/components/admin/ui/AdminUi";
import { slugify, type CmsSeoFields } from "@/lib/cms/wp-types";

export type ContentEditorValues = {
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  content: unknown;
  featuredImage: string;
  status: "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
  scheduledAt: string;
  featured?: boolean;
  categoryId?: string;
  tagIds?: string[];
  seo: CmsSeoFields;
};

type Props = {
  mode: "page" | "post";
  initial?: Partial<ContentEditorValues> & { id?: string };
  categories?: { id: string; name: string }[];
  tags?: { id: string; name: string }[];
  apiBase: string;
};

const emptySeo: CmsSeoFields = {
  metaTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  ogImage: "",
  twitterCard: "summary_large_image",
  robots: "index,follow",
};

export function ContentEditorForm({ mode, initial, categories = [], tags = [], apiBase }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState<ContentEditorValues>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    contentHtml: initial?.contentHtml ?? "",
    content: initial?.content ?? {},
    featuredImage: initial?.featuredImage ?? "",
    status: initial?.status ?? "DRAFT",
    scheduledAt: initial?.scheduledAt ?? "",
    featured: initial?.featured ?? false,
    categoryId: initial?.categoryId ?? "",
    tagIds: initial?.tagIds ?? [],
    seo: { ...emptySeo, ...(initial?.seo ?? {}) },
  });
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isEdit = Boolean(initial?.id);

  useEffect(() => {
    if (!isEdit || !form.title) return;
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      void save("DRAFT", true);
    }, 25000);
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title, form.contentHtml, form.excerpt]);

  async function save(statusOverride?: ContentEditorValues["status"], silent = false) {
    setSaving(true);
    if (!silent) setMessage(null);
    try {
      const status = statusOverride ?? form.status;
      const payload = {
        ...form,
        status,
        slug: form.slug || slugify(form.title),
        featuredImage: form.featuredImage || null,
        categoryId: form.categoryId || null,
        scheduledAt: status === "SCHEDULED" && form.scheduledAt ? new Date(form.scheduledAt).toISOString() : null,
      };
      const res = await fetch(isEdit ? `${apiBase}/${initial!.id}` : apiBase, {
        method: isEdit ? "PATCH" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error?.message || data?.error || data?.message || "Save failed");
      if (!silent) setMessage(status === "PUBLISHED" ? "Published" : "Saved");
      const id = data?.data?.id ?? data?.id;
      if (!isEdit && id) {
        router.replace(`/admin/cms/${mode === "page" ? "pages" : "posts"}/${id}/edit`);
      } else {
        router.refresh();
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-4">
        <input
          className="admin-input w-full rounded-xl px-4 py-3 font-serif text-2xl"
          placeholder="Title"
          value={form.title}
          onChange={(e) => {
            const title = e.target.value;
            setForm((f) => ({
              ...f,
              title,
              slug: f.slug && f.slug !== slugify(f.title) ? f.slug : slugify(title),
            }));
          }}
        />
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="admin-text-muted">Slug</span>
          <input
            className="admin-input h-9 flex-1 rounded-lg px-3 text-sm"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
          />
        </div>
        <textarea
          className="admin-input min-h-20 w-full rounded-xl px-4 py-3 text-sm"
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
        />
        {preview ? (
          <div
            className="prose prose-sm admin-card max-w-none rounded-xl p-5"
            dangerouslySetInnerHTML={{ __html: form.contentHtml || "<p>Nothing to preview.</p>" }}
          />
        ) : (
          <RichTextEditor
            valueHtml={form.contentHtml}
            onChange={({ html, json }) => setForm((f) => ({ ...f, contentHtml: html, content: json }))}
          />
        )}
      </div>

      <aside className="space-y-4">
        <div className="admin-card space-y-3 rounded-xl p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Publish</p>
          <select
            className="admin-select h-9 w-full rounded-lg px-3 text-sm"
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ContentEditorValues["status"] }))}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          {form.status === "SCHEDULED" && (
            <input
              type="datetime-local"
              className="admin-input h-9 w-full rounded-lg px-3 text-sm"
              value={form.scheduledAt}
              onChange={(e) => setForm((f) => ({ ...f, scheduledAt: e.target.value }))}
            />
          )}
          <div className="flex flex-wrap gap-2">
            <AdminButton disabled={saving} onClick={() => void save("DRAFT")}>
              Save draft
            </AdminButton>
            <AdminButton disabled={saving} onClick={() => void save("PUBLISHED")}>
              Publish
            </AdminButton>
            <AdminButton variant="secondary" onClick={() => setPreview((p) => !p)}>
              {preview ? "Edit" : "Preview"}
            </AdminButton>
          </div>
          {message && <p className="text-xs text-navy/70">{message}</p>}
          {saving && <p className="text-xs text-navy/50">Saving…</p>}
        </div>

        <div className="admin-card space-y-3 rounded-xl p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Featured image</p>
          <input
            className="admin-input h-9 w-full rounded-lg px-3 text-sm"
            placeholder="https://…"
            value={form.featuredImage}
            onChange={(e) => setForm((f) => ({ ...f, featuredImage: e.target.value }))}
          />
        </div>

        {mode === "post" && (
          <div className="admin-card space-y-3 rounded-xl p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Taxonomy</p>
            <select
              className="admin-select h-9 w-full rounded-lg px-3 text-sm"
              value={form.categoryId}
              onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
            >
              <option value="">No category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="flex max-h-40 flex-col gap-1 overflow-auto">
              {tags.map((t) => {
                const checked = form.tagIds?.includes(t.id);
                return (
                  <label key={t.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={Boolean(checked)}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          tagIds: e.target.checked
                            ? [...(f.tagIds ?? []), t.id]
                            : (f.tagIds ?? []).filter((id) => id !== t.id),
                        }))
                      }
                    />
                    {t.name}
                  </label>
                );
              })}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(form.featured)}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              />
              Featured post
            </label>
          </div>
        )}

        <div className="admin-card space-y-3 rounded-xl p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">SEO</p>
          {(
            [
              ["metaTitle", "SEO title"],
              ["metaDescription", "Meta description"],
              ["canonicalUrl", "Canonical URL"],
              ["ogImage", "OG image"],
              ["robots", "Robots"],
            ] as const
          ).map(([key, label]) => (
            <input
              key={key}
              className="admin-input h-9 w-full rounded-lg px-3 text-sm"
              placeholder={label}
              value={(form.seo[key] as string) || ""}
              onChange={(e) => setForm((f) => ({ ...f, seo: { ...f.seo, [key]: e.target.value } }))}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}
