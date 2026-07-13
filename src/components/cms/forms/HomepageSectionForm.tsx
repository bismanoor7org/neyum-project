"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ContentStatus } from "@prisma/client";
import {
  CmsField,
  CmsFormActions,
  CmsPublishBar,
  CmsTextarea,
  CmsTextInput,
  useCmsFormState,
} from "@/components/cms/forms/CmsFormFields";
import {
  deleteHomepageSectionAction,
  publishHomepageSectionAction,
  saveHomepageSectionAction,
} from "@/server/actions/cms";

const SECTION_PRESETS: Record<string, Record<string, unknown>> = {
  hero: {
    titleAccent: "Fiji Islands,",
    titleMain: "Your Way",
    subtitle: "Bespoke journeys across 333 islands",
    ctaLabel: "Plan Your Journey",
    ctaHref: "/contact",
  },
  featured_destinations: {
    title: "Discover Fiji Your Way",
    subtitle: "Editorial destinations curated by our concierge",
  },
  featured_experiences: {
    title: "Unforgettable Experiences",
    subtitle: "Handpicked tours from our concierge network",
  },
  cta_primary: {
    title: "Plan Your Journey",
    subtitle: "Speak with a Fiji concierge today",
    ctaLabel: "Start planning",
    ctaHref: "/contact",
  },
  cta_secondary: {
    title: "Exclusive offers",
    subtitle: "Luxury deals delivered to your inbox",
    ctaLabel: "View deals",
    ctaHref: "/deals-and-offers",
  },
  faq_preview: {
    title: "Plan with confidence",
    subtitle: "Answers from our Fiji concierge team",
  },
  customer_stories: {
    title: "Trusted by discerning travellers",
    subtitle: "Real journeys, curated by My Fiji Tour",
  },
  destinations_hub: {
    eyebrow: "Luxury marketplace",
    title: "Choose your Fiji address",
    subtitle:
      "Every destination connects to curated experiences, resorts, packages and private transfers.",
  },
};

type SectionRecord = {
  id?: string;
  key: string;
  title: string;
  content?: Record<string, unknown>;
  status?: ContentStatus;
  sortOrder?: number;
};

export function HomepageSectionForm({
  initial,
  presetKey,
}: {
  initial?: SectionRecord;
  presetKey?: string;
}) {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();

  const preset = presetKey && SECTION_PRESETS[presetKey] ? presetKey : undefined;
  const [key, setKey] = useState(initial?.key ?? preset ?? "");
  const [title, setTitle] = useState(
    initial?.title ??
      (preset ? preset.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : ""),
  );
  const [contentJson, setContentJson] = useState(
    JSON.stringify(initial?.content ?? (preset ? SECTION_PRESETS[preset] : SECTION_PRESETS.hero), null, 2),
  );
  const [status, setStatus] = useState<ContentStatus>(initial?.status ?? "DRAFT");
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));

  useEffect(() => {
    if (presetKey && !initial) applyPreset(presetKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetKey]);

  function applyPreset(presetKey: string) {
    setKey(presetKey);
    setTitle(presetKey.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
    setContentJson(JSON.stringify(SECTION_PRESETS[presetKey] ?? {}, null, 2));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveHomepageSectionAction({
      id: initial?.id,
      key,
      title,
      contentJson,
      status,
      sortOrder: Number(sortOrder) || 0,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(`/admin/cms/homepage/${result.data.id}/edit`);
    router.refresh();
  }

  async function handlePublish() {
    if (!initial?.id) return;
    setSaving(true);
    const result = await publishHomepageSectionAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else {
      setStatus("PUBLISHED");
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!initial?.id || !confirm("Delete this homepage section?")) return;
    setSaving(true);
    const result = await deleteHomepageSectionAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else router.push("/admin/cms/homepage");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CmsPublishBar
        status={status}
        onStatusChange={setStatus}
        onPublishNow={initial?.id ? handlePublish : undefined}
        saving={saving}
      />

      {!initial?.id && (
        <div className="flex flex-wrap gap-2">
          {Object.keys(SECTION_PRESETS).map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => applyPreset(preset)}
              className="rounded-lg border border-foreground/10 px-3 py-1.5 text-xs font-medium"
            >
              Use {preset} preset
            </button>
          ))}
        </div>
      )}

      <div className="admin-card space-y-4 rounded-xl p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <CmsField label="Section key *" hint="e.g. hero, featured_destinations, faq_preview">
            <CmsTextInput value={key} onChange={(e) => setKey(e.target.value)} required />
          </CmsField>
          <CmsField label="Admin title *">
            <CmsTextInput value={title} onChange={(e) => setTitle(e.target.value)} required />
          </CmsField>
          <CmsField label="Sort order">
            <CmsTextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
          </CmsField>
        </div>
        <CmsField label="Content (JSON)" hint="Drives homepage copy for this section key">
          <CmsTextarea
            value={contentJson}
            onChange={(e) => setContentJson(e.target.value)}
            rows={14}
            className="font-mono text-xs"
          />
        </CmsField>
      </div>

      <div className="flex flex-wrap gap-2">
        {initial?.id && (
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-foreground/15 px-4 py-2 text-sm font-medium"
          >
            Preview homepage
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
