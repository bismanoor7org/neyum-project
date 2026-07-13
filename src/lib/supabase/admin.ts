import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabaseUrl, isSupabaseConfigured } from "@/lib/supabase/config";

export function getSupabaseServiceRoleKey(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
}

export function isSupabaseAdminConfigured(): boolean {
  return isSupabaseConfigured() && Boolean(getSupabaseServiceRoleKey());
}

/** Server-only Supabase client that bypasses RLS for trusted admin APIs. */
export function createServiceRoleClient() {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceRoleKey();
  if (!url || !key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for CMS admin operations");
  }
  return createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
