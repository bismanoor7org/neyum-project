import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { CmsWpRole } from "@/lib/cms/wp-types";

export type CmsSupabaseStaff = {
  id: string;
  email: string;
  role: CmsWpRole;
};

/**
 * Optional Supabase Auth gate for CMS staff.
 * Returns staff profile when the request has a valid Supabase session
 * linked to an active cms_profiles row.
 */
export async function getCmsSupabaseStaff(
  _request?: NextRequest,
): Promise<CmsSupabaseStaff | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from("cms_profiles")
      .select("id, email, role, is_active")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile || profile.is_active === false) return null;
    return {
      id: profile.id as string,
      email: (profile.email as string) || user.email || "",
      role: profile.role as CmsWpRole,
    };
  } catch {
    return null;
  }
}
