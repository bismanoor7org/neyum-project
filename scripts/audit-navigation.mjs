#!/usr/bin/env node
/**
 * Navigation audit — compares nav hrefs against App Router pages and content slugs.
 * Run: node scripts/audit-navigation.mjs
 */
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP = join(ROOT, "src/app");

function walkPages(dir, base = "") {
  const routes = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name === "api") continue;
    const segment = name.startsWith("[") && name.endsWith("]") ? `[${name.slice(1, -1)}]` : name;
    const route = `${base}/${segment}`.replace(/\/+/g, "/");
    if (existsSync(join(full, "page.tsx"))) routes.push(route || "/");
    routes.push(...walkPages(full, route));
  }
  return routes;
}

function normalizeRoute(route) {
  return route === "" ? "/" : route;
}

function routeMatches(href, routes) {
  if (routes.includes(href)) return true;
  const parts = href.split("/").filter(Boolean);
  for (const r of routes) {
    const rParts = r.split("/").filter(Boolean);
    if (rParts.length !== parts.length) continue;
    if (rParts.every((p, i) => p.startsWith("[") || p === parts[i])) return true;
  }
  return false;
}

function extractNavHrefsFromSource() {
  const hrefs = new Set();

  // Primary navbar
  const constants = readFileSync(join(ROOT, "src/lib/constants.ts"), "utf8");
  for (const m of constants.matchAll(/href:\s*"([^"]+)"/g)) hrefs.add(m[1]);

  // Compact nav — import dynamically via built slugs from content files
  const destSlugs = [...readFileSync(join(ROOT, "src/lib/content/destinations.ts"), "utf8").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const tourSlugs = [...readFileSync(join(ROOT, "src/lib/content/experiences.ts"), "utf8").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const guideSlugs = [...readFileSync(join(ROOT, "src/lib/content/guides.ts"), "utf8").matchAll(/"([a-z0-9-]+)",\s*"/g)].slice(0, 20).map((m) => m[1]);
  const resortSlugs = [...readFileSync(join(ROOT, "src/lib/content/resorts.ts"), "utf8").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const dealSlugs = [...readFileSync(join(ROOT, "src/lib/content/deals.ts"), "utf8").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

  hrefs.add("/destinations");
  destSlugs.forEach((s) => hrefs.add(`/destinations/${s}`));
  hrefs.add("/tours");
  tourSlugs.forEach((s) => hrefs.add(`/tours/${s}`));
  guideSlugs.forEach((s) => hrefs.add(`/guides/${s}`));
  hrefs.add("/places-to-stay");
  resortSlugs.forEach((s) => hrefs.add(`/places-to-stay/${s}`));
  hrefs.add("/deals-and-offers");
  hrefs.add("/deals-and-offers/package-deals");
  hrefs.add("/deals-and-offers/accommodation");
  hrefs.add("/deals-and-offers/experiences");
  dealSlugs.forEach((s) => hrefs.add(`/deals-and-offers/package-deals/${s}`));

  // Visa nav
  const visaNav = readFileSync(join(ROOT, "src/lib/nav/visa-nav.ts"), "utf8");
  for (const m of visaNav.matchAll(/href:\s*"([^"]+)"/g)) hrefs.add(m[1]);
  for (const m of visaNav.matchAll(/=\s*"(\/[^"]+)"/g)) hrefs.add(m[1]);

  // Trip planner
  hrefs.add("/trip-planner");
  hrefs.add("/traveller/favourites");

  // Utility links in compact nav
  ["/explore", "/explore-map", "/about", "/things-to-know", "/events", "/itineraries", "/faq", "/contact"].forEach((h) => hrefs.add(h));

  return [...hrefs];
}

const allRoutes = walkPages(APP).map(normalizeRoute);
const publicRoutes = allRoutes.filter(
  (r) =>
    !r.startsWith("/admin") &&
    !r.startsWith("/traveller") &&
    !r.startsWith("/supplier") &&
    !r.startsWith("/checkout") &&
    r !== "/login" &&
    r !== "/signup",
);

const navHrefs = extractNavHrefsFromSource();
const connected = navHrefs.filter((h) => routeMatches(h, allRoutes));
const broken = navHrefs.filter((h) => !routeMatches(h, allRoutes));

const primaryPublic = publicRoutes.filter((r) => !r.includes("["));
const inNav = new Set(navHrefs);
const missingFromNav = primaryPublic.filter((r) => {
  if (r === "/") return false;
  if (r.startsWith("/fiji-visa-for/")) return false;
  if (r.startsWith("/explore/")) return false;
  if (r.startsWith("/checkout")) return false;
  return !inNav.has(r) && !navHrefs.some((h) => r.startsWith(h + "/"));
});

const report = `# Navigation Audit Report

Generated: ${new Date().toISOString()}

## Summary

| Metric | Count |
|--------|-------|
| Total App Router pages | ${allRoutes.length} |
| Public marketing routes | ${publicRoutes.length} |
| Nav hrefs audited | ${navHrefs.length} |
| Connected (valid) | ${connected.length} |
| Broken | ${broken.length} |
| Missing from nav | ${missingFromNav.length} |

## Primary Navbar Links

| Label | Href | Status |
|-------|------|--------|
| Destinations | /destinations | ${routeMatches("/destinations", allRoutes) ? "✓" : "✗"} |
| Experiences | /tours | ${routeMatches("/tours", allRoutes) ? "✓" : "✗"} |
| Places to Stay (Collections) | /places-to-stay | ${routeMatches("/places-to-stay", allRoutes) ? "✓" : "✗"} |
| Fiji Guides | /guides | ${routeMatches("/guides", allRoutes) ? "✓" : "✗"} |
| Deals & Offers | /deals-and-offers | ${routeMatches("/deals-and-offers", allRoutes) ? "✓" : "✗"} |

## Destination Mega Menu (${connected.filter((h) => h.startsWith("/destinations/")).length} detail routes)

${connected.filter((h) => h.startsWith("/destinations/")).map((h) => `- ✓ ${h}`).join("\n")}

## Broken Routes

${broken.length ? broken.map((h) => `- ✗ ${h}`).join("\n") : "_None_"}

## Missing Menu Links (public pages not in nav)

${missingFromNav.length ? missingFromNav.map((r) => `- ${r}`).join("\n") : "_None — all primary public pages reachable_"}

## Connected Routes (full list)

${connected.sort().map((h) => `- ${h}`).join("\n")}

## Existing Public Routes

${publicRoutes.sort().map((r) => `- ${r}`).join("\n")}
`;

const outPath = join(ROOT, "docs/NAVIGATION_AUDIT.md");
writeFileSync(outPath, report, "utf8");
console.log(report);
console.log(`\nReport written to ${relative(ROOT, outPath)}`);
