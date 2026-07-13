"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContentStatus } from "@prisma/client";
import { SeoEditor } from "@/components/cms/SeoEditor";
import {
  CmsField,
  CmsFormActions,
  CmsPublishBar,
  CmsTextarea,
  CmsTextInput,
  useCmsFormState,
} from "@/components/cms/forms/CmsFormFields";
import { CmsImageField } from "@/components/cms/forms/CmsImageField";
import type { DestinationContentJson } from "@/lib/cms/destination-content";
import { listToLines, linesToList } from "@/lib/cms/action-utils";
import { CMS_ROUTES, previewUrl } from "@/lib/cms/public-routes";
import type { SeoPayload } from "@/lib/cms/types";
import { cn } from "@/lib/utils";
import {
  deleteDestinationAction,
  publishDestinationAction,
  saveDestinationAction,
} from "@/server/actions/cms";

type DestinationRecord = {
  id?: string;
  name: string;
  slug: string;
  tagline?: string | null;
  description?: string | null;
  excerpt?: string | null;
  heroImage?: string | null;
  gallery?: string[];
  featured?: boolean;
  status?: ContentStatus;
  sortOrder?: number;
  latitude?: number | string | null;
  longitude?: number | string | null;
  content?: DestinationContentJson | null;
  highlights?: string[] | null;
};

type FormTab = "basics" | "media" | "guide" | "travel" | "seo";

const TABS: { id: FormTab; label: string }[] = [
  { id: "basics", label: "Basics" },
  { id: "media", label: "Media" },
  { id: "guide", label: "Guide content" },
  { id: "travel", label: "Travel info" },
  { id: "seo", label: "SEO" },
];

const LIST_FIELDS = [
  { key: "thingsToDo" as const, label: "Things to do" },
  { key: "placesToStay" as const, label: "Places to stay" },
  { key: "tours" as const, label: "Featured tours" },
  { key: "beaches" as const, label: "Beaches" },
  { key: "dining" as const, label: "Dining" },
  { key: "transport" as const, label: "Transport" },
  { key: "culture" as const, label: "Culture" },
] as const;

const emptySeo = (): SeoPayload => ({});

