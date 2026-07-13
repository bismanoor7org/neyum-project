"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { TransportType } from "@prisma/client";
import {
  CmsField,
  CmsFormActions,
  CmsSelect,
  CmsTextarea,
  CmsTextInput,
  useCmsFormState,
} from "@/components/cms/forms/CmsFormFields";
import {
  TRANSPORT_CMS_STATUS,
  TRANSPORT_TYPES,
  type TransportCmsStatus,
} from "@/lib/cms/transport-content";
import {
  deleteTransportAction,
  publishTransportAction,
  saveTransportAction,
} from "@/server/actions/cms";

type TransportRecord = {
  id?: string;
  title: string;
  type: TransportType;
  description?: string | null;
  capacity: number;
  price: number | string;
  currency?: string;
  image?: string | null;
  featured?: boolean;
  status?: TransportCmsStatus;
  supplierId?: string;
};

export function TransportForm({
  initial,
  suppliers,
}: {
  initial?: TransportRecord;
  suppliers: { id: string; companyName: string }[];
}) {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [type, setType] = useState<TransportType>(initial?.type ?? "AIRPORT_TRANSFER");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [capacity, setCapacity] = useState(String(initial?.capacity ?? 4));
  const [price, setPrice] = useState(String(initial?.price ?? ""));
  const [currency, setCurrency] = useState(initial?.currency ?? "FJD");
  const [image, setImage] = useState(initial?.image ?? "");
  const [supplierId, setSupplierId] = useState(initial?.supplierId ?? suppliers[0]?.id ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [status, setStatus] = useState<TransportCmsStatus>(initial?.status ?? "DRAFT");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveTransportAction({
      id: initial?.id,
      title,
      type,
      description,
      capacity: Number(capacity) || 1,
      price: Number(price) || 0,
      currency,
      image,
      supplierId: supplierId || undefined,
      featured,
      status,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(`/admin/cms/transport/${result.data.id}/edit`);
    router.refresh();
  }

  async function handlePublish() {
    if (!initial?.id) return;
    setSaving(true);
    const result = await publishTransportAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else {
      setStatus("APPROVED");
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!initial?.id || !confirm("Archive this transport service?")) return;
    setSaving(true);
    const result = await deleteTransportAction(initial.id);
    setSaving(false);
    if (!result.ok) setError(result.error);
    else router.push("/admin/cms/transport");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="admin-card grid gap-4 rounded-xl p-5 md:grid-cols-2">
        <CmsField label="Title *">
          <CmsTextInput value={title} onChange={(e) => setTitle(e.target.value)} required />
        </CmsField>
        <CmsField label="Type">
          <CmsSelect
            value={type}
            onChange={(v) => setType(v as TransportType)}
            options={TRANSPORT_TYPES.map((t) => ({ value: t.value, label: t.label }))}
          />
        </CmsField>
        <CmsField label="Supplier">
          <CmsSelect
            value={supplierId}
            onChange={setSupplierId}
            options={suppliers.map((s) => ({ value: s.id, label: s.companyName }))}
          />
        </CmsField>
        <CmsField label="Capacity">
          <CmsTextInput type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        </CmsField>
        <CmsField label="Price">
          <CmsTextInput type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </CmsField>
        <CmsField label="Currency">
          <CmsTextInput value={currency} onChange={(e) => setCurrency(e.target.value)} />
        </CmsField>
        <CmsField label="Image URL" className="md:col-span-2">
          <CmsTextInput value={image} onChange={(e) => setImage(e.target.value)} />
        </CmsField>
        <CmsField label="Description" className="md:col-span-2">
          <CmsTextarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
        </CmsField>
        <CmsField label="Status">
          <CmsSelect
            value={status}
            onChange={(v) => setStatus(v as TransportCmsStatus)}
            options={TRANSPORT_CMS_STATUS.map((s) => ({ value: s.value, label: s.label }))}
          />
        </CmsField>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          <span className="admin-text-subtle text-sm">Featured</span>
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        {initial?.id && status !== "APPROVED" && (
          <button type="button" disabled={saving} onClick={handlePublish} className="rounded-lg border border-gold/40 px-4 py-2 text-sm font-medium text-gold">
            Publish now
          </button>
        )}
        <CmsFormActions saving={saving} error={error} onDelete={initial?.id ? handleDelete : undefined} />
      </div>
    </form>
  );
}
