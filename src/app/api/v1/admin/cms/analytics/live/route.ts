import { apiHandler, jsonOk } from "@/server/api/handler";
import { getSiteSettings } from "@/server/services/cms-wp/content.service";
import { getEnterpriseCmsDashboard } from "@/server/services/cms/cms-dashboard.service";
import { listEnquiries } from "@/lib/enquiry/store";
import { computeEnquiryStats } from "@/lib/enquiry/stats";

function last7DayLeadSeries(createdAts: string[]) {
  const days: { label: string; value: number }[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("en-US", { weekday: "short" });
    const value = createdAts.filter((c) => c.slice(0, 10) === key).length;
    days.push({ label, value });
  }
  return days;
}

export const GET = apiHandler(async () => {
  const [settings, dashboard, enquiries] = await Promise.all([
    getSiteSettings().catch(() => ({}) as Record<string, unknown>),
    getEnterpriseCmsDashboard().catch(() => null),
    listEnquiries(500).catch(() => []),
  ]);

  const analytics = (settings.analytics ?? {}) as {
    gaId?: string;
    gscProperty?: string;
    clarityId?: string;
    connectedAt?: string;
  };

  const leadStats = computeEnquiryStats(enquiries);
  const leadSeries = last7DayLeadSeries(enquiries.map((e) => e.createdAt));

  const gaConfigured = Boolean(analytics.gaId?.trim());
  const gscConfigured = Boolean(analytics.gscProperty?.trim());
  const gaPropertyId = process.env.GA4_PROPERTY_ID?.trim();
  const hasGaServiceAuth = Boolean(
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
      process.env.GA4_SERVICE_ACCOUNT_JSON,
  );

  let gaLive: { sessions: { label: string; value: number }[]; note: string } | null = null;
  if (gaConfigured && gaPropertyId && hasGaServiceAuth) {
    gaLive = {
      sessions: leadSeries.map((d) => ({ ...d, value: 0 })),
      note: "GA4 Data API credentials detected — wire fetch in production with property access.",
    };
  }

  return jsonOk({
    connectors: {
      gaId: analytics.gaId ?? "",
      gscProperty: analytics.gscProperty ?? "",
      clarityId: analytics.clarityId ?? "",
      connectedAt: analytics.connectedAt ?? null,
      gaConfigured,
      gscConfigured,
      liveGaReady: Boolean(gaPropertyId && hasGaServiceAuth),
    },
    content: dashboard
      ? {
          publishedDestinations: dashboard.publishedDestinations,
          draftContent: dashboard.draftContent,
          destinations: dashboard.destinations,
          tours: dashboard.tours,
          deals: dashboard.deals,
          seoHealth: dashboard.seoHealth,
        }
      : null,
    leads: {
      ...leadStats,
      series: leadSeries,
    },
    traffic: gaLive ?? {
      sessions: leadSeries,
      note: gaConfigured
        ? "GA4 Measurement ID saved. Add GA4_PROPERTY_ID + service account for live sessions; showing lead activity as proxy."
        : "Save a GA4 Measurement ID in CMS Analytics connectors. Showing concierge lead activity.",
      source: gaConfigured ? "leads-proxy" : "leads-only",
    },
  });
}, "cms:read");
