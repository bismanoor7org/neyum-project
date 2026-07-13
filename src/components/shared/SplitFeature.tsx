"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Mountain,
  Palmtree,
  Play,
  Sparkles,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { VideoModal } from "@/components/shared/VideoModal";
import { STORY_VIDEO, type SiteVideo } from "@/lib/videos";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface StoryFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface SplitFeatureProps {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  features?: StoryFeature[];
  video?: SiteVideo;
}

const defaultFeatures: StoryFeature[] = [
  {
    icon: Mountain,
    title: "333 Islands",
    description: "Each with its own personality and charm.",
  },
  {
    icon: Waves,
    title: "Natural Beauty",
    description: "Vibrant reefs, turquoise waters and lush landscapes.",
  },
  {
    icon: Palmtree,
    title: "Warm Hospitality",
    description: "A heartfelt welcome that stays with you.",
  },
];

function StoryDivider() {
  return (
    <div className="my-6 flex items-center gap-3">
      <span className="h-px flex-1 bg-gold/40" />
      <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.25} />
      <span className="h-px flex-1 bg-gold/40" />
    </div>
  );
}

/** Home — "Every Island Tells A Story" premium split layout */
export function SplitFeature({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  cta,
  features = defaultFeatures,
  video = STORY_VIDEO,
}: SplitFeatureProps) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <Container className="relative">
        <div className="relative z-[1] grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className={cn(
                "relative aspect-[4/5] overflow-hidden sm:aspect-[5/6]",
                "rounded-[1.75rem] shadow-[0_20px_60px_rgba(8,43,75,0.12)]",
              )}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className={cn(
                "absolute bottom-5 left-5 flex max-w-[240px] items-center gap-3",
                "rounded-2xl border border-white/15 bg-navy/80 px-4 py-3",
                "text-left backdrop-blur-md transition-transform hover:scale-[1.02]",
              )}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-white">
                <Play className="ml-0.5 h-4 w-4 fill-white" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">
                  Discover the real Fiji
                </span>
                <span className="block text-xs text-white/70">
                  Watch our story
                </span>
              </span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:py-4"
          >
            <Eyebrow className="tracking-[0.22em]">{eyebrow}</Eyebrow>
            <h2 className={cn("mt-4", ds.headingSection, "leading-tight")}>
              {title}
            </h2>

            <StoryDivider />

            <p className={cn("max-w-lg text-[15px] leading-relaxed", ds.body)}>
              {description}
            </p>

            <Button
              variant="navy"
              href={cta.href}
              className="mt-8 gap-2 px-7 py-3.5"
            >
              {cta.label}
              <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="mt-12 grid gap-8 border-t border-foreground/10 pt-10 sm:grid-cols-3 sm:gap-0">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={cn(
                    "px-0 sm:px-5",
                    index > 0 && "sm:border-l sm:border-gold/25",
                  )}
                >
                  <feature.icon
                    className="h-5 w-5 text-gold"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-3 font-serif text-base text-navy">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-foreground/65">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        title={video.title}
        src={video.src}
        poster={video.poster}
      />
    </>
  );
}
