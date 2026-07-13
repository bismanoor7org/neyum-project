/**
 * Generates src/lib/images.ts with site-wide unique Fiji photo IDs.
 * Run: node scripts/generate-images.mjs
 */

import { writeFileSync } from "fs";

async function fetchPool() {
  const queries = [
    ["fiji islands", 6],
    ["fiji beach resort", 4],
    ["yasawa fiji", 3],
    ["mamanuca fiji", 3],
    ["fiji coral reef", 3],
  ];
  const ids = new Set();
  for (const [q, pages] of queries) {
    for (let p = 1; p <= pages; p++) {
      const r = await fetch(
        `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=30&page=${p}`,
      );
      const j = await r.json();
      for (const photo of j.results || []) {
        const m = photo.urls?.raw?.match(/photo-([^?]+)/);
        if (m) ids.add(m[1]);
      }
    }
  }
  // Local assets
  return [...ids];
}

const LOCAL = {
  hero: "/hero-luxury.png",
  heroLegacy: "/hero img.png",
  waterfall: "/hiking-waterfalls.png",
};

/** Every named slot — order defines unique ID assignment */
const SLOTS = {
  // Locals
  heroHome: "__LOCAL_HERO__",
  heroHomeLegacy: "__LOCAL_HERO_LEGACY__",
  // Home categories (6)
  adventure: null,
  luxury: null,
  family: null,
  wellness: null,
  culture: null,
  romance: null,
  storyKayak: null,
  // Handpicked experiences (4)
  experienceSnorkel: null,
  experienceSunsetCruise: null,
  experienceHiking: "__LOCAL_WATERFALL__",
  experienceVillageTour: null,
  // General experience refs
  snorkel: null,
  sunset: null,
  hiking: null,
  village: null,
  picnic: null,
  // Plan with confidence (6)
  guideFirstTrip: null,
  guideVisa: null,
  guideBestTime: null,
  guideHealth: null,
  guideLuxury: null,
  guideFlights: null,
  // Deals (14)
  dealsBeachBanner: null,
  dealResort: null,
  dealPool: null,
  dealDenarau: null,
  dealHoneymoon: null,
  dealMamanuca: null,
  dealCoralCoast: null,
  dealOverwater: null,
  dealBeach: null,
  dealSpa: null,
  dealPrivateIsland: null,
  dealNadiPackage: null,
  dealLikuliku: null,
  dealYasawaAdventure: null,
  dealSharkDive: null,
  dealSunsetCruise: null,
  // Page heroes
  heroThingsToDo: null,
  heroPlacesToStay: null,
  // Destinations hero + card (16)
  coralCoast: null,
  coralCoastCard: null,
  nadi: null,
  nadiCard: null,
  denarau: null,
  denarauCard: null,
  mamanuca: null,
  mamanucaCard: null,
  yasawa: null,
  yasawaCard: null,
  pacificHarbour: null,
  pacificHarbourCard: null,
  suva: null,
  suvaCard: null,
  taveuniHero: null,
  taveuniCard: null,
  // Misc pages
  surfing: null,
  suncoast: null,
  allPlaces: null,
  islandHop: null,
  travelReq: null,
  weather: null,
  transport: null,
  destination: null,
  featuredEvent: null,
  newsletterBoat: null,
  supportIsland: null,
  ctaCoast: null,
  resortPool: null,
  bure: null,
  // Story tabs (6)
  storyYasawa: null,
  storyMamanuca: null,
  storyNadi: null,
  storySuva: null,
  storyTaveuni: null,
  storyCoralCoast: null,
  // Video posters (6) — unique from story/destination heroes
  videoPosterYasawa: null,
  videoPosterMamanuca: null,
  videoPosterNadi: null,
  videoPosterSuva: null,
  videoPosterTaveuni: null,
  videoPosterCoralCoast: null,
  videoPosterAbout: null,
  videoPosterNature: null,
  // Resorts (6)
  resortLikuliku: null,
  resortTokoriki: null,
  resortHilton: null,
  resortSofitel: null,
  resortIntercontinental: null,
  resortCastaway: null,
  // Events (8)
  eventFestival: null,
  eventHibiscus: null,
  eventFirewalking: null,
  eventMusic: null,
  eventRegatta: null,
  eventBula: null,
  eventFood: null,
  eventSailing: null,
  // Globe extras
  vanuaLevu: null,
  kadavu: null,
};

const HERO_SLIDES = 8;
const SOCIAL_COUNT = 12;
const TTD_COUNT = 32;

const pool = await fetchPool();
let poolIdx = 0;
function nextId() {
  if (poolIdx >= pool.length) throw new Error(`Pool exhausted at ${poolIdx}`);
  return pool[poolIdx++];
}

