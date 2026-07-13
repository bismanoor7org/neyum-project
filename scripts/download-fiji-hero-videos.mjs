import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "videos", "hero");

/** 5 Fiji island clips — lagoon, sand, reef, palms, green islands (Pexels royalty-free) */
const clips = [
  { file: "hero-01.mp4", id: 2098989, fps: "30fps", theme: "turquoise lagoon aerial" },
  { file: "hero-02.mp4", id: 2278095, fps: "30fps", theme: "island & crystal water" },
  { file: "hero-03.mp4", id: 2480792, fps: "24fps", theme: "white sand & blue reef" },
  { file: "hero-04.mp4", id: 8356785, fps: "25fps", theme: "coral reef & lagoon" },
  { file: "hero-05.mp4", id: 7615676, fps: "30fps", theme: "green islands & teal sea" },
];

async function resolveUrl(id, fps) {
  const patterns = [
    `https://videos.pexels.com/video-files/${id}/${id}-hd_1920_1080_${fps}.mp4`,
    `https://videos.pexels.com/video-files/${id}/${id}-hd_1280_720_${fps}.mp4`,
  ];
  for (const url of patterns) {
    try {
      const r = await fetch(url, { method: "GET", headers: { Range: "bytes=0-1" } });
      if (r.status === 200 || r.status === 206) return url;
    } catch {
      /* try next */
    }
  }
  const r = await fetch(`https://www.pexels.com/download/video/${id}/`, {
    redirect: "manual",
  });
  const loc = r.headers.get("location");
  if (!loc) throw new Error(`No download URL for ${id}`);
  return loc;
}

async function download(url, dest) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Download failed ${r.status} ${url}`);
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

fs.mkdirSync(outDir, { recursive: true });

for (const clip of clips) {
  const dest = path.join(outDir, clip.file);
  process.stdout.write(`Downloading ${clip.file} (${clip.theme})... `);
  const url = await resolveUrl(clip.id, clip.fps);
  const bytes = await download(url, dest);
  console.log(`${(bytes / 1024 / 1024).toFixed(1)} MB`);
}

for (const extra of ["hero-06.mp4", "hero-07.mp4", "hero-08.mp4", "hero-09.mp4", "hero-10.mp4"]) {
  const p = path.join(outDir, extra);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log(`Removed unused ${extra}`);
  }
}

console.log("Done — 5 Fiji island hero videos.");
