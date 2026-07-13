import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/auth/admin-session";
import {
  mergeSupabaseCookies,
  updateSupabaseSession,
} from "@/lib/supabase/middleware";
import {
  getSupabaseAnonKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from "@/lib/supabase/config";
import {
  SUPPLIER_SESSION_COOKIE,
  verifySupplierSessionToken,
} from "@/lib/auth/supplier-session";
import {
  TRAVELLER_SESSION_COOKIE,
  verifyTravellerSessionToken,
} from "@/lib/auth/traveller-session";

const PUBLIC_ADMIN_PATHS = ["/admin/login"];
const PUBLIC_SUPPLIER_PATHS = ["/supplier/login"];
const PUBLIC_TRAVELLER_PATHS = ["/traveller/login"];

function isPublicPath(pathname: string, publicPaths: string[]): boolean {
  return publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function isAdminProtected(pathname: string): boolean {
  if (!pathname.startsWith("/admin")) return false;
  return !isPublicPath(pathname, PUBLIC_ADMIN_PATHS);
}

function isSupplierProtected(pathname: string): boolean {
  if (!pathname.startsWith("/supplier")) return false;
  return !isPublicPath(pathname, PUBLIC_SUPPLIER_PATHS);
}

function isConciergeProtected(pathname: string): boolean {
  return pathname === "/concierge" || pathname.startsWith("/concierge/");
}

function isTravellerProtected(pathname: string): boolean {
  if (pathname === "/dashboard" || pathname === "/profile") return true;
  if (!pathname.startsWith("/traveller")) return false;
  return !isPublicPath(pathname, PUBLIC_TRAVELLER_PATHS);
}

function redirectToLogin(request: NextRequest, loginPath: string): NextResponse {
  const loginUrl = new URL(loginPath, request.url);
  loginUrl.searchParams.set("returnUrl", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

async function hasCmsSupabaseStaff(
  request: NextRequest,
  response: NextResponse,
): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;
    const { data: profile } = await supabase
      .from("cms_profiles")
      .select("id, is_active")
      .eq("id", user.id)
      .maybeSingle();
    return Boolean(profile && profile.is_active !== false);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const supabaseResponse = await updateSupabaseSession(request);

  if (isAdminProtected(pathname) || isConciergeProtected(pathname)) {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const hasAdminCookie = Boolean(token && (await verifyAdminSessionToken(token)));
    const hasSupabaseStaff =
      !hasAdminCookie && (await hasCmsSupabaseStaff(request, supabaseResponse));

    if (!hasAdminCookie && !hasSupabaseStaff) {
      const response = redirectToLogin(request, "/admin/login");
      mergeSupabaseCookies(supabaseResponse, response);
      return response;
    }
    return supabaseResponse;
  }

  if (isSupplierProtected(pathname)) {
    const token = request.cookies.get(SUPPLIER_SESSION_COOKIE)?.value;
    if (!token || !(await verifySupplierSessionToken(token))) {
      const response = redirectToLogin(request, "/supplier/login");
      mergeSupabaseCookies(supabaseResponse, response);
      return response;
    }
    return supabaseResponse;
  }

  if (isTravellerProtected(pathname)) {
    const token = request.cookies.get(TRAVELLER_SESSION_COOKIE)?.value;
    if (!token) {
      const response = redirectToLogin(request, "/login");
      mergeSupabaseCookies(supabaseResponse, response);
      return response;
    }

    const session = await verifyTravellerSessionToken(token);
    if (!session) {
      const response = redirectToLogin(request, "/login");
      response.cookies.set(TRAVELLER_SESSION_COOKIE, "", { path: "/", maxAge: 0 });
      mergeSupabaseCookies(supabaseResponse, response);
      return response;
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/supplier/:path*",
    "/concierge/:path*",
    "/traveller/:path*",
    "/dashboard",
    "/profile",
  ],
};
