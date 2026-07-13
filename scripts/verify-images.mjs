/**
 * Verify all image URLs + fetch Unsplash alt text for relevance review.
 * Run: npx tsx scripts/verify-images.mjs
 */
import { readFileSync } from "fs";

const imagesTs = readFileSync("src/lib/images.ts", "utf8");

const slots = [];
const re = /(\w+):\s*u\("([^"]+)"[^)]*\)|(\w+):\s*"(\/[^"]+)"/g;
let m;
while ((m = re.exec(imagesTs))) {
  if (m[1]) slots.push({ key: m[1], id: m[2], url: `https://images.unsplash.com/photo-${m[2]}?w=200` });
  else slots.push({ key: m[3], id: m[4], url: m[4], local: true });
}

const arrays = {
  HERO: [...imagesTs.matchAll(/u\("([^"]+)", true\)/g)].map((x) => x[1]),
  SOC: [...imagesTs.matchAll(/homeSocialImages[\s\S]*?u\("([^"]+)"\)/g)].map((x) => x[1]),
  TTD: [],
};
const ttdBlock = imagesTs.match(/THINGS_TO_DO_IMAGES = \[([\s\S]*?)\]/)?.[1] ?? "";
for (const x of ttdBlock.matchAll(/u\("([^"]+)"\)/g)) arrays.TTD.push(x[1]);

async function check(id, label) {
  if (id.startsWith("/")) {
    try {
      const r = await fetch(`http://localhost:3000${id}`, { method: "HEAD" }).catch(() => null);
      return { label, id, ok: true, local: true, alt: "local" };
    } catch {
      return { label, id, ok: true, local: true, alt: "local file" };
    }
  }
  const url = `https://images.unsplash.com/photo-${id}?w=400`;
  try {
    const r = await fetch(url, { method: "HEAD" });
    const ok = r.ok;
    let alt = "";
    try {
      const meta = await fetch(`https://unsplash.com/napi/photos/${id.split("-")[0]}-${id.split("-").slice(1).join("-")}`);
      if (meta.ok) {
        const j = await meta.json();
        alt = j.alt_description || j.description || "";
      }
    } catch {}
    return { label, id, ok, alt };
  } catch (e) {
    return { label, id, ok: false, alt: String(e) };
  }
}

const all = [
  ...slots.map((s) => ({ label: s.key, id: s.id, local: s.local })),
  ...arrays.HERO.map((id, i) => ({ label: `HERO[${i}]`, id })),
  ...arrays.SOC.map((id, i) => ({ label: `SOC[${i}]`, id })),
  ...arrays.TTD.map((id, i) => ({ label: `TTD[${i}]`, id })),
];

const results = [];
for (const item of all) {
  if (item.local) {
    results.push({ ...item, ok: true, alt: "local" });
    continue;
  }
  results.push(await check(item.id, item.label));
  await new Promise((r) => setTimeout(r, 80));
}

const broken = results.filter((r) => !r.ok);
console.log(`\n=== BROKEN (${broken.length}) ===`);
broken.forEach((r) => console.log(r.label, r.id));

console.log(`\n=== ALL SLOTS (${results.length}) ===`);
results.forEach((r) => {
  const status = r.ok ? "OK" : "FAIL";
  console.log(`${status}\t${r.label}\t${r.alt?.slice(0, 70) || ""}`);
});
