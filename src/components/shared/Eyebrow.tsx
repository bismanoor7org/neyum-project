import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

interface EyebrowProps {
  children: React.ReactNode;
  variant?: "gold" | "teal";
  className?: string;
}

export function Eyebrow({
  children,
  variant = "gold",
  className,
}: EyebrowProps) {
  return (
    <p
      className={cn(
        variant === "gold" ? ds.eyebrowGold : ds.eyebrowTeal,
        className,
      )}
    >
      {children}
    </p>
  );
}
