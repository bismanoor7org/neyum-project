"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SeoEditor } from "@/components/cms/SeoEditor";
import {
  CmsField,
  CmsFormActions,
  CmsSelect,
  CmsTextarea,
  CmsTextInput,
  useCmsFormState,
} from "@/components/cms/forms/CmsFormFields";
import { linesToList, listToLines } from "@/lib/cms/action-utils";
import { CMS_ROUTES, previewUrl } from "@/lib/cms/public-routes";
import type { SeoPayload } from "@/lib/cms/types";
import { TOUR_CMS_STATUS, type TourCmsStatus, type TourContentJson } from "@/lib/cms/tour-content";
import {
  deleteTourAction,
  publishTourAction,
  saveTourAction,
} from "@/server/actions/cms";

type TourRecord = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  price: number | string;
  currency?: string;
  featuredImage?: string | null;
  featured?: boolean;
  status?: TourCmsStatus;
  destinationId?: string;
  supplierId?: string;
  content?: TourContentJson | null;
};

export function TourForm({
  initial,
  seo,
  destinations,
  suppliers,
}: {
  initial?: TourRecord;
  seo?: SeoPayload;
  destinations: { id: string; name: string; slug: string }[];
  suppliers: { id: string; companyName: string }[];
}) {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();
  const content = (initial?.content ?? {}) as TourContentJson;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [duration, setDuration] = useState(initial?.duration ?? "Half Day");
  const [price, setPrice] = useState(String(initial?.price ?? ""));
  const [currency, setCurrency] = useState(initial?.currency ?? "FJD");
  const [featuredImage, setFeaturedImage] = useState(initial?.featuredImage ?? "");
  const [destinationId, setDestinationId] = useState(
    initial?.destinationId ?? destinations[0]?.id ?? "",
  );
  const [supplierId, setSupplierId] = useState(initial?.supplierId ?? suppliers[0]?.id ?? "");
  const [location, setLocation] = useState(content.location ?? "");
  const [category, setCategory] = useState(content.category ?? "Experience");
  const [ages, setAges] = useState(content.ages ?? "All ages");
  const [highlights, setHighlights] = useState(listToLines(content.highlights));
  const [included, setIncluded] = useState(listToLines(content.included));
  const [itinerary, setItinerary] = useState(listToLines(content.itinerary));
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [status, setStatus] = useState<TourCmsStatus>(initial?.status ?? "DRAFT");
  const [seoState, setSeoState] = useState<SeoPayload>(seo ?? {});

  const previewHref = initial?.id && slug ? previewUrl(CMS_ROUTES.tours.detail(slug)) : undefined;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveTourAction({
      id: initial?.id,
      title,
      slug,
      description,
      duration,
      price: Number(price) || 0,
      currency,
      featuredImage,
      destinationId,
      supplierId: supplierId || undefined,
      location,
      category,
      ages,
      highlights: linesToList(highlights),
      included: linesToList(included),
      itinerary: linesToList(itinerary),
      featured,
      status,
      seo: seoState,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(`/admin/cms/tours/${result.data.id}/edit`);
    router.refresh();
  }

  async function handlePublish() {
    if (!initial?.id) return;
    setSaving(true);
    const result = await publishTourAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else {
      setStatus("APPROVED");
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!initial?.id || !confirm("Archive this tour?")) return;
    setSaving(true);
    const result = await deleteTourAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else router.push("/admin/cms/tours");
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
        <CmsField label="Destination *">
          <CmsSelect
            value={destinationId}
            onChange={setDestinationId}
            options={destinations.map((d) => ({ value: d.id, label: d.name }))}
          />
        </CmsField>
        <CmsField label="Supplier">
          <CmsSelect
            value={supplierId}
            onChange={setSupplierId}
            options={suppliers.map((s) => ({ value: s.id, label: s.companyName }))}
          />
        </CmsField>
        <CmsField label="Duration">
          <CmsTextInput value={duration} onChange={(e) => setDuration(e.target.value)} />
        </CmsField>
        <CmsField label="Location">
          <CmsTextInput value={location} onChange={(e) => setLocation(e.target.value)} />
        </CmsField>
        <CmsField label="Price">
          <CmsTextInput type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </CmsField>
        <CmsField label="Currency">
          <CmsTextInput value={currency} onChange={(e) => setCurrency(e.target.value)} />
        </CmsField>
        <CmsField label="Hero image URL" className="md:col-span-2">
          <CmsTextInput value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} />
        </CmsField>
        <CmsField label="Overview *" className="md:col-span-2">
          <CmsTextarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} required />
        </CmsField>
        <CmsField label="Highlights (one per line)">
          <CmsTextarea value={highlights} onChange={(e) => setHighlights(e.target.value)} rows={4} />
        </CmsField>
        <CmsField label="Included (one per line)">
          <CmsTextarea value={included} onChange={(e) => setIncluded(e.target.value)} rows={4} />
        </CmsField>
        <CmsField label="Itinerary (one per line)" className="md:col-span-2">
          <CmsTextarea value={itinerary} onChange={(e) => setItinerary(e.target.value)} rows={3} />
        </CmsField>
        <CmsField label="Status">
          <CmsSelect
            value={status}
            onChange={(v) => setStatus(v as TourCmsStatus)}
            options={TOUR_CMS_STATUS.map((s) => ({ value: s.value, label: s.label }))}
          />
        </CmsField>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          <span className="admin-text-subtle text-sm">Featured</span>
        </label>
      </div>
      <SeoEditor value={seoState} onChange={setSeoState} />
      <div className="flex flex-wrap gap-2">
        {initial?.id && status !== "APPROVED" && (
          <button type="button" disabled={saving} onClick={handlePublish} className="rounded-lg border border-gold/40 px-4 py-2 text-sm font-medium text-gold">
            Publish now
          </button>
        )}
        <CmsFormActions saving={saving} error={error} onDelete={initial?.id ? handleDelete : undefined} previewHref={previewHref} />
      </div>
    </form>
  );
}
