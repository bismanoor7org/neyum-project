"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";
import { Container } from "./Container";

interface CTABannerProps {
  image: string;
  imageAlt?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  minHeight?: string;
}

export function CTABanner({
  image,
  imageAlt = "",
  title,
  description,
  ctaLabel = "Get started",
  ctaHref = "/contact",
  minHeight = "min-h-[360px] lg:min-h-[420px]",
}: CTABannerProps) {
  return (
    <section className={cn("relative overflow-hidden", minHeight)}>
      <Image src={image} alt={imageAlt || title} fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/75 to-navy/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />

      <Container className="relative flex min-h-[inherit] flex-col items-center justify-center gap-8 py-20 text-center lg:flex-row lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl text-white"
        >
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{title}</h2>
          {description && (
            <p className="mt-4 text-[15px] leading-relaxed text-white/75">{description}</p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <Button href={ctaHref} className="px-10">
            {ctaLabel}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
