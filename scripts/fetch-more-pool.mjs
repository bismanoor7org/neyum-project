import { readFileSync, writeFileSync } from "fs";

const used = new Set();
for (const m of readFileSync("src/lib/images.ts", "utf8").matchAll(/u\("([^"]+)"/g)) used.add(m[1]);

const queries = [
  "beachcomber fiji",
  "fiji islands aerial",
  "fiji coral reef underwater",
  "fiji traditional ceremony",
  "fiji resort aerial",
  "fiji sailing yacht",
  "fiji tropical beach",
  "fiji rainforest",
  "fiji sunset ocean",
  "fiji overwater villa",
];

const found = [];
for (const q of queries) {
  for (let p = 1; p <= 3; p++) {
    const j = await (
      await fetch(
        `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=30&page=${p}`,
      )
    ).json();
    for (const photo of j.results || []) {
      const m = photo.urls?.raw?.match(/photo-([^?]+)/);
      if (!m) continue;
      const id = m[1];
      if (used.has(id)) continue;
      try {
        const r = await fetch(`https://images.unsplash.com/photo-${id}?w=200`, { method: "HEAD" });
        if (r.ok && !found.some((f) => f.id === id))
          found.push({ id, alt: photo.alt_description || "", q });
      } catch {}
    }
    await new Promise((r) => setTimeout(r, 120));
  }
}

console.log("new", found.length);
found.forEach((f) => console.log(f.id, f.q, f.alt.slice(0, 50)));
writeFileSync("scripts/fiji-pool-more.json", JSON.stringify(found, null, 2));
