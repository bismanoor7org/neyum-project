"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContentStatus } from "@prisma/client";
import {
  CmsField,
  CmsFormActions,
  CmsPublishBar,
  CmsScheduleField,
  CmsTextInput,
  useCmsFormState,
} from "@/components/cms/forms/CmsFormFields";
import { CmsImageField } from "@/components/cms/forms/CmsImageField";
import {
  deleteBannerAction,
  publishBannerAction,
  saveBannerAction,
} from "@/server/actions/cms-extended";

type BannerRecord = {
  id?: string;
  title: string;
  subtitle?: string | null;
  imageUrl: string;
  linkUrl?: string | null;
  position?: string;
  status?: ContentStatus;
  sortOrder?: number;
  startsAt?: string | null;
  endsAt?: string | null;
};

function toDatetimeLocal(value?: string | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function BannerForm({ initial }: { initial?: BannerRecord }) {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [subtitle, setSubtitle] = useState(initial?.subtitle ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [linkUrl, setLinkUrl] = useState(initial?.linkUrl ?? "");
  const [position, setPosition] = useState(initial?.position ?? "homepage");
  const [status, setStatus] = useState<ContentStatus>(initial?.status ?? "DRAFT");
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [startsAt, setStartsAt] = useState(toDatetimeLocal(initial?.startsAt));
  const [endsAt, setEndsAt] = useState(toDatetimeLocal(initial?.endsAt));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveBannerAction({
      id: initial?.id,
      title,
      subtitle,
      imageUrl,
      linkUrl,
      position,
      status,
      sortOrder: Number(sortOrder) || 0,
      startsAt: startsAt ? new Date(startsAt).toISOString() : null,
      endsAt: endsAt ? new Date(endsAt).toISOString() : null,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(`/admin/cms/homepage/banners/${result.data.id}/edit`);
    router.refresh();
  }

  async function handlePublish() {
    if (!initial?.id) return;
    setSaving(true);
    const result = await publishBannerAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else {
      setStatus("PUBLISHED");
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!initial?.id || !confirm("Delete this banner?")) return;
    setSaving(true);
    const result = await deleteBannerAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else router.push("/admin/cms/homepage");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CmsPublishBar
        status={status}
        onStatusChange={setStatus}
        publishAt={startsAt}
        onPublishAtChange={setStartsAt}
        onPublishNow={initial?.id ? handlePublish : undefined}
        saving={saving}
      />

      <div className="admin-card grid gap-4 rounded-xl p-5 md:grid-cols-2">
        <CmsField label="Banner title *">
          <CmsTextInput value={title} onChange={(e) => setTitle(e.target.value)} required />
        </CmsField>
        <CmsField label="Subtitle">
          <CmsTextInput value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
        </CmsField>
        <CmsImageField
          label="Banner image *"
          value={imageUrl}
          onChange={setImageUrl}
          className="md:col-span-2"
        />
        <CmsField label="Link URL">
          <CmsTextInput value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="/tours" />
        </CmsField>
        <CmsField label="Position">
          <CmsTextInput value={position} onChange={(e) => setPosition(e.target.value)} />
        </CmsField>
        <CmsScheduleField
          value={startsAt}
          onChange={setStartsAt}
        />
        <CmsField label="End display at" hint="Banner auto-archives after this time when published.">
          <CmsTextInput
            type="datetime-local"
            value={endsAt}
            onChange={(e) => setEndsAt(e.target.value)}
          />
        </CmsField>
        <CmsField label="Sort order">
          <CmsTextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </CmsField>
      </div>
      <CmsFormActions
        saving={saving}
        error={error}
        onDelete={initial?.id ? handleDelete : undefined}
        submitLabel={initial?.id ? "Save banner" : "Create banner"}
      />
    </form>
  );
}
