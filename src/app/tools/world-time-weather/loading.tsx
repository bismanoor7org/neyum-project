import { PageLayout } from "@/components/layout/PageLayout";
import { PageSkeleton } from "@/components/tools/world-time-weather/Skeletons";
import { Section } from "@/components/shared/Section";
import { ds } from "@/lib/design-system";

export default function WorldTimeWeatherLoading() {
  return (
    <PageLayout activeHref="/tools">
      <div className="border-b border-navy/8 bg-cream pt-4 pb-8 lg:pt-6 lg:pb-10" aria-hidden />
      <Section variant="cream" reveal={false}>
        <div className={ds.containerNarrow}>
          <PageSkeleton />
        </div>
      </Section>
    </PageLayout>
  );
}
