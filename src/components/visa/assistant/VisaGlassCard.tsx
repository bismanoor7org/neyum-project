"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type VisaGlassCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "navy";
  delay?: number;
  id?: string;
};

export function VisaGlassCard({
  children,
  className,
  variant = "light",
  delay = 0,
  id,
}: VisaGlassCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "visa-glass-card",
        variant === "dark" && "visa-glass-card--dark",
        variant === "navy" && "visa-glass-card--navy",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
