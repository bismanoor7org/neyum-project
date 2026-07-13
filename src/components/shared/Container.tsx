import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  size?: "default" | "narrow" | "content";
}

export function Container({
  children,
  className,
  as: Tag = "div",
  size = "default",
}: ContainerProps) {
  const sizeClass =
    size === "narrow"
      ? ds.containerNarrow
      : size === "content"
        ? ds.containerContent
        : ds.container;

  return <Tag className={cn(sizeClass, className)}>{children}</Tag>;
}
