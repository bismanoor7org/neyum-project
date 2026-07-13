"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Clock, Headphones, Mail, Phone, ShieldCheck } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ConciergeEnquiryForm } from "@/components/forms/ConciergeEnquiryForm";
import { InquiryCTA } from "@/components/marketplace/DetailSections";
import { Container, PageHero, Section } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import type { BookingTab } from "@/lib/enquiry/types";
import { images } from "@/lib/images";
import { ds } from "@/lib/design-system";

const BOOKING_TABS = new Set<BookingTab>(["stay", "experiences", "packages"]);

function parseBookingTab(value: string | null): BookingTab | null {
  if (!value || !BOOKING_TABS.has(value as BookingTab)) return null;
  return value as BookingTab;
}

export function ContactPageClient() {
  const t = useT();
  const searchParams = useSearchParams();
  const bookingTab = parseBookingTab(searchParams.get("tab"));
  const fromBooking = searchParams.get("source") === "booking";
  const fromJourney = searchParams.get("source") === "journey";

  const defaultMessage = useMemo(() => {
    if (fromJourney) {
      const message = searchParams.get("message");
      return message ? decodeURIComponent(message) : "";
    }
    if (!fromBooking || !bookingTab) return "";
    if (bookingTab === "stay") return t.booking.enquiryStay;
    if (bookingTab === "experiences") return t.booking.enquiryExperiences;
    return t.booking.enquiryPackages;
  }, [bookingTab, fromBooking, fromJourney, searchParams, t]);

  const trustItems = [
    { icon: Headphones, title: t.trustBar.conciergeTitle, desc: t.trustBar.conciergeDesc },
    { icon: ShieldCheck, title: t.trustBar.bookingTitle, desc: t.trustBar.bookingDesc },
    { icon: Clock, title: t.common.replyWithinDay, desc: t.trustBar.priceDesc },
  ];

  return (
    <PageLayout activeHref="/contact" stickyCta >
      <PageHero
        image={images.heroHome}
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        breadcrumbs={[
          { label: t.common.home, href: "/" },
          { label: t.nav.contact },
        ]}
        align="center"
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="space-y-6">
              <div className="rounded-2xl border border-foreground/8 bg-white p-7 shadow-[var(--shadow-card)]">
                <h2 className={ds.headingCard}>{t.contact.preferTalkTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                  {t.contact.preferTalkSub}
                </p>
                <div className="mt-6 space-y-4">
                  <a
                    href="tel:+6790000000"
                    className="flex items-center gap-3 rounded-xl border border-foreground/8 px-4 py-3.5 transition-colors hover:border-gold/30 hover:bg-gold/5"
                  >
                    <Phone className="h-4 w-4 text-gold" />
                    <span className="text-sm font-medium text-navy">{t.concierge.phone}</span>
                  </a>
                  <a
                    href="mailto:concierge@fiji.travel"
                    className="flex items-center gap-3 rounded-xl border border-foreground/8 px-4 py-3.5 transition-colors hover:border-gold/30 hover:bg-gold/5"
                  >
                    <Mail className="h-4 w-4 text-gold" />
                    <span className="text-sm font-medium text-navy">concierge@fiji.travel</span>
                  </a>
                </div>
              </div>

              {trustItems.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-2xl border border-foreground/6 bg-cream-alt p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                    <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground/60">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <ConciergeEnquiryForm
              source={fromJourney ? "journey" : fromBooking ? "booking" : "contact"}
              bookingTab={bookingTab}
              defaultMessage={defaultMessage}
              className="h-fit"
            />
          </div>

          <div className="mt-20">
            <InquiryCTA compact />
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
