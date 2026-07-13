type PlainObject = Record<string, unknown>;

export function deepMerge<T extends PlainObject>(base: T, patch: PlainObject): T {
  const result = { ...base } as PlainObject;

  for (const [key, value] of Object.entries(patch)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof result[key] === "object" &&
      result[key] !== null &&
      !Array.isArray(result[key])
    ) {
      result[key] = deepMerge(result[key] as PlainObject, value as PlainObject);
    } else if (value !== undefined) {
      result[key] = value;
    }
  }

  return result as T;
}
