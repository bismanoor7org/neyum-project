import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

interface ArrowCircleButtonProps {
  className?: string;
  visible?: "always" | "hover";
}

/** White circle + arrow on Home experience cards */
export function ArrowCircleButton({
  className,
  visible = "always",
}: ArrowCircleButtonProps) {
  return (
    <div
      className={cn(
        ds.arrowCircle,
        visible === "hover" && "opacity-0 transition-opacity group-hover:opacity-100",
        className,
      )}
    >
      <ArrowRight className="h-4 w-4" />
    </div>
  );
}
