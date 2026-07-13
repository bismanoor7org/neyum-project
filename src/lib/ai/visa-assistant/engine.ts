import "server-only";

import { buildVisaChatContext } from "@/lib/ai/visa-assistant/context";
import {
  buildSuggestedQuestions,
  formatIntakeContext,
  formatVisaResponse,
} from "@/lib/ai/visa-assistant/formatter";
import { callLLM, getAvailableLLMProviders } from "@/lib/ai/visa-assistant/llm";
import { injectionBlockedReply, sanitizeChatInput } from "@/lib/ai/visa-assistant/security";
import type { VisaAssistantChatRequest, VisaAssistantChatResponse } from "@/types/visa-assistant";

export async function executeVisaChat(
  request: VisaAssistantChatRequest,
): Promise<VisaAssistantChatResponse> {
  const sanitized = sanitizeChatInput(request.message);

  if (sanitized.blocked) {
    if (sanitized.reason === "empty") {
      return {
        reply: "Please enter a question about Fiji visa or entry requirements.",
        suggestedQuestions: buildSuggestedQuestions({
          requirement: null,
          entryGuide: null,
          travelDocuments: null,
          mentionedSlug: null,
          intent: "general",
          destination: "FJ",
          hasData: false,
        }),
      };
    }
    return {
      reply: injectionBlockedReply(),
      suggestedQuestions: [
        "Do Pakistanis need a visa for Fiji?",
        "What documents are required?",
        "Can I travel with my family?",
      ],
    };
  }

  const safeRequest = { ...request, message: sanitized.text };
  const context = await buildVisaChatContext(safeRequest);

  const providers = getAvailableLLMProviders();
  for (const provider of providers) {
    try {
      const reply = await callLLM(provider, context, sanitized.text);
      if (reply && reply.length > 20) {
        const intakeNote = formatIntakeContext(safeRequest.intake);
        const enriched = intakeNote ? `${reply}\n\n*Trip context: ${intakeNote}*` : reply;
        return {
          reply: enriched,
          suggestedQuestions: buildSuggestedQuestions(context),
        };
      }
    } catch {
      continue;
    }
  }

  const ruleBased = formatVisaResponse(context, context.intent);
  const intakeNote = formatIntakeContext(safeRequest.intake);
  const reply = intakeNote ? `${ruleBased}\n\n*Trip context: ${intakeNote}*` : ruleBased;

  return {
    reply,
    suggestedQuestions: buildSuggestedQuestions(context),
  };
}

/** Rule-based response only — no LLM. Used as fallback inside provider chain. */
export async function generateRuleBasedChatResponse(
  request: VisaAssistantChatRequest,
): Promise<VisaAssistantChatResponse> {
  const sanitized = sanitizeChatInput(request.message);
  if (sanitized.blocked) {
    return executeVisaChat(request);
  }

  const context = await buildVisaChatContext({ ...request, message: sanitized.text });
  const ruleBased = formatVisaResponse(context, context.intent);
  const intakeNote = formatIntakeContext(request.intake);
  const reply = intakeNote ? `${ruleBased}\n\n*Trip context: ${intakeNote}*` : ruleBased;

  return {
    reply,
    suggestedQuestions: buildSuggestedQuestions(context),
  };
}
