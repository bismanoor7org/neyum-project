import { cn } from "@/lib/utils";

type NavAiBadgeIconProps = {
  className?: string;
};

/** Gold "AI" badge — matches luxury nav visa dropdown mockup */
export function NavAiBadgeIcon({ className }: NavAiBadgeIconProps) {
  return (
    <span
      className={cn(
        "nav-visa-ai-badge flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg border border-gold/35 bg-gold/12 text-[10px] font-bold tracking-wide text-gold",
        className,
      )}
      aria-hidden
    >
      AI
    </span>
  );
}
