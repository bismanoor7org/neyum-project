import Link from "next/link";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

type ButtonVariant = "gold" | "navy" | "teal" | "ghost" | "outline-gold" | "outline-white";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  gold: ds.btnGold,
  navy: ds.btnNavy,
  teal: "bg-teal text-navy-deep hover:brightness-[1.03] hover:shadow-[0_4px_16px_rgba(45,212,191,0.2)]",
  ghost: ds.btnGhost,
  "outline-gold": ds.btnOutlineGold,
  "outline-white": "border border-white/60 bg-transparent text-white hover:bg-white/10",
};

/** Pill buttons — Home page source of truth */
export function Button({
  variant = "gold",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(ds.btnBase, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
