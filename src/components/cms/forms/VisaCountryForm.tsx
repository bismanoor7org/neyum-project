"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CmsField,
  CmsFormActions,
  CmsTextInput,
  useCmsFormState,
} from "@/components/cms/forms/CmsFormFields";
import { saveCountryAction } from "@/server/actions/visa-intelligence";

type CountryRecord = {
  id?: string;
  name: string;
  code: string;
  slug: string;
  flag?: string | null;
};

export function VisaCountryForm({ initial }: { initial?: CountryRecord }) {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();
  const [name, setName] = useState(initial?.name ?? "");
  const [code, setCode] = useState(initial?.code ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [flag, setFlag] = useState(initial?.flag ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveCountryAction({
      id: initial?.id,
      name,
      code,
      slug,
      flag: flag || null,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/admin/cms/visa/countries");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card max-w-2xl space-y-4 rounded-xl p-6">
      <CmsField label="Country name">
        <CmsTextInput value={name} onChange={(e) => setName(e.target.value)} required />
      </CmsField>
      <CmsField label="ISO code (2 letters)">
        <CmsTextInput value={code} onChange={(e) => setCode(e.target.value)} maxLength={2} required />
      </CmsField>
      <CmsField label="URL slug">
        <CmsTextInput value={slug} onChange={(e) => setSlug(e.target.value)} required />
      </CmsField>
      <CmsField label="Flag image URL">
        <CmsTextInput
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="https://flagcdn.com/w40/au.png"
        />
      </CmsField>
      <CmsFormActions saving={saving} error={error} submitLabel={initial?.id ? "Save country" : "Add country"} />
    </form>
  );
}
