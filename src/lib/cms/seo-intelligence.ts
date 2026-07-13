import type { CmsSeoFields } from "@/lib/cms/wp-types";

export type SeoCheckResult = {
  score: number;
  checks: {
    key: string;
    label: string;
    pass: boolean;
    weight: number;
    hint?: string;
  }[];
};

export function scoreSeo(input: {
  title?: string | null;
  excerpt?: string | null;
  contentHtml?: string | null;
  slug?: string | null;
  seo?: CmsSeoFields | null;
  focusKeyword?: string | null;
}): SeoCheckResult {
  const seo = input.seo ?? {};
  const metaTitle = seo.metaTitle || input.title || "";
  const metaDesc = seo.metaDescription || input.excerpt || "";
  const body = (input.contentHtml || "").replace(/<[^>]+>/g, " ");
  const focus = (input.focusKeyword || "").trim().toLowerCase();

  const checks = [
    {
      key: "title_length",
      label: "SEO title length (30–60)",
      pass: metaTitle.length >= 30 && metaTitle.length <= 60,
      weight: 15,
      hint: `Current: ${metaTitle.length}`,
    },
    {
      key: "desc_length",
      label: "Meta description length (120–160)",
      pass: metaDesc.length >= 120 && metaDesc.length <= 160,
      weight: 15,
      hint: `Current: ${metaDesc.length}`,
    },
    {
      key: "slug",
      label: "Clean slug",
      pass: Boolean(input.slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)),
      weight: 10,
    },
    {
      key: "canonical",
      label: "Canonical URL set",
      pass: Boolean(seo.canonicalUrl),
      weight: 10,
    },
    {
      key: "og",
      label: "Open Graph image",
      pass: Boolean(seo.ogImage),
      weight: 10,
    },
    {
      key: "content_length",
      label: "Body length 300+ words",
      pass: body.trim().split(/\s+/).filter(Boolean).length >= 300,
      weight: 15,
    },
    {
      key: "focus_title",
      label: "Focus keyword in title",
      pass: !focus || metaTitle.toLowerCase().includes(focus),
      weight: 15,
    },
    {
      key: "focus_body",
      label: "Focus keyword in body",
      pass: !focus || body.toLowerCase().includes(focus),
      weight: 10,
    },
  ];

  const earned = checks.filter((c) => c.pass).reduce((s, c) => s + c.weight, 0);
  const total = checks.reduce((s, c) => s + c.weight, 0);
  return { score: Math.round((earned / total) * 100), checks };
}

export function keywordDensity(contentHtml: string, keyword: string): number {
  if (!keyword.trim()) return 0;
  const words = contentHtml.replace(/<[^>]+>/g, " ").toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return 0;
  const key = keyword.toLowerCase().trim();
  const hits = words.filter((w) => w.includes(key)).length;
  return Math.round((hits / words.length) * 10000) / 100;
}

/** Deterministic local AI helpers (no external key required). Swap for OpenAI later. */
export function generateMetaTitle(title: string, focusKeyword?: string): string {
  const base = focusKeyword ? `${focusKeyword}: ${title}` : title;
  return base.slice(0, 60);
}

export function generateMetaDescription(excerpt: string, title: string): string {
  const text = (excerpt || title).replace(/\s+/g, " ").trim();
  if (text.length >= 120 && text.length <= 160) return text;
  const padded = `${text} Discover curated Fiji luxury stays, experiences, and concierge planning.`;
  return padded.slice(0, 155);
}

export function generateSlugSuggestion(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function generateFaqFromContent(title: string, contentHtml: string): { q: string; a: string }[] {
  const plain = contentHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const snippet = plain.slice(0, 180) || "Speak with our Fiji concierge for tailored advice.";
  return [
    { q: `What is ${title}?`, a: snippet },
    { q: `When is the best time to experience ${title}?`, a: "May–October typically offers clearer seas and peak luxury travel conditions in Fiji." },
    { q: `How do I book ${title}?`, a: "Use Plan Your Journey or contact our concierge for a bespoke itinerary." },
  ];
}