export function DestinationForm({
  initial,
  seo,
}: {
  initial?: DestinationRecord;
  seo?: SeoPayload;
}) {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();
  const content = (initial?.content ?? {}) as DestinationContentJson;
  const [tab, setTab] = useState<FormTab>("basics");

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [tagline, setTagline] = useState(initial?.tagline ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [heroImage, setHeroImage] = useState(initial?.heroImage ?? "");
  const [cardImage, setCardImage] = useState(content.cardImage ?? "");
  const [gallery, setGallery] = useState(listToLines(initial?.gallery));
  const [region, setRegion] = useState<"mainland" | "islands">(content.region ?? "islands");
  const [highlights, setHighlights] = useState(
    listToLines(content.listHighlights ?? (initial?.highlights as string[] | undefined)),
  );
  const [thingsToDo, setThingsToDo] = useState(listToLines(content.thingsToDo));
  const [placesToStay, setPlacesToStay] = useState(listToLines(content.placesToStay));
  const [tours, setTours] = useState(listToLines(content.tours));
  const [beaches, setBeaches] = useState(listToLines(content.beaches));
  const [dining, setDining] = useState(listToLines(content.dining));
  const [transport, setTransport] = useState(listToLines(content.transport));
  const [culture, setCulture] = useState(listToLines(content.culture));
  const [weather, setWeather] = useState(content.weather ?? "");
  const [bestTimeToVisit, setBestTimeToVisit] = useState(content.bestTimeToVisit ?? "");
  const [travelTips, setTravelTips] = useState(listToLines(content.travelTips));
  const [relatedSlugs, setRelatedSlugs] = useState(listToLines(content.relatedSlugs));
  const [latitude, setLatitude] = useState(
    initial?.latitude != null ? String(initial.latitude) : "",
  );
  const [longitude, setLongitude] = useState(
    initial?.longitude != null ? String(initial.longitude) : "",
  );
  const [faqs, setFaqs] = useState(
    (content.faqs ?? [])
      .map((f) => `${f.question} | ${f.answer}`)
      .join("\n"),
  );
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [status, setStatus] = useState<ContentStatus>(initial?.status ?? "DRAFT");
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [seoState, setSeoState] = useState<SeoPayload>(seo ?? emptySeo());

  const listState: Record<(typeof LIST_FIELDS)[number]["key"], string> = {
    thingsToDo,
    placesToStay,
    tours,
    beaches,
    dining,
    transport,
    culture,
  };

  const listSetters: Record<(typeof LIST_FIELDS)[number]["key"], (v: string) => void> = {
    thingsToDo: setThingsToDo,
    placesToStay: setPlacesToStay,
    tours: setTours,
    beaches: setBeaches,
    dining: setDining,
    transport: setTransport,
    culture: setCulture,
  };

  const previewSlug = slug || name.toLowerCase().replace(/\s+/g, "-");
  const previewHref =
    initial?.id && previewSlug
      ? previewUrl(CMS_ROUTES.destinations.detail(previewSlug))
      : undefined;

  function parseFaqs(raw: string) {
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [question, ...rest] = line.split("|");
        return {
          question: question?.trim() ?? line,
          answer: rest.join("|").trim() || "Contact our concierge for details.",
        };
      });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveDestinationAction({
      id: initial?.id,
      name,
      slug,
      tagline,
      description,
      excerpt,
      heroImage,
      cardImage,
      gallery: linesToList(gallery),
      region,
      listHighlights: linesToList(highlights),
      thingsToDo: linesToList(thingsToDo),
      placesToStay: linesToList(placesToStay),
      tours: linesToList(tours),
      beaches: linesToList(beaches),
      dining: linesToList(dining),
      transport: linesToList(transport),
      culture: linesToList(culture),
      weather,
      bestTimeToVisit,
      travelTips: linesToList(travelTips),
      relatedSlugs: linesToList(relatedSlugs),
      latitude: latitude.trim() ? Number(latitude) : null,
      longitude: longitude.trim() ? Number(longitude) : null,
      faqs: parseFaqs(faqs),
      featured,
      status,
      sortOrder: Number(sortOrder) || 0,
      seo: seoState,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(`/admin/cms/destinations/${result.data.id}/edit`);
    router.refresh();
  }

  async function handlePublish() {
    if (!initial?.id) return;
    setSaving(true);
    const result = await publishDestinationAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else {
      setStatus("PUBLISHED");
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!initial?.id || !confirm("Delete this destination permanently?")) return;
    setSaving(true);
    const result = await deleteDestinationAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else router.push("/admin/cms/destinations");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CmsPublishBar
        status={status}
        onStatusChange={setStatus}
        onPublishNow={initial?.id ? handlePublish : undefined}
        saving={saving}
      />

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

      {tab === "basics" && (
        <div className="admin-card grid gap-4 rounded-xl p-5 md:grid-cols-2">
          <CmsField label="Name *">
            <CmsTextInput value={name} onChange={(e) => setName(e.target.value)} required />
          </CmsField>
          <CmsField label="Slug" hint="Auto-generated from name if empty">
            <CmsTextInput value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="coral-coast" />
          </CmsField>
          <CmsField label="Tagline">
            <CmsTextInput value={tagline} onChange={(e) => setTagline(e.target.value)} />
          </CmsField>
          <CmsField label="Region">
            <select
              className="admin-input w-full"
              value={region}
              onChange={(e) => setRegion(e.target.value as "mainland" | "islands")}
            >
              <option value="islands">Islands</option>
              <option value="mainland">Mainland</option>
            </select>
          </CmsField>
          <CmsField label="Overview / Description" className="md:col-span-2">
            <CmsTextarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
          </CmsField>
          <CmsField label="Excerpt" className="md:col-span-2">
            <CmsTextarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} />
          </CmsField>
          <CmsField label="Highlights (one per line)" className="md:col-span-2">
            <CmsTextarea value={highlights} onChange={(e) => setHighlights(e.target.value)} rows={4} />
          </CmsField>
          <CmsField label="Sort order">
            <CmsTextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
          </CmsField>
          <label className="flex items-center gap-2 md:col-span-2">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            <span className="admin-text-subtle text-sm">Featured on homepage</span>
          </label>
        </div>
      )}

      {tab === "media" && (
        <div className="admin-card grid gap-4 rounded-xl p-5 md:grid-cols-2">
          <CmsImageField
            label="Hero image"
            value={heroImage}
            onChange={setHeroImage}
            className="md:col-span-2"
          />
          <CmsImageField
            label="Card image"
            value={cardImage}
            onChange={setCardImage}
            className="md:col-span-2"
          />
          <CmsField label="Gallery URLs (one per line)" className="md:col-span-2">
            <CmsTextarea value={gallery} onChange={(e) => setGallery(e.target.value)} rows={4} />
          </CmsField>
        </div>
      )}

      {tab === "guide" && (
        <div className="admin-card grid gap-4 rounded-xl p-5 md:grid-cols-2">
          {LIST_FIELDS.map(({ key, label }) => (
            <CmsField key={key} label={`${label} (one per line)`} className="md:col-span-2">
              <CmsTextarea
                value={listState[key]}
                onChange={(e) => listSetters[key](e.target.value)}
                rows={3}
              />
            </CmsField>
          ))}
        </div>
      )}

      {tab === "travel" && (
        <div className="admin-card grid gap-4 rounded-xl p-5 md:grid-cols-2">
          <CmsField label="Weather summary" className="md:col-span-2">
            <CmsTextarea value={weather} onChange={(e) => setWeather(e.target.value)} rows={2} />
          </CmsField>
          <CmsField label="Best time to visit" className="md:col-span-2">
            <CmsTextarea value={bestTimeToVisit} onChange={(e) => setBestTimeToVisit(e.target.value)} rows={2} />
          </CmsField>
          <CmsField label="Travel tips (one per line)" className="md:col-span-2">
            <CmsTextarea value={travelTips} onChange={(e) => setTravelTips(e.target.value)} rows={4} />
          </CmsField>
          <CmsField label="Related destination slugs (one per line)" className="md:col-span-2">
            <CmsTextarea value={relatedSlugs} onChange={(e) => setRelatedSlugs(e.target.value)} rows={2} />
          </CmsField>
          <CmsField label="Latitude" hint="For interactive map pin">
            <CmsTextInput
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="-17.7765"
            />
          </CmsField>
          <CmsField label="Longitude" hint="For interactive map pin">
            <CmsTextInput
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="177.4356"
            />
          </CmsField>
          <CmsField
            label="FAQs (question | answer per line)"
            hint="Separate question and answer with a pipe character"
            className="md:col-span-2"
          >
            <CmsTextarea value={faqs} onChange={(e) => setFaqs(e.target.value)} rows={6} />
          </CmsField>
        </div>
      )}

      {tab === "seo" && <SeoEditor value={seoState} onChange={setSeoState} />}

      <CmsFormActions
        saving={saving}
        error={error}
        onDelete={initial?.id ? handleDelete : undefined}
        previewHref={previewHref}
      />
    </form>
  );
}