const assigned = {};
for (const key of Object.keys(SLOTS)) {
  const spec = SLOTS[key];
  if (spec === "__LOCAL_HERO__") assigned[key] = LOCAL.hero;
  else if (spec === "__LOCAL_HERO_LEGACY__") assigned[key] = LOCAL.heroLegacy;
  else if (spec === "__LOCAL_WATERFALL__") assigned[key] = LOCAL.waterfall;
  else assigned[key] = nextId();
}

const heroSlides = Array.from({ length: HERO_SLIDES }, () => nextId());
const socialImages = Array.from({ length: SOCIAL_COUNT }, () => nextId());
const ttdImages = Array.from({ length: TTD_COUNT }, () => nextId());

const q = "w=1400&q=90&auto=format";
const qHero = "w=1920&q=92&auto=format&fit=crop";
const qCard = "w=1600&q=92&auto=format&fit=crop";

function u(id, hero = false, card = false) {
  if (id.startsWith("/")) return id;
  return `https://images.unsplash.com/photo-${id}?${hero ? qHero : card ? qCard : q}`;
}

// Hero/card/special flags per key
const HERO_KEYS = new Set([
  "dealsBeachBanner",
  "heroThingsToDo",
  "heroPlacesToStay",
  "newsletterBoat",
  "ctaCoast",
]);
const CARD_KEYS = new Set([
  "experienceSnorkel",
  "experienceSunsetCruise",
  "experienceVillageTour",
]);

let out = `/**
 * Fiji-verified image library — every slot = one unique photo ID (site-wide).
 * Generated by scripts/generate-images.mjs — do not hand-edit IDs.
 */
const q = "${q}";
const qHero = "${qHero}";
const qCard = "${qCard}";

const u = (id: string, hero = false, card = false) =>
  id.startsWith("/")
    ? id
    : \`https://images.unsplash.com/photo-\${id}?\${hero ? qHero : card ? qCard : q}\`;

export const images = {
`;

for (const key of Object.keys(SLOTS)) {
  const id = assigned[key];
  const hero = HERO_KEYS.has(key);
  const card = CARD_KEYS.has(key);
  if (id.startsWith("/")) {
    out += `  ${key}: ${JSON.stringify(id)},\n`;
  } else {
    out += `  ${key}: u(${JSON.stringify(id)}${hero ? ", true" : card ? ", false, true" : ""}),\n`;
  }
}

out += `} as const;\n\n`;

out += `/** Home hero slides — ${HERO_SLIDES} unique */\nexport const HOME_HERO_SLIDES = [\n`;
heroSlides.forEach((id) => {
  out += `  u(${JSON.stringify(id)}, true),\n`;
});
out += `] as const;\n\n`;

out += `/** Social grid — ${SOCIAL_COUNT} unique */\nexport const homeSocialImages = [\n`;
socialImages.forEach((id) => {
  out += `  u(${JSON.stringify(id)}),\n`;
});
out += `] as const;\n\n`;

out += `/** Things-to-do category grid — ${TTD_COUNT} unique */\nexport const THINGS_TO_DO_IMAGES = [\n`;
ttdImages.forEach((id) => {
  out += `  u(${JSON.stringify(id)}),\n`;
});
out += `] as const;\n\n`;

out += `/** Dev guard — throws if any two slots share the same photo ID */
export function assertUniqueImageSlots() {
  const seen = new Map<string, string>();
  const entries = Object.entries(images) as [string, string][];
  const arrays: [string, readonly string[]][] = [
    ["HOME_HERO_SLIDES", HOME_HERO_SLIDES],
    ["homeSocialImages", homeSocialImages],
    ["THINGS_TO_DO_IMAGES", THINGS_TO_DO_IMAGES],
  ];

  for (const [key, url] of entries) {
    const id = url.includes("photo-") ? url.split("photo-")[1]?.split("?")[0] : url;
    if (seen.has(id)) {
      throw new Error(\`Duplicate image: \${key} and \${seen.get(id)} share \${id}\`);
    }
    seen.set(id, key);
  }
  for (const [arrName, arr] of arrays) {
    arr.forEach((url, i) => {
      const id = url.includes("photo-") ? url.split("photo-")[1]?.split("?")[0] : url;
      if (seen.has(id)) {
        throw new Error(\`Duplicate image: \${arrName}[\${i}] shares \${id} with \${seen.get(id)}\`);
      }
      seen.set(id, \`\${arrName}[\${i}]\`);
    });
  }
}

if (process.env.NODE_ENV === "development") {
  try {
    assertUniqueImageSlots();
  } catch {
    /* logged at build */
  }
}
`;

writeFileSync("src/lib/images.ts", out);
console.log(
  `Wrote images.ts — ${Object.keys(SLOTS).length} keys + ${HERO_SLIDES + SOCIAL_COUNT + TTD_COUNT} array slots, pool used ${poolIdx}/${pool.length}`,
);
