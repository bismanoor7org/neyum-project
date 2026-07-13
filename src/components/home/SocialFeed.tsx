"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Camera } from "lucide-react";
import { homeEase } from "@/components/home/home-motion";
import { Container, Section, SectionHeader } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import { homeSocialImages } from "@/lib/images";
import { cn } from "@/lib/utils";

const MASONRY_HEIGHTS = [
  "h-64 sm:h-72",
  "h-48 sm:h-56",
  "h-56 sm:h-64",
  "h-72 sm:h-80",
  "h-48 sm:h-52",
  "h-64 sm:h-72",
] as const;

/** Instagram-style masonry travel gallery */
export function SocialFeed() {
  const t = useT();

  return (
    <Section variant="cream" decor={false} reveal={false} className="pb-0">
      <Container>
        <SectionHeader
          title={t.home.socialTitle}
          subtitle={t.home.socialSubtitle}
          align="center"
          size="compact"
        />

        <div className="columns-2 gap-4 sm:columns-3 sm:gap-5 lg:gap-6">
          {homeSocialImages.slice(0, 6).map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, ease: homeEase }}
              className="mb-4 break-inside-avoid sm:mb-5"
            >
              <Link
                href="https://www.instagram.com/fiji/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative block overflow-hidden rounded-3xl shadow-[var(--shadow-card)] transition-[box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]",
                  MASONRY_HEIGHTS[i],
                )}
              >
                <Image
                  src={src}
                  alt={`${t.home.socialImageAlt} ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-navy/0 transition-colors duration-500 group-hover:bg-navy/30" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Camera className="h-8 w-8 text-white" strokeWidth={1.5} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="https://www.instagram.com/fiji/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-navy/12 bg-[var(--card-surface)] px-7 py-3 text-sm font-semibold text-navy shadow-[var(--shadow-card)] transition-all hover:border-gold/40 hover:shadow-[var(--shadow-card-hover)]"
          >
            <Camera className="h-4 w-4 text-gold" strokeWidth={1.5} />
            {t.common.followInstagram}
            <ArrowRight className="h-3.5 w-3.5 text-gold" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
