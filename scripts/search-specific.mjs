import { readFileSync } from "fs";

const used = new Set();
for (const m of readFileSync("src/lib/images.ts", "utf8").matchAll(/u\("([^"]+)"/g)) used.add(m[1]);

const q = [
  "fiji waterfall",
  "fiji tavoro falls",
  "fiji river rafting",
  "fiji kokoda fish",
  "fiji lovo feast",
  "fiji denarau marina",
  "fiji suva city",
  "fiji spa yoga",
];

for (const query of q) {
  const j = await (
    await fetch(
      `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=20`,
    )
  ).json();
  console.log(`--- ${query}`);
  for (const p of j.results || []) {
    const m = p.urls.raw.match(/photo-([^?]+)/);
    if (!m) continue;
    const id = m[1];
    if (used.has(id)) continue;
    const r = await fetch(`https://images.unsplash.com/photo-${id}?w=200`, { method: "HEAD" });
    if (r.ok) console.log(id, (p.alt_description || "").slice(0, 55));
  }
}
