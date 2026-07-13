import { jsonOk, supplierApiHandler } from "@/server/api/handler";
import { getSupplierDashboard } from "@/server/services/supplier-dashboard.service";

export const GET = supplierApiHandler(async ({ auth }) => {
  const data = await getSupplierDashboard(auth.supplierId);
  return jsonOk(data);
}, "dashboard:read");
