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
import type { DealContentJson } from "@/lib/cms/deal-content";
import type { SeoPayload } from "@/lib/cms/types";
import {
  DEAL_PACKAGE_TAG_OPTIONS,
  DEAL_URGENCY_OPTIONS,
} from "@/lib/content/deal-helpers";
import type { DealPackageTag, DealUrgencyKind } from "@/lib/content/deals";
import {
  deleteDealAction,
  publishDealAction,
  saveDealAction,
} from "@/server/actions/cms-extended";

type DealRecord = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  price: string;
  priceNote?: string | null;
  image?: string | null;
  category?: "PACKAGE" | "ACCOMMODATION" | "EXPERIENCE";
  includes?: string[];
  featured?: boolean;
  status?: ContentStatus;
  sortOrder?: number;
  content?: DealContentJson | null;
  packageDestination?: string | null;
  resortName?: string | null;
  duration?: string | null;
  travelDates?: string | null;
  bookBeforeDate?: string | null;
  bonusValue?: string | null;
  resortCredit?: string | null;
  includedFlights?: boolean;
  includedTransfers?: boolean;
  includedMeals?: string | null;
  includedActivities?: string[];
  packageTags?: string[];
};

const CATEGORIES = [
  { value: "PACKAGE", label: "Package Deals" },
  { value: "ACCOMMODATION", label: "Accommodation" },
  { value: "EXPERIENCE", label: "Experiences" },
] as const;

const INCLUSION_TOGGLES = [
  ["Flights included", "flightsIncluded"],
  ["Airport transfers", "transfersIncluded"],
  ["Breakfast included", "breakfastIncluded"],
  ["All inclusive", "allInclusive"],
  ["Kids stay free", "kidsStayFree"],
  ["Kids eat free", "kidsEatFree"],
  ["Family package", "familyPackage"],
  ["Honeymoon package", "honeymoonPackage"],
  ["Luxury collection", "luxuryCollection"],
  ["Free cancellation", "freeCancellation"],
  ["Instant confirmation", "instantConfirmation"],
] as const;

