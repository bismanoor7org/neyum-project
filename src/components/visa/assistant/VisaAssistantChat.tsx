"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import type { VisaAssistantChatResponse, VisaAssistantIntake } from "@/types/visa-assistant";
import { VisaGlassCard } from "@/components/visa/assistant/VisaGlassCard";
import { cn } from "@/lib/utils";

type VisaAssistantChatProps = {
  intake?: Partial<VisaAssistantIntake>;
  nationalitySlug?: string;
};

type Message = { id: string; role: "user" | "assistant"; content: string };

const STARTERS = [
  "Do Pakistanis need a visa for Fiji?",
  "What documents are required?",
  "Can I travel with my family?",
  "How much money should I show?",
];

export function VisaAssistantChat({ intake, nationalitySlug }: VisaAssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Bula! I'm your AI Fiji Visa Consultant. Ask me anything about entry requirements, documents, or family travel.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(STARTERS);
  const listRef = useRef<HTMLDivElement>(null);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text.trim() };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setLoading(true);

      try {
        let reply: VisaAssistantChatResponse;
        try {
          const res = await fetch("/api/v1/visa-assistant", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "chat",
              message: text.trim(),
              nationalitySlug: nationalitySlug ?? intake?.nationality?.slug,
              intake,
            }),
          });
          reply = res.ok
            ? await res.json()
            : {
                reply: "Visa assistant is temporarily unavailable. Please try again.",
                suggestedQuestions: STARTERS,
              };
        } catch {
          reply = {
            reply: "Visa assistant is temporarily unavailable. Please try again.",
            suggestedQuestions: STARTERS,
          };
        }

        setMessages((m) => [
          ...m,
          { id: crypto.randomUUID(), role: "assistant", content: reply.reply },
        ]);
        if (reply.suggestedQuestions) setSuggestions(reply.suggestedQuestions);
      } finally {
        setLoading(false);
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
      }
    },
    [intake, nationalitySlug],
  );

  return (
    <VisaGlassCard className="flex h-[480px] flex-col overflow-hidden !p-0">
      <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4">
        <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/25 to-gold/8 ring-1 ring-gold/25">
          <Bot className="h-4 w-4 text-gold" aria-hidden />
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
        </span>
        <div>
          <p className="text-sm font-semibold text-navy">AI Travel Consultant</p>
          <p className="flex items-center gap-1.5 text-[11px] text-foreground/45">
            <Sparkles className="h-3 w-3 text-gold" aria-hidden />
            Instant visa intelligence
          </p>
        </div>
      </div>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                msg.role === "user" ? "visa-chat-bubble-user" : "visa-chat-bubble-ai",
              )}
            >
              {msg.content}
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex items-center gap-2 text-xs text-foreground/40">
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:300ms]" />
            </span>
            Consultant is typing…
          </div>
        )}
      </div>

      <div className="border-t border-[var(--border)] px-4 py-3">
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {suggestions.slice(0, 3).map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              className="rounded-full border border-[var(--border)] bg-cream/60 px-3 py-1 text-[11px] text-navy/75 transition-all hover:border-gold/30 hover:bg-gold/8 hover:text-gold"
            >
              {q}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Fiji visa requirements…"
            className="min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm transition-all focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/12"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold text-navy shadow-[0_4px_12px_rgba(197,164,78,0.3)] transition-all hover:brightness-105 disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </VisaGlassCard>
  );
}
