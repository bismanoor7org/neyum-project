"use client";

import { useCallback } from "react";

type ApiResponse<T> = { ok: boolean; data?: T; error?: string };

async function parseJson<T>(res: Response): Promise<ApiResponse<T>> {
  return res.json() as Promise<ApiResponse<T>>;
}

export function useCmsApi() {
  const get = useCallback(async <T>(path: string): Promise<T> => {
    const res = await fetch(`/api/v1/admin/cms${path}`, { credentials: "include" });
    const json = await parseJson<T>(res);
    if (!json.ok) throw new Error(json.error ?? "Request failed");
    return json.data as T;
  }, []);

  const post = useCallback(async <T>(path: string, body: unknown): Promise<T> => {
    const res = await fetch(`/api/v1/admin/cms${path}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await parseJson<T>(res);
    if (!json.ok) throw new Error(json.error ?? "Request failed");
    return json.data as T;
  }, []);

  const patch = useCallback(async <T>(path: string, body: unknown): Promise<T> => {
    const res = await fetch(`/api/v1/admin/cms${path}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await parseJson<T>(res);
    if (!json.ok) throw new Error(json.error ?? "Request failed");
    return json.data as T;
  }, []);

  const put = useCallback(async <T>(path: string, body: unknown): Promise<T> => {
    const res = await fetch(`/api/v1/admin/cms${path}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await parseJson<T>(res);
    if (!json.ok) throw new Error(json.error ?? "Request failed");
    return json.data as T;
  }, []);

  const upload = useCallback(async <T>(path: string, form: FormData): Promise<T> => {
    const res = await fetch(`/api/v1/admin/cms${path}`, {
      method: "POST",
      credentials: "include",
      body: form,
    });
    const json = await parseJson<T>(res);
    if (!json.ok) throw new Error(json.error ?? "Upload failed");
    return json.data as T;
  }, []);

  return { get, post, patch, put, upload };
}
