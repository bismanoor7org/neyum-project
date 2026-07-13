import { Plane, Shield, FileText, Building2, HeartPulse } from "lucide-react";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export type EntryGuideData = {
  arrivalProcess: string;
  immigrationProcess: string;
  customsInfo: string;
  airportInfo: string;
  healthRequirements: string;
  travelAdvice: string;
};

const SECTIONS = [
  { key: "arrivalProcess" as const, icon: Plane, title: "Arrival Process" },
  { key: "immigrationProcess" as const, icon: FileText, title: "Immigration" },
  { key: "customsInfo" as const, icon: Shield, title: "Customs" },
  { key: "airportInfo" as const, icon: Building2, title: "Airport Information" },
  { key: "healthRequirements" as const, icon: HeartPulse, title: "Health Requirements" },
  { key: "travelAdvice" as const, icon: FileText, title: "Travel Advice" },
];

export function EntryGuideContent({ guide }: { guide: EntryGuideData }) {
  return (
    <div className="card-luxury p-6 md:p-8">
      <p className={ds.eyebrowGold}>Official Entry Intelligence</p>
      <h2 className={cn(ds.headingCard, "mt-2 text-2xl")}>Fiji Entry Guide</h2>
      <p className="mt-2 text-sm text-foreground/60">
        Curated arrival, immigration, and customs guidance from our verified visa intelligence database.
      </p>

      <div className="mt-8 space-y-4">
        {SECTIONS.map(({ key, icon: Icon, title }) => {
          const body = guide[key];
          if (!body?.trim()) return null;
          return (
            <div
              key={key}
              className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card-surface)] p-4 md:p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-navy">{title}</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/65">
                  {body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
