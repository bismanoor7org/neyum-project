import { PageHeader } from "@/components/admin/ui/AdminUi";
import { EntryGuideForm } from "@/components/cms/forms/EntryGuideForm";
import { getEntryGuide } from "@/server/services/visa-intelligence.service";

export default async function VisaEntryGuidePage() {
  let guide = null;
  try {
    guide = await getEntryGuide();
  } catch {
    guide = null;
  }

  return (
    <>
      <PageHeader
        title="Fiji Entry Guide"
        subtitle="Arrival, immigration, customs, airports and health — shown in the Entry Guide flow."
      />
      <EntryGuideForm initial={guide} />
    </>
  );
}
