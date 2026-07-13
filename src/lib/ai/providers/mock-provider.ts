import "server-only";

import { buildVisaAssistantAnalysis } from "@/lib/ai/visa-assistant/analyze";
import { executeVisaChat } from "@/lib/ai/visa-assistant/engine";
import type { VisaAssistantAIProvider } from "@/lib/ai/providers/types";
import type {
  VisaAssistantAnalysis,
  VisaAssistantChatRequest,
  VisaAssistantChatResponse,
  VisaAssistantIntake,
} from "@/types/visa-assistant";

export class MockVisaAssistantProvider implements VisaAssistantAIProvider {
  readonly name = "mock" as const;

  async analyze(intake: VisaAssistantIntake): Promise<VisaAssistantAnalysis> {
    const analysis = await buildVisaAssistantAnalysis(intake);
    if (!analysis) {
      throw new Error("Unable to analyse visa requirements for selected nationality");
    }
    return analysis;
  }

  async chat(request: VisaAssistantChatRequest): Promise<VisaAssistantChatResponse> {
    return executeVisaChat(request);
  }
}

/** Server-side chat via provider */
export async function chatWithVisaAssistant(
  request: VisaAssistantChatRequest,
): Promise<VisaAssistantChatResponse> {
  const { resolveAIProvider } = await import("@/lib/ai/providers");
  const provider = resolveAIProvider();
  return provider.chat(request);
}
