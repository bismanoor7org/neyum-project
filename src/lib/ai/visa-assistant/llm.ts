import "server-only";

import type { VisaChatContext } from "@/lib/ai/visa-assistant/context";
import { buildVisaSystemPrompt } from "@/lib/ai/visa-assistant/prompt";

const REQUEST_TIMEOUT_MS = 20_000;

export type LLMProviderName = "openai" | "gemini" | "claude";

export type LLMConfig = {
  provider: LLMProviderName;
  apiKey: string;
  model: string;
};

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function callOpenAI(
  config: LLMConfig,
  systemPrompt: string,
  userMessage: string,
): Promise<string | null> {
  const res = await fetchWithTimeout("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.2,
      max_tokens: 600,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!res.ok) return null;

  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return json.choices?.[0]?.message?.content?.trim() ?? null;
}

async function callGemini(
  config: LLMConfig,
  systemPrompt: string,
  userMessage: string,
): Promise<string | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;
  const res = await fetchWithTimeout(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 600 },
    }),
  });

  if (!res.ok) return null;

  const json = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  return json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? null;
}

async function callClaude(
  config: LLMConfig,
  systemPrompt: string,
  userMessage: string,
): Promise<string | null> {
  const res = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": config.apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: 600,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!res.ok) return null;

  const json = (await res.json()) as {
    content?: { type: string; text?: string }[];
  };
  const block = json.content?.find((c) => c.type === "text");
  return block?.text?.trim() ?? null;
}

export function getAvailableLLMProviders(): LLMConfig[] {
  const preferred = (process.env.VISA_AI_PROVIDER ?? "auto").toLowerCase();
  const providers: LLMConfig[] = [];

  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const claudeKey = process.env.ANTHROPIC_API_KEY?.trim();

  const catalog: LLMConfig[] = [];
  if (openAiKey) {
    catalog.push({
      provider: "openai",
      apiKey: openAiKey,
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    });
  }
  if (geminiKey) {
    catalog.push({
      provider: "gemini",
      apiKey: geminiKey,
      model: process.env.GEMINI_MODEL ?? "gemini-2.0-flash",
    });
  }
  if (claudeKey) {
    catalog.push({
      provider: "claude",
      apiKey: claudeKey,
      model: process.env.CLAUDE_MODEL ?? "claude-3-5-haiku-latest",
    });
  }

  if (preferred !== "auto" && preferred !== "mock") {
    const match = catalog.find((p) => p.provider === preferred);
    if (match) providers.push(match);
    for (const p of catalog) {
      if (p.provider !== preferred) providers.push(p);
    }
    return providers;
  }

  return catalog;
}

export async function callLLM(
  config: LLMConfig,
  context: VisaChatContext,
  userMessage: string,
): Promise<string | null> {
  const systemPrompt = buildVisaSystemPrompt(context);

  switch (config.provider) {
    case "openai":
      return callOpenAI(config, systemPrompt, userMessage);
    case "gemini":
      return callGemini(config, systemPrompt, userMessage);
    case "claude":
      return callClaude(config, systemPrompt, userMessage);
    default:
      return null;
  }
}
