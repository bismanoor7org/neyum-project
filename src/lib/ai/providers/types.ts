import type {
  VisaAssistantAnalysis,
  VisaAssistantChatRequest,
  VisaAssistantChatResponse,
  VisaAssistantIntake,
} from "@/types/visa-assistant";

export type AIProviderName = "mock" | "openai" | "gemini" | "claude";

export interface AIProviderConfig {
  provider: AIProviderName;
  apiKey?: string;
  model?: string;
}

export interface VisaAssistantAIProvider {
  readonly name: AIProviderName;
  analyze(intake: VisaAssistantIntake): Promise<VisaAssistantAnalysis>;
  chat(request: VisaAssistantChatRequest): Promise<VisaAssistantChatResponse>;
}
