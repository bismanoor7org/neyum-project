"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VisualPageBuilder } from "@/components/cms/builder/VisualPageBuilder";
import { AdminButton, PageHeader } from "@/components/admin/ui/AdminUi";
import type { PageBuilderSection } from "@/lib/cms/page-builder";
import { slugify } from "@/lib/cms/wp-types";
import {
  generateFaqFromContent,
  generateMetaDescription,
  generateMetaTitle,
  generateSlugSuggestion,
  scoreSeo,
} from "@/lib/cms/seo-intelligence";

type Props = {
  initial?: {
    id?: string;
    title?: string;
    slug?: string;
    status?:
      | "DRAFT"
      | "PENDING_REVIEW"
      | "NEEDS_CHANGES"
      | "APPROVED"
      | "PUBLISHED"
      | "SCHEDULED"
      | "ARCHIVED";
    sections?: PageBuilderSection[];
    seo?: Record<string, unknown>;
  };
};

export function PageBuilderWorkspace({ initial }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "Untitled page");
  const [slug, setSlug] = useState(initial?.slug ?? "untitled-page");
  const [status, setStatus] = useState(initial?.status ?? "DRAFT");
  const [sections, setSections] = useState<PageBuilderSection[]>(initial?.sections ?? []);
  const [seo, setSeo] = useState({
    metaTitle: String(initial?.seo?.metaTitle ?? ""),
    metaDescription: String(initial?.seo?.metaDescription ?? ""),
    canonicalUrl: String(initial?.seo?.canonicalUrl ?? ""),
    ogImage: String(initial?.seo?.ogImage ?? ""),
    focusKeyword: String(initial?.seo?.focusKeyword ?? ""),
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const seoScore = scoreSeo({
    title,
    slug,
    seo,
    focusKeyword: seo.focusKeyword,
    contentHtml: JSON.stringify(sections),
  });

  async function save(nextStatus = status) {
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        title,
        slug: slug || slugify(title),
        status: nextStatus,
        sections,
        seo: { ...seo, schemaJsonLd: { "@type": "WebPage", name: title } },
      };
      const res = await fetch(
        initial?.id ? `/api/v1/admin/cms/pages/${initial.id}` : "/api/v1/admin/cms/pages",
        {
          method: initial?.id ? "PATCH" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            content: { sections },
            contentHtml: "",
          }),
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Save failed");
      setStatus(nextStatus);
      setMessage(
        nextStatus === "PUBLISHED"
          ? "Published"
          : nextStatus === "PENDING_REVIEW"
            ? "Submitted for review"
            : "Saved",
      );
      const id = json?.data?.id ?? initial?.id;
      if (!initial?.id && id) router.replace(`/admin/cms/pages/${id}/builder`);
      else router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Visual page builder"
        subtitle="Drag sections, live preview, media pick, score SEO — frontend templates stay untouched."
        actions={
          <div className="flex flex-wrap gap-2">
            <AdminButton variant="secondary" disabled={saving} onClick={() => void save("DRAFT")}>
              Save draft
            </AdminButton>
            <AdminButton
              variant="secondary"
              disabled={saving}
              onClick={() => void save("PENDING_REVIEW")}
            >
              Submit review
            </AdminButton>
            <AdminButton disabled={saving} onClick={() => void save("PUBLISHED")}>
              Publish
            </AdminButton>
          </div>
        }
      />

      <div className="grid gap-3 lg:grid-cols-[1fr_14rem_16rem]">
        <input
          className="admin-input rounded-xl px-4 py-3 font-serif text-2xl"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!initial?.slug) setSlug(generateSlugSuggestion(e.target.value));
          }}
        />
        <select
          className="admin-select h-12 rounded-xl px-3 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
        >
          <option value="DRAFT">Draft</option>
          <option value="PENDING_REVIEW">Pending review</option>
          <option value="NEEDS_CHANGES">Needs changes</option>
          <option value="APPROVED">Approved</option>
          <option value="PUBLISHED">Published</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="ARCHIVED">Archived</option>
        </select>
        <div className="admin-card flex items-center justify-between rounded-xl px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-navy/45">SEO score</span>
          <span className="font-serif text-2xl text-gold">{seoScore.score}</span>
        </div>
      </div>

      <input
        className="admin-input h-9 w-full max-w-md rounded-lg px-3 text-sm"
        value={slug}
        onChange={(e) => setSlug(slugify(e.target.value))}
      />

      <VisualPageBuilder value={sections} onChange={setSections} />

      <div className="admin-card grid gap-4 rounded-xl p-5 lg:grid-cols-2">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">SEO + AI</p>
          <input
            className="admin-input h-9 w-full rounded-lg px-3 text-sm"
            placeholder="Focus keyword"
            value={seo.focusKeyword}
            onChange={(e) => setSeo((s) => ({ ...s, focusKeyword: e.target.value }))}
          />
          <input
            className="admin-input h-9 w-full rounded-lg px-3 text-sm"
            placeholder="Meta title"
            value={seo.metaTitle}
            onChange={(e) => setSeo((s) => ({ ...s, metaTitle: e.target.value }))}
          />
          <textarea
            className="admin-input min-h-20 w-full rounded-lg px-3 py-2 text-sm"
            placeholder="Meta description"
            value={seo.metaDescription}
            onChange={(e) => setSeo((s) => ({ ...s, metaDescription: e.target.value }))}
          />
          <div className="flex flex-wrap gap-2">
            <AdminButton
              size="sm"
              variant="secondary"
              onClick={() =>
                setSeo((s) => ({
                  ...s,
                  metaTitle: generateMetaTitle(title, s.focusKeyword),
                  metaDescription: generateMetaDescription(s.metaDescription || title, title),
                }))
              }
            >
              AI meta
            </AdminButton>
            <AdminButton
              size="sm"
              variant="secondary"
              onClick={() => {
                const faqs = generateFaqFromContent(title, JSON.stringify(sections));
                setMessage(`Generated ${faqs.length} FAQs — copy into FAQ module`);
              }}
            >
              AI FAQs
            </AdminButton>
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          {seoScore.checks.map((c) => (
            <li key={c.key} className="flex justify-between gap-3">
              <span className={c.pass ? "text-navy/80" : "text-amber-700"}>{c.label}</span>
              <span className="text-xs">{c.pass ? "Pass" : c.hint || "Fix"}</span>
            </li>
          ))}
        </ul>
      </div>

      {message && <p className="text-sm text-navy/70">{message}</p>}
    </div>
  );
}
