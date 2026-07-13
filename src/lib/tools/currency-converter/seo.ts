import { buildPageMetadata } from "@/lib/seo/metadata";

export const TOOL_PATH = "/tools/currency-converter" as const;

export function currencyConverterMetadata() {
  return buildPageMetadata({
    title: "Currency Converter",
    description:
      "Convert to and from Fijian dollars with live exchange rates — FJD, USD, AUD, GBP, EUR, and major world currencies.",
    path: TOOL_PATH,
    keywords: ["Fiji currency", "FJD converter", "Fiji dollar exchange rate"],
    imageAlt: "Fiji currency converter",
  });
}

export function currencyConverterJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Currency Converter",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: `https://www.fijiluxuryexperiences.com${TOOL_PATH}`,
      description: "Live currency conversion with FJD support.",
    },
  ];
}
