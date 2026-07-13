import { cn } from "@/lib/utils";
import type { DecorSide } from "@/lib/page-decor";

interface PalmTreeDecorProps {
  side: DecorSide;
  className?: string;
  variant?: "section" | "page";
  /** light = cream sections, dark = navy sections */
  tone?: "light" | "dark";
}

function PalmSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M50 235V105"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M50 105C18 88 8 58 22 38C28 48 38 62 50 78"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M50 98C82 78 94 48 78 28C72 40 62 54 50 70"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M50 92C32 62 34 32 50 18C54 32 52 58 50 78"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M50 88C68 58 66 28 50 14C46 28 48 54 50 72"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M50 102C12 72 6 42 18 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M50 102C88 72 94 42 82 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PalmTreeDecor({
  side,
  className,
  variant = "section",
  tone = "light",
}: PalmTreeDecorProps) {
  const colorClass =
    tone === "dark" ? "text-white/10" : "text-gold/[0.12]";

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-0 select-none",
        colorClass,
        variant === "section"
          ? [
              "bottom-0 h-40 w-24 sm:h-48 sm:w-28 lg:h-56 lg:w-32",
              side === "left" ? "left-0 sm:left-2" : "right-0 sm:right-2",
            ]
          : [
              "h-52 w-32 sm:h-60 sm:w-36",
              side === "left"
                ? "left-2 top-32 lg:left-6 lg:top-40"
                : "right-2 top-[38rem] lg:right-6 lg:top-[44rem]",
            ],
        className,
      )}
      aria-hidden
    >
      <PalmSilhouette
        className={cn(
          "h-full w-full",
          side === "right" && "scale-x-[-1]",
        )}
      />
    </div>
  );
}
