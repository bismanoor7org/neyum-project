"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BedDouble, HandHelping, Palmtree, Waves } from "lucide-react";
import { Container } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";

const STATS = [
  { value: 333, suffix: "+", label: "Islands" },
  { value: 50, suffix: "+", label: "Luxury Resorts" },
  { value: 24, suffix: "/7", label: "Concierge" },
  { value: 98, suffix: "%", label: "Satisfaction" },
] as const;

function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target]);
  return (
    <span className="font-serif text-4xl tracking-[-0.02em] text-navy md:text-[2.75rem]">
      {n}
      {suffix}
    </span>
  );
}

/** Trust stats + value props — single premium strip */
export function HomeTrustStrip() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const features = [
    { icon: Palmtree, title: t.hero.privateIslands, desc: t.hero.privateIslandsDesc },
    { icon: BedDouble, title: t.hero.luxuryStays, desc: t.hero.luxuryStaysDesc },
    { icon: Waves, title: t.hero.unforgettable, desc: t.hero.unforgettableDesc },
    { icon: HandHelping, title: t.hero.personalised, desc: t.hero.personalisedDesc },
  ] as const;

  return (
    <section className="border-y border-navy/[0.05] bg-cream py-16 lg:py-20">
      <Container>
        <div
          ref={ref}
          className="mb-12 grid grid-cols-2 gap-4 lg:mb-14 lg:grid-cols-4 lg:gap-6"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="premium-surface px-5 py-7 text-center lg:px-6 lg:py-8"
            >
              <Counter target={s.value} suffix={s.suffix} active={inView} />
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-foreground/40">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="group premium-surface px-6 py-7 text-center transition-shadow duration-500 hover:shadow-[var(--shadow-card-hover)] lg:text-left"
            >
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/8 transition-transform duration-500 group-hover:scale-105 lg:mx-0">
                <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold tracking-wide text-navy">{title}</h3>
              <p className="mt-2 text-xs leading-[1.65] text-foreground/50">{desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
