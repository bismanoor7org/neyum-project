"use client";

import { useEffect, useState } from "react";
import { AdminButton, PageHeader } from "@/components/admin/ui/AdminUi";
import { useCmsToast } from "@/components/cms/platform/CmsToast";

type Action =
  | "meta"
  | "slug"
  | "faq"
  | "rewrite"
  | "summarize"
  | "alt"
  | "score";

export default function AiStudioPage() {
  const { toast } = useCmsToast();
  const [provider, setProvider] = useState<string>("…");
  const [title, setTitle] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("Fiji luxury");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/v1/admin/cms/ai", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "provider" }),
    })
      .then((r) => r.json())
      .then((j) => setProvider(j.data?.provider ?? "local"))
      .catch(() => setProvider("local"));
  }, []);

  async function run(action: Action) {
    setBusy(true);
    setResult("");
    try {
      const res = await fetch("/api/v1/admin/cms/ai", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          title,
          focusKeyword,
          text,
          contentHtml: text,
          excerpt: text.slice(0, 200),
          slug: title.toLowerCase().replace(/\s+/g, "-"),
          seo: {},
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "AI request failed");
      setResult(JSON.stringify(json.data, null, 2));
      toast({
        title: `AI ${action} ready`,
        description: `Provider: ${json.data?.provider ?? provider}`,
        tone: "success",
      });
    } catch (err) {
      toast({
        title: "AI failed",
        description: err instanceof Error ? err.message : "Error",
        tone: "error",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        title="AI Studio"
        subtitle="Meta, rewrite, summarize, alt text and SEO score. Uses OpenAI/Gemini when keys are set; otherwise local helpers."
      />

      <div className="admin-card mb-4 rounded-xl p-4 text-sm">
        Active provider: <span className="font-semibold text-gold">{provider}</span>
        {provider === "local" && (
          <span className="admin-text-subtle ml-2">
            Set OPENAI_API_KEY or GEMINI_API_KEY for live LLM.
          </span>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="admin-card space-y-3 rounded-xl p-5">
          <input
            className="admin-input h-10 w-full rounded-lg px-3 text-sm"
            placeholder="Title / topic"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="admin-input h-10 w-full rounded-lg px-3 text-sm"
            placeholder="Focus keyword"
            value={focusKeyword}
            onChange={(e) => setFocusKeyword(e.target.value)}
          />
          <textarea
            className="admin-input min-h-40 w-full rounded-lg px-3 py-2 text-sm"
            placeholder="Paste draft copy or HTML…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["meta", "Meta"],
                ["slug", "Slug"],
                ["faq", "FAQs"],
                ["rewrite", "Rewrite"],
                ["summarize", "Summarize"],
                ["alt", "Alt text"],
                ["score", "SEO score"],
              ] as const
            ).map(([action, label]) => (
              <AdminButton
                key={action}
                size="sm"
                variant="secondary"
                disabled={busy}
                onClick={() => void run(action)}
              >
                {label}
              </AdminButton>
            ))}
          </div>
        </div>
        <div className="admin-card rounded-xl p-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Output</p>
          <pre className="max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-lg bg-navy/[0.04] p-3 font-mono text-xs">
            {result || "Run an action to see results."}
          </pre>
        </div>
      </div>
    </>
  );
}
