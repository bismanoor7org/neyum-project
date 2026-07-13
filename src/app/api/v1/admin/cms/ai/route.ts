import { apiHandler, jsonOk } from "@/server/api/handler";
import { z } from "zod";
import {
  generateFaqFromContent,
  generateMetaDescription,
  generateMetaTitle,
  generateSlugSuggestion,
  keywordDensity,
  scoreSeo,
} from "@/lib/cms/seo-intelligence";
import { llmComplete, llmProviderLabel } from "@/server/services/cms-wp/ai-llm.service";

const bodySchema = z.object({
  action: z.enum([
    "meta",
    "slug",
    "faq",
    "score",
    "density",
    "rewrite",
    "summarize",
    "alt",
    "provider",
  ]),
  title: z.string().optional(),
  excerpt: z.string().optional(),
  contentHtml: z.string().optional(),
  slug: z.string().optional(),
  focusKeyword: z.string().optional(),
  seo: z.record(z.string(), z.unknown()).optional(),
  text: z.string().optional(),
});

const LUXURY_SYSTEM =
  "You write concise luxury Fiji travel copy for My Fiji Tour. No Tourism Fiji slogans. Keep tone editorial and premium.";

export const POST = apiHandler(async ({ request }) => {
  const body = bodySchema.parse(await request.json());
  const provider = llmProviderLabel();

  if (body.action === "provider") {
    return jsonOk({ provider });
  }

  switch (body.action) {
    case "meta": {
      const llm = await llmComplete(
        `Write a meta title (≤60 chars) and meta description (≤155 chars) for: ${body.title || "Untitled"}. Focus keyword: ${body.focusKeyword || "Fiji"}. Excerpt: ${body.excerpt || ""}. Reply as JSON {"metaTitle":"...","metaDescription":"..."}`,
        LUXURY_SYSTEM,
      );
      if (llm) {
        try {
          const parsed = JSON.parse(llm.replace(/```json|```/g, "").trim()) as {
            metaTitle?: string;
            metaDescription?: string;
          };
          if (parsed.metaTitle && parsed.metaDescription) {
            return jsonOk({ ...parsed, provider });
          }
        } catch {
          /* fall through */
        }
      }
      return jsonOk({
        metaTitle: generateMetaTitle(body.title || "Untitled", body.focusKeyword),
        metaDescription: generateMetaDescription(body.excerpt || "", body.title || "Untitled"),
        provider,
      });
    }
    case "slug":
      return jsonOk({
        slug: generateSlugSuggestion(body.title || body.text || "untitled"),
        provider,
      });
    case "faq": {
      const llm = await llmComplete(
        `Generate 4 FAQ Q&A pairs as JSON array [{"q":"...","a":"..."}] about: ${body.title}. Content: ${(body.contentHtml || "").slice(0, 2000)}`,
        LUXURY_SYSTEM,
      );
      if (llm) {
        try {
          const faqs = JSON.parse(llm.replace(/```json|```/g, "").trim());
          if (Array.isArray(faqs)) return jsonOk({ faqs, provider });
        } catch {
          /* fall through */
        }
      }
      return jsonOk({
        faqs: generateFaqFromContent(body.title || "This experience", body.contentHtml || ""),
        provider,
      });
    }
    case "score":
      return jsonOk({
        ...scoreSeo({
          title: body.title,
          excerpt: body.excerpt,
          contentHtml: body.contentHtml,
          slug: body.slug,
          focusKeyword: body.focusKeyword,
          seo: body.seo as never,
        }),
        provider,
      });
    case "density":
      return jsonOk({
        density: keywordDensity(body.contentHtml || "", body.focusKeyword || ""),
        provider,
      });
    case "rewrite": {
      const llm = await llmComplete(
        `Rewrite this luxury travel copy, keep meaning, improve flow:\n\n${body.text || ""}`,
        LUXURY_SYSTEM,
      );
      return jsonOk({
        text:
          llm ||
          (body.text || "")
            .replace(/\s+/g, " ")
            .replace(/\bi\b/gi, "we")
            .trim(),
        provider,
      });
    }
    case "summarize": {
      const plain = (body.contentHtml || body.text || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const llm = await llmComplete(
        `Summarize in 1–2 sentences for a luxury Fiji travel site:\n\n${plain.slice(0, 3000)}`,
        LUXURY_SYSTEM,
      );
      return jsonOk({
        summary: llm || plain.slice(0, 220) + (plain.length > 220 ? "…" : ""),
        provider,
      });
    }
    case "alt": {
      const llm = await llmComplete(
        `Write a short accessibility alt text for a Fiji travel image titled: ${body.title || "Fiji"}`,
        LUXURY_SYSTEM,
      );
      return jsonOk({
        altText: llm || `${body.title || "Fiji"} — editorial travel photography`,
        provider,
      });
    }
    default:
      return Response.json({ ok: false, error: "Unknown action" }, { status: 400 });
  }
}, "cms:write");
