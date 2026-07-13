import { buildPageMetadata } from "@/lib/seo/metadata";
import { FIJI_TIME_FAQ, TOOL_PATH } from "./constants";

export function fijiTimeMetadata() {
  return buildPageMetadata({
    title: "Fiji Time Now",
    description:
      "Live Fiji Standard Time for Suva, Nadi, and resort regions — real-time clock with IANA Pacific/Fiji timezone.",
    path: TOOL_PATH,
    keywords: ["Fiji time", "Fiji timezone", "Fiji Standard Time", "Pacific/Fiji"],
    imageAlt: "Current Fiji time and timezone",
  });
}

export function fijiTimeJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Fiji Time",
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      url: `https://www.fijiluxuryexperiences.com${TOOL_PATH}`,
      description: "Live Fiji Standard Time with IANA timezone support.",
    },
    ...FIJI_TIME_FAQ.map((item) => ({
      "@context": "https://schema.org",
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  ];
}
