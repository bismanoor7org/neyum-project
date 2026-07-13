/**
 * Apply semantic Fiji image mappings. Updates src/lib/images.ts only.
 * Run: node scripts/apply-image-fixes.mjs
 */
import { readFileSync, writeFileSync } from "fs";

/** Broken / mismatched slot → replacement photo ID (verified 200) */
const REPLACEMENTS = {
  // Broken URLs
  experienceSunsetCruise: "1730946450222-41c5ce948f37",
  hiking: "1595910825218-c4934349a615",
  guideVisa: "1764555737101-6c9cf9aea376",
  guideFlights: "1776046478783-b9ffb8f496d9",
  dealDenarau: "1654180714269-9667f416a93f",
  dealOverwater: "1756048830711-3e69f12ddf74",
  dealNadiPackage: "1654180709575-8d47ae1b2d80",
  dealSunsetCruise: "1668565891264-2ffa08a2ce58",
  yasawaCard: "1683951443218-850f929b65e4",
  suncoast: "1718152219113-5bcfd04f1c7e",
  weather: "1440561360730-384048528ced",
  newsletterBoat: "1579264670602-3f79420f9dc1",
  bure: "1718152219058-9b7ec5d31671",
  storySuva: "1700809737987-e66be07bc1cf",
  videoPosterMamanuca: "1668565877909-6a83a1c207a0",
  videoPosterCoralCoast: "1731361781110-4569284691b8",
  resortTokoriki: "1654180363018-c5a0a308ae02",
  resortCastaway: "1654180666810-1936b84ab4e3",
  eventMusic: "1675955999592-7399e3ce42ec",
  eventSailing: "1781406050681-17bf0f460dff",
  // Semantic mismatches
  wellness: "1668136008949-26a98b4afc87",
  storyKayak: "1583297016081-23a9753cd364",
  picnic: "1725393325387-07f0d4951528",
  snorkel: "1734343470204-2790c780c8fb",
  sunset: "1649575091763-c6e639496f78",
  village: "1700619769449-fc1ca34a2647",
  guideHealth: "1756048829869-dabbf82ed79a",
  transport: "1579597235560-1f01e9ce31b7",
  supportIsland: "1654180717539-c36da10e173a",
  featuredEvent: "1756450409271-6143eb8375a0",
};

/** Semantic order for things-to-do cards (32 unique, not overlapping main slots) */
const TTD_IDS = [
  "1734343470199-dcef3f2104af", // 0 Beqa Shark Dive
  "1487252333087-c353573e2b7c", // 1 Mamanuca Snorkelling — wait duplicate with experienceSnorkel!
];

// experienceSnorkel uses 1487252333087 - can't use in TTD

const TTD_SEMANTIC = [
  ["1734343470199-dcef3f2104af", "Beqa Shark Dive"],
  ["1734343470204-2790c780c8fb", "Snorkelling — duplicate snorkel key!"],
];

writeFileSync("scripts/_debug.json", JSON.stringify({ REPLACEMENTS }, null, 2));
console.log("draft only — manual merge required");
