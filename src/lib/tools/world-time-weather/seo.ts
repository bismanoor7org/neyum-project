import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/json-ld";
import { TOOL_FAQ, TOOL_PATH } from "./constants";

export function worldTimeWeatherMetadata() {
  return buildPageMetadata({
    title: "World Time & Weather",
    description:
      "Check Fiji time, Fiji weather, global city weather forecasts, world clocks and timezone differences.",
    path: TOOL_PATH,
    keywords: [
      "Fiji time",
      "Fiji weather",
      "world clock",
      "timezone difference",
      "city weather forecast",
      "global weather",
    ],
    imageAlt: "World time and weather for Fiji travel planning",
  });
}

export function worldTimeWeatherJsonLd() {
  return [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Travel Tools", path: "/tools" },
      { name: "World Time & Weather", path: TOOL_PATH },
    ]),
    webPageSchema({
      name: "World Time & Weather",
      description:
        "Check Fiji time, Fiji weather, global city weather forecasts, world clocks and timezone differences.",
      path: TOOL_PATH,
    }),
    faqSchema([...TOOL_FAQ]),
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "World Time & Weather",
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      url: `https://www.fijiluxuryexperiences.com${TOOL_PATH}`,
      description:
        "Live Fiji time and weather with global city search, forecasts, and timezone comparison.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ];
}
