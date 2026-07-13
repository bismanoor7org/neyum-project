/**
 * Ultra-premium design tokens — luxury travel aesthetic.
 */
export const ds = {
  /* Layout */
  container: "mx-auto max-w-[84rem] px-6 lg:px-10",
  containerNarrow: "mx-auto max-w-5xl px-6 lg:px-10",
  containerContent: "mx-auto max-w-3xl px-6 lg:px-10",
  section: "section-cream",
  sectionCompact: "section-cream-compact",
  sectionAlt: "section-sand",
  sectionNavy: "section-navy",
  gridGap: "gap-5",
  gridGapLg: "gap-8",

  /* Hero */
  heroSection: "relative min-h-[100svh] overflow-hidden",
  heroInner:
    "relative mx-auto flex max-w-[84rem] flex-col justify-end px-6 pb-20 pt-32 sm:pb-24 sm:pt-36 lg:px-10 lg:pb-28 lg:pt-40",
  heroGradient: "gradient-hero-overlay absolute inset-0",
  heroGradientBottom:
    "absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/20",
  heroEyebrow:
    "inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/95 backdrop-blur-md",
  heroTrust:
    "mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/75",
  heroStatCard:
    "rounded-2xl border border-white/15 bg-white/10 px-6 py-5 backdrop-blur-xl",

  /* Navigation */
  navHeight: "h-[52px]",
  navLink:
    "text-[13px] font-medium tracking-[0.04em] transition-colors duration-300",
  navLinkActive: "text-gold",
  navLinkLight: "text-navy/82 hover:text-navy",
  navLinkTransparent: "text-navy/88 hover:text-gold",
  navIcon: "h-4 w-4",
  navIconStroke: 1.5,
  navDivider: "mx-1.5 h-5 w-px bg-navy/12",
  navDividerLight: "mx-1.5 h-5 w-px bg-navy/12",
  navLang: "flex items-center gap-1 text-[12px] font-medium",
  navCta:
    "fiji-nav-pill-btn fiji-nav-pill-btn--gold",

  /* Border radius */
  radiusCard: "rounded-3xl",
  radiusWidget: "rounded-3xl",
  radiusInput: "rounded-xl",
  radiusPill: "rounded-full",

  /* Shadows */
  shadowCard: "shadow-[var(--shadow-card)]",
  shadowCardHover: "shadow-[var(--shadow-card-hover)]",
  cardLuxury: "card-luxury",
  cardLuxuryInteractive: "card-luxury-interactive",
  shadowWidget: "shadow-[var(--shadow-widget)]",

  /* Typography */
  headingHero:
    "font-serif text-[2.75rem] leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[4rem]",
  headingPage: "font-serif text-4xl tracking-tight text-navy md:text-5xl lg:text-[3.25rem]",
  headingSection: "heading-section",
  headingDisplay: "heading-display",
  headingCard: "font-serif text-xl tracking-tight text-navy",
  headingCardLight: "font-serif text-xl tracking-tight text-white",
  body: "text-[15px] leading-[1.75] text-foreground/65",
  bodyLight: "text-[15px] leading-relaxed text-white/90",
  eyebrowGold: "eyebrow-gold",
  eyebrowTeal:
    "text-[11px] font-semibold uppercase tracking-[0.28em] text-teal",
  linkGold: "text-sm font-medium text-gold transition-colors hover:text-gold-light",
  linkGoldArrow:
    "inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-colors hover:text-gold-light",

  /* Buttons */
  btnBase:
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300",
  btnGold:
    "bg-gold text-navy shadow-[0_4px_16px_rgba(212,175,55,0.18)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.24)] hover:brightness-[1.02]",
  btnNavy: "bg-navy text-white hover:bg-navy-light",
  btnGhost:
    "border border-[var(--border)] bg-white text-navy hover:border-gold/40 hover:bg-[var(--hover-bg)]",
  btnOutlineGold:
    "border border-gold/50 bg-white text-gold hover:border-gold hover:bg-gold/5",

  /* Card overlays */
  gradientCard: "gradient-card-overlay",
  gradientCardStrong: "bg-gradient-to-t from-navy/95 via-navy/30 to-transparent",

  /* Booking widget */
  widget:
    "w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-7 text-navy shadow-[var(--shadow-card)]",
  widgetField:
    "rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-3.5 text-sm text-navy/80",

  /* Email inputs */
  emailPillDark:
    "flex items-center rounded-full border border-white/20 bg-navy/80 p-1 backdrop-blur-sm",
  emailPillFooter:
    "flex items-center rounded-full border border-white/25 bg-white/8 p-1 backdrop-blur-sm",
  emailInput:
    "flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/45 focus:outline-none",
  emailSubmitGold:
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-navy transition-all hover:brightness-110",
  emailSubmitWhite:
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-navy transition-opacity hover:opacity-90",

  arrowCircle:
    "flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-sm",

  infoCard:
    "rounded-3xl border border-[var(--border)] bg-[var(--card-elevated)] p-7 shadow-[var(--shadow-card)]",
  infoCardIcon:
    "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/8",

  masonryGrid:
    "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-8",
  categoryGrid:
    "grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-6 xl:gap-5",
  grid2: "grid gap-6 md:grid-cols-2",
  grid3: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3",
  grid4: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
  filterSelect:
    "rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-navy shadow-sm",
} as const;
