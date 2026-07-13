/**
 * Hero Video Automation — Fiji luxury travel clips (Pexels royalty-free).
 * Downloads, generates posters, writes manifest for HeroHome rotation.
 *
 * Usage: node scripts/hero-video-automation.mjs
 * Optional: install ffmpeg for re-encode + faststart (skips if unavailable).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "assets", "hero-videos");
const POSTER_DIR = path.join(OUT_DIR, "posters");
const MANIFEST_PATH = path.join(OUT_DIR, "manifest.json");
const GENERATED_TS = path.join(ROOT, "src", "lib", "hero-videos.generated.ts");

/** Premium cinematic Pexels — teal lagoons, luxury resorts, golden coast (matches navy/gold theme) */
const CLIPS = [
  {
    id: "fiji-01",
    pexelsId: 2169880,
    fps: "30fps",
    title: "Overwater luxury resort",
    theme: "Cinematic aerial — overwater villas & turquoise lagoon",
    sourcePage: "https://www.pexels.com/video/aerial-view-of-beautiful-resort-2169880/",
    category: "Luxury Resorts · Fiji Islands",
  },
  {
    id: "fiji-02",
    pexelsId: 5127021,
    fps: "30fps",
    title: "Premium island resort",
    theme: "Sweeping drone over luxury beachfront & emerald water",
    sourcePage: "https://www.pexels.com/video/5127021/",
    category: "Luxury Travel · Drone Footage",
  },
  {
    id: "fiji-03",
    pexelsId: 9503163,
    fps: "30fps",
    title: "Beachfront luxury escape",
    theme: "Aerial resort pools meeting deep Pacific blue",
    sourcePage: "https://www.pexels.com/video/aerial-view-of-a-resort-hotel-by-the-beach-9503163/",
    category: "Luxury Resorts · Ocean Views",
  },
  {
    id: "fiji-04",
    pexelsId: 3571264,
    fps: "30fps",
    title: "Golden tropical coast",
    theme: "Warm golden light on sand & teal shallows",
    sourcePage: "https://www.pexels.com/video/3571264/",
    category: "Fiji Beaches · Luxury Travel",
  },
  {
    id: "fiji-05",
    pexelsId: 7671125,
    fps: "24fps",
    title: "Emerald lagoon islands",
    theme: "Volcanic green islands rising from crystal lagoon",
    sourcePage: "https://www.pexels.com/video/7671125/",
    category: "Tropical Islands · Ocean Views",
  },
];

function hasFfmpeg() {
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

async function resolveHdUrl(pexelsId, fps) {
  const patterns = [
    `https://videos.pexels.com/video-files/${pexelsId}/${pexelsId}-hd_1920_1080_${fps}.mp4`,
    `https://videos.pexels.com/video-files/${pexelsId}/${pexelsId}-hd_1280_720_${fps}.mp4`,
  ];
  for (const url of patterns) {
    try {
      const r = await fetch(url, { method: "GET", headers: { Range: "bytes=0-1" } });
      if (r.status === 200 || r.status === 206) return { url, resolution: url.includes("1920") ? "1920x1080" : "1280x720" };
    } catch {
      /* next */
    }
  }
  const r = await fetch(`https://www.pexels.com/download/video/${pexelsId}/`, {
    redirect: "manual",
  });
  const loc = r.headers.get("location");
  if (!loc) throw new Error(`No CDN URL for Pexels ${pexelsId}`);
  return { url: loc, resolution: loc.includes("3840") ? "3840x2160" : "1920x1080" };
}

async function downloadBuffer(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Download failed ${r.status}: ${url}`);
  return Buffer.from(await r.arrayBuffer());
}

function optimizeWithFfmpeg(inputPath, outputPath) {
  execSync(
    [
      "ffmpeg",
      "-y",
      "-i",
      `"${inputPath}"`,
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "23",
      "-movflags",
      "+faststart",
      "-an",
      "-vf",
      "scale='min(1920,iw)':-2",
      `"${outputPath}"`,
    ].join(" "),
    { stdio: "inherit", shell: true },
  );
}

async function downloadPoster(pexelsId, dest, clipId) {
  const candidates = [
    `https://images.pexels.com/videos/${pexelsId}/pictures/preview-0.jpg`,
    `https://images.pexels.com/videos/${pexelsId}/free-video-${pexelsId}.jpg`,
    `https://images.pexels.com/videos/${pexelsId}/pexels-photo-${pexelsId}.jpeg`,
    `https://images.pexels.com/videos/${pexelsId}/pictures/preview-1.jpg`,
  ];
  for (const url of candidates) {
    try {
      const r = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0", Accept: "image/*" },
      });
      if (!r.ok) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length > 1024) {
        fs.writeFileSync(dest, buf);
        return buf.length;
      }
    } catch {
      /* try next */
    }
  }
  const fallback = path.join(ROOT, "public", "hero-luxury.png");
  if (fs.existsSync(fallback)) {
    fs.copyFileSync(fallback, dest.replace(/\.jpg$/, ".png"));
    const pngDest = dest.replace(/\.jpg$/, ".png");
    if (pngDest !== dest && fs.existsSync(pngDest)) {
      return fs.statSync(pngDest).size;
    }
    fs.copyFileSync(fallback, dest);
    return fs.statSync(dest).size;
  }
  throw new Error(`No poster for Pexels ${pexelsId} (${clipId})`);
}

