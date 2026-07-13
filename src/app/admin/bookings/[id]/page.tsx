"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader, AdminButton } from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { formatCurrency, formatDateTime } from "@/lib/admin/format";

type BookingDetail = {
  id: string;
  bookingNumber: string;
  amount: number | string;
  currency: string;
  bookingStatus: string;
  paymentStatus: string;
  bookingDate: string;
  travelDate: string | null;
  adultCount: number;
  childCount: number;
  cancelReason?: string | null;
  traveler: { firstName: string; lastName: string; email: string; phone?: string | null };
  supplier: { companyName: string };
  tour: { title: string; slug: string } | null;
  transport: { title: string } | null;
};

export default function BookingDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const load = () => {
    setLoading(true);
    fetch(`/api/v1/admin/bookings/${id}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => {
        if (!j.ok) setError(j.error ?? "Not found");
        else setBooking(j.data);
      })
      .catch(() => setError("Failed to load booking"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [id]);

  async function updateStatus(bookingStatus: string) {
    setUpdating(true);
    await fetch(`/api/v1/admin/bookings/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingStatus }),
    });
    setUpdating(false);
    load();
  }

  if (loading) return <p className="admin-text-subtle p-6 text-sm">Loading booking…</p>;
  if (error || !booking) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error ?? "Booking not found"}</p>
        <Link href="/admin/bookings" className="mt-4 inline-block text-sm text-gold">← Back to bookings</Link>
      </div>
    );
  }

  const amount = typeof booking.amount === "string" ? Number(booking.amount) : booking.amount;

  return (
    <>
      <PageHeader
        title={booking.bookingNumber}
        subtitle={`Booked ${formatDateTime(booking.bookingDate)}`}
        actions={
          <Link href="/admin/bookings" className="text-sm text-gold hover:underline">
            ← All bookings
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="admin-card space-y-4 rounded-xl p-5">
          <h3 className="admin-text font-semibold">Traveller</h3>
          <p className="text-sm">
            {booking.traveler.firstName} {booking.traveler.lastName}
          </p>
          <p className="admin-text-subtle text-sm">{booking.traveler.email}</p>
          {booking.traveler.phone && <p className="admin-text-subtle text-sm">{booking.traveler.phone}</p>}
          <p className="text-sm">
            Guests: {booking.adultCount} adult{booking.adultCount !== 1 ? "s" : ""}
            {booking.childCount > 0 ? `, ${booking.childCount} child` : ""}
          </p>
        </div>

        <div className="admin-card space-y-4 rounded-xl p-5">
          <h3 className="admin-text font-semibold">Booking</h3>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={booking.bookingStatus} />
            <StatusBadge status={booking.paymentStatus} />
          </div>
          <p className="font-serif text-2xl">{formatCurrency(amount, booking.currency)}</p>
          {booking.travelDate && (
            <p className="admin-text-subtle text-sm">Travel date: {formatDateTime(booking.travelDate)}</p>
          )}
          {booking.tour && <p className="text-sm">Tour: {booking.tour.title}</p>}
          {booking.transport && <p className="text-sm">Transport: {booking.transport.title}</p>}
          <p className="admin-text-subtle text-sm">Supplier: {booking.supplier.companyName}</p>
        </div>
      </div>

      <div className="admin-card mt-6 flex flex-wrap gap-2 rounded-xl p-5">
        <AdminButton
          variant="secondary"
          disabled={updating || booking.bookingStatus === "CONFIRMED"}
          onClick={() => updateStatus("CONFIRMED")}
        >
          Confirm
        </AdminButton>
        <AdminButton
          variant="secondary"
          disabled={updating || booking.bookingStatus === "COMPLETED"}
          onClick={() => updateStatus("COMPLETED")}
        >
          Mark completed
        </AdminButton>
        <AdminButton
          variant="secondary"
          disabled={updating || booking.bookingStatus === "CANCELLED"}
          onClick={() => updateStatus("CANCELLED")}
        >
          Cancel
        </AdminButton>
      </div>
    </>
  );
}
