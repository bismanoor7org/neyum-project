"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { useT } from "@/components/providers/LocaleProvider";

export function AdminDashboardLoading() {
  const t = useT();

  return (
    <div className="admin-dashboard-loading admin-panel flex min-h-[100svh] flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm text-center"
      >
        <div className="relative mx-auto mb-8 flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Loader2 className="h-7 w-7 animate-spin text-gold" strokeWidth={1.5} />
          </div>
        </div>

        <BrandLogo variant="compact" tone="dark" className="mx-auto" />

        <h1 className="mt-6 font-serif text-2xl text-white">{t.auth.loadingDashboard}</h1>
        <p className="mt-2 text-sm text-white/45">{t.auth.loadingDashboardSub}</p>

        <div className="mt-8 h-1 overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-gold/60 via-gold to-gold/60"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
