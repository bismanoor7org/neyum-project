"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContentStatus } from "@prisma/client";
import {
  CmsField,
  CmsFormActions,
  CmsPublishBar,
  CmsTextarea,
  CmsTextInput,
  useCmsFormState,
} from "@/components/cms/forms/CmsFormFields";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { saveDestinationsPageAction } from "@/server/actions/cms";

type DestinationsPageRecord = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  status?: ContentStatus;
};

export function DestinationsPageSettingsForm({ initial }: { initial?: DestinationsPageRecord }) {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();

  const [eyebrow, setEyebrow] = useState(initial?.eyebrow ?? "Luxury marketplace");
  const [title, setTitle] = useState(initial?.title ?? "Choose your Fiji address");
  const [subtitle, setSubtitle] = useState(
    initial?.subtitle ??
      "Every destination connects to curated experiences, resorts, packages and private transfers.",
  );
  const [status, setStatus] = useState<ContentStatus>(initial?.status ?? "PUBLISHED");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveDestinationsPageAction({
      id: initial?.id,
      eyebrow,
      title,
      subtitle,
      status,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CmsPublishBar status={status} onStatusChange={setStatus} saving={saving} />

      <div className="admin-card space-y-4 rounded-xl p-5">
        <p className="admin-text-subtle text-sm">
          Controls the hero copy on{" "}
          <code className="text-xs">{CMS_ROUTES.destinations.index}</code>. Destination cards are
          managed separately in the destinations list.
        </p>

        <CmsField label="Eyebrow">
          <CmsTextInput value={eyebrow} onChange={(e) => setEyebrow(e.target.value)} />
        </CmsField>
        <CmsField label="Page title *">
          <CmsTextInput value={title} onChange={(e) => setTitle(e.target.value)} required />
        </CmsField>
        <CmsField label="Subtitle">
          <CmsTextarea value={subtitle} onChange={(e) => setSubtitle(e.target.value)} rows={3} />
        </CmsField>
      </div>

      <CmsFormActions saving={saving} error={error} />
    </form>
  );
}
