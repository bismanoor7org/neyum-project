/** Deep-merge content patches; arrays replace entirely when provided */
export function mergeContent<T extends object>(
  base: T,
  patch?: Partial<T>,
): T {
  if (!patch) return base;

  const result = { ...base } as Record<string, unknown>;

  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue;

    const baseVal = result[key];

    if (Array.isArray(value)) {
      result[key] = value;
    } else if (
      value &&
      typeof value === "object" &&
      baseVal &&
      typeof baseVal === "object" &&
      !Array.isArray(baseVal)
    ) {
      result[key] = mergeContent(
        baseVal as object,
        value as object,
      );
    } else {
      result[key] = value;
    }
  }

  return result as T;
}
