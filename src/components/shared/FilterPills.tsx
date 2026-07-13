import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";
import { Container } from "./Container";

type FilterAccent = "gold" | "navy" | "teal";

interface FilterPill {
  label: string;
  active?: boolean;
}

interface FilterPillsProps {
  items: FilterPill[];
  accent?: FilterAccent;
  className?: string;
  barClassName?: string;
  centered?: boolean;
  onSelect?: (label: string) => void;
}

const activeStyles: Record<FilterAccent, string> = {
  gold: "bg-gold text-white",
  navy: "bg-navy text-white",
  teal: "bg-teal text-white",
};

const inactiveStyles: Record<FilterAccent, string> = {
  gold: "border border-gold bg-white text-gold",
  navy: "border border-foreground/15 bg-white text-navy",
  teal: "border border-gold bg-transparent text-gold",
};

/** Pill filter bar — Home / Deals / Things to Do pattern */
export function FilterPills({
  items,
  accent = "gold",
  className,
  barClassName,
  centered = true,
  onSelect,
}: FilterPillsProps) {
  return (
    <section className={cn("border-b border-foreground/10 bg-cream pt-8", barClassName)}>
      <Container
        className={cn(
          "flex flex-wrap gap-2 pb-8 sm:gap-3",
          centered && "justify-center",
          className,
        )}
      >
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onSelect?.(item.label)}
            className={cn(
              ds.radiusPill,
              "px-4 py-2 text-sm font-medium sm:px-6 sm:py-2.5",
              item.active ? activeStyles[accent] : inactiveStyles[accent],
            )}
          >
            {item.label}
          </button>
        ))}
      </Container>
    </section>
  );
}
