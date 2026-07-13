"use client";

import { CinematicNewsletter } from "@/components/layout/pre-footer/CinematicNewsletter";

interface PhotoNewsletterProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
}

/** @deprecated Use CinematicNewsletter via Footer — kept for page-level overrides */
export function PhotoNewsletter({ title, subtitle }: PhotoNewsletterProps) {
  return <CinematicNewsletter title={title} subtitle={subtitle} />;
}
