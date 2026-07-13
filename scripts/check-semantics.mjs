import { readFileSync } from "fs";
import { images } from "../src/lib/images.ts";

const content = readFileSync("src/lib/images.ts", "utf8");
const keyToId = {};
for (const m of content.matchAll(/(\w+):\s*u\("([^"]+)"/g)) keyToId[m[1]] = m[2];

async function alt(id) {
  const r = await fetch(`https://unsplash.com/napi/photos/${id}`);
  if (!r.ok) return "(no meta)";
  const j = await r.json();
  return j.alt_description || j.description || "";
}

const checks = [
  ["adventure", "Adventure category"],
  ["luxury", "Luxury category"],
  ["family", "Family category"],
  ["wellness", "Wellness category"],
  ["culture", "Culture category"],
  ["romance", "Romance category"],
  ["storyKayak", "Diving guide (misnamed slot)"],
  ["experienceSnorkel", "Snorkelling experience"],
  ["experienceSunsetCruise", "Sunset cruise"],
  ["experienceVillageTour", "Village tour"],
  ["nadi", "Nadi hero"],
  ["nadiCard", "Nadi card"],
  ["denarau", "Denarau hero"],
  ["denarauCard", "Denarau card"],
  ["coralCoast", "Coral Coast hero"],
  ["suva", "Suva hero"],
  ["suvaCard", "Suva card"],
  ["pacificHarbour", "Pacific Harbour"],
  ["taveuniHero", "Taveuni hero"],
  ["yasawa", "Yasawa hero"],
  ["mamanuca", "Mamanuca hero"],
  ["guideLuxury", "Luxury guide"],
  ["picnic", "Food/picnic"],
  ["eventFood", "Food event"],
];

for (const [key, label] of checks) {
  const id = keyToId[key];
  if (!id) continue;
  const a = await alt(id);
  console.log(`${label}: ${a.slice(0, 70)}`);
  await new Promise((r) => setTimeout(r, 100));
}
