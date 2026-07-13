"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CmsField,
  CmsFormActions,
  CmsTextarea,
  useCmsFormState,
} from "@/components/cms/forms/CmsFormFields";
import { saveEntryGuideAction } from "@/server/actions/visa-intelligence";

type EntryGuideRecord = {
  destinationCountry?: string;
  arrivalProcess: string;
  immigrationProcess: string;
  customsInfo: string;
  airportInfo: string;
  healthRequirements: string;
  travelAdvice: string;
};

export function EntryGuideForm({ initial }: { initial?: EntryGuideRecord | null }) {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();
  const [arrivalProcess, setArrivalProcess] = useState(initial?.arrivalProcess ?? "");
  const [immigrationProcess, setImmigrationProcess] = useState(initial?.immigrationProcess ?? "");
  const [customsInfo, setCustomsInfo] = useState(initial?.customsInfo ?? "");
  const [airportInfo, setAirportInfo] = useState(initial?.airportInfo ?? "");
  const [healthRequirements, setHealthRequirements] = useState(initial?.healthRequirements ?? "");
  const [travelAdvice, setTravelAdvice] = useState(initial?.travelAdvice ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveEntryGuideAction({
      destinationCountry: "FJ",
      arrivalProcess,
      immigrationProcess,
      customsInfo,
      airportInfo,
      healthRequirements,
      travelAdvice,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card max-w-3xl space-y-4 rounded-xl p-6">
      <CmsField label="Arrival process">
        <CmsTextarea value={arrivalProcess} onChange={(e) => setArrivalProcess(e.target.value)} rows={4} required />
      </CmsField>
      <CmsField label="Immigration process">
        <CmsTextarea value={immigrationProcess} onChange={(e) => setImmigrationProcess(e.target.value)} rows={4} required />
      </CmsField>
      <CmsField label="Customs information">
        <CmsTextarea value={customsInfo} onChange={(e) => setCustomsInfo(e.target.value)} rows={4} required />
      </CmsField>
      <CmsField label="Airport information">
        <CmsTextarea value={airportInfo} onChange={(e) => setAirportInfo(e.target.value)} rows={4} required />
      </CmsField>
      <CmsField label="Health requirements">
        <CmsTextarea value={healthRequirements} onChange={(e) => setHealthRequirements(e.target.value)} rows={3} required />
      </CmsField>
      <CmsField label="Travel advice">
        <CmsTextarea value={travelAdvice} onChange={(e) => setTravelAdvice(e.target.value)} rows={4} required />
      </CmsField>
      <CmsFormActions saving={saving} error={error} submitLabel="Save entry guide" />
    </form>
  );
}
