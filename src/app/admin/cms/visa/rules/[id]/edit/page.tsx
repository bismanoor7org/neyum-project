import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { VisaRuleForm } from "@/components/cms/forms/VisaRuleForm";
import { getVisaRuleById } from "@/server/services/visa-intelligence.service";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditVisaRulePage({ params }: PageProps) {
  const { id } = await params;
  let row;
  try {
    row = await getVisaRuleById(id);
  } catch {
    notFound();
  }
  if (!row) notFound();

  return (
    <>
      <PageHeader
        title={`Edit rule — ${row.nationality.name}`}
        subtitle="Changes publish to the live visa assistant immediately."
      />
      <VisaRuleForm
        initial={{
          id: row.id,
          nationalityId: row.nationalityId,
          visaType: row.visaType,
          stayDuration: row.stayDuration,
          processingTime: row.processingTime,
          entryType: row.entryType,
          entryConditions: row.entryConditions,
          notes: row.notes,
          recommendations:
            row.recommendations &&
            typeof row.recommendations === "object" &&
            !Array.isArray(row.recommendations)
              ? (row.recommendations as {
                  bestSeason: string;
                  popularResorts: string[];
                  avgBudget: string;
                  suggestedItinerary: string;
                })
              : null,
        }}
      />
    </>
  );
}
