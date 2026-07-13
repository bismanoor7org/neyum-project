import { readFileSync, writeFileSync } from "fs";

const used = new Set();
for (const m of readFileSync("src/lib/images.ts", "utf8").matchAll(/u\("([^"]+)"/g)) used.add(m[1]);

const queries = [
  "fiji denarau marina yacht",
  "fiji suva capital city",
  "fiji taveuni waterfall",
  "fiji yasawa islands beach",
  "fiji mamanuca turquoise",
  "fiji coral coast natadola",
  "fiji resort luxury pool",
  "fiji traditional bure",
  "fiji food seafood dining",
  "fiji scuba diving underwater",
  "fiji white water rafting",
  "fiji spa massage",
  "fiji yoga beach",
  "fiji market produce",
  "fiji meke dance",
  "fiji island aerial",
  "fiji catamaran",
  "fiji wildlife birds",
  "fiji golf resort",
  "fiji airport travel",
  "fiji pacific harbour",
  "fiji likuliku resort",
];

const pool = new Map();
for (const q of queries) {
  for (let p = 1; p <= 2; p++) {
    const j = await (
      await fetch(
        `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=30&page=${p}`,
      )
    ).json();
    for (const photo of j.results || []) {
      const m = photo.urls?.raw?.match(/photo-([^?]+)/);
      if (!m) continue;
      const id = m[1];
      if (used.has(id) || pool.has(id)) continue;
      pool.set(id, { id, alt: photo.alt_description || "", q });
    }
    await new Promise((r) => setTimeout(r, 150));
  }
}

const verified = [];
for (const meta of pool.values()) {
  try {
    const r = await fetch(`https://images.unsplash.com/photo-${meta.id}?w=200`, { method: "HEAD" });
    if (r.ok) verified.push(meta);
  } catch {}
}

verified.sort((a, b) => a.q.localeCompare(b.q));
console.log("extra", verified.length);
verified.forEach((v) => console.log(`${v.id}\t${v.q}\t${v.alt.slice(0, 55)}`));
writeFileSync("scripts/fiji-pool-extra.json", JSON.stringify(verified, null, 2));
