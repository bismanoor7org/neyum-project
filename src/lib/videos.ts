import { images } from "@/lib/images";
import { HOME_HERO_VIDEOS_GENERATED } from "@/lib/hero-videos.generated";

/**
 * Royalty-free stock videos — Pexels License (free commercial use).
 * @see https://www.pexels.com/license/
 *
 * We do NOT embed Pinterest or unlicensed URLs. Each clip is tagged to a
 * Fiji-relevant theme (islands, reef, sailing, rainforest) for the section
 * where it plays.
 */
export interface SiteVideo {
  title: string;
  src: string;
  poster: string;
  /** Source page for license audit */
  sourcePage: string;
  theme: string;
}

/** Home hero — Fiji lagoon (modal only). Auto-sourced via `npm run hero:videos`. */
export const HERO_VIDEO: SiteVideo = {
  ...(HOME_HERO_VIDEOS_GENERATED[0] ?? {
    title: "Fiji — Turquoise lagoon",
    src: "/assets/hero-videos/fiji-01.mp4",
    poster: images.heroHome,
    sourcePage: "https://www.pexels.com/video/2098989/",
    theme: "Aerial over Fiji lagoon & palm coastline",
  }),
  poster: images.heroHome,
};

/**
 * Home hero rotation — 5 auto-sourced Fiji videos in public/assets/hero-videos/.
 * HeroHome background uses HERO_VIDEO (fiji-01). Full list for future rotation/modal.
 * Regenerate: npm run hero:videos
 */
export const HOME_HERO_VIDEOS: SiteVideo[] = [...HOME_HERO_VIDEOS_GENERATED];

/** Story section — island-hopping & open Pacific sailing */
export const STORY_VIDEO: SiteVideo = {
  title: "The Fiji Story",
  src: "https://videos.pexels.com/video-files/2430381/2430381-hd_1920_1080_24fps.mp4",
  poster: images.islandHop,
  sourcePage: "https://www.pexels.com/video/a-sailboat-in-the-sea-2430381/",
  theme: "Sailing between Fiji islands",
};

export const STORY_DESTINATION_SLUGS = [
  "yasawa",
  "mamanuca",
  "nadi",
  "suva",
  "taveuni",
  "coral-coast",
] as const;

export type StoryDestinationSlug = (typeof STORY_DESTINATION_SLUGS)[number];

/** One unique video per story destination tab */
export const STORY_DESTINATION_VIDEOS: Record<StoryDestinationSlug, SiteVideo> = {
  yasawa: {
    title: "Yasawa Islands",
    src: "https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4",
    poster: images.videoPosterYasawa,
    sourcePage: "https://www.pexels.com/video/aerial-view-of-beautiful-resort-2169880/",
    theme: "Volcanic ridges & blue lagoons",
  },
  mamanuca: {
    title: "Mamanuca Islands",
    src: "https://videos.pexels.com/video-files/8356785/8356785-hd_1920_1080_25fps.mp4",
    poster: images.videoPosterMamanuca,
    sourcePage: "https://www.pexels.com/video/drone-footage-of-deep-blue-sea-8356785/",
    theme: "Crystal waters & coral gardens",
  },
  nadi: {
    title: "Nadi",
    src: "https://videos.pexels.com/video-files/2430381/2430381-hd_1920_1080_24fps.mp4",
    poster: images.videoPosterNadi,
    sourcePage: "https://www.pexels.com/video/a-sailboat-in-the-sea-2430381/",
    theme: "Gateway marina & island hops",
  },
  suva: {
    title: "Suva",
    src: "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4",
    poster: images.videoPosterSuva,
    sourcePage: "https://www.pexels.com/video/3129671/",
    theme: "Capital culture & island life",
  },
  taveuni: {
    title: "Taveuni",
    src: "https://videos.pexels.com/video-files/18792336/18792336-hd_1920_1080_60fps.mp4",
    poster: images.videoPosterTaveuni,
    sourcePage: "https://www.pexels.com/video/indonesia-bali-waterfall-18792336/",
    theme: "Garden Island waterfalls",
  },
  "coral-coast": {
    title: "Coral Coast",
    src: "https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4",
    poster: images.videoPosterCoralCoast,
    sourcePage: "https://www.pexels.com/video/3571264/",
    theme: "Golden beaches & village coast",
  },
};

export function getStoryDestinationVideo(slug: StoryDestinationSlug): SiteVideo {
  return STORY_DESTINATION_VIDEOS[slug];
}

/** About / split feature — Rainbow Reef & crystal waters */
export const ABOUT_VIDEO: SiteVideo = {
  title: "Fiji — Beneath the surface",
  src: "https://videos.pexels.com/video-files/8356785/8356785-hd_1920_1080_25fps.mp4",
  poster: images.videoPosterAbout,
  sourcePage: "https://www.pexels.com/video/drone-footage-of-deep-blue-sea-8356785/",
  theme: "Coral reef & turquoise lagoon",
};

/** Optional nature clip — rainforest waterfall (Taveuni / Bouma) */
export const NATURE_VIDEO: SiteVideo = {
  title: "Fiji — Garden Island waterfalls",
  src: "https://videos.pexels.com/video-files/18792336/18792336-hd_1920_1080_60fps.mp4",
  poster: images.videoPosterNature,
  sourcePage: "https://www.pexels.com/video/indonesia-bali-waterfall-18792336/",
  theme: "Tropical rainforest waterfall",
};
