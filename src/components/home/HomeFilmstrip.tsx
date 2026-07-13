"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { destinations } from "@/lib/content/destinations";
import { localizeDestination } from "@/lib/i18n/content";

/** Horizontal cinematic filmstrip — editorial destination discovery */
export function HomeFilmstrip() {
  const t = useT();
  const { locale } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const progress = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  const featured = destinations.slice(0, 6);

  return (
    <section className="overflow-hidden bg-navy py-20 lg:py-28">
      <div className="mx-auto mb-10 max-w-[84rem] px-6 lg:mb-14 lg:px-10">
        <p className="eyebrow-gold">{t.home.filmstripEyebrow}</p>
        <h2 className="mt-3 max-w-2xl font-serif text-3xl tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
          {t.home.filmstripTitle}
        </h2>
      </div>

      <div
        ref={ref}
        className="flex gap-5 overflow-x-auto px-6 pb-4 scrollbar-none lg:gap-7 lg:px-10"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {featured.map((d, i) => {
          const loc = localizeDestination(d, locale);
          return (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="w-[78vw] shrink-0 sm:w-[52vw] lg:w-[38vw] xl:w-[32vw]"
              style={{ scrollSnapAlign: "start" }}
            >
              <Link
                href={`/places-to-go/${d.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <Image
                  src={d.cardImage}
                  alt={loc.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
                    {String(i + 1).padStart(2, "0")} — {t.common.featured}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-white lg:text-3xl">
                    {loc.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    {t.common.explore}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
        <div className="w-6 shrink-0 lg:w-10" aria-hidden />
      </div>

      <div className="mx-auto mt-8 h-px max-w-[84rem] bg-white/10 px-6 lg:px-10">
        <motion.div
          style={{ width: progress }}
          className="h-full max-w-full bg-gradient-to-r from-gold/80 to-gold"
        />
      </div>
    </section>
  );
}
