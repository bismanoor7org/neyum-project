"use client";

import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { FijiLiveStatusBar } from "@/components/layout/FijiLiveStatusBar";
import { Navbar } from "@/components/layout/Navbar";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { DecorProvider } from "@/components/shared/DecorProvider";
import { getPageDecorStart } from "@/lib/page-decor";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: React.ReactNode;
  navbarVariant?: "transparent" | "light" | "navy";
  activeHref?: string;
  showFooter?: boolean;
  heroOverlap?: boolean;
  stickyCta?: boolean;
}

export function PageLayout({
  children,
  navbarVariant = "light",
  activeHref,
  showFooter = true,
  heroOverlap = false,
  stickyCta = false,
}: PageLayoutProps) {
  const decorStart = getPageDecorStart(activeHref);

  const main = (
    <DecorProvider startSide={decorStart}>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative flex-1 overflow-x-clip",
          stickyCta && "pb-[4.5rem] lg:pb-0",
        )}
      >
        {children}
      </motion.main>
    </DecorProvider>
  );

  if (heroOverlap) {
    return (
      <>
        <div className="relative">
          <Navbar variant="transparent" activeHref={activeHref} />
          <FijiLiveStatusBar belowFloatingNav />
          {main}
        </div>
        {showFooter && <Footer />}
        {stickyCta && <StickyCTA />}
      </>
    );
  }

  return (
    <>
      <Navbar variant={navbarVariant} activeHref={activeHref} />
      <FijiLiveStatusBar />
      {main}
      {showFooter && <Footer />}
      {stickyCta && <StickyCTA />}
    </>
  );
}
