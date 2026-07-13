import "server-only";

import { executeVisaChat } from "@/lib/ai/visa-assistant/engine";
import { buildVisaAssistantAnalysis } from "@/lib/ai/visa-assistant/analyze";
import type { VisaAssistantAIProvider } from "@/lib/ai/providers/types";
import type {
  VisaAssistantAnalysis,
  VisaAssistantChatRequest,
  VisaAssistantChatResponse,
  VisaAssistantIntake,
} from "@/types/visa-assistant";

export class OpenAIVisaAssistantProvider implements VisaAssistantAIProvider {
  readonly name = "openai" as const;

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
