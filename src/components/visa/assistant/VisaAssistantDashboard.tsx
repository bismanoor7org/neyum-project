"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";
import { VisaResultCard } from "@/components/visa/VisaResultCard";
import { LeadForm } from "@/components/visa/LeadForm";
import { VisaReadinessScore } from "@/components/visa/assistant/VisaReadinessScore";
import { VisaDocumentTracker } from "@/components/visa/assistant/VisaDocumentTracker";
import { VisaAssistantChecklist } from "@/components/visa/assistant/VisaAssistantChecklist";
import { VisaAssistantChat } from "@/components/visa/assistant/VisaAssistantChat";
import { VisaTimeline } from "@/components/visa/assistant/VisaTimeline";
import { VisaRiskAnalysis } from "@/components/visa/assistant/VisaRiskAnalysis";
import { VisaAssistantTripRecs } from "@/components/visa/assistant/VisaAssistantTripRecs";
import { VisaGlassCard } from "@/components/visa/assistant/VisaGlassCard";
import type { VisaAssistantAnalysis } from "@/types/visa-assistant";
import type { VisaDocumentId } from "@/types/visa";

type VisaAssistantDashboardProps = {
  analysis: VisaAssistantAnalysis;
  checkedDocuments: VisaDocumentId[];
  onToggleDocument: (id: VisaDocumentId) => void;
};

export function VisaAssistantDashboard({
  analysis,
  checkedDocuments,
  onToggleDocument,
}: VisaAssistantDashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 lg:space-y-8"
    >
      <VisaGlassCard className="visa-card-pad overflow-hidden" delay={0}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/25 to-gold/8 ring-1 ring-gold/25">
              <Brain className="h-5 w-5 text-gold" aria-hidden />
            </span>
            <div>
              <p className="visa-section-label">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                AI Executive Summary
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-[1.75] text-navy/88">
                {analysis.aiSummary}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2 lg:max-w-xs lg:justify-end">
            {analysis.travelNotes.map((note) => (
              <span
                key={note}
                className="rounded-full border border-gold/20 bg-gold/8 px-3 py-1.5 text-[11px] font-medium leading-snug text-navy/75"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </VisaGlassCard>

      <VisaResultCard requirement={analysis.requirement} />

      <div className="visa-bento-grid visa-bento-grid--split">
        <VisaReadinessScore
          score={analysis.readinessScore}
          categories={analysis.readinessCategories}
        />
        <VisaRiskAnalysis level={analysis.riskLevel} reasons={analysis.riskReasons} />
      </div>

      <div className="visa-bento-grid visa-bento-grid--split">
        <VisaDocumentTracker
          required={analysis.requiredDocuments}
          recommended={analysis.recommendedDocuments}
          checked={checkedDocuments}
          onToggle={onToggleDocument}
        />
        <VisaAssistantChat
          intake={analysis.intake}
          nationalitySlug={analysis.requirement.country.slug}
        />
      </div>

      <VisaAssistantChecklist
        analysis={analysis}
        checked={checkedDocuments}
        onToggle={onToggleDocument}
      />

      <div className="visa-bento-grid visa-bento-grid--main">
        <VisaTimeline milestones={analysis.timeline} />
        <VisaAssistantTripRecs
          recommendations={analysis.tripRecommendations}
          countryName={analysis.requirement.country.name}
        />
      </div>

      <LeadForm requirement={analysis.requirement} />
    </motion.div>
  );
}
