import { readFileSync } from "fs";

const t = readFileSync("src/lib/images.ts", "utf8");
const used = new Set();
for (const m of t.matchAll(/u\("([^"]+)"/g)) used.add(m[1]);

const REPLACE = [
  "1487252333087-c353573e2b7c",
  "1730946450222-41c5ce948f37",
  "1634045634161-b842d46ed840",
];

const queries = [
  ["snorkel", "fiji snorkelling turquoise coral reef mamanuca"],
  ["sunset", "fiji luxury sunset catamaran sail denarau"],
  ["waterfall", "fiji taveuni waterfall rainforest"],
  ["village", "fiji village culture ceremony coral coast"],
];

for (const [label, q] of queries) {
  console.log(`\n=== ${label} ===`);
  const j = await (
    await fetch(
      `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=30`,
    )
  ).json();
  for (const p of j.results || []) {
    const id = p.urls.raw.match(/photo-([^?]+)/)[1];
    if (used.has(id) && !REPLACE.includes(id)) continue;
    const r = await fetch(`https://images.unsplash.com/photo-${id}?w=600`, { method: "HEAD" });
    if (!r.ok) continue;
    console.log(`${REPLACE.includes(id) ? "[current] " : ""}${id} | ${(p.alt_description || "").slice(0, 65)}`);
  }
}
