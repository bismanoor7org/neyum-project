import Link from "next/link";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ds } from "@/lib/design-system";

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="mb-6 text-sm text-foreground/50">
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 && <span className="mx-2">›</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-navy">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground/70">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/** @deprecated Use SectionHeader from @/components/shared */
export function SectionHeading({
  title,
  subtitle,
  action,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
  align?: "center" | "left";
}) {
  return (
    <SectionHeader
      title={title}
      eyebrow={subtitle}
      action={action}
      align={align === "left" ? "split" : "center"}
    />
  );
}

export { ds };
