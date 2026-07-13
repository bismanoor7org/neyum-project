/**
 * Full image audit — uniqueness, local files, remote HTTP status
 * Run: node scripts/audit-images.mjs
 */
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imagesTs = readFileSync(join(root, "src/lib/images.ts"), "utf8");
const heroGen = readFileSync(join(root, "src/lib/hero-images.generated.ts"), "utf8");

const extractUrls = (src) => {
  const urls = [];
  const re = /(?:u\("[^"]+"[^)]*\)|"(?:\/[^"]+|https:\/\/[^"]+)")/g;
  let m;
  while ((m = re.exec(src))) {
    const chunk = m[0];
    if (chunk.startsWith('u("')) {
      const id = chunk.match(/u\("([^"]+)"/)?.[1];
      if (id) {
        const hero = chunk.includes("true");
        const card = chunk.includes("false, true");
        const q = hero ? "w=1920&q=92" : card ? "w=1600&q=92" : "w=1400&q=90";
        urls.push(`https://images.unsplash.com/photo-${id}?${q}&auto=format&fit=crop`);
      }
    } else {
      const s = chunk.slice(1, -1);
      if (s.startsWith("/") || s.startsWith("http")) urls.push(s);
    }
  }
  return urls;
};

const heroUrls = [...heroGen.matchAll(/src:\s*"([^"]+)"/g)].map((m) => m[1]);
const allUrls = [...new Set([...extractUrls(imagesTs), ...heroUrls])];

const idOf = (url) =>
  url.includes("photo-") ? url.split("photo-")[1].split("?")[0] : url;

const byId = new Map();
for (const url of allUrls) {
  const id = idOf(url);
  if (!byId.has(id)) byId.set(id, []);
  byId.get(id).push(url);
}
const dups = [...byId.entries()].filter(([, u]) => u.length > 1);

console.log("=== IMAGE AUDIT ===");
console.log("Total unique URLs:", allUrls.length);
console.log("Duplicate photo IDs:", dups.length);
for (const [id, urls] of dups) {
  console.log(`  DUP ${id}:`);
  urls.forEach((u) => console.log(`    ${u}`));
}

const local = allUrls.filter((u) => u.startsWith("/"));
const remote = allUrls.filter((u) => u.startsWith("http"));

console.log("\n--- Local files ---");
const missingLocal = [];
for (const u of local) {
  const path = join(root, "public", u.replace(/^\//, ""));
  const ok = existsSync(path);
  if (!ok) missingLocal.push(u);
  console.log(`${ok ? "OK" : "MISSING"} ${u}`);
}

console.log("\n--- Remote HEAD check (sample batch) ---");
const failed = [];
const slow = [];
for (let i = 0; i < remote.length; i++) {
  const url = remote[i];
  const t0 = Date.now();
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    const ms = Date.now() - t0;
    if (!res.ok) failed.push({ url, status: res.status });
    else if (ms > 3000) slow.push({ url, ms });
    if ((i + 1) % 20 === 0) process.stdout.write(`  checked ${i + 1}/${remote.length}\n`);
  } catch (e) {
    failed.push({ url, status: e.message });
  }
}

console.log(`Remote checked: ${remote.length}`);
console.log(`Failed: ${failed.length}`);
failed.forEach((f) => console.log(`  FAIL ${f.status} ${f.url}`));
console.log(`Slow (>3s): ${slow.length}`);

// Check unused hero images on disk
const heroDir = join(root, "public/assets/hero-images");
const diskHero = ["fiji-00.jpg","fiji-01.jpg","fiji-02.jpg","fiji-03.jpg","fiji-04.jpg","fiji-05.jpg"];
const usedHero = new Set(heroUrls.map((u) => u.split("/").pop()));
console.log("\n--- Hero images on disk vs used ---");
for (const f of diskHero) {
  const onDisk = existsSync(join(heroDir, f));
  const used = usedHero.has(f);
  if (onDisk && !used) console.log(`  UNUSED on disk: ${f}`);
  if (used && !onDisk) console.log(`  MISSING on disk: ${f}`);
}

if (dups.length === 0 && missingLocal.length === 0 && failed.length === 0) {
  console.log("\n✓ All checks passed");
  process.exit(0);
} else {
  console.log("\n✗ Issues found — see above");
  process.exit(1);
}
