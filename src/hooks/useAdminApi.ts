"use client";

import { useCallback, useEffect, useState } from "react";

type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string };

export function useAdminApi<T>(path: string, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(path, { credentials: "include" });
      const json = (await res.json()) as ApiResponse<T>;
      if (!json.ok) throw new Error("error" in json ? json.error : "Request failed");
      setData(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    refresh();
  }, [refresh, ...deps]);

  return { data, loading, error, refresh };
}

export async function adminPatch(path: string, body: unknown) {
  const res = await fetch(path, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? "Update failed");
  return json.data;
}
