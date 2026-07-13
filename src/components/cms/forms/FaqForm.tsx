"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContentStatus } from "@prisma/client";
import { SeoEditor } from "@/components/cms/SeoEditor";
import {
  CmsField,
  CmsFormActions,
  CmsStatusField,
  CmsTextarea,
  CmsTextInput,
  useCmsFormState,
} from "@/components/cms/forms/CmsFormFields";
import type { SeoPayload } from "@/lib/cms/types";
import { deleteFaqAction, publishFaqAction, saveFaqAction } from "@/server/actions/cms";

const FAQ_CATEGORIES = [
  "Planning",
  "Accommodation",
  "Transport",
  "Destinations",
  "Safety",
  "Currency",
  "General",
];

type FaqRecord = {
  id?: string;
  question: string;
  answer: string;
  category?: string | null;
  sortOrder?: number;
  status?: ContentStatus;
};

export function FaqForm({ initial, seo }: { initial?: FaqRecord; seo?: SeoPayload }) {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();

  const [question, setQuestion] = useState(initial?.question ?? "");
  const [answer, setAnswer] = useState(initial?.answer ?? "");
  const [category, setCategory] = useState(initial?.category ?? "General");
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [status, setStatus] = useState<ContentStatus>(initial?.status ?? "DRAFT");
  const [seoState, setSeoState] = useState<SeoPayload>(seo ?? {});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveFaqAction({
      id: initial?.id,
      question,
      answer,
      category,
      sortOrder: Number(sortOrder) || 0,
      status,
      seo: seoState,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(`/admin/cms/faqs/${result.data.id}/edit`);
    router.refresh();
  }

  async function handlePublish() {
    if (!initial?.id) return;
    setSaving(true);
    const result = await publishFaqAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else {
      setStatus("PUBLISHED");
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!initial?.id || !confirm("Delete this FAQ permanently?")) return;
    setSaving(true);
    const result = await deleteFaqAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else router.push("/admin/cms/faqs");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="admin-card space-y-4 rounded-xl p-5">
        <CmsField label="Question *">
          <CmsTextInput value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </CmsField>
        <CmsField label="Answer *">
          <CmsTextarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={6} required />
        </CmsField>
        <div className="grid gap-4 md:grid-cols-3">
          <CmsField label="Category">
            <select
              className="admin-input w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {FAQ_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </CmsField>
          <CmsField label="Sort order">
            <CmsTextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
          </CmsField>
          <CmsField label="Status">
            <CmsStatusField value={status} onChange={setStatus} />
          </CmsField>
        </div>
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
        {initial?.id && status === "PUBLISHED" && (
          <a
            href="/faq"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-foreground/15 px-4 py-2 text-sm font-medium"
          >
            View on site
          </a>
        )}
        <CmsFormActions
          saving={saving}
          error={error}
          onDelete={initial?.id ? handleDelete : undefined}
        />
      </div>
    </form>
  );
}
