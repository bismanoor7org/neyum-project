"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContentStatus, GuideCategory } from "@prisma/client";
import { SeoEditor } from "@/components/cms/SeoEditor";
import {
  CmsField,
  CmsFormActions,
  CmsSelect,
  CmsStatusField,
  CmsTextarea,
  CmsTextInput,
  useCmsFormState,
} from "@/components/cms/forms/CmsFormFields";
import type { GuideBodyJson } from "@/lib/cms/guide-content";
import { listToLines, linesToList } from "@/lib/cms/action-utils";
import type { SeoPayload } from "@/lib/cms/types";
import {
  deleteGuideAction,
  publishGuideAction,
  saveGuideAction,
} from "@/server/actions/cms";

const GUIDE_CATEGORIES: { value: GuideCategory; label: string }[] = [
  { value: "GENERAL", label: "General" },
  { value: "FIRST_TIME", label: "First time" },
  { value: "VISA", label: "Visa" },
  { value: "WEATHER", label: "Weather" },
  { value: "CULTURE", label: "Culture" },
  { value: "TRANSPORT", label: "Transport" },
  { value: "DINING", label: "Dining" },
  { value: "SAFETY", label: "Safety" },
  { value: "ITINERARY", label: "Itinerary" },
];

const CATEGORY_LABELS = ["Planning", "Style", "Activities"];

type GuideRecord = {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  content?: string;
  category?: GuideCategory;
  status?: ContentStatus;
  sortOrder?: number;
  body?: GuideBodyJson | null;
};

export function GuideForm({ initial, seo }: { initial?: GuideRecord; seo?: SeoPayload }) {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();
  const body = (initial?.body ?? {}) as GuideBodyJson;
  const firstSection = body.sections?.[0];

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [featuredImage, setFeaturedImage] = useState(initial?.featuredImage ?? "");
  const [overview, setOverview] = useState(body.overview ?? "");
  const [sectionTitle, setSectionTitle] = useState(firstSection?.title ?? "Overview");
  const [sectionBody, setSectionBody] = useState(
    firstSection?.body ?? initial?.content ?? "",
  );
  const [category, setCategory] = useState<GuideCategory>(initial?.category ?? "GENERAL");
  const [categoryLabel, setCategoryLabel] = useState(body.categoryLabel ?? "Planning");
  const [relatedSlugs, setRelatedSlugs] = useState(listToLines(body.relatedSlugs));
  const [status, setStatus] = useState<ContentStatus>(initial?.status ?? "DRAFT");
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [seoState, setSeoState] = useState<SeoPayload>(seo ?? {});

  const previewHref =
    initial?.id && slug ? `/guides/${slug}?preview=1` : undefined;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveGuideAction({
      id: initial?.id,
      title,
      slug,
      excerpt,
      featuredImage,
      overview,
      sectionTitle,
      sectionBody,
      category,
      categoryLabel,
      relatedSlugs: linesToList(relatedSlugs),
      status,
      sortOrder: Number(sortOrder) || 0,
      seo: seoState,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(`/admin/cms/guides/${result.data.id}/edit`);
    router.refresh();
  }

  async function handlePublish() {
    if (!initial?.id) return;
    setSaving(true);
    const result = await publishGuideAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else {
      setStatus("PUBLISHED");
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!initial?.id || !confirm("Delete this guide permanently?")) return;
    setSaving(true);
    const result = await deleteGuideAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else router.push("/admin/cms/guides");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="admin-card grid gap-4 rounded-xl p-5 md:grid-cols-2">
        <CmsField label="Title *">
          <CmsTextInput value={title} onChange={(e) => setTitle(e.target.value)} required />
        </CmsField>
        <CmsField label="Slug">
          <CmsTextInput value={slug} onChange={(e) => setSlug(e.target.value)} />
        </CmsField>
        <CmsField label="Excerpt" className="md:col-span-2">
          <CmsTextarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} />
        </CmsField>
        <CmsField label="Hero image URL" className="md:col-span-2">
          <CmsTextInput value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} />
        </CmsField>
        <CmsField label="Overview intro" className="md:col-span-2">
          <CmsTextarea value={overview} onChange={(e) => setOverview(e.target.value)} rows={3} />
        </CmsField>
        <CmsField label="Section title">
          <CmsTextInput value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
        </CmsField>
        <CmsField label="Prisma category">
          <CmsSelect
            value={category}
            onChange={(v) => setCategory(v as GuideCategory)}
            options={GUIDE_CATEGORIES}
          />
        </CmsField>
        <CmsField label="Display category (hub)">
          <CmsSelect
            value={categoryLabel}
            onChange={setCategoryLabel}
            options={CATEGORY_LABELS.map((l) => ({ value: l, label: l }))}
          />
        </CmsField>
        <CmsField label="Section body" className="md:col-span-2">
          <CmsTextarea value={sectionBody} onChange={(e) => setSectionBody(e.target.value)} rows={8} />
        </CmsField>
        <CmsField label="Related guide slugs (one per line)" className="md:col-span-2">
          <CmsTextarea value={relatedSlugs} onChange={(e) => setRelatedSlugs(e.target.value)} rows={2} />
        </CmsField>
        <CmsField label="Sort order">
          <CmsTextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </CmsField>
        <CmsField label="Status">
          <CmsStatusField value={status} onChange={setStatus} />
        </CmsField>
      </div>

      <SeoEditor value={seoState} onChange={setSeoState} />

      <div className="flex flex-wrap gap-2">
        {initial?.id && status !== "PUBLISHED" && (
          <button
            type="button"
            disabled={saving}
            onClick={handlePublish}
            className="rounded-lg border border-gold/40 px-4 py-2 text-sm font-medium text-gold"
          >
            Publish now
          </button>
        )}
        <CmsFormActions
          saving={saving}
          error={error}
          onDelete={initial?.id ? handleDelete : undefined}
          previewHref={previewHref}
        />
      </div>
    </form>
  );
}
