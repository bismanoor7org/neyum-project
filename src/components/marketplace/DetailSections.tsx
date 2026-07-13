"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  Check,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Users,
} from "lucide-react";
import { useT } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

interface DetailHeroProps {
  title: string;
  tagline: string;
  image?: string;
  imageAlt?: string;
  breadcrumb?: { label: string; href: string }[];
  meta?: { label: string; value: string }[];
  cta?: { label: string; href: string };
  children?: React.ReactNode;
  align?: "left" | "center";
  /** Solid navy banner — no photo, even if `image` is passed */
  variant?: "photo" | "solid";
}

export function DetailHero({
  title,
  tagline,
  image,
  imageAlt,
  breadcrumb,
  meta,
  cta,
  children,
  align = "left",
  variant = "photo",
}: DetailHeroProps) {
  const centered = align === "center";
  const showImage = variant === "photo" && Boolean(image);
  return (
    <section className="relative min-h-[65vh] overflow-hidden bg-navy-deep lg:min-h-[75vh]">
      {showImage && image && (
        <Image
          src={image}
          alt={imageAlt ?? title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}
      {showImage ? (
        <>
          <div className="gradient-hero-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/25" />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(212,175,55,0.12) 0%, transparent 50%), linear-gradient(135deg, #0a2228 0%, #0f2d35 50%, #0a2228 100%)",
          }}
        />
      )}

      <div
        className={cn(
          "relative mx-auto flex h-full min-h-[65vh] max-w-[84rem] flex-col justify-end px-6 pb-14 pt-36 lg:min-h-[75vh] lg:px-10 lg:pb-20 lg:pt-40",
          centered && "items-center text-center",
        )}
      >
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "mb-8 flex flex-wrap items-center gap-2 text-xs text-white/50",
              centered && "justify-center",
            )}
          >
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="inline-flex items-center gap-2">
                {i > 0 && <span className="text-white/30">/</span>}
                <Link href={crumb.href} className="transition-colors hover:text-gold">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </motion.nav>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={cn(
            ds.headingPage,
            "mt-4 text-white lg:text-[3.5rem]",
            centered && "max-w-3xl",
          )}
        >
          {title}
        </motion.h1>

        {meta && meta.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={cn("mt-6 flex flex-wrap gap-4", centered && "justify-center")}
          >
            {meta.map((m) => (
              <span
                key={m.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/80 backdrop-blur-sm"
              >
                <MapPin className="h-3.5 w-3.5 text-gold" />
                <strong className="font-medium text-white/50">{m.label}:</strong>{" "}
                {m.value}
              </span>
            ))}
          </motion.div>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className={cn(centered && "flex w-full justify-center")}
          >
            {children}
          </motion.div>
        )}

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={cn(centered && "flex justify-center")}
          >
            <Link
              href={cta.href}
              className={cn(ds.btnBase, ds.btnGold, "mt-10 inline-flex gap-2 px-9")}
            >
              {cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

interface DetailTrustStripProps {
  rating: { score: string; count: number };
  reviewsLabel: string;
  bestPriceLabel: string;
  freeCancellationLabel: string;
}

export function DetailTrustStrip({
  rating,
  reviewsLabel,
  bestPriceLabel,
  freeCancellationLabel,
}: DetailTrustStripProps) {
  const items = [
    {
      key: "rating",
      icon: Star,
      content: (
        <>
          <span className="font-semibold text-navy">{rating.score}</span>
          <span className="text-sm text-foreground/55">
            ({rating.count.toLocaleString()} {reviewsLabel})
          </span>
        </>
      ),
    },
    {
      key: "price",
      icon: BadgePercent,
      content: <span className="text-sm font-medium text-navy">{bestPriceLabel}</span>,
    },
    {
      key: "cancel",
      icon: ShieldCheck,
      content: (
        <span className="text-sm text-foreground/65">{freeCancellationLabel}</span>
      ),
    },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0"
    >
      {items.map(({ key, icon: Icon, content }, i) => (
        <div key={key} className="flex items-center gap-3 sm:gap-0">
          {i > 0 && (
            <span className="mx-5 hidden h-5 w-px bg-foreground/10 sm:block" aria-hidden />
          )}
          <div className="flex items-center gap-2.5 rounded-2xl border border-navy/[0.06] bg-white px-4 py-3 shadow-sm sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/[0.08]">
              <Icon
                className={cn(
                  "h-3.5 w-3.5 text-gold",
                  key === "rating" && "fill-gold",
                )}
                strokeWidth={1.5}
              />
            </span>
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">{content}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

interface DetailQuickFact {
  label: string;
  value: string;
  icon?: "location" | "duration" | "category" | "price" | "ages";
}

const quickFactIcons = {
  location: MapPin,
  duration: Clock,
  category: Tag,
  price: BadgePercent,
  ages: Users,
} as const;

export function DetailQuickFacts({ facts }: { facts: DetailQuickFact[] }) {
  if (facts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      {facts.map((fact) => {
        const Icon = fact.icon ? quickFactIcons[fact.icon] : MapPin;
        return (
          <div
            key={fact.label}
            className="rounded-2xl border border-navy/[0.06] bg-white px-5 py-4 shadow-[var(--shadow-card)]"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/45">
              {fact.label}
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-navy">
              <Icon className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.5} />
              <span>{fact.value}</span>
            </p>
          </div>
        );
      })}
    </motion.div>
  );
}

interface DetailBookingCardProps {
  priceFrom: string;
  fromLabel: string;
  bookHref: string;
  bookLabel: string;
  rating: { score: string; count: number };
  reviewsLabel: string;
  perks: string[];
  className?: string;
}

export function DetailBookingCard({
  priceFrom,
  fromLabel,
  bookHref,
  bookLabel,
  rating,
  reviewsLabel,
  perks,
  className,
}: DetailBookingCardProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("lg:sticky lg:top-28", className)}
    >
      <div className="overflow-hidden rounded-3xl border border-gold/15 bg-white shadow-[var(--shadow-card)]">
        <div className="border-b border-gold/10 bg-gradient-to-br from-gold/[0.08] via-white to-teal/[0.04] px-7 py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/45">
            {fromLabel}
          </p>
          <p className="mt-1 font-serif text-3xl tracking-tight text-navy">{priceFrom}</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-foreground/60">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="font-semibold text-navy">{rating.score}</span>
            <span>
              · {rating.count.toLocaleString()} {reviewsLabel}
            </span>
          </div>
        </div>
        <div className="space-y-5 px-7 py-6">
          <Link href={bookHref} className={cn(ds.btnBase, ds.btnGold, "w-full")}>
            {bookLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <ul className="space-y-2.5">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/60"
              >
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.aside>
  );
}

interface ContentBlockProps {
  title: string;
  items: string[];
  variant?: "default" | "checklist" | "timeline" | "highlights";
}

function parseTimelineItem(item: string) {
  const colon = item.indexOf(":");
  if (colon > 0 && colon < 24) {
    return { label: item.slice(0, colon).trim(), body: item.slice(colon + 1).trim() };
  }
  return { label: null, body: item };
}

export function ContentBlock({
  title,
  items,
  variant = "default",
}: ContentBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group rounded-3xl border border-navy/[0.06] bg-white p-7 shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-500",
        variant !== "highlights" && "hover:border-gold/20 hover:shadow-[var(--shadow-card-hover)]",
      )}
    >
      <h3 className={cn(ds.headingCard, "transition-colors group-hover:text-teal")}>
        {title}
      </h3>

      {variant === "highlights" ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-gold/10 bg-gold/[0.04] px-4 py-3.5"
            >
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.5} />
              <span className="text-sm font-medium leading-snug text-navy/85">{item}</span>
            </div>
          ))}
        </div>
      ) : variant === "timeline" ? (
        <ol className="relative mt-6 space-y-0">
          {items.map((item, i) => {
            const { label, body } = parseTimelineItem(item);
            const isLast = i === items.length - 1;
            return (
              <li key={item} className="relative flex gap-4 pb-6 last:pb-0">
                {!isLast && (
                  <span
                    className="absolute left-[15px] top-8 bottom-0 w-px bg-gradient-to-b from-gold/40 to-gold/10"
                    aria-hidden
                  />
                )}
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.1] font-serif text-sm text-navy">
                  {i + 1}
                </span>
                <div className="min-w-0 pt-0.5">
                  {label ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold">
                      {label}
                    </p>
                  ) : null}
                  <p className="text-sm leading-relaxed text-foreground/70">{body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-foreground/70">
              {variant === "checklist" ? (
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/[0.12]">
                  <Check className="h-3 w-3 text-gold" strokeWidth={2.5} />
                </span>
              ) : (
                <span className="mt-2 h-1 w-4 shrink-0 rounded-full bg-gold/70" />
              )}
              {item}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

interface RelatedCardsProps {
  title: string;
  items: { title: string; href: string; image: string }[];
  centered?: boolean;
}

export function RelatedCards({ title, items, centered }: RelatedCardsProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className={cn(ds.headingSection, "mb-8", centered && "text-center")}>{title}</h2>
      <div className={cn(centered && "flex justify-center")}>
        <div
          className={cn(
            "grid w-full gap-6",
            centered
              ? cn(
                  items.length === 1 && "max-w-sm grid-cols-1",
                  items.length === 2 && "max-w-2xl grid-cols-1 sm:grid-cols-2",
                  items.length >= 3 && "max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                )
              : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
            >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="gradient-card-overlay absolute inset-0 opacity-60" />
            </div>
            <div className="flex items-center justify-between p-5">
              <h3 className="font-serif text-lg text-navy">{item.title}</h3>
              <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}

interface InquiryCTAProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
  bookHref?: string;
  bookLabel?: string;
}

export function InquiryCTA({
  title,
  subtitle,
  compact = false,
  bookHref,
  bookLabel,
}: InquiryCTAProps) {
  const t = useT();
  const resolvedTitle = title ?? t.detail.readyToPlan;
  const resolvedSubtitle = subtitle ?? t.detail.readyToPlanSub;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl text-center",
        compact ? "px-6 py-10" : "px-8 py-14 lg:px-16",
      )}
    >
      <div className="relative">
        <h2
          className={cn(
            "font-serif text-navy",
            compact ? "text-2xl" : "text-3xl lg:text-4xl",
          )}
        >
          {resolvedTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] text-foreground/65">
          {resolvedSubtitle}
        </p>
        <div className={cn("flex flex-wrap justify-center gap-4", compact ? "mt-6" : "mt-8")}>
          {bookHref ? (
            <Link href={bookHref} className={cn(ds.btnBase, ds.btnGold, "px-8")}>
              {bookLabel ?? t.detail.bookExperience}
            </Link>
          ) : (
            <Link href="/contact" className={cn(ds.btnBase, ds.btnGold, "px-8")}>
              {t.detail.requestItinerary}
            </Link>
          )}
          <Link
            href="/guides/travel-planning"
            className={cn(ds.btnBase, ds.btnGhost, "px-8")}
          >
            {t.detail.travelPlanningHub}
          </Link>
        </div>
      </div>
    </div>
  );
}
