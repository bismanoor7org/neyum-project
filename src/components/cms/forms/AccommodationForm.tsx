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
import { linesToList, listToLines } from "@/lib/cms/action-utils";
import type { SeoPayload } from "@/lib/cms/types";
import {
  deleteAccommodationAction,
  publishAccommodationAction,
  saveAccommodationAction,
} from "@/server/actions/cms-extended";

type AccommodationRecord = {
  id?: string;
  title: string;
  slug: string;
  location: string;
  stars?: number;
  priceFrom?: string | null;
  overview: string;
  heroImage?: string | null;
  gallery?: string[];
  amenities?: string[];
  experiences?: string[];
  relatedSlugs?: string[];
  collection?: string | null;
  featured?: boolean;
  status?: ContentStatus;
  sortOrder?: number;
};

export function AccommodationForm({
  initial,
  seo,
}: {
  initial?: AccommodationRecord;
  seo?: SeoPayload;
}) {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [stars, setStars] = useState(String(initial?.stars ?? 5));
  const [priceFrom, setPriceFrom] = useState(initial?.priceFrom ?? "");
  const [overview, setOverview] = useState(initial?.overview ?? "");
  const [heroImage, setHeroImage] = useState(initial?.heroImage ?? "");
  const [gallery, setGallery] = useState(listToLines(initial?.gallery));
  const [amenities, setAmenities] = useState(listToLines(initial?.amenities));
  const [experiences, setExperiences] = useState(listToLines(initial?.experiences));
  const [relatedSlugs, setRelatedSlugs] = useState(listToLines(initial?.relatedSlugs));
  const [collection, setCollection] = useState(initial?.collection ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [status, setStatus] = useState<ContentStatus>(initial?.status ?? "DRAFT");
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [seoState, setSeoState] = useState<SeoPayload>(seo ?? {});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveAccommodationAction({
      id: initial?.id,
      title,
      slug,
      location,
      stars: Number(stars) || 5,
      priceFrom,
      overview,
      heroImage,
      gallery: linesToList(gallery),
      amenities: linesToList(amenities),
      experiences: linesToList(experiences),
      relatedSlugs: linesToList(relatedSlugs),
      collection,
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
    router.push(`/admin/cms/accommodations/${result.data.id}/edit`);
    router.refresh();
  }

  async function handlePublish() {
    if (!initial?.id) return;
    setSaving(true);
    const result = await publishAccommodationAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else {
      setStatus("PUBLISHED");
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!initial?.id || !confirm("Delete this accommodation?")) return;
    setSaving(true);
    const result = await deleteAccommodationAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else router.push("/admin/cms/accommodations");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CmsPublishBar
        status={status}
        onStatusChange={setStatus}
        onPublishNow={initial?.id ? handlePublish : undefined}
        saving={saving}
      />

      <div className="admin-card grid gap-4 rounded-xl p-5 md:grid-cols-2">
        <CmsField label="Resort / hotel name *">
          <CmsTextInput value={title} onChange={(e) => setTitle(e.target.value)} required />
        </CmsField>
        <CmsField label="URL slug" hint="/places-to-stay/[slug]">
          <CmsTextInput value={slug} onChange={(e) => setSlug(e.target.value)} />
        </CmsField>
        <CmsField label="Location *">
          <CmsTextInput value={location} onChange={(e) => setLocation(e.target.value)} required />
        </CmsField>
        <CmsField label="Star rating">
          <CmsTextInput type="number" min={1} max={5} value={stars} onChange={(e) => setStars(e.target.value)} />
        </CmsField>
        <CmsField label="Price from">
          <CmsTextInput value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} placeholder="FJD 650" />
        </CmsField>
        <CmsField label="Collection">
          <CmsTextInput value={collection} onChange={(e) => setCollection(e.target.value)} />
        </CmsField>
        <CmsField label="Overview *" className="md:col-span-2">
          <CmsTextarea value={overview} onChange={(e) => setOverview(e.target.value)} rows={5} required />
        </CmsField>
        <CmsImageField
          label="Hero image"
          value={heroImage}
          onChange={setHeroImage}
          className="md:col-span-2"
        />
        <CmsField label="Gallery URLs (one per line)" className="md:col-span-2">
          <CmsTextarea value={gallery} onChange={(e) => setGallery(e.target.value)} rows={3} />
        </CmsField>
        <CmsField label="Amenities (one per line)">
          <CmsTextarea value={amenities} onChange={(e) => setAmenities(e.target.value)} rows={4} />
        </CmsField>
        <CmsField label="Experiences (one per line)">
          <CmsTextarea value={experiences} onChange={(e) => setExperiences(e.target.value)} rows={3} />
        </CmsField>
        <CmsField label="Related stays (slugs, one per line)" hint="e.g. hilton-fiji">
          <CmsTextarea value={relatedSlugs} onChange={(e) => setRelatedSlugs(e.target.value)} rows={3} />
        </CmsField>
        <CmsField label="Sort order">
          <CmsTextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </CmsField>
        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Featured on Places to Stay
        </label>
      </div>
      <SeoEditor value={seoState} onChange={setSeoState} />
      <CmsFormActions
        saving={saving}
        error={error}
        onDelete={initial?.id ? handleDelete : undefined}
        submitLabel={initial?.id ? "Save changes" : "Create accommodation"}
      />
    </form>
  );
}
