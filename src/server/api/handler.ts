import { NextResponse } from "next/server";
import { ZodError } from "zod";
import type { ActivityModule, Prisma } from "@prisma/client";
import { AppError } from "@/server/errors";
import type { AuthContext, SupplierAuthContext, TravellerAuthContext } from "@/server/auth/context";
import { requireAdmin, requireAuth, requirePermission, requireSupplierPermission, requireTravellerPermission } from "@/server/auth/context";
import type { Permission } from "@/lib/auth/permissions";
import { logActivity } from "@/server/services/activity-log.service";
import { assertEnterpriseCmsAccess } from "@/server/auth/cms-rbac-guard";

type HandlerContext = {
  request: Request;
  auth: AuthContext;
  params: Record<string, string>;
};

type SupplierHandlerContext = {
  request: Request;
  auth: SupplierAuthContext;
  params: Record<string, string>;
};

type TravellerHandlerContext = {
  request: Request;
  auth: TravellerAuthContext;
  params: Record<string, string>;
};

type RouteHandler = (ctx: HandlerContext) => Promise<Response>;
type SupplierRouteHandler = (ctx: SupplierHandlerContext) => Promise<Response>;
type TravellerRouteHandler = (ctx: TravellerHandlerContext) => Promise<Response>;

type Guard = "auth" | "admin" | Permission;

export function travellerApiHandler(handler: TravellerRouteHandler, permission: Permission) {
  return async (
    request: Request,
    context?: { params?: Promise<Record<string, string>> },
  ) => {
    try {
      const params = (await context?.params) ?? {};
      const auth = await requireTravellerPermission(request, permission);
      return await handler({ request, auth, params });
    } catch (error) {
      return toErrorResponse(error);
    }
  };
}

export function supplierApiHandler(handler: SupplierRouteHandler, permission: Permission) {
  return async (
    request: Request,
    context?: { params?: Promise<Record<string, string>> },
  ) => {
    try {
      const params = (await context?.params) ?? {};
      const auth = await requireSupplierPermission(request, permission);
      return await handler({ request, auth, params });
    } catch (error) {
      return toErrorResponse(error);
    }
  };
}

export function apiHandler(handler: RouteHandler, guard: Guard = "admin") {
  return async (
    request: Request,
    context?: { params?: Promise<Record<string, string>> },
  ) => {
    try {
      const params = (await context?.params) ?? {};
      let auth: AuthContext;

      if (guard === "auth") {
        auth = await requireAuth(request);
      } else if (guard === "admin") {
        auth = await requireAdmin(request);
      } else {
        auth = await requirePermission(request, guard);
        if (guard.startsWith("cms:")) {
          assertEnterpriseCmsAccess(auth, guard);
        }
      }

      return await handler({ request, auth, params });
    } catch (error) {
      return toErrorResponse(error);
    }
  };
}

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

export function jsonCreated<T>(data: T) {
  return jsonOk(data, 201);
}

export function jsonError(message: string, status: number, code?: string) {
  return NextResponse.json({ ok: false, error: message, code }, { status });
}

type CheckoutHandlerContext = {
  request: Request;
  params: Record<string, string>;
  travelerId: string | null;
};

type CheckoutRouteHandler = (ctx: CheckoutHandlerContext) => Promise<Response>;

export function checkoutApiHandler(handler: CheckoutRouteHandler) {
  return async (
    request: Request,
    context?: { params?: Promise<Record<string, string>> },
  ) => {
    try {
      const params = (await context?.params) ?? {};
      const { resolveAuthContext } = await import("@/server/auth/context");
      const auth = await resolveAuthContext(request);
      const travelerId = auth?.role === "TRAVELER" ? auth.user.id : null;
      return await handler({ request, params, travelerId });
    } catch (error) {
      return toErrorResponse(error);
    }
  };
}

function toErrorResponse(error: unknown) {
  if (error instanceof AppError) {
    return jsonError(error.message, error.statusCode, error.code);
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        code: "VALIDATION_ERROR",
        details: error.flatten(),
      },
      { status: 400 },
    );
  }

  console.error("[api]", error);
  return jsonError("Internal server error", 500, "INTERNAL_ERROR");
}

export async function withActivity(
  auth: AuthContext,
  action: string,
  module: ActivityModule,
  entityId?: string,
  metadata?: Prisma.InputJsonValue,
) {
  await logActivity({
    userId: auth.user.id,
    action,
    module,
    entityId,
    metadata,
  });
}
