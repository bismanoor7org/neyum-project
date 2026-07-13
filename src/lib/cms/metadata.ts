import type { Metadata } from "next";
import type { SeoPayload } from "@/lib/cms/types";
import { buildPageMetadata } from "@/lib/seo/metadata";

type BuildCmsMetadataInput = {
  path: string;
  fallback: {
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    keywords?: string[];
  };
  seo?: SeoPayload | null;
};

/** Merge CMS SEO record with sensible fallbacks for dynamic pages */
export function buildCmsPageMetadata({
  path,
  fallback,
  seo,
}: BuildCmsMetadataInput): Metadata {
  const title = seo?.metaTitle?.trim() || fallback.title;
  const description = seo?.metaDescription?.trim() || fallback.description;
  const image = seo?.ogImage?.trim() || fallback.image;
  const canonical = seo?.canonicalUrl?.trim() || path;

  return buildPageMetadata({
    title,
    description,
    path: canonical.startsWith("http") ? new URL(canonical).pathname : canonical,
    keywords: fallback.keywords,
    image,
    imageAlt: fallback.imageAlt ?? title,
    noIndex: seo?.noIndex,
  });
}
