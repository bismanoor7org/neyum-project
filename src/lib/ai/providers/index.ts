import { MockVisaAssistantProvider } from "@/lib/ai/providers/mock-provider";
import { OpenAIVisaAssistantProvider } from "@/lib/ai/providers/openai-provider";
import { GeminiVisaAssistantProvider } from "@/lib/ai/providers/gemini-provider";
import { ClaudeVisaAssistantProvider } from "@/lib/ai/providers/claude-provider";
import { getAvailableLLMProviders } from "@/lib/ai/visa-assistant/llm";
import type { VisaAssistantAIProvider, AIProviderName } from "@/lib/ai/providers/types";

export type { AIProviderConfig, AIProviderName, VisaAssistantAIProvider } from "@/lib/ai/providers/types";

/** Resolve the best available provider — auto-detects API keys when VISA_AI_PROVIDER=auto or mock. */
export function resolveAIProvider(): VisaAssistantAIProvider {
  const configured = (process.env.VISA_AI_PROVIDER ?? "auto").toLowerCase() as AIProviderName | "auto";
  const available = getAvailableLLMProviders();

  if (configured === "openai" && available.some((p) => p.provider === "openai")) {
    return new OpenAIVisaAssistantProvider();
  }
  if (configured === "gemini" && available.some((p) => p.provider === "gemini")) {
    return new GeminiVisaAssistantProvider();
  }
  if (configured === "claude" && available.some((p) => p.provider === "claude")) {
    return new ClaudeVisaAssistantProvider();
  }

  if (configured === "auto" || configured === "mock") {
    const first = available[0];
    if (first?.provider === "openai") return new OpenAIVisaAssistantProvider();
    if (first?.provider === "gemini") return new GeminiVisaAssistantProvider();
    if (first?.provider === "claude") return new ClaudeVisaAssistantProvider();
    return new MockVisaAssistantProvider();
  }

  switch (configured) {
    case "openai":
      return new OpenAIVisaAssistantProvider();
    case "gemini":
      return new GeminiVisaAssistantProvider();
    case "claude":
      return new ClaudeVisaAssistantProvider();
    default:
      return new MockVisaAssistantProvider();
  }
}
