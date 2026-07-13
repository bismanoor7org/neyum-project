export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export function actionError(error: unknown): ActionResult<never> {
  if (error instanceof Error) return { ok: false, error: error.message };
  return { ok: false, error: "Something went wrong" };
}

export function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function linesToList(value: string): string[] {
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function listToLines(items: string[] | undefined): string {
  return (items ?? []).join("\n");
}
