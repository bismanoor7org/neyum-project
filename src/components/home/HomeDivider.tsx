/** Soft gradient bridge — luxury rhythm between homepage acts */
export function HomeDivider({
  variant = "light",
  to = "sand",
}: {
  variant?: "light" | "dark";
  /** Next section tone for seamless handoff */
  to?: "sand" | "ocean" | "coastal" | "cream" | "navy";
}) {
  const toClass =
    to === "sand"
      ? "to-sand"
      : to === "ocean"
        ? "to-ocean"
        : to === "coastal"
          ? "to-coastal"
          : to === "navy"
            ? "to-navy"
            : "to-cream";

  if (variant === "dark") {
    return (
      <div
        className="h-10 bg-gradient-to-b from-navy via-navy-deep/80 to-navy-deep lg:h-14"
        aria-hidden
      />
    );
  }

  return (
    <div
      className={`h-10 bg-gradient-to-b from-cream via-cream-alt/60 ${toClass} lg:h-14`}
      aria-hidden
    />
  );
}