function writeGeneratedTs(manifest) {
  const entries = manifest.videos
    .map(
      (v) => `  {
    title: ${JSON.stringify(v.title)},
    src: ${JSON.stringify(v.src)},
    poster: ${JSON.stringify(v.posterSrc)},
    sourcePage: ${JSON.stringify(v.sourcePage)},
    theme: ${JSON.stringify(v.theme)},
  }`,
    )
    .join(",\n");

  const content = `/** AUTO-GENERATED by scripts/hero-video-automation.mjs — do not edit manually */

export const HERO_VIDEO_MANIFEST_META = {
  version: ${manifest.version},
  generatedAt: ${JSON.stringify(manifest.generatedAt)},
  outputDir: "/assets/hero-videos",
  optimization: ${JSON.stringify(manifest.optimization)},
} as const;

export const HOME_HERO_VIDEOS_GENERATED = [
${entries}
] as const;
`;
  fs.writeFileSync(GENERATED_TS, content, "utf8");
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(POSTER_DIR, { recursive: true });

  const ffmpeg = hasFfmpeg();
  const optimization = {
    targetResolution: "1920x1080 max",
    codec: ffmpeg ? "h264 (libx264, crf 23, faststart)" : "source HD (no ffmpeg — install ffmpeg for re-encode)",
    audio: "removed (hero is muted)",
    posterFormat: "jpeg preview from Pexels",
  };

  console.log(`Hero video automation — ${CLIPS.length} Fiji clips`);
  console.log(`Output: ${OUT_DIR}`);
  console.log(`FFmpeg: ${ffmpeg ? "yes (will optimize)" : "no (HD download only)"}\n`);

  const videos = [];

  for (const clip of CLIPS) {
    const rawName = `${clip.id}.raw.mp4`;
    const finalName = `${clip.id}.mp4`;
    const rawPath = path.join(OUT_DIR, rawName);
    const finalPath = path.join(OUT_DIR, finalName);
    const posterName = `${clip.id}.jpg`;
    const posterPath = path.join(POSTER_DIR, posterName);

    process.stdout.write(`[${clip.id}] Downloading HD... `);
    const { url, resolution } = await resolveHdUrl(clip.pexelsId, clip.fps);
    const rawBuf = await downloadBuffer(url);
    fs.writeFileSync(rawPath, rawBuf);
    console.log(`${(rawBuf.length / 1024 / 1024).toFixed(1)} MB (${resolution})`);

    if (ffmpeg) {
      process.stdout.write(`[${clip.id}] Optimizing (faststart + h264)... `);
      optimizeWithFfmpeg(rawPath, finalPath);
      if (fs.existsSync(rawPath)) fs.unlinkSync(rawPath);
      const optSize = fs.statSync(finalPath).size;
      console.log(`${(optSize / 1024 / 1024).toFixed(1)} MB`);
    } else {
      if (fs.existsSync(finalPath)) fs.unlinkSync(finalPath);
      fs.copyFileSync(rawPath, finalPath);
      fs.unlinkSync(rawPath);
      console.log(`[${clip.id}] Saved HD (ffmpeg not installed — run with ffmpeg for faststart)`);
    }

    process.stdout.write(`[${clip.id}] Poster thumbnail... `);
    const posterBytes = await downloadPoster(clip.pexelsId, posterPath, clip.id);
    const posterFile = fs.existsSync(posterPath)
      ? posterName
      : posterName.replace(/\.jpg$/, ".png");
    console.log(`${(posterBytes / 1024).toFixed(0)} KB`);

    const fileStat = fs.statSync(finalPath);
    const posterRel = posterFile.endsWith(".png")
      ? `posters/${clip.id}.png`
      : `posters/${posterName}`;
    videos.push({
      id: clip.id,
      file: finalName,
      poster: posterRel,
      src: `/assets/hero-videos/${finalName}`,
      posterSrc: `/assets/hero-videos/${posterRel}`,
      title: clip.title,
      theme: clip.theme,
      category: clip.category,
      sourcePage: clip.sourcePage,
      pexelsId: clip.pexelsId,
      bytes: fileStat.size,
      license: "Pexels License — https://www.pexels.com/license/",
    });
  }

  const manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    license: "Pexels License (free commercial use)",
    optimization,
    videos,
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
  writeGeneratedTs(manifest);

  console.log("\n✓ manifest.json");
  console.log("✓ hero-videos.generated.ts");
  console.log("\nFiles:");
  for (const v of videos) {
    console.log(`  ${v.file}  ${(v.bytes / 1024 / 1024).toFixed(1)} MB  →  ${v.posterSrc}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
