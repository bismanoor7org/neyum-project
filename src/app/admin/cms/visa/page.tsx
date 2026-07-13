import Link from "next/link";
import { Globe2, FileText, BookOpen, ClipboardList } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { getVisaIntelligenceStats } from "@/server/services/visa-intelligence.service";

export default async function VisaIntelligenceHubPage() {
  let stats = { countries: 0, rules: 0, travelDocs: 0, hasEntryGuide: false };
  try {
    stats = await getVisaIntelligenceStats();
  } catch {
    // DB not configured yet
  }

  const cards = [
    {
      href: "/admin/cms/visa/countries",
      title: "Countries",
      description: "Manage nationalities and passport countries",
      count: stats.countries,
      icon: Globe2,
    },
    {
      href: "/admin/cms/visa/rules",
      title: "Visa Rules",
      description: "Visa type, stay duration, processing and entry conditions",
      count: stats.rules,
      icon: ClipboardList,
    },
    {
      href: "/admin/cms/visa/travel-documents",
      title: "Travel Documents",
      description: "Passport, tickets, funds and insurance requirements",
      count: stats.travelDocs,
      icon: FileText,
    },
    {
      href: "/admin/cms/visa/entry-guide",
      title: "Entry Guide",
      description: "Arrival, immigration, customs and health for Fiji",
      count: stats.hasEntryGuide ? 1 : 0,
      icon: BookOpen,
    },
  ];

  return (
    <>
      <PageHeader
        title="Visa Intelligence"
        subtitle="Production visa data — changes publish instantly to the website."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="admin-card rounded-xl p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-[var(--admin-text)]">{card.title}</p>
                  <p className="mt-1 text-sm text-[#64748b]">{card.description}</p>
                </div>
                <Icon className="h-5 w-5 shrink-0 text-gold" />
              </div>
              <p className="mt-4 text-2xl font-semibold text-navy">{card.count}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
