"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

interface PageIntroProps {
  title: string;
  eyebrow?: string;
  eyebrowVariant?: "gold" | "teal";
  description?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
  className?: string;
  containerSize?: "default" | "narrow";
}

/** Cream-band intro for pages below a hero or standalone sections */
export function PageIntro({
  title,
  eyebrow,
  eyebrowVariant = "gold",
  description,
  align = "left",
  children,
  className,
  containerSize = "default",
}: PageIntroProps) {
  const centered = align === "center";

  return (
    <section className={cn("bg-cream py-16 md:py-20", className)}>
      <Container size={containerSize}>
        {eyebrow && (
          <Eyebrow variant={eyebrowVariant} className={centered ? "text-center" : undefined}>
            {eyebrow}
          </Eyebrow>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(ds.headingSection, eyebrow && "mt-3", centered && "text-center")}
        >
          {title}
        </motion.h2>
        {description && (
          <p
            className={cn(
              "mt-5 max-w-2xl text-[15px] leading-relaxed text-foreground/65",
              centered && "mx-auto text-center",
            )}
          >
            {description}
          </p>
        )}
        {children && (
          <div className={cn("mt-8", centered && "flex justify-center")}>{children}</div>
        )}
      </Container>
    </section>
  );
}
