import type { VisaAssistantAnalysis, VisaAssistantIntake } from "@/types/visa-assistant";
import type { VisaDocumentId } from "@/types/visa";

/** Browser-safe — calls the visa assistant API only. */
export async function analyzeVisaViaApi(
  intake: VisaAssistantIntake,
  checkedDocuments: VisaDocumentId[] = [],
): Promise<VisaAssistantAnalysis | null> {
  const res = await fetch("/api/v1/visa-assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "analyze", intake, checkedDocuments }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      typeof json.error === "string" ? json.error : "Visa analysis failed. Please try again.",
    );
  }
  return json.analysis ?? null;
}
