"use client";

import Link from "next/link";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import type { EnquiryRecord } from "@/lib/enquiry/types";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function sourceLabel(record: EnquiryRecord) {
  if (record.source === "booking" && record.bookingTab) {
    return `Booking · ${record.bookingTab}`;
  }
  return record.source;
}

export function EnquiriesInboxClient() {
  const { enquiries, status } = useAdmin();

  return (
    <>
      <AdminPageHeader
        title="Enquiries"
        subtitle="Every booking widget and contact form submission from the website."
      />

      {status === "loading" && (
        <p className="admin-text-muted text-sm">Loading enquiries…</p>
      )}

      {status === "ready" && enquiries.length === 0 && (
        <div className="admin-card rounded-2xl border border-dashed px-6 py-16 text-center">
          <p className="admin-text font-serif text-xl">No enquiries yet</p>
          <p className="admin-text-muted mt-2 text-sm">
            Submit a test from the{" "}
            <Link href="/" className="text-gold hover:underline">
              homepage booking widget
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-gold hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>
      )}

      {status === "ready" && enquiries.length > 0 && (
        <div className="space-y-4">
          <p className="admin-text-muted text-sm">
            {enquiries.length} enquiry{enquiries.length === 1 ? "" : "ies"} ·
            newest first
          </p>
          {enquiries.map((record) => (
            <article key={record.id} className="admin-card rounded-2xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="admin-text font-serif text-lg">
                    {record.firstName} {record.lastName}
                  </h2>
                  <a
                    href={`mailto:${record.email}?subject=Your Fiji enquiry`}
                    className="text-sm text-gold hover:underline"
                  >
                    {record.email}
                  </a>
                </div>
                <div className="admin-text-muted text-right text-xs">
                  <p>{formatDate(record.createdAt)}</p>
                  <p className="mt-1 font-medium uppercase tracking-wide">
                    {sourceLabel(record)} · {record.locale.toUpperCase()}
                  </p>
                </div>
              </div>
              <p className="admin-text-muted mt-4 whitespace-pre-wrap text-sm leading-relaxed">
                {record.message}
              </p>
              <p className="admin-text-subtle mt-3 text-[11px]">ID: {record.id}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
