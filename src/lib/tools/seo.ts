import { buildPageMetadata } from "@/lib/seo/metadata";

export function toolsHubMetadata() {
  return buildPageMetadata({
    title: "Travel Tools — Visa, Time, Weather & Trip Planning",
    description:
      "Premium Fiji travel tools — visa eligibility, entry guides, local time, weather, currency conversion, trip costs, and budget planning in one hub.",
    path: "/tools",
    keywords: [
      "Fiji travel tools",
      "Fiji visa checker",
      "Fiji time",
      "Fiji weather",
      "Fiji currency converter",
      "Fiji trip cost calculator",
    ],
    imageAlt: "Fiji luxury travel planning tools",
  });
}
