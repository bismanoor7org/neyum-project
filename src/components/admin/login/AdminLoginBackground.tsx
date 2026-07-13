"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BarChart3, LayoutDashboard, Shield } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const TRUST_ITEMS = [
  { icon: LayoutDashboard, label: "CMS & content" },
  { icon: BarChart3, label: "Live analytics" },
  { icon: Shield, label: "Role-based access" },
];

export function AdminLoginBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="admin-portal-visual pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <Image
        src="/hero-luxury.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="60vw"
      />
      <div className="admin-portal-visual-overlay absolute inset-0" />
      <div
        className="admin-portal-visual-grid absolute inset-0"
        style={{ opacity: isDark ? 0.4 : 0.28 }}
      />

      <motion.div
        className="admin-portal-orb admin-portal-orb--gold absolute -left-20 top-1/3 h-80 w-80 rounded-full blur-[90px]"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="admin-portal-orb admin-portal-orb--teal absolute bottom-0 right-0 h-96 w-96 rounded-full blur-[100px]"
        animate={{ opacity: [0.25, 0.4, 0.25], x: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-10 xl:p-14">
        <div />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-md"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold/90">
            Enterprise platform
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.15] text-white xl:text-5xl">
            Command your luxury marketplace
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Tours, bookings, suppliers, CMS and analytics — one secure console for
            Fiji&apos;s premium travel operations.
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {TRUST_ITEMS.map(({ icon: Icon, label }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="admin-portal-trust-pill flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white/85"
              >
                <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} aria-hidden />
                {label}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
          Secured · Encrypted · Audit-ready
        </p>
      </div>
    </div>
  );
}
