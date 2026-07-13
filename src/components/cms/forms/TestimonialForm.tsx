"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContentStatus } from "@prisma/client";
import {
  CmsField,
  CmsFormActions,
  CmsStatusField,
  CmsTextarea,
  CmsTextInput,
  useCmsFormState,
} from "@/components/cms/forms/CmsFormFields";
import { linesToList, listToLines } from "@/lib/cms/action-utils";
import {
  deleteTestimonialAction,
  publishTestimonialAction,
  saveTestimonialAction,
} from "@/server/actions/cms";

type TestimonialRecord = {
  id?: string;
  authorName: string;
  authorTitle?: string | null;
  authorImage?: string | null;
  location?: string | null;
  content: string;
  rating?: number;
  featured?: boolean;
  status?: ContentStatus;
  sortOrder?: number;
};

export function TestimonialForm({ initial }: { initial?: TestimonialRecord }) {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();

  const [authorName, setAuthorName] = useState(initial?.authorName ?? "");
  const [authorTitle, setAuthorTitle] = useState(initial?.authorTitle ?? "");
  const [authorImage, setAuthorImage] = useState(initial?.authorImage ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [rating, setRating] = useState(String(initial?.rating ?? 5));
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [status, setStatus] = useState<ContentStatus>(initial?.status ?? "DRAFT");
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveTestimonialAction({
      id: initial?.id,
      authorName,
      authorTitle,
      authorImage,
      location,
      content,
      rating: Number(rating) || 5,
      featured,
      status,
      sortOrder: Number(sortOrder) || 0,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(`/admin/cms/testimonials/${result.data.id}/edit`);
    router.refresh();
  }

  async function handlePublish() {
    if (!initial?.id) return;
    setSaving(true);
    const result = await publishTestimonialAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else {
      setStatus("PUBLISHED");
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!initial?.id || !confirm("Delete this testimonial?")) return;
    setSaving(true);
    const result = await deleteTestimonialAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else router.push("/admin/cms/testimonials");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="admin-card grid gap-4 rounded-xl p-5 md:grid-cols-2">
        <CmsField label="Author name *">
          <CmsTextInput value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
        </CmsField>
        <CmsField label="Author title">
          <CmsTextInput value={authorTitle} onChange={(e) => setAuthorTitle(e.target.value)} />
        </CmsField>
        <CmsField label="Location / trip">
          <CmsTextInput value={location} onChange={(e) => setLocation(e.target.value)} />
        </CmsField>
        <CmsField label="Author image URL">
          <CmsTextInput value={authorImage} onChange={(e) => setAuthorImage(e.target.value)} />
        </CmsField>
        <CmsField label="Quote *" className="md:col-span-2">
          <CmsTextarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} required />
        </CmsField>
        <CmsField label="Rating">
          <CmsTextInput type="number" min={1} max={5} value={rating} onChange={(e) => setRating(e.target.value)} />
        </CmsField>
        <CmsField label="Sort order">
          <CmsTextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </CmsField>
        <CmsField label="Status">
          <CmsStatusField value={status} onChange={setStatus} />
        </CmsField>
        <label className="flex items-center gap-2 md:col-span-2">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          <span className="admin-text-subtle text-sm">Featured on homepage</span>
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        {initial?.id && status !== "PUBLISHED" && (
          <button type="button" disabled={saving} onClick={handlePublish} className="rounded-lg border border-gold/40 px-4 py-2 text-sm font-medium text-gold">
            Publish now
          </button>
        )}
        <CmsFormActions saving={saving} error={error} onDelete={initial?.id ? handleDelete : undefined} />
      </div>
    </form>
  );
}
