"use client";

import { FijiVisaAssistant } from "@/components/visa/assistant/FijiVisaAssistant";

type VisaCheckerProps = {
  initialSlug?: string;
  showHero?: boolean;
};

/** Legacy export — now powered by AI Fiji Visa Assistant */
export function VisaChecker({ initialSlug, showHero = true }: VisaCheckerProps) {
  return <FijiVisaAssistant initialSlug={initialSlug} showHero={showHero} />;
}
