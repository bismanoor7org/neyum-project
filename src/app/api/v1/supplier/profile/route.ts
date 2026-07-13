import { jsonOk, supplierApiHandler } from "@/server/api/handler";
import {
  getSupplierProfile,
  listSupplierReviews,
  listSupplierSettlements,
} from "@/server/services/supplier-dashboard.service";

export const GET = supplierApiHandler(async ({ auth, request }) => {
  const section = new URL(request.url).searchParams.get("section");

  if (section === "reviews") {
    return jsonOk(await listSupplierReviews(auth.supplierId));
  }
  if (section === "settlements" || section === "payments" || section === "finance") {
    return jsonOk(await listSupplierSettlements(auth.supplierId));
  }

  return jsonOk(await getSupplierProfile(auth.supplierId));
}, "settings:read");
