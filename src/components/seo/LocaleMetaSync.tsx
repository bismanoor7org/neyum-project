"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { SITE_NAME } from "@/lib/seo/config";
import { isToolsRoute } from "@/lib/nav/tools-nav";
import type { Messages } from "@/lib/i18n/en";

type SeoKey = keyof Messages["seo"];

function resolveSeoKey(pathname: string): SeoKey | null {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/destinations") || pathname === "/places-to-go") {
    return "destinations";
  }
  if (pathname.startsWith("/tours") || pathname === "/things-to-do") {
    return "tours";
  }
  if (pathname.startsWith("/places-to-stay")) return "placesToStay";
  if (pathname.startsWith("/guides")) return "guides";
  if (pathname.startsWith("/deals-and-offers")) return "deals";
  if (pathname.startsWith("/events")) return "events";
  if (pathname.startsWith("/itineraries")) return "itineraries";
  if (pathname.startsWith("/things-to-know")) return "thingsToKnow";
  if (pathname.startsWith("/faq")) return "faq";
  if (pathname === "/about") return "about";
  if (pathname === "/contact") return "contact";
  if (pathname.startsWith("/explore")) return "explore";
  if (pathname === "/privacy") return "privacy";
  if (pathname === "/sitemap") return "sitemap";
  if (pathname === "/trip-planner") return "tripPlanner";
  if (isToolsRoute(pathname)) return "tools";
  return null;
}

function setMetaTag(name: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Syncs document title and meta description when locale changes (client-side) */
export function LocaleMetaSync() {
  const pathname = usePathname();
  const { t, ready } = useLocale();

  useEffect(() => {
    if (!ready) return;

    const key = resolveSeoKey(pathname);
    if (!key) return;

    const seo = t.seo[key];
    if (!seo) return;

    const pageTitle = key === "home" ? SITE_NAME : `${seo.title} | ${SITE_NAME}`;

    document.title = pageTitle;
    setMetaTag("description", seo.description);
    setMetaTag("og:title", pageTitle, true);
    setMetaTag("og:description", seo.description, true);
    setMetaTag("twitter:title", pageTitle);
    setMetaTag("twitter:description", seo.description);
  }, [pathname, t, ready]);

  return null;
}
