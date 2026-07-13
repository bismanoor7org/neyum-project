import { apiHandler, jsonOk } from "@/server/api/handler";
import { getUnreadNotificationCount, listNotifications } from "@/server/services/admin-data.service";

export const GET = apiHandler(async ({ auth }) => {
  const [notifications, unreadCount] = await Promise.all([
    listNotifications(auth.user.id),
    getUnreadNotificationCount(auth.user.id),
  ]);

  return jsonOk({ notifications, unreadCount });
}, "notifications:read");
