import type { LocationWeather } from "@/lib/tools/world-time-weather/types";
import { buildTravelInsights } from "@/lib/tools/world-time-weather/insights";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import { Compass, Globe2, Lightbulb, Thermometer, Timer } from "lucide-react";

const ICONS = [Timer, Globe2, Compass, Thermometer, Lightbulb];

interface TravelInsightsProps {
  location: LocationWeather;
}

export function TravelInsights({ location }: TravelInsightsProps) {
  const insights = buildTravelInsights(location);

  return (
    <div>
      <p className={ds.eyebrowGold}>Travel Insights</p>
      <h2 className={cn(ds.headingSection, "mt-2")}>Plan With Local Context</h2>
      <p className="mt-3 max-w-2xl text-sm text-foreground/65">
        Curated guidance on seasons, timezones, and conditions — tailored to your selected destination.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {insights.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <article
              key={item.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card-surface)] p-5 shadow-[var(--shadow-card)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/25 bg-gold/8">
                <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="mt-4 font-serif text-lg text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">{item.body}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
