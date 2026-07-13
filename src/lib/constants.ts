export const NAV_LINKS = [
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Experiences" },
  { href: "/places-to-stay", label: "Places to Stay" },
  { href: "/guides", label: "Fiji Guides" },
  { href: "/deals-and-offers", label: "Deals & Offers" },
] as const;

export const LANGUAGES = [
  { code: "EN", label: "English", locale: "en" },
  { code: "FJ", label: "Fijian", locale: "fj" },
  { code: "HI", label: "Hindi", locale: "hi" },
  { code: "ZH", label: "Chinese", locale: "zh" },
  { code: "JA", label: "Japanese", locale: "ja" },
  { code: "KO", label: "Korean", locale: "ko" },
  { code: "FR", label: "French", locale: "fr" },
  { code: "DE", label: "German", locale: "de" },
  { code: "ES", label: "Spanish", locale: "es" },
  { code: "PT", label: "Portuguese", locale: "pt" },
  { code: "IT", label: "Italian", locale: "it" },
  { code: "AR", label: "Arabic", locale: "ar" },
  { code: "RU", label: "Russian", locale: "ru" },
  { code: "TH", label: "Thai", locale: "th" },
  { code: "ID", label: "Indonesian", locale: "id" },
  { code: "MS", label: "Malay", locale: "ms" },
  { code: "NL", label: "Dutch", locale: "nl" },
] as const;

export { HERO_VIDEO, STORY_VIDEO, ABOUT_VIDEO, NATURE_VIDEO } from "@/lib/videos";
export type { SiteVideo } from "@/lib/videos";

export const GUIDE_TABS = [
  { href: "/guides", label: "Travel Guides", icon: "compass" as const },
  { href: "/events", label: "Events", icon: "calendar" as const },
  { href: "/itineraries", label: "Itineraries", icon: "map" as const },
  { href: "/things-to-know", label: "Things to know", icon: "book" as const },
  { href: "/faq", label: "FAQ", icon: "help" as const },
] as const;

export const FOOTER_EXPLORE = [
  { href: "/explore", label: "Explore The World" },
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Experiences" },
  { href: "/places-to-stay", label: "Places to Stay" },
  { href: "/guides", label: "Travel Guides" },
  { href: "/deals-and-offers", label: "Deals & Offers" },
  { href: "/about", label: "About" },
];

export const FOOTER_SUPPORT = [
  { href: "/login", label: "Login" },
  { href: "/contact", label: "Contact Us" },
  { href: "/sitemap", label: "Sitemap" },
  { href: "/privacy", label: "Privacy Statement" },
  { href: "/things-to-know", label: "Travel Advisory" },
];
