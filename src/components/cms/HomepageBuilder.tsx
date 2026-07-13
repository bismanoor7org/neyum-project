"use client";

import Link from "next/link";
import { LayoutTemplate, Plus } from "lucide-react";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

const BUILDER_BLOCKS = [
  { key: "hero", label: "Hero", description: "Cinematic headline, CTA and trust copy" },
  { key: "featured_destinations", label: "Featured destinations", description: "Handpicked island cards" },
  { key: "featured_experiences", label: "Featured experiences", description: "Tour grid section titles" },
  { key: "cta_primary", label: "Primary CTA", description: "Main conversion block" },
  { key: "cta_secondary", label: "Secondary CTA", description: "Newsletter or concierge CTA" },
  { key: "faq_preview", label: "FAQ preview", description: "Homepage FAQ teaser" },
  { key: "customer_stories", label: "Customer stories", description: "Testimonials section copy" },
] as const;

type SectionRow = {
  id: string;
  key?: string;
  title?: string;
  status?: string;
  sortOrder?: number;
};

export function HomepageBuilder({
  sections,
  onRefresh,
}: {
  sections: SectionRow[];
  onRefresh: () => void;
}) {
  const byKey = new Map(sections.map((s) => [s.key, s]));

  return (
    <div className="space-y-4">
      <p className="admin-text-subtle text-sm">
        Visual homepage builder — each block maps to a <code className="text-xs">HomepageSection</code> key.
        Publish blocks individually or schedule for later.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {BUILDER_BLOCKS.map((block) => {
          const existing = byKey.get(block.key);
          return (
            <div
              key={block.key}
              className="admin-card flex flex-col justify-between rounded-xl p-5"
            >
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <LayoutTemplate className="h-4 w-4 text-gold" />
                  <h3 className="admin-text font-semibold">{block.label}</h3>
                  {existing?.status && <StatusBadge status={existing.status} />}
                </div>
                <p className="admin-text-subtle text-sm">{block.description}</p>
                <p className="mt-2 font-mono text-[10px] text-[#94a3b8]">key: {block.key}</p>
              </div>
              <div className="mt-4 flex gap-2">
                {existing ? (
                  <Link
                    href={`/admin/cms/homepage/${existing.id}/edit`}
                    className="rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Edit block
                  </Link>
                ) : (
                  <Link
                    href={`/admin/cms/homepage/new?preset=${block.key}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-gold/30 px-3 py-1.5 text-xs font-medium text-gold"
                  >
                    <Plus className="h-3 w-3" />
                    Add block
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onRefresh}
        className="text-xs text-gold hover:underline"
      >
        Refresh builder
      </button>
    </div>
  );
}
