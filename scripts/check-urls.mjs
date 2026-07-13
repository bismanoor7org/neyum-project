import { readFileSync, existsSync } from "fs";

const t = readFileSync("src/lib/images.ts", "utf8");
const ids = [];
for (const m of t.matchAll(/u\("([^"]+)"/g)) ids.push(m[1]);
for (const m of t.matchAll(/:\s*"(\/[^"]+)"/g)) ids.push(m[1]);
const uniq = [...new Set(ids)];

async function check(id) {
  if (id.startsWith("/")) return { id, ok: existsSync("public" + id) };
  try {
    const r = await fetch(`https://images.unsplash.com/photo-${id}?w=200`, { method: "HEAD" });
    return { id, ok: r.ok };
  } catch {
    return { id, ok: false };
  }
}

const bad = [];
for (let i = 0; i < uniq.length; i += 15) {
  const res = await Promise.all(uniq.slice(i, i + 15).map(check));
  res.filter((x) => !x.ok).forEach((x) => bad.push(x.id));
}

console.log(`Checked ${uniq.length} unique IDs — ${bad.length} broken`);
bad.forEach((id) => console.log("FAIL", id));
