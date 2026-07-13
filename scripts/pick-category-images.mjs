import { readFileSync } from "fs";

const t = readFileSync("src/lib/images.ts", "utf8");
const used = new Set();
for (const m of t.matchAll(/u\("([^"]+)"/g)) used.add(m[1]);

const CURRENT = [
  "1730946483586-17a8b550d0dd",
  "1655719647300-5142977bfa79",
  "1717361054046-eda52d552736",
  "1668136008949-26a98b4afc87",
  "1700619769452-13f5343bfa22",
  "1541292426587-b6ca8230532b",
];

const picks = {
  adventure: [
    "1700631102725-7194689f7075",
    "1654180635272-13fc4be2ecf3",
    "1730946483586-17a8b550d0dd",
    "1718152219095-8f9fc28f5b66",
  ],
  luxury: [
    "1756048830711-3e69f12ddf74",
    "1654180714269-9667f416a93f",
    "1654180717539-c36da10e173a",
    "1700619769904-3e2bedeb2c51",
  ],
  family: [
    "1718152220045-4283a8fe5c34",
    "1572811227797-5e08bd51e56c",
    "1654180444273-958864814bb4",
    "1559636776-41842f840807",
  ],
  wellness: [
    "1756048829869-dabbf82ed79a",
    "1731361781026-7ad35caeb0bb",
    "1519253577721-083d740006e5",
    "1668136008949-26a98b4afc87",
  ],
  culture: [
    "1597152524829-de8cb789172d",
    "1700619769449-fc1ca34a2647",
    "1718152219058-9b7ec5d31671",
    "1597728221962-143c397d498c",
  ],
  romance: [
    "1718152219044-edc915854e70",
    "1718152218906-ae6688d2f22f",
    "1649575091574-fe53762ed1eb",
    "1555758897-bdb880473c5c",
  ],
};

for (const [cat, ids] of Object.entries(picks)) {
  console.log(`\n${cat.toUpperCase()}`);
  for (const id of ids) {
    const inUse = used.has(id) && !CURRENT.includes(id);
    const r = await fetch(`https://images.unsplash.com/photo-${id}?w=600`, { method: "HEAD" });
    console.log(`${r.ok ? "OK" : "FAIL"}\t${inUse ? "USED" : "FREE"}\t${id}`);
  }
}
