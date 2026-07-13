import { apiHandler, jsonOk } from "@/server/api/handler";
import { listSupportTickets } from "@/server/services/admin-data.service";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const status = url.searchParams.get("status") ?? undefined;
  const tickets = await listSupportTickets(status as never);
  return jsonOk(tickets);
}, "support:read");
