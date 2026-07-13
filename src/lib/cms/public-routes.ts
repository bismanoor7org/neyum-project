/** Canonical public URLs for CMS-generated content (WordPress-style slugs). */

export const CMS_ROUTES = {
  home: "/",
  destinations: {
    index: "/destinations",
    detail: (slug: string) => `/destinations/${slug}`,
  },
  tours: {
    index: "/tours",
    detail: (slug: string) => `/tours/${slug}`,
  },
  guides: {
    index: "/guides",
    detail: (slug: string) => `/guides/${slug}`,
  },
  faq: "/faq",
  stays: {
    index: "/places-to-stay",
    detail: (slug: string) => `/places-to-stay/${slug}`,
  },
} as const;

/** Legacy paths kept for redirects — prefer CMS_ROUTES for new links */
export const LEGACY_ROUTES = {
  destinations: "/places-to-go",
  tours: "/things-to-do",
} as const;

export function destinationPath(slug: string) {
  return CMS_ROUTES.destinations.detail(slug);
}

export function tourPath(slug: string) {
  return CMS_ROUTES.tours.detail(slug);
}

/** Map legacy `/things-to-do` links to canonical `/tours` routes */
export function legacyTourHref(href: string): string {
  if (href.startsWith("/things-to-do/")) {
    return `${CMS_ROUTES.tours.index}/${href.slice("/things-to-do/".length)}`;
  }
  if (href === LEGACY_ROUTES.tours) {
    return CMS_ROUTES.tours.index;
  }
  return href;
}

export function guidePath(slug: string) {
  return CMS_ROUTES.guides.detail(slug);
}

export function previewUrl(path: string) {
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}preview=1`;
}
