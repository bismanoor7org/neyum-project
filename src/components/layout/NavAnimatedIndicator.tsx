"use client";

import { motion } from "framer-motion";

type NavAnimatedIndicatorProps = {
  visible: boolean;
};

export function NavAnimatedIndicator({ visible }: NavAnimatedIndicatorProps) {
  if (!visible) return null;

  return (
    <motion.span
      layoutId="navbar-indicator"
      className="nav-navbar-indicator pointer-events-none absolute inset-x-0 -bottom-[5px] block h-[2px] rounded-full bg-gold"
      transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
      aria-hidden
    />
  );
}
