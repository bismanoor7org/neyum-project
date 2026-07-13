"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Container, Section } from "@/components/shared";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

interface ValueProp {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ValuePropsProps {
  items: ValueProp[];
}

export function ValueProps({ items }: ValuePropsProps) {
  return (
    <Section compact className="border-y border-foreground/6 bg-white">
      <Container className={cn(ds.grid4, "gap-10")}>
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group border-foreground/8 lg:border-r lg:pr-8 lg:last:border-r-0"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/8 transition-transform duration-500 group-hover:scale-110">
              <item.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-semibold text-navy">{item.title}</h3>
            <p className={cn("mt-2 text-[13px] leading-relaxed text-foreground/60")}>
              {item.description}
            </p>
          </motion.div>
        ))}
      </Container>
    </Section>
  );
}
