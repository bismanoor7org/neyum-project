"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Calendar,
  ClipboardCheck,
  FileCheck2,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { analyzeVisaViaApi } from "@/lib/ai/visa-assistant/client-api";
import type { VisaDocumentId } from "@/types/visa";
import type { VisaAssistantAnalysis, VisaAssistantIntake } from "@/types/visa-assistant";
import { VisaAssistantHero } from "@/components/visa/assistant/VisaAssistantHero";
import { VisaAssistantIntakeForm } from "@/components/visa/assistant/VisaAssistantIntake";
import { VisaAssistantDashboard } from "@/components/visa/assistant/VisaAssistantDashboard";
import { VisaAssistantFaq } from "@/components/visa/assistant/VisaAssistantHubExtras";
import { VisaCountrySelect } from "@/components/visa/VisaCountrySelect";
import { VisaGlassCard } from "@/components/visa/assistant/VisaGlassCard";
import { cn } from "@/lib/utils";

type FijiVisaAssistantProps = {
  initialSlug?: string;
  showHero?: boolean;
  variant?: "full" | "hub";
};

const DEFAULT_INTAKE: Partial<VisaAssistantIntake> = {
  purpose: "tourism",
  duration: "one_to_two_weeks",
  budget: "luxury",
};

const PREVIEW_FEATURES = [
  {
    icon: Brain,
    title: "AI Confidence Score",
    desc: "Real-time travel readiness across documents, eligibility, and risk.",
  },
  {
    icon: FileCheck2,
    title: "Document Intelligence",
    desc: "Personalised checklist with instant readiness recalculation.",
  },
  {
    icon: Calendar,
    title: "Smart Timeline",
    desc: "AI-generated preparation schedule for stress-free departure.",
  },
  {
    icon: ClipboardCheck,
    title: "Eligibility Insights",
    desc: "Visa status, stay limits, processing times, and risk analysis.",
  },
  {
    icon: MessageSquare,
    title: "AI Consultant Chat",
    desc: "Instant answers on entry rules, family travel, and finances.",
  },
  {
    icon: Sparkles,
    title: "Luxury Trip Ideas",
    desc: "Curated resorts and experiences matched to your profile.",
  },
] as const;

