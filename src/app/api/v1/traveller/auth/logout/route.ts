import { NextResponse } from "next/server";
import { TRAVELLER_SESSION_COOKIE } from "@/lib/auth/traveller-session";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(TRAVELLER_SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
