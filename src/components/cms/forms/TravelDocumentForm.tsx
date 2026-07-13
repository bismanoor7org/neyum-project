"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CmsField,
  CmsFormActions,
  CmsSelect,
  CmsTextInput,
  useCmsFormState,
} from "@/components/cms/forms/CmsFormFields";
import { saveTravelDocumentAction } from "@/server/actions/visa-intelligence";

type CountryOption = { id: string; name: string };

export function TravelDocumentForm() {
  const router = useRouter();
  const { saving, setSaving, error, setError } = useCmsFormState();
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [nationalityId, setNationalityId] = useState("");
  const [passportValidity, setPassportValidity] = useState("6 months beyond intended stay");
  const [returnTicketRequired, setReturnTicketRequired] = useState(true);
  const [hotelBookingRequired, setHotelBookingRequired] = useState(true);
  const [proofOfFundsRequired, setProofOfFundsRequired] = useState(false);
  const [insuranceRequired, setInsuranceRequired] = useState(false);
  const [passportPhotosRequired, setPassportPhotosRequired] = useState(false);
  const [bankStatementRequired, setBankStatementRequired] = useState(false);

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
    const result = await saveTravelDocumentAction({
      nationalityId,
      passportValidity,
      returnTicketRequired,
      hotelBookingRequired,
      proofOfFundsRequired,
      insuranceRequired,
      passportPhotosRequired,
      bankStatementRequired,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card max-w-2xl space-y-4 rounded-xl p-6">
      <CmsField label="Nationality">
        <CmsSelect
          value={nationalityId}
          onChange={setNationalityId}
          options={countries.map((c) => ({ value: c.id, label: c.name }))}
        />
      </CmsField>
      <CmsField label="Passport validity requirement">
        <CmsTextInput value={passportValidity} onChange={(e) => setPassportValidity(e.target.value)} required />
      </CmsField>
      {[
        ["Return ticket required", returnTicketRequired, setReturnTicketRequired],
        ["Hotel booking required", hotelBookingRequired, setHotelBookingRequired],
        ["Proof of funds required", proofOfFundsRequired, setProofOfFundsRequired],
        ["Travel insurance required", insuranceRequired, setInsuranceRequired],
        ["Passport photos required", passportPhotosRequired, setPassportPhotosRequired],
        ["Bank statement required", bankStatementRequired, setBankStatementRequired],
      ].map(([label, value, setter]) => (
        <label key={label as string} className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={value as boolean}
            onChange={(e) => (setter as (v: boolean) => void)(e.target.checked)}
            className="rounded border-[#cbd5e1]"
          />
          {label as string}
        </label>
      ))}
      <CmsFormActions saving={saving} error={error} submitLabel="Save travel requirements" />
    </form>
  );
}