export function DealForm({ initial, seo }: { initial?: DealRecord; seo?: SeoPayload }) {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();
  const content = (initial?.content ?? {}) as DealContentJson;
  const packageDetail = content.packageDetail ?? {};

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [priceNote, setPriceNote] = useState(initial?.priceNote ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [category, setCategory] = useState<"PACKAGE" | "ACCOMMODATION" | "EXPERIENCE">(
    initial?.category ?? "PACKAGE",
  );
  const [includes, setIncludes] = useState(listToLines(initial?.includes));
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [status, setStatus] = useState<ContentStatus>(initial?.status ?? "DRAFT");
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [seoState, setSeoState] = useState<SeoPayload>(seo ?? {});

  const [destination, setDestination] = useState(
    initial?.packageDestination ?? content.destination ?? "",
  );
  const [resortName, setResortName] = useState(initial?.resortName ?? content.resortName ?? "");
  const [nights, setNights] = useState(String(content.nights ?? ""));
  const [duration, setDuration] = useState(initial?.duration ?? content.duration ?? "");
  const [travelWindow, setTravelWindow] = useState(content.travelWindow ?? "");
  const [travelDates, setTravelDates] = useState(
    initial?.travelDates ?? packageDetail.travelDates ?? content.travelDates ?? "",
  );
  const [bookBeforeDate, setBookBeforeDate] = useState(
    initial?.bookBeforeDate ?? content.bookBeforeDate ?? content.bookBefore ?? "",
  );
  const [resortCredit, setResortCredit] = useState(
    initial?.resortCredit ?? content.resortCredit ?? "",
  );
  const [bonusValue, setBonusValue] = useState(initial?.bonusValue ?? content.bonusValue ?? "");
  const [originalPrice, setOriginalPrice] = useState(content.originalPrice ?? "");
  const [discountLabel, setDiscountLabel] = useState(content.discountLabel ?? "");
  const [urgency, setUrgency] = useState<DealUrgencyKind | "">(content.urgency ?? "");
  const [spotsLeft, setSpotsLeft] = useState(String(content.spotsLeft ?? ""));
  const [packageTags, setPackageTags] = useState<DealPackageTag[]>(
    (initial?.packageTags?.length ? initial.packageTags : content.packageTags) as DealPackageTag[] ?? [],
  );
  const [includedTours, setIncludedTours] = useState(
    listToLines(content.valueBlock?.includedTours ?? (content.freeExcursions ? [content.freeExcursions] : [])),
  );
  const [includedExperiences, setIncludedExperiences] = useState(
    listToLines(
      content.valueBlock?.includedExperiences ??
        (content.complimentaryActivities ? [content.complimentaryActivities] : []),
    ),
  );
  const [includedTransportation, setIncludedTransportation] = useState(
    listToLines(content.valueBlock?.includedTransportation ?? packageDetail.transportation),
  );
  const [highlights, setHighlights] = useState(
    listToLines(content.highlights ?? packageDetail.highlights),
  );
  const [overview, setOverview] = useState(packageDetail.overview ?? "");
  const [exclusions, setExclusions] = useState(listToLines(packageDetail.exclusions));
  const [roomTypes, setRoomTypes] = useState(listToLines(packageDetail.roomTypes));
  const [activities, setActivities] = useState(
    listToLines(initial?.includedActivities ?? packageDetail.activities),
  );
  const [transportation, setTransportation] = useState(listToLines(packageDetail.transportation));

  const [inclusionFlags, setInclusionFlags] = useState<Record<string, boolean>>({
    flightsIncluded: initial?.includedFlights ?? content.flightsIncluded ?? false,
    transfersIncluded: initial?.includedTransfers ?? content.transfersIncluded ?? false,
    breakfastIncluded: content.breakfastIncluded ?? initial?.includedMeals === "breakfast",
    allInclusive: content.allInclusive ?? initial?.includedMeals === "all_inclusive",
    kidsStayFree: content.kidsStayFree ?? false,
    kidsEatFree: content.kidsEatFree ?? false,
    familyPackage: content.familyPackage ?? false,
    honeymoonPackage: content.honeymoonPackage ?? false,
    luxuryCollection: content.luxuryCollection ?? false,
    freeCancellation: content.freeCancellation ?? false,
    instantConfirmation: content.instantConfirmation ?? false,
  });

  function togglePackageTag(tag: DealPackageTag) {
    setPackageTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function toggleInclusion(key: string, checked: boolean) {
    setInclusionFlags((prev) => ({ ...prev, [key]: checked }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const activityList = linesToList(activities);
    const contentPayload: DealContentJson = {
      nights: nights ? Number(nights) : undefined,
      destination: destination || undefined,
      resortName: resortName || undefined,
      duration: duration || (nights ? `${nights} nights` : undefined),
      travelWindow: travelWindow || undefined,
      travelDates: travelDates || undefined,
      bookBeforeDate: bookBeforeDate || undefined,
      bookBefore: bookBeforeDate || undefined,
      resortCredit: resortCredit || undefined,
      bonusValue: bonusValue || undefined,
      originalPrice: originalPrice || undefined,
      discountLabel: discountLabel || undefined,
      urgency: urgency || undefined,
      spotsLeft: spotsLeft ? Number(spotsLeft) : undefined,
      packageTags: packageTags.length ? packageTags : undefined,
      flightsIncluded: inclusionFlags.flightsIncluded,
      transfersIncluded: inclusionFlags.transfersIncluded,
      breakfastIncluded: inclusionFlags.breakfastIncluded,
      allInclusive: inclusionFlags.allInclusive,
      kidsStayFree: inclusionFlags.kidsStayFree,
      kidsEatFree: inclusionFlags.kidsEatFree,
      familyPackage: inclusionFlags.familyPackage,
      honeymoonPackage: inclusionFlags.honeymoonPackage,
      luxuryCollection: inclusionFlags.luxuryCollection,
      freeCancellation: inclusionFlags.freeCancellation,
      instantConfirmation: inclusionFlags.instantConfirmation,
      highlights: linesToList(highlights),
      valueBlock: {
        bonusValue: bonusValue || undefined,
        resortCredit: resortCredit || undefined,
        includedTours: linesToList(includedTours),
        includedExperiences: linesToList(includedExperiences),
        includedTransportation: linesToList(includedTransportation),
      },
      packageDetail: {
        overview: overview || undefined,
        travelDates: travelDates || undefined,
        exclusions: linesToList(exclusions),
        roomTypes: linesToList(roomTypes),
        activities: activityList,
        transportation: linesToList(transportation),
        highlights: linesToList(highlights),
      },
    };

    const result = await saveDealAction({
      id: initial?.id,
      title,
      slug,
      description,
      location,
      price,
      priceNote,
      image,
      category,
      includes: linesToList(includes),
      featured,
      status,
      sortOrder: Number(sortOrder) || 0,
      content: contentPayload,
      packageDestination: destination || undefined,
      resortName: resortName || undefined,
      duration: duration || (nights ? `${nights} nights` : undefined),
      travelDates: travelDates || travelWindow || undefined,
      bookBeforeDate: bookBeforeDate || undefined,
      bonusValue: bonusValue || undefined,
      resortCredit: resortCredit || undefined,
      includedFlights: inclusionFlags.flightsIncluded,
      includedTransfers: inclusionFlags.transfersIncluded,
      includedMeals: inclusionFlags.allInclusive
        ? "all_inclusive"
        : inclusionFlags.breakfastIncluded
          ? "breakfast"
          : undefined,
      includedActivities: activityList,
      packageTags,
      seo: seoState,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(`/admin/cms/deals/${result.data.id}/edit`);
    router.refresh();
  }

  async function handlePublish() {
    if (!initial?.id) return;
    setSaving(true);
    const result = await publishDealAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else {
      setStatus("PUBLISHED");
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!initial?.id || !confirm("Delete this deal?")) return;
    setSaving(true);
    const result = await deleteDealAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else router.push("/admin/cms/deals");
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
        <CmsField label="Deal title *">
          <CmsTextInput value={title} onChange={(e) => setTitle(e.target.value)} required />
        </CmsField>
        <CmsField label="URL slug">
          <CmsTextInput value={slug} onChange={(e) => setSlug(e.target.value)} />
        </CmsField>
        <CmsField label="Category">
          <select
            className="admin-input w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </CmsField>
        <CmsField label="Location *">
          <CmsTextInput value={location} onChange={(e) => setLocation(e.target.value)} required />
        </CmsField>
        <CmsField label="Price *">
          <CmsTextInput value={price} onChange={(e) => setPrice(e.target.value)} placeholder="FJD 1,200" required />
        </CmsField>
        <CmsField label="Price note">
          <CmsTextInput value={priceNote} onChange={(e) => setPriceNote(e.target.value)} placeholder="per person · 5 nights" />
        </CmsField>
        <CmsField label="Description *" className="md:col-span-2">
          <CmsTextarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required />
        </CmsField>
        <CmsImageField label="Deal image" value={image} onChange={setImage} className="md:col-span-2" />
        <CmsField label="Includes (one per line)" className="md:col-span-2">
          <CmsTextarea value={includes} onChange={(e) => setIncludes(e.target.value)} rows={4} />
        </CmsField>
        <CmsField label="Sort order">
          <CmsTextInput type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </CmsField>
        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Featured deal
        </label>
      </div>

      {category === "PACKAGE" ? (
        <>
          <div className="admin-card space-y-4 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground">Package information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <CmsField label="Destination">
                <CmsTextInput value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Mamanuca Islands" />
              </CmsField>
              <CmsField label="Resort name">
                <CmsTextInput value={resortName} onChange={(e) => setResortName(e.target.value)} placeholder="Likuliku Lagoon Resort" />
              </CmsField>
              <CmsField label="Nights">
                <CmsTextInput type="number" value={nights} onChange={(e) => setNights(e.target.value)} placeholder="5" />
              </CmsField>
              <CmsField label="Duration label">
                <CmsTextInput value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="5 nights / 6 days" />
              </CmsField>
              <CmsField label="Travel dates">
                <CmsTextInput value={travelDates} onChange={(e) => setTravelDates(e.target.value)} placeholder="Valid 1 Oct 2025 – 31 May 2026" />
              </CmsField>
              <CmsField label="Travel window (card summary)">
                <CmsTextInput value={travelWindow} onChange={(e) => setTravelWindow(e.target.value)} placeholder="Travel Oct 2025 – May 2026" />
              </CmsField>
              <CmsField label="Book before date">
                <CmsTextInput value={bookBeforeDate} onChange={(e) => setBookBeforeDate(e.target.value)} placeholder="30 Jun 2026" />
              </CmsField>
              <CmsField label="Original price">
                <CmsTextInput value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="FJD 2,699" />
              </CmsField>
              <CmsField label="Savings label">
                <CmsTextInput value={discountLabel} onChange={(e) => setDiscountLabel(e.target.value)} placeholder="Save 19%" />
              </CmsField>
            </div>
          </div>

          <div className="admin-card space-y-4 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground">Package inclusions</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {INCLUSION_TOGGLES.map(([label, key]) => (
                <label key={key} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={inclusionFlags[key] ?? false}
                    onChange={(e) => toggleInclusion(key, e.target.checked)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div className="admin-card space-y-4 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground">Value block</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <CmsField label="Resort credit">
                <CmsTextInput value={resortCredit} onChange={(e) => setResortCredit(e.target.value)} placeholder="FJD 500 resort credit" />
              </CmsField>
              <CmsField label="Bonus value">
                <CmsTextInput value={bonusValue} onChange={(e) => setBonusValue(e.target.value)} placeholder="FJD 1,200 bonus inclusions" />
              </CmsField>
              <CmsField label="Included tours (one per line)">
                <CmsTextarea value={includedTours} onChange={(e) => setIncludedTours(e.target.value)} rows={3} />
              </CmsField>
              <CmsField label="Included experiences (one per line)">
                <CmsTextarea value={includedExperiences} onChange={(e) => setIncludedExperiences(e.target.value)} rows={3} />
              </CmsField>
              <CmsField label="Included transportation (one per line)" className="md:col-span-2">
                <CmsTextarea value={includedTransportation} onChange={(e) => setIncludedTransportation(e.target.value)} rows={3} />
              </CmsField>
            </div>
          </div>

          <div className="admin-card space-y-4 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground">Promotional tags & urgency</h2>
            <div className="flex flex-wrap gap-2">
              {DEAL_PACKAGE_TAG_OPTIONS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => togglePackageTag(tag)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    packageTags.includes(tag)
                      ? "border-gold bg-gold/15 text-navy"
                      : "border-foreground/15 text-foreground/60 hover:border-gold/40"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <CmsField label="Urgency">
                <select
                  className="admin-input w-full"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as DealUrgencyKind | "")}
                >
                  <option value="">None</option>
                  {DEAL_URGENCY_OPTIONS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </CmsField>
              <CmsField label="Packages remaining">
                <CmsTextInput type="number" value={spotsLeft} onChange={(e) => setSpotsLeft(e.target.value)} placeholder="6" />
              </CmsField>
            </div>
          </div>

          <div className="admin-card space-y-4 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground">Package detail content</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <CmsField label="Package highlights (one per line)" className="md:col-span-2">
                <CmsTextarea value={highlights} onChange={(e) => setHighlights(e.target.value)} rows={3} />
              </CmsField>
              <CmsField label="Package overview" className="md:col-span-2">
                <CmsTextarea value={overview} onChange={(e) => setOverview(e.target.value)} rows={4} />
              </CmsField>
              <CmsField label="Exclusions (one per line)">
                <CmsTextarea value={exclusions} onChange={(e) => setExclusions(e.target.value)} rows={4} />
              </CmsField>
              <CmsField label="Room types (one per line)">
                <CmsTextarea value={roomTypes} onChange={(e) => setRoomTypes(e.target.value)} rows={4} />
              </CmsField>
              <CmsField label="Activities (one per line)">
                <CmsTextarea value={activities} onChange={(e) => setActivities(e.target.value)} rows={4} />
              </CmsField>
              <CmsField label="Transportation (one per line)">
                <CmsTextarea value={transportation} onChange={(e) => setTransportation(e.target.value)} rows={4} />
              </CmsField>
            </div>
          </div>
        </>
      ) : null}

      <SeoEditor value={seoState} onChange={setSeoState} />
      <CmsFormActions
        saving={saving}
        error={error}
        onDelete={initial?.id ? handleDelete : undefined}
        submitLabel={initial?.id ? "Save changes" : "Create deal"}
      />
    </form>
  );
}
