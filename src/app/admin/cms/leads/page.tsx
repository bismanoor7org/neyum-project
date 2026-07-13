"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { PageHeader, Toolbar, SearchInput } from "@/components/admin/ui/AdminUi";
import type { EnquiryRecord } from "@/lib/enquiry/types";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(
    new Date(iso),
  );
}

const SOURCE_LABELS: Record<string, string> = {
  contact: "Contact form",
  booking: "Booking widget",
  newsletter: "Newsletter",
};

export default function CmsLeadsPage() {
  const [leads, setLeads] = useState<EnquiryRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/enquiry", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setLeads(j.enquiries ?? j.data ?? []))
      .catch(() => setLeads([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = leads.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.email.toLowerCase().includes(q) ||
      l.firstName.toLowerCase().includes(q) ||
      l.lastName.toLowerCase().includes(q) ||
      l.message.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <PageHeader
        title="Lead Management"
        subtitle="Concierge enquiries from contact forms, booking widgets and newsletter signups."
      />
      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search leads by name, email…" />
      </Toolbar>

      {loading && <p className="admin-text-subtle text-sm">Loading leads…</p>}

      {!loading && filtered.length === 0 && (
        <div className="admin-card rounded-xl border border-dashed px-6 py-16 text-center">
          <p className="admin-text font-serif text-xl">No leads yet</p>
          <p className="admin-text-subtle mt-2 text-sm">
            Test via the{" "}
            <Link href="/contact" className="text-gold hover:underline">contact page</Link> or homepage booking widget.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {filtered.map((lead) => (
          <article key={lead.id} className="admin-card rounded-xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="admin-text font-semibold">
                  {lead.firstName} {lead.lastName}
                </p>
                <p className="admin-text-subtle mt-1 flex items-center gap-2 text-sm">
                  <Mail className="h-3.5 w-3.5" />
                  <a href={`mailto:${lead.email}`} className="hover:text-gold">{lead.email}</a>
                </p>
              </div>
              <div className="text-right text-xs">
                <span className="rounded-full bg-gold/10 px-2 py-1 text-gold">
                  {SOURCE_LABELS[lead.source] ?? lead.source}
                </span>
                <p className="admin-text-subtle mt-2">{formatDate(lead.createdAt)}</p>
              </div>
            </div>
            <p className="admin-text-subtle mt-4 whitespace-pre-wrap text-sm leading-relaxed">{lead.message}</p>
            {lead.bookingTab && (
              <p className="admin-text-subtle mt-2 text-xs">Booking interest: {lead.bookingTab}</p>
            )}
            <div className="mt-4 flex gap-2">
              <a
                href={`mailto:${lead.email}?subject=Your Fiji journey enquiry`}
                className="inline-flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-white"
              >
                <Phone className="h-3 w-3" />
                Reply via email
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
