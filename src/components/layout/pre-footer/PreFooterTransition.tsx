"use client";

import { cn } from "@/lib/utils";

interface PreFooterTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/** Pre-footer section wrapper */
export function PreFooterTransition({ children, className }: PreFooterTransitionProps) {
  return (
    <div className={cn("relative overflow-hidden bg-white", className)}>
      <div className="relative">{children}</div>
    </div>
  );
}
