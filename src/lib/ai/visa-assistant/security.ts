import "server-only";

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
  /disregard\s+(your\s+)?(system|instructions|rules)/i,
  /you\s+are\s+now\s+/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /act\s+as\s+(a\s+)?(different|new)/i,
  /system\s*prompt/i,
  /jailbreak/i,
  /<\s*script/i,
  /```\s*system/i,
];

const MAX_MESSAGE_LENGTH = 500;

export type SanitizedInput = {
  text: string;
  blocked: boolean;
  reason?: string;
};

export function sanitizeChatInput(message: string): SanitizedInput {
  const trimmed = message
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);

  if (!trimmed) {
    return { text: "", blocked: true, reason: "empty" };
  }

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(trimmed)) {
      return { text: trimmed, blocked: true, reason: "injection" };
    }
  }

  return { text: trimmed, blocked: false };
}

export function injectionBlockedReply(): string {
  return [
    "I can only answer questions about **Fiji visa and entry requirements** using our verified database.",
    "",
    "Please ask about visa eligibility, documents, family travel, or entry rules for your nationality.",
  ].join("\n");
}
