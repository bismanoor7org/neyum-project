"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { homeReveal, homeRevealScale } from "@/components/home/home-motion";
import { cn } from "@/lib/utils";

interface HomeRevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  scale?: boolean;
}

export function HomeReveal({
  children,
  className,
  delay = 0,
  scale = false,
  ...props
}: HomeRevealProps) {
  const variants = scale ? homeRevealScale : homeReveal;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={delay}
      variants={variants}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
