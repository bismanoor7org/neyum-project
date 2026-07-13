"use client";

import { motion } from "framer-motion";
import { Award, Headphones, ShieldCheck, Tag } from "lucide-react";
import { Container } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

export function HeroTrustBar() {
  const t = useT();

  const trustItems = [
    { icon: Award, title: t.trustBar.expertTitle, description: t.trustBar.expertDesc },
    { icon: Tag, title: t.trustBar.priceTitle, description: t.trustBar.priceDesc },
    { icon: Headphones, title: t.trustBar.conciergeTitle, description: t.trustBar.conciergeDesc },
    { icon: ShieldCheck, title: t.trustBar.bookingTitle, description: t.trustBar.bookingDesc },
  ] as const;

  return (
    <section className="trust-bar-section">
      <Container>
        <p className="mb-12 text-center eyebrow-gold">{t.trustBar.title}</p>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {trustItems.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold/25 bg-gold/8 transition-transform duration-500 group-hover:scale-105">
                <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-navy">{title}</h3>
              <p className={cn("mt-2 max-w-[200px] text-xs leading-relaxed text-foreground/55")}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
