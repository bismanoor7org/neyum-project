import type { EnquiryRecord } from "./types";

export type EnquiryStats = {
  total: number;
  booking: number;
  contact: number;
  today: number;
  thisWeek: number;
  byLocale: Record<string, number>;
  byBookingTab: Record<string, number>;
};

export function computeEnquiryStats(
  enquiries: EnquiryRecord[],
): EnquiryStats {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  const stats: EnquiryStats = {
    total: enquiries.length,
    booking: 0,
    contact: 0,
    today: 0,
    thisWeek: 0,
    byLocale: {},
    byBookingTab: {},
  };

  for (const record of enquiries) {
    const created = new Date(record.createdAt);

    if (record.source === "booking") stats.booking += 1;
    if (record.source === "contact") stats.contact += 1;
    if (created >= startOfToday) stats.today += 1;
    if (created >= startOfWeek) stats.thisWeek += 1;

    stats.byLocale[record.locale] = (stats.byLocale[record.locale] ?? 0) + 1;

    if (record.bookingTab) {
      stats.byBookingTab[record.bookingTab] =
        (stats.byBookingTab[record.bookingTab] ?? 0) + 1;
    }
  }

  return stats;
}
