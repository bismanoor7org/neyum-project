import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

/** Home — "Plan with confidence" icon + title + description */
export function InfoCard({ icon: Icon, title, description, className }: InfoCardProps) {
  return (
    <div className={cn("flex gap-4", className)}>
      <div className={ds.infoCardIcon}>
        <Icon className="h-5 w-5 text-gold" strokeWidth={1.25} />
      </div>
      <div>
        <h3 className={ds.headingCard}>{title}</h3>
        <p className={cn("mt-1", ds.body)}>{description}</p>
      </div>
    </div>
  );
}

/** Bordered variant used in some inner pages */
export function InfoCardBox({
  icon: Icon,
  title,
  description,
  className,
}: InfoCardProps) {
  return (
    <div className={cn(ds.infoCard, className)}>
      <Icon className="h-7 w-7 text-gold" strokeWidth={1.25} />
      <h3 className={cn("mt-4", ds.headingCard)}>{title}</h3>
      <p className={cn("mt-2", ds.body)}>{description}</p>
    </div>
  );
}
