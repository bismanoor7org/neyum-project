import "server-only";

import {
  executeVisaChat,
  generateRuleBasedChatResponse,
} from "@/lib/ai/visa-assistant/engine";
import type { VisaAssistantChatRequest, VisaAssistantChatResponse } from "@/types/visa-assistant";

/** @deprecated Use executeVisaChat — kept for provider fallbacks */
export async function generateChatResponse(
  request: VisaAssistantChatRequest,
): Promise<VisaAssistantChatResponse> {
  return generateRuleBasedChatResponse(request);
}

export { executeVisaChat };
