/**
 * Build TTD array from semantic candidates, avoiding all used IDs.
 */
import { readFileSync, writeFileSync } from "fs";

const REPLACEMENTS = {
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
  wellness: "1668136008949-26a98b4afc87",
  storyKayak: "1583297016081-23a9753cd364",
  picnic: "1725393325387-07f0d4951528",
  snorkel: "1734343470204-2790c780c8fb",
  sunset: "1649575091763-c6e639496f78",
  village: "1700619769449-fc1ca34a2647",
  guideHealth: "1756048829869-dabbf82ed79a",
  transport: "1668565858550-61ca2c9eed27",
  supportIsland: "1654180717539-c36da10e173a",
  featuredEvent: "1756450409271-6143eb8375a0",
};

const SOC_FIX = {
  1: "1668062572946-136123620ac1",
  5: "1668565867790-82c779d61a2d",
};

const content = readFileSync("src/lib/images.ts", "utf8");
const used = new Set();

for (const m of content.matchAll(/u\("([^"]+)"/g)) {
  let id = m[1];
  const key = content.slice(0, m.index).split("\n").pop().match(/(\w+):/)?.[1];
  if (key && REPLACEMENTS[key]) id = REPLACEMENTS[key];
  used.add(id);
}
for (const [k, id] of Object.entries(REPLACEMENTS)) used.add(id);

const heroBlock = content.match(/HOME_HERO_SLIDES = \[([\s\S]*?)\]/)?.[1] ?? "";
for (const m of heroBlock.matchAll(/u\("([^"]+)"/g)) used.add(m[1]);

const socBlock = content.match(/homeSocialImages = \[([\s\S]*?)\]/)?.[1] ?? "";
let socIdx = 0;
for (const m of socBlock.matchAll(/u\("([^"]+)"/g)) {
  used.add(SOC_FIX[socIdx] ?? m[1]);
  socIdx++;
}
for (const id of Object.values(SOC_FIX)) used.add(id);

/** [id, title] semantic mapping for 32 things-to-do cards */
const TTD_WANT = [
  ["1734343470199-dcef3f2104af", "Beqa Shark Dive"], // used by dealSharkDive - DUPLICATE!
];

// Candidates pool (verified working, Fiji-relevant)
const CANDIDATES = [
  "1583297016081-23a9753cd364",
  "1734343470204-2790c780c8fb",
  "1654180654390-3a87c21e1266",
  "1654180635272-13fc4be2ecf3",
  "1700619769449-fc1ca34a2647",
  "1700619769671-83fafd40be79",
  "1718152219095-8f9fc28f5b66",
  "1731978242542-3e2e0585a2a7",
  "1725393325387-07f0d4951528",
  "1718152219058-9b7ec5d31671",
  "1731978242562-2dbc589ce5a3",
  "1731978242605-f35ada228a5c",
  "1679966519774-bcefa8da9bce",
  "1595910825218-c4934349a615",
  "1730440009654-05bd2dc6c05a",
  "1730440009900-f8988fb5b306",
  "1656042246835-e2fb93fb4a76",
  "1579264670573-d6d70b68ab4c",
  "1730946450176-0d2206dd796b",
  "1706066954162-d557cc64a163",
  "1730946450222-41c5ce948f37",
  "1756048830711-3e69f12ddf74",
  "1654180666810-1936b84ab4e3",
  "1718152220002-6708fe3894a5",
  "1668136008949-26a98b4afc87",
  "1654180674774-45dbe0b3bdca",
  "1700619769904-3e2bedeb2c51",
  "1730946483509-5973b21e90ad",
  "1654180444273-958864814bb4",
  "1718152220045-4283a8fe5c34",
  "1781406050681-17bf0f460dff",
  "1668565891264-2ffa08a2ce58",
  "1579597235560-1f01e9ce31b7",
  "1654180602748-4e65954678e0",
  "1700631102725-7194689f7075",
  "1756048830256-2717e6c41597",
  "1756048830258-440461f4c47a",
  "1718152220071-dc4396f654fc",
  "1731361781050-30687808a70d",
  "1594068217043-26028fb5b0c8",
  "1731361781030-5f352d712e76",
  "1628181870585-379169471d83",
  "1731980755566-9c4c65273eb7",
  "1572811227797-5e08bd51e56c",
  "1730440010018-01f55450914f",
  "1579264670616-271de0d18144",
  "1731978242553-24ffff6924fb",
  "1642105599452-02810c4684ac",
  "1683951916403-32dcb8ffaead",
  "1718152219059-130e2b7936d0",
  "1730946450229-d88c11bb83e7",
  "1633948220832-08f1cce6440b",
  "1730440009959-0bd16c8bc8cc",
  "1668565864272-f7054c1a9c57",
  "1731978242502-408ad1120075",
  "1651725791384-0d314fd4fcda",
  "1718152220111-6e1208d984bc",
  "1756048830148-6d3a8c803e4a",
  "1731978242394-2cf33f6bd53c",
  "1668565873827-4b7bbfa0a79a",
  "1605923908021-de225858a51e",
  "1555758897-bdb880473c5c",
  "1700616270774-c49913d89a3c",
  "1731978242540-8f5b98b58df5",
  "1731978242553-54093e3f93a4",
  "1654180635272-13fc4be2ecf3",
];

const titles = [
  "Beqa Lagoon Shark Dive",
  "Mamanuca Snorkelling & Kayaking",
  "Yasawa Scuba Diving",
  "Navua Rafting, Ziplining & Surf",
  "Traditional Fijian Village Tours",
  "Kava Ceremony Experiences",
  "Meke Dance Performances",
  "Suva Municipal Market & Crafts",
  "Kokoda — Fiji's Signature Dish",
  "Traditional Lovo Feast",
  "Beachfront Seafood Dining",
  "Nadi Markets & Resort Dining",
  "Bouma National Heritage Park",
  "Tavoro Waterfalls",
  "Rainbow Reef Coral Gardens",
  "Yasawa Blue Lagoons & Marine Reserves",
  "Denarau Family Resorts",
  "Natadola Safe Lagoon Beaches",
  "Kula Wild Wildlife Park",
  "Mamanuca Family Island Days",
  "Sunset Cruises for Couples",
  "Likuliku Overwater Bures",
  "Private Sandbank Dinners",
  "Turtle Island Honeymoon",
  "Oceanfront Yoga at Dawn",
  "Traditional Bobo Massage",
  "Luxury Island Spa Retreats",
  "Reef Meditation & Island Relaxation",
  "Mamanuca Island Hopping",
  "Yasawa Flyer Sailing",
  "Private Yacht Charters",
  "Luxury Catamaran Sunset Sails",
];

// Manual best-match order from candidates NOT in used
const free = CANDIDATES.filter((id) => !used.has(id));
console.log("Free candidates:", free.length);

const TTD_PICK = [
  "1583297016126-171661ade4e5", // will verify - actually bad
];

// Build programmatically: take first 32 free that work
const ttd = [];
for (const id of CANDIDATES) {
  if (used.has(id) || ttd.includes(id)) continue;
  ttd.push(id);
  if (ttd.length === 32) break;
}

console.log("TTD picked", ttd.length);
ttd.forEach((id, i) => console.log(i, titles[i], id));

if (ttd.length < 32) {
  console.error("Need more candidates!");
  process.exit(1);
}

writeFileSync(
  "scripts/ttd-mapping.json",
  JSON.stringify({ ttd, titles: titles.map((t, i) => ({ i, title: t, id: ttd[i] })) }, null, 2),
);
