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

function LuxuryStayCard({
  title,
  desc,
  href,
  image,
  exploreLabel,
}: {
  title: string;
  desc: string;
  href: string;
  image: string;
  exploreLabel: string;
}) {
  return (
    <motion.article variants={siteStaggerItem} className="h-full">
      <Link
        href={href}
        className={cn(
          "group block h-full overflow-hidden rounded-[24px]",
          "shadow-[0_6px_36px_rgba(26,39,68,0.08)]",
          "transition-[transform,box-shadow] duration-500 ease-out",
          "hover:-translate-y-0.5 hover:shadow-[0_18px_56px_rgba(26,39,68,0.14)]",
        )}
      >
        <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5] lg:aspect-[3/4]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/10 to-transparent"
            aria-hidden
          />

          <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
            <div
              className={cn(
                "rounded-[20px] border border-white/12 bg-navy/50 p-5 backdrop-blur-xl",
                "transition-[background-color,border-color] duration-400",
                "group-hover:border-white/18 group-hover:bg-navy/58",
                "sm:p-6",
              )}
            >
              <h3 className="min-h-[2.75em] font-serif text-xl leading-snug tracking-[-0.01em] text-white sm:text-[1.35rem] lg:text-2xl">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-[1.65] text-white/78 sm:text-[15px] sm:leading-[1.7]">
                {desc}
              </p>
              <span
                className={cn(
                  "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold",
                  "transition-[gap,color] duration-300 group-hover:gap-2.5",
                )}
              >
                {exploreLabel}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function LuxuryEscapes() {
  const t = useT();

  const stays = [
    {
      title: t.home.luxuryStay1Title,
      desc: t.home.luxuryStay1Desc,
      href: "/places-to-stay/likuliku-lagoon",
      image: images.resortLikuliku,
    },
    {
      title: t.home.luxuryStay2Title,
      desc: t.home.luxuryStay2Desc,
      href: "/places-to-stay/tokoriki-island",
      image: images.resortTokoriki,
    },
    {
      title: t.home.luxuryStay3Title,
      desc: t.home.luxuryStay3Desc,
      href: "/places-to-stay/intercontinental-coral-coast",
      image: images.resortIntercontinental,
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
          <motion.h2
            variants={headerItem}
            className="font-serif text-[2.25rem] leading-[1.08] tracking-[-0.03em] text-navy sm:text-[2.65rem] md:text-[3.15rem] lg:text-[3.35rem]"
          >
            {t.home.luxuryTitle}
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.8] text-foreground/58 sm:text-base sm:leading-[1.85]"
          >
            {t.home.luxurySubtitle}
          </motion.p>
          <motion.div variants={headerItem} className="mt-8 md:mt-9">
            <Link
              href="/places-to-stay"
              className={cn(
                "group inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-3.5",
                "text-sm font-semibold tracking-wide text-navy",
                "shadow-[0_4px_18px_rgba(212,175,55,0.22)]",
                "transition-[transform,box-shadow,filter] duration-300",
                "hover:brightness-[1.03] hover:shadow-[0_8px_28px_rgba(212,175,55,0.28)]",
              )}
            >
              {t.common.viewAllStays}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
            </Link>
          </motion.div>
        </motion.header>

        <motion.div
          className="grid gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-8 xl:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={siteStagger}
        >
          {stays.map((item) => (
            <LuxuryStayCard
              key={item.href}
              {...item}
              exploreLabel={t.common.explore}
            />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
