"use client";

import { useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/shared/Section";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function WorldTimeWeatherError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[world-time-weather]", error);
  }, [error]);

  return (
    <PageLayout activeHref="/tools">
      <Section variant="cream" reveal={false}>
        <div className={ds.containerNarrow}>
          <div
            className="card-luxury flex flex-col items-center px-6 py-16 text-center"
            role="alert"
          >
            <AlertCircle className="h-12 w-12 text-coral" strokeWidth={1.25} aria-hidden />
            <h1 className={cn(ds.headingCard, "mt-6 text-2xl")}>
              Unable to load weather data
            </h1>
            <p className="mt-3 max-w-md text-sm text-foreground/65">
              Fiji conditions could not be fetched right now. Check your connection and try again.
            </p>
            <button
              type="button"
              onClick={reset}
              className={cn(ds.btnBase, ds.btnGold, "mt-8")}
            >
              <RefreshCw className="h-4 w-4" aria-hidden />
              Try again
            </button>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
