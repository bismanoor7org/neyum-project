import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import {
  listSettlements,
  markSettlementPaid,
} from "@/server/services/admin-data.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const supplierId = url.searchParams.get("supplierId") ?? undefined;
  const settlements = await listSettlements(supplierId);
  return jsonOk(settlements);
}, "settlements:read");

export const PATCH = apiHandler(async ({ request, auth }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const action = url.searchParams.get("action");

  if (!id) {
    return Response.json({ ok: false, error: "Settlement id required" }, { status: 400 });
  }

  if (action === "mark-paid") {
    const settlement = await markSettlementPaid(id);
    await withActivity(auth, "settlement.paid", "SETTLEMENTS", id);
    return jsonOk(settlement);
  }

  return Response.json({ ok: false, error: "Unknown action" }, { status: 400 });
}, "settlements:pay");
