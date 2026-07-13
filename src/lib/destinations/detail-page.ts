/** Shared layout rules — every `/destinations/[slug]` page uses the same section limits. */
export const DESTINATION_PAGE_LIMITS = {
  experiences: 6,
  tours: 4,
  stays: 6,
  packages: 4,
} as const;

export const DESTINATION_PACKAGES_GRID_CLASS =
  "mx-auto grid w-full max-w-[70rem] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8";
