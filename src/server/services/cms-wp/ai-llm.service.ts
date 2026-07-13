/**
 * Optional LLM provider for CMS AI Studio.
 * Falls back to local heuristics when OPENAI_API_KEY / GEMINI_API_KEY are unset.
 */

export async function llmComplete(prompt: string, system?: string): Promise<string | null> {
  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_CMS_MODEL || "gpt-4o-mini",
          messages: [
            ...(system ? [{ role: "system", content: system }] : []),
            { role: "user", content: prompt },
          ],
          temperature: 0.4,
          max_tokens: 800,
        }),
      });
      if (!res.ok) return null;
      const json = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      return json.choices?.[0]?.message?.content?.trim() ?? null;
    } catch {
      return null;
    }
  }

  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (geminiKey) {
    try {
      const model = process.env.GEMINI_CMS_MODEL || "gemini-1.5-flash";
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: system ? `${system}\n\n${prompt}` : prompt }],
              },
            ],
          }),
        },
      );
      if (!res.ok) return null;
      const json = (await res.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      return json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? null;
    } catch {
      return null;
    }
  }

  return null;
}

export function llmProviderLabel(): "openai" | "gemini" | "local" {
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) return "gemini";
  return "local";
}
