import fs from "fs";
import path from "path";

const pkgs = new Set();
const roots = ["src", "scripts", "prisma"];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walk(full);
      continue;
    }
    if (!/\.(tsx?|mjs)$/.test(entry.name)) continue;
    const source = fs.readFileSync(full, "utf8");
    const patterns = [
      /from\s+["']([^"']+)["']/g,
      /import\s*\(\s*["']([^"']+)["']\s*\)/g,
      /require\s*\(\s*["']([^"']+)["']\s*\)/g,
    ];
    for (const re of patterns) {
      for (const match of source.matchAll(re)) {
        const spec = match[1];
        if (spec.startsWith(".") || spec.startsWith("@/")) continue;
        if (spec.startsWith("@")) {
          const parts = spec.split("/");
          pkgs.add(parts.length >= 2 ? `${parts[0]}/${parts[1]}` : spec);
        } else {
          pkgs.add(spec.split("/")[0]);
        }
      }
    }
  }
}

for (const root of roots) {
  if (fs.existsSync(root)) walk(root);
}

console.log([...pkgs].sort().join("\n"));
