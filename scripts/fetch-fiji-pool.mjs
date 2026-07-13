/**
 * Fetch Fiji Unsplash pool with alt descriptions for image matching.
 * Run: node scripts/fetch-fiji-pool.mjs
 */
import { readFileSync, writeFileSync } from "fs";

const used = new Set();
const t = readFileSync("src/lib/images.ts", "utf8");
for (const m of t.matchAll(/u\("([^"]+)"/g)) used.add(m[1]);

const queries = [
  "fiji sunset cruise sailing",
  "fiji shark diving",
  "fiji snorkelling reef",
  "fiji waterfall taveuni",
  "fiji village culture kava",
  "fiji food lovo kokoda",
  "fiji denarau marina resort",
  "fiji nadi aerial",
  "fiji coral coast beach",
  "fiji suva market city",
  "fiji yasawa lagoon beach",
  "fiji mamanuca island turquoise",
  "fiji overwater bungalow",
  "fiji spa wellness yoga",
  "fiji yacht sailing island",
  "fiji rainforest hiking",
  "fiji fire walking ceremony",
  "fiji resort pool luxury",
  "fiji island hopping boat",
  "fiji romantic couple beach",
];

const pool = new Map();

for (const q of queries) {
  for (let page = 1; page <= 2; page++) {
    const r = await fetch(
      `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=30&page=${page}`,
    );
    const j = await r.json();
    for (const photo of j.results || []) {
      const m = photo.urls?.raw?.match(/photo-([^?]+)/);
      if (!m) continue;
      const id = m[1];
      if (used.has(id) || pool.has(id)) continue;
      pool.set(id, {
        id,
        alt: photo.alt_description || photo.description || "",
        query: q,
      });
    }
    await new Promise((r) => setTimeout(r, 200));
  }
}

// Verify URLs work
const verified = [];
for (const [id, meta] of pool) {
  try {
    const r = await fetch(`https://images.unsplash.com/photo-${id}?w=200`, { method: "HEAD" });
    if (r.ok) verified.push(meta);
  } catch {}
}

verified.sort((a, b) => a.query.localeCompare(b.query));
console.log(`Pool: ${verified.length} unused working Fiji images`);
verified.forEach((v) => console.log(`${v.id}\t${v.query}\t${v.alt.slice(0, 60)}`));

writeFileSync(
  "scripts/fiji-pool.json",
  JSON.stringify(verified, null, 2),
);
