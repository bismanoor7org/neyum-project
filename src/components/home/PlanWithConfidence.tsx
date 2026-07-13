"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import { images } from "@/lib/images";
import { siteEase, siteStagger, siteStaggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

const headerItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: siteEase },
  },
};

function EditorialLink({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy transition-[color,gap] duration-300 group-hover:gap-2.5 group-hover:text-gold">
      {label}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </span>
  );
}

function FeaturedGuideCard({
  eyebrow,
  title,
  description,
  href,
  image,
  readLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  image: string;
  readLabel: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: siteEase }}
    >
      <Link
        href={href}
        className={cn(
          "group flex flex-col overflow-hidden rounded-[24px] bg-white",
          "shadow-[0_6px_36px_rgba(26,39,68,0.07)]",
          "transition-[transform,box-shadow] duration-500 ease-out",
          "hover:-translate-y-0.5 hover:shadow-[0_18px_56px_rgba(26,39,68,0.11)]",
          "lg:min-h-[360px] lg:flex-row lg:items-stretch",
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[5/3] lg:aspect-auto lg:w-1/2 lg:min-h-[360px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-1 flex-col justify-center px-7 py-9 sm:px-9 sm:py-11 lg:px-12 lg:py-14 xl:px-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-foreground/45">
            {eyebrow}
          </p>
          <h3 className="mt-4 font-serif text-[1.65rem] leading-[1.15] tracking-[-0.02em] text-navy sm:text-[1.85rem] lg:text-[2rem]">
            {title}
          </h3>
          <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-foreground/58 sm:text-base sm:leading-[1.8]">
            {description}
          </p>
          <span className="mt-8">
            <EditorialLink label={readLabel} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function EssentialGuideCard({
  title,
  description,
  href,
  image,
  readLabel,
}: {
  title: string;
  description: string;
  href: string;
  image: string;
  readLabel: string;
}) {
  return (
    <motion.article variants={siteStaggerItem} className="h-full">
      <Link href={href} className="group flex h-full flex-col">
        <div
          className={cn(
            "relative aspect-square overflow-hidden rounded-[24px]",
            "shadow-[0_4px_28px_rgba(26,39,68,0.06)]",
            "transition-[transform,box-shadow] duration-500 ease-out",
            "group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_44px_rgba(26,39,68,0.1)]",
          )}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="flex flex-1 flex-col pt-6 sm:pt-7">
          <h3 className="font-serif text-xl leading-snug tracking-[-0.01em] text-navy sm:text-[1.35rem]">
            {title}
          </h3>
          <p className="mt-3 flex-1 text-[15px] leading-[1.75] text-foreground/58">
            {description}
          </p>
          <span className="mt-5">
            <EditorialLink label={readLabel} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function PlanWithConfidence() {
  const t = useT();

  const featured = {
    title: t.home.planGuide1Title,
    description: t.home.planGuide1Desc,
    image: images.guideFirstTrip,
    href: "/guides/first-time-fiji",
  };

  const essential = [
    {
      title: t.home.planGuide2Title,
      description: t.home.planGuide2Desc,
      image: images.guideVisa,
      href: "/guides/visa-guide",
    },
    {
      title: t.home.planGuide3Title,
      description: t.home.planGuide3Desc,
      image: images.guideBestTime,
      href: "/guides/best-time-to-visit",
    },
    {
      title: t.home.planGuide6Title,
      description: t.home.planGuide6Desc,
      image: images.guideFlights,
      href: "/guides/transportation",
    },
  ];

  return (
    <Section variant="cream" decor={false} reveal={false} className="py-20 md:py-28 lg:py-32">
      <Container>
        <motion.header
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20 lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
        >
          <motion.p
            variants={headerItem}
            className="text-[10px] font-bold uppercase tracking-[0.28em] text-foreground/45"
          >
            {t.home.planEyebrow}
          </motion.p>
          <motion.h2
            variants={headerItem}
            className="mt-5 font-serif text-[2.25rem] leading-[1.08] tracking-[-0.03em] text-navy sm:text-[2.65rem] md:text-[3.15rem] lg:text-[3.35rem]"
          >
            {t.home.planTitle}
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.8] text-foreground/58 sm:text-base sm:leading-[1.85]"
          >
            {t.home.planSubtitle}
          </motion.p>
          <motion.div variants={headerItem} className="mt-8 md:mt-9">
            <Link
              href="/guides"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy/65 transition-colors duration-300 hover:text-gold"
            >
              {t.detail.viewAllGuides}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.header>

        <FeaturedGuideCard
          {...featured}
          eyebrow={t.common.featuredGuide}
          readLabel={t.common.readGuide}
        />

        <div className="mt-16 md:mt-20 lg:mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: siteEase }}
            className="font-serif text-[1.65rem] italic leading-tight tracking-[-0.01em] text-navy sm:text-[1.85rem] md:text-[2rem]"
          >
            {t.pages.guidesEssentialTitle}
          </motion.h3>

          <motion.div
            className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-9 lg:mt-10 lg:grid-cols-3 lg:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={siteStagger}
          >
            {essential.map((guide) => (
              <EssentialGuideCard key={guide.href} {...guide} readLabel={t.common.readGuide} />
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