export function FijiVisaAssistant({
  initialSlug,
  showHero = true,
  variant = "full",
}: FijiVisaAssistantProps) {
  const router = useRouter();
  const [intake, setIntake] = useState<Partial<VisaAssistantIntake>>(DEFAULT_INTAKE);
  const [checkedDocuments, setCheckedDocuments] = useState<VisaDocumentId[]>([]);
  const [analyzed, setAnalyzed] = useState(false);
  const [analysis, setAnalysis] = useState<VisaAssistantAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const scrolledForAnalysis = useRef<string | null>(null);

  useEffect(() => {
    if (!initialSlug) return;
    fetch(`/api/v1/visa?slug=${encodeURIComponent(initialSlug)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        const req = json?.data;
        if (!req) return;
        setIntake((prev) => ({
          ...prev,
          nationality: req.country,
          departureCountry: prev.departureCountry ?? req.country,
          purpose: prev.purpose ?? "tourism",
          duration: prev.duration ?? "one_to_two_weeks",
        }));
        setAnalyzed(true);
      })
      .catch(() => undefined);
  }, [initialSlug]);

  useEffect(() => {
    if (
      !analyzed ||
      !intake.nationality ||
      !intake.departureCountry ||
      !intake.purpose ||
      !intake.duration
    ) {
      setAnalysis(null);
      setAnalysisError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setAnalysisError(null);

    analyzeVisaViaApi(intake as VisaAssistantIntake, checkedDocuments)
      .then((result) => {
        if (!cancelled) {
          if (result) {
            setAnalysis(result);
            setAnalysisError(null);
          } else {
            setAnalysis(null);
            setAnalysisError("No visa data found for this nationality. Try another country.");
          }
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setAnalysis(null);
          setAnalysisError(
            err instanceof Error ? err.message : "Visa analysis failed. Please try again.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [intake, checkedDocuments, analyzed]);

  useEffect(() => {
    if (!analysis || loading) return;
    const key = analysis.requirement.country.slug;
    if (scrolledForAnalysis.current === key) return;
    scrolledForAnalysis.current = key;

    const timer = window.setTimeout(() => {
      dashboardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 320);

    return () => window.clearTimeout(timer);
  }, [analysis, loading]);

  const patchIntake = useCallback((patch: Partial<VisaAssistantIntake>) => {
    setIntake((prev) => ({ ...prev, ...patch }));
    if (patch.nationality && initialSlug !== patch.nationality.slug) {
      router.replace(`/fiji-visa-for-${patch.nationality.slug}`, { scroll: false });
    }
  }, [initialSlug, router]);

  const toggleDocument = useCallback((id: VisaDocumentId) => {
    setCheckedDocuments((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );
  }, []);

  const runAnalysis = useCallback(() => {
    setAnalysisError(null);
    setAnalyzed(true);
    if (intake.nationality) {
      router.replace(`/fiji-visa-for-${intake.nationality.slug}`, { scroll: false });
    }
  }, [intake.nationality, router]);

  return (
    <div className="visa-ai-page">
      {showHero && (
        <VisaAssistantHero>
          <VisaAssistantIntakeForm
            intake={intake}
            onChange={patchIntake}
            onAnalyze={runAnalysis}
            loading={loading}
            tone="light"
            embedded
            centered
            error={analysisError}
          />
        </VisaAssistantHero>
      )}

      {!showHero && (
        <div className="visa-dashboard-shell visa-dashboard-shell--flat">
          <div className="visa-dashboard-inner">
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center"
              >
                <p className="visa-section-label justify-center">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  AI Fiji Visa Assistant
                </p>
                <h1 className="mt-3 font-serif text-3xl font-semibold text-navy sm:text-4xl lg:text-5xl">
                  Fiji Visa for {analysis.requirement.country.name}
                </h1>
              </motion.div>
            )}
            <VisaGlassCard className="mx-auto max-w-xl visa-card-pad">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Nationality
              </p>
              <VisaCountrySelect
                value={intake.nationality ?? null}
                onChange={(c) => patchIntake({ nationality: c, departureCountry: intake.departureCountry ?? c })}
              />
            </VisaGlassCard>
            <div className="mx-auto mt-6 w-full max-w-xl">
              <VisaAssistantIntakeForm
                intake={intake}
                onChange={patchIntake}
                onAnalyze={runAnalysis}
                loading={loading}
                tone="light"
                embedded
                centered
                error={analysisError}
              />
            </div>
          </div>
        </div>
      )}

      <div
        id="visa-dashboard"
        ref={dashboardRef}
        className={cn(
          "visa-dashboard-shell scroll-mt-28",
          showHero && variant === "hub" && "visa-dashboard-shell--overlap",
          !showHero && "visa-dashboard-shell--flat pt-0",
        )}
      >
        <div className="visa-dashboard-inner">
          <AnimatePresence mode="wait">
            {analyzed && analysis ? (
              <motion.div
                key={analysis.requirement.country.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="visa-dashboard-header">
                  <div>
                    <p className="visa-section-label">
                      <Brain className="h-3.5 w-3.5" aria-hidden />
                      Your Results
                    </p>
                    <h2 className="mt-2 font-serif text-2xl font-semibold text-navy sm:text-3xl">
                      {analysis.requirement.country.name} — Fiji Visa Intelligence
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-foreground/55">
                      Readiness score, documents, timeline, and concierge chat — personalised to your travel profile.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" aria-hidden />
                    Live AI results
                  </span>
                </div>

                <VisaAssistantDashboard
                  analysis={analysis}
                  checkedDocuments={checkedDocuments}
                  onToggleDocument={toggleDocument}
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <VisaGlassCard className="mx-auto max-w-3xl visa-card-pad text-center">
                  {loading ? (
                    <>
                      <div className="mx-auto h-12 w-12 rounded-2xl visa-shimmer" />
                      <p className="mt-6 font-serif text-xl text-navy">
                        Analysing immigration intelligence…
                      </p>
                      <p className="mt-2 text-sm text-foreground/55">
                        Cross-referencing eligibility rules, documents, and travel profile
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="visa-section-label justify-center">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden />
                        Ready when you are
                      </p>
                      <p className="mt-4 font-serif text-2xl text-navy sm:text-3xl">
                        {variant === "hub"
                          ? "Select your nationality above to unlock your dashboard"
                          : "Select your nationality to begin AI visa analysis"}
                      </p>
                      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-foreground/55">
                        Eligibility · Readiness score · Document checklist · Smart timeline · AI chat
                      </p>
                      {variant === "hub" && (
                        <Link
                          href="#visa-dashboard"
                          className="mt-5 inline-flex text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:text-gold/80"
                        >
                          Preview dashboard below ↓
                        </Link>
                      )}
                    </>
                  )}
                </VisaGlassCard>

                {!loading && (
                  <div className="visa-empty-preview mt-6">
                    {PREVIEW_FEATURES.map(({ icon: Icon, title, desc }, i) => (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + i * 0.05 }}
                        className="visa-empty-preview__card"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/12">
                          <Icon className="h-4 w-4 text-gold" strokeWidth={1.75} aria-hidden />
                        </span>
                        <h3 className="mt-3 text-sm font-semibold text-navy">{title}</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-foreground/55">{desc}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {variant === "hub" && <VisaAssistantFaq />}

          <p className="mt-12 text-center text-xs text-foreground/45">
            AI guidance only — verify with{" "}
            <a
              href="https://www.immigration.gov.fj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              Fiji Immigration
            </a>{" "}
            before travel.
          </p>
        </div>
      </div>
    </div>
  );
}
