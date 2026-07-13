"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { VisaType } from "@prisma/client";
import {
  CmsField,
  CmsFormActions,
  CmsSelect,
  CmsTextarea,
  CmsTextInput,
  useCmsFormState,
} from "@/components/cms/forms/CmsFormFields";
import { saveVisaRuleAction } from "@/server/actions/visa-intelligence";

const VISA_TYPES: { value: VisaType; label: string }[] = [
  { value: "VISA_FREE", label: "Visa Free" },
  { value: "VISA_ON_ARRIVAL", label: "Visa On Arrival" },
  { value: "EVISA", label: "eVisa" },
  { value: "VISA_REQUIRED", label: "Visa Required" },
];

type CountryOption = { id: string; name: string; slug: string };

type VisaRuleRecord = {
  id?: string;
  nationalityId: string;
  destinationCountry?: string;
  visaType: VisaType;
  stayDuration: string;
  processingTime: string;
  entryType?: string | null;
  entryConditions?: string | null;
  notes?: string | null;
  recommendations?: {
    bestSeason: string;
    popularResorts: string[];
    avgBudget: string;
    suggestedItinerary: string;
  } | null;
};

export function VisaRuleForm({ initial }: { initial?: VisaRuleRecord }) {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [nationalityId, setNationalityId] = useState(initial?.nationalityId ?? "");
  const [visaType, setVisaType] = useState<VisaType>(initial?.visaType ?? "VISA_ON_ARRIVAL");
  const [stayDuration, setStayDuration] = useState(initial?.stayDuration ?? "");
  const [processingTime, setProcessingTime] = useState(initial?.processingTime ?? "");
  const [entryType, setEntryType] = useState(initial?.entryType ?? "");
  const [entryConditions, setEntryConditions] = useState(initial?.entryConditions ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [bestSeason, setBestSeason] = useState(initial?.recommendations?.bestSeason ?? "");
  const [avgBudget, setAvgBudget] = useState(initial?.recommendations?.avgBudget ?? "");
  const [suggestedItinerary, setSuggestedItinerary] = useState(
    initial?.recommendations?.suggestedItinerary ?? "",
  );
  const [popularResorts, setPopularResorts] = useState(
    (initial?.recommendations?.popularResorts ?? []).join("\n"),
  );

  useEffect(() => {
    fetch("/api/v1/admin/cms/visa?section=countries", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setCountries(j.data?.items ?? j.items ?? []))
      .catch(() => setCountries([]));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveVisaRuleAction({
      id: initial?.id,
      nationalityId,
      destinationCountry: "FJ",
      visaType,
      stayDuration,
      processingTime,
      entryType: entryType || null,
      entryConditions: entryConditions || null,
      notes: notes || null,
      recommendations: bestSeason
        ? {
            bestSeason,
            avgBudget,
            suggestedItinerary,
            popularResorts: popularResorts.split("\n").map((s) => s.trim()).filter(Boolean),
          }
        : null,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/admin/cms/visa/rules");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card max-w-3xl space-y-4 rounded-xl p-6">
      <CmsField label="Nationality">
        <CmsSelect
          value={nationalityId}
          onChange={setNationalityId}
          options={countries.map((c) => ({ value: c.id, label: c.name }))}
        />
      </CmsField>
      <CmsField label="Visa type">
        <CmsSelect
          value={visaType}
          onChange={(v) => setVisaType(v as VisaType)}
          options={VISA_TYPES.map((t) => ({ value: t.value, label: t.label }))}
        />
      </CmsField>
      <CmsField label="Stay duration">
        <CmsTextInput value={stayDuration} onChange={(e) => setStayDuration(e.target.value)} required />
      </CmsField>
      <CmsField label="Processing time">
        <CmsTextInput value={processingTime} onChange={(e) => setProcessingTime(e.target.value)} required />
      </CmsField>
      <CmsField label="Entry type">
        <CmsTextInput value={entryType} onChange={(e) => setEntryType(e.target.value)} />
      </CmsField>
      <CmsField label="Entry conditions">
        <CmsTextarea value={entryConditions} onChange={(e) => setEntryConditions(e.target.value)} rows={3} />
      </CmsField>
      <CmsField label="Notes">
        <CmsTextarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
      </CmsField>
      <CmsField label="Best season">
        <CmsTextInput value={bestSeason} onChange={(e) => setBestSeason(e.target.value)} />
      </CmsField>
      <CmsField label="Average budget">
        <CmsTextInput value={avgBudget} onChange={(e) => setAvgBudget(e.target.value)} />
      </CmsField>
      <CmsField label="Suggested itinerary">
        <CmsTextInput value={suggestedItinerary} onChange={(e) => setSuggestedItinerary(e.target.value)} />
      </CmsField>
      <CmsField label="Popular resorts (one per line)">
        <CmsTextarea value={popularResorts} onChange={(e) => setPopularResorts(e.target.value)} rows={4} />
      </CmsField>
      <CmsFormActions saving={saving} error={error} submitLabel={initial?.id ? "Save visa rule" : "Add visa rule"} />
    </form>
  );
}
