"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  Globe2,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";

const COUNTERS = [
  { key: "islands" as const, value: 333, suffix: "+", icon: Globe2 },
  { key: "resorts" as const, value: 50, suffix: "+", icon: Waves },
  { key: "guests" as const, value: 12000, suffix: "+", icon: Users },
  { key: "awards" as const, value: 15, suffix: "", icon: Award },
] as const;

function Counter({
  target,
  suffix,
  active,
}: {
  target: number;
  suffix: string;
  active: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target]);

  return (
    <span className="font-serif text-5xl tracking-tight text-white md:text-6xl">
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

const TRUST_ICONS = [ShieldCheck, Sparkles, Award, Users] as const;

/** Why Choose Fiji — luxury trust section with animated counters */
export function WhyChooseFiji() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    { icon: TRUST_ICONS[0], title: t.whyChoose.reason1Title, desc: t.whyChoose.reason1Desc },
    { icon: TRUST_ICONS[1], title: t.whyChoose.reason2Title, desc: t.whyChoose.reason2Desc },
    { icon: TRUST_ICONS[2], title: t.whyChoose.reason3Title, desc: t.whyChoose.reason3Desc },
    { icon: TRUST_ICONS[3], title: t.whyChoose.reason4Title, desc: t.whyChoose.reason4Desc },
  ];

  return (
    <Section variant="navy" decor={false} reveal={false}>
      <Container>
        <SectionHeader
          eyebrow={t.whyChoose.eyebrow}
          eyebrowVariant="gold"
          title={t.whyChoose.title}
          subtitle={t.whyChoose.subtitle}
          align="center"
          size="compact"
          theme="dark"
          decorated
        />

        <div
          ref={ref}
          className="mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8"
        >
          {COUNTERS.map((c, i) => {
            const Icon = c.icon;
            const labels: Record<string, string> = {
              islands: t.whyChoose.counterIslands,
              resorts: t.whyChoose.counterResorts,
              guests: t.whyChoose.counterGuests,
              awards: t.whyChoose.counterAwards,
            };
            return (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm lg:p-8"
              >
                <Icon className="mx-auto mb-4 h-5 w-5 text-gold" strokeWidth={1.5} />
                <Counter target={c.value} suffix={c.suffix} active={inView} />
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  {labels[c.key]}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="group rounded-2xl border border-white/8 bg-gradient-to-b from-white/8 to-transparent p-7 transition-all duration-500 hover:border-gold/25 hover:bg-white/10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg text-white">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
