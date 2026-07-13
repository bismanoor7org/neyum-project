export type PageBuilderBlockType =
  | "hero"
  | "features"
  | "gallery"
  | "pricing"
  | "testimonials"
  | "faq"
  | "timeline"
  | "stats"
  | "cards"
  | "newsletter"
  | "banner"
  | "cta"
  | "richtext"
  | "columns"
  | "accordion"
  | "tabs"
  | "video"
  | "map"
  | "spacer"
  | "divider"
  | "html"
  | "custom";

export type PageBuilderBlock = {
  id: string;
  type: PageBuilderBlockType;
  hidden?: boolean;
  props: Record<string, unknown>;
};

export type PageBuilderSection = {
  id: string;
  name: string;
  hidden?: boolean;
  blocks: PageBuilderBlock[];
};

export const PAGE_BUILDER_SECTION_PRESETS: {
  type: PageBuilderBlockType;
  label: string;
  defaultProps: Record<string, unknown>;
}[] = [
  {
    type: "hero",
    label: "Hero",
    defaultProps: {
      eyebrow: "Fiji",
      title: "Bespoke island journeys",
      subtitle: "Curated luxury stays and experiences.",
      ctaLabel: "Plan your journey",
      ctaHref: "/destinations",
      image: "",
    },
  },
  {
    type: "features",
    label: "Features",
    defaultProps: { title: "Why travel with us", items: [] },
  },
  {
    type: "gallery",
    label: "Gallery",
    defaultProps: { images: [] },
  },
  {
    type: "testimonials",
    label: "Testimonials",
    defaultProps: { title: "Traveller stories", items: [] },
  },
  {
    type: "faq",
    label: "FAQ",
    defaultProps: { title: "Questions", items: [] },
  },
  {
    type: "stats",
    label: "Stats",
    defaultProps: { items: [{ label: "Islands", value: "300+" }] },
  },
  {
    type: "cta",
    label: "CTA Banner",
    defaultProps: {
      title: "Ready to go?",
      subtitle: "Talk to our Fiji concierge.",
      buttonLabel: "Contact",
      buttonHref: "/contact",
    },
  },
  {
    type: "newsletter",
    label: "Newsletter",
    defaultProps: { title: "Stay inspired", subtitle: "Monthly Fiji edits." },
  },
  {
    type: "richtext",
    label: "Rich text",
    defaultProps: { html: "<p></p>" },
  },
  {
    type: "spacer",
    label: "Spacer",
    defaultProps: { height: 48 },
  },
  {
    type: "divider",
    label: "Divider",
    defaultProps: {},
  },
];

export function createBlockId(): string {
  return `blk_${Math.random().toString(36).slice(2, 10)}`;
}

export function createSectionId(): string {
  return `sec_${Math.random().toString(36).slice(2, 10)}`;
}

export function createSectionFromPreset(type: PageBuilderBlockType): PageBuilderSection {
  const preset = PAGE_BUILDER_SECTION_PRESETS.find((p) => p.type === type);
  return {
    id: createSectionId(),
    name: preset?.label ?? type,
    hidden: false,
    blocks: [
      {
        id: createBlockId(),
        type,
        props: { ...(preset?.defaultProps ?? {}) },
      },
    ],
  };
}
