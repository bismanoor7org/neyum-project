import { PageHeader } from "@/components/admin/ui/AdminUi";
import { VisaRuleForm } from "@/components/cms/forms/VisaRuleForm";

export default function NewVisaRulePage() {
  return (
    <>
      <PageHeader title="Add Visa Rule" subtitle="Define Fiji entry requirements for a nationality." />
      <VisaRuleForm />
    </>
  );
}
