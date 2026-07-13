import { NAV_LINKS } from "@/lib/constants";
import { isToolsRoute, TOOLS_HREF } from "@/lib/nav/tools-nav";

function isLinkActive(href: string, activeHref: string | undefined) {
  if (!activeHref) return false;
  if (href === activeHref) return true;
  if (href === "/guides") {
    return (
      activeHref.startsWith("/guides") ||
      ["/events", "/itineraries", "/things-to-know", "/faq"].includes(activeHref)
    );
  }
  if (href === "/events") {
    return activeHref.startsWith("/events");
  }
  return false;
}

/** Resolves which primary nav item owns the sliding underline for the current route */
export function getActiveNavHref(path: string): string | null {
  if (isToolsRoute(path)) return TOOLS_HREF;

  for (const link of NAV_LINKS) {
    if (isLinkActive(link.href, path)) return link.href;
  }

  if (
    path.startsWith("/destinations") ||
    path.startsWith("/places-to-go") ||
    path === "/explore" ||
    path === "/explore-map" ||
    path === "/about"
  ) {
    return "/destinations";
  }
  if (path === "/contact") return "/guides";
  if (path.startsWith("/tours") || path.startsWith("/things-to-do")) {
    return "/tours";
  }
  if (path.startsWith("/places-to-stay")) return "/places-to-stay";
  if (path.startsWith("/deals-and-offers")) return "/deals-and-offers";

  return null;
}
