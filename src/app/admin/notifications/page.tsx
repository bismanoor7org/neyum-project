"use client";

import { useState } from "react";
import {
  Bell,
  CreditCard,
  Map,
  RefreshCw,
  Store,
  CalendarCheck,
} from "lucide-react";
import { PageHeader, AdminButton } from "@/components/admin/ui/AdminUi";
import { notifications as initialNotifications } from "@/lib/admin/mock-data";
import { formatRelative } from "@/lib/admin/format";
import type { AdminNotification, NotificationType } from "@/lib/admin/types";
import { cn } from "@/lib/utils";

const TYPE_CONFIG: Record<
  NotificationType,
  { icon: typeof Bell; color: string; bg: string }
> = {
  booking: {
    icon: CalendarCheck,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  supplier: {
    icon: Store,
    color: "text-teal",
    bg: "bg-teal/10",
  },
  tour: {
    icon: Map,
    color: "text-gold",
    bg: "bg-gold/10",
  },
  payment: {
    icon: CreditCard,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  refund: {
    icon: RefreshCw,
    color: "text-red-600",
    bg: "bg-red-50",
  },
};

export default function NotificationsPage() {
  const [items, setItems] = useState<AdminNotification[]>(initialNotifications);
  const unread = items.filter((n) => !n.read);

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
    );
  };

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Real-time alerts — bookings, supplier signups, tour submissions and payments."
        actions={
          unread.length > 0 ? (
            <AdminButton variant="secondary" onClick={markAllRead}>
              Mark all read
            </AdminButton>
          ) : undefined
        }
      />

      {unread.length > 0 && (
        <p className="admin-text-muted mb-4 text-sm">
          <span className="admin-text font-semibold">{unread.length}</span> unread
          notification{unread.length === 1 ? "" : "s"}
        </p>
      )}

      <div className="space-y-2">
        {items.map((n) => {
          const config = TYPE_CONFIG[n.type];
          const Icon = config.icon;

          return (
            <button
              key={n.id}
              type="button"
              onClick={() => toggleRead(n.id)}
              className={cn(
                "flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all hover:shadow-sm",
                n.read ? "admin-notice-read" : "admin-notice-unread",
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  config.bg,
                )}
              >
                <Icon className={cn("h-5 w-5", config.color)} strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p
                    className={cn(
                      "admin-text text-sm",
                      n.read ? "font-medium" : "font-semibold",
                    )}
                  >
                    {n.title}
                  </p>
                  <time className="admin-text-subtle shrink-0 text-[11px]">
                    {formatRelative(n.createdAt)}
                  </time>
                </div>
                <p className="admin-text-muted mt-1 text-sm">{n.message}</p>
              </div>
              {!n.read && (
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
