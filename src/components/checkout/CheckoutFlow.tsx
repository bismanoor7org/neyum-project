"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  MapPin,
  Shield,
  Star,
  Users,
} from "lucide-react";
import type { CheckoutTour, CheckoutPricing, PaymentMode } from "@/lib/checkout/types";
import { Container, Section } from "@/components/shared";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";
import { StripePaymentForm } from "./StripePaymentForm";

type AvailabilityDay = {
  date: string;
  slots: { timeSlotId: string; remaining: number; capacity: number }[];
};

type TravellerForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  dateOfBirth: string;
  age: string;
  passportNo: string;
  dietaryNotes: string;
  accessibilityNeeds: string;
};

const STEPS = [
  { id: 1, label: "Tour selection" },
  { id: 2, label: "Travellers" },
  { id: 3, label: "Review" },
  { id: 4, label: "Payment" },
];

const emptyTraveller = (): TravellerForm => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  nationality: "",
  dateOfBirth: "",
  age: "",
  passportNo: "",
  dietaryNotes: "",
  accessibilityNeeds: "",
});

async function apiPost<T>(path: string, body: unknown, idempotencyKey?: string): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;
  const res = await fetch(path, { method: "POST", headers, body: JSON.stringify(body) });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? "Request failed");
  return json.data as T;
}

function formatMoney(amount: number, currency = "FJD") {
  return `${currency} ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function CheckoutFlow({
  tour,
  initialAvailability,
}: {
  tour: CheckoutTour;
  initialAvailability: AvailabilityDay[];
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pricing, setPricing] = useState<CheckoutPricing | null>(null);
  const [availability] = useState(initialAvailability);

  const [travelDate, setTravelDate] = useState("");
  const [timeSlotId, setTimeSlotId] = useState(tour.timeSlots[0]?.id ?? "");
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [pickupLocation, setPickupLocation] = useState(tour.pickupLocations[0] ?? "");

  const [primary, setPrimary] = useState<TravellerForm>(emptyTraveller());
  const [additional, setAdditional] = useState<TravellerForm[]>([]);
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("FULL");
  const [useWallet, setUseWallet] = useState(false);
  const [paymentData, setPaymentData] = useState<{
    clientSecret: string | null;
    paymentIntentId: string;
    devMode?: boolean;
    publishableKey?: string | null;
  } | null>(null);

  const guestTotal = adultCount + childCount;

  useEffect(() => {
    setAdditional((prev) => {
      const needed = Math.max(0, guestTotal - 1);
      const next = [...prev];
      while (next.length < needed) next.push(emptyTraveller());
      return next.slice(0, needed);
    });
  }, [guestTotal]);

  const selectedDay = useMemo(
    () => availability.find((d) => d.date === travelDate),
    [availability, travelDate],
  );

  const slotRemaining = useMemo(() => {
    if (!selectedDay) return null;
    return selectedDay.slots.find((s) => s.timeSlotId === timeSlotId)?.remaining ?? 0;
  }, [selectedDay, timeSlotId]);

  const initSession = useCallback(async () => {
    if (sessionId) return sessionId;
    const data = await apiPost<{ sessionId: string }>("/api/v1/checkout/start", {
      tourSlug: tour.slug,
    });
    setSessionId(data.sessionId);
    return data.sessionId;
  }, [sessionId, tour.slug]);

  const handleValidateSelection = async () => {
    setLoading(true);
    setError(null);
    try {
      const sid = await initSession();
      const data = await apiPost<{ pricing: CheckoutPricing }>("/api/v1/checkout/validate", {
        sessionId: sid,
        selection: { travelDate, timeSlotId, adultCount, childCount, addOnIds, pickupLocation },
      });
      setPricing(data.pricing);
      setStep(2);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Validation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTravellers = async () => {
    setLoading(true);
    setError(null);
    try {
      const sid = sessionId!;
      await apiPost("/api/v1/checkout/travellers", {
        sessionId: sid,
        travellers: {
          primary: {
            ...primary,
            isPrimary: true,
            age: primary.age ? Number(primary.age) : undefined,
          },
          additional: additional.map((t) => ({
            firstName: t.firstName,
            lastName: t.lastName,
            nationality: t.nationality || undefined,
            age: t.age ? Number(t.age) : undefined,
            dietaryNotes: t.dietaryNotes || undefined,
            accessibilityNeeds: t.accessibilityNeeds || undefined,
          })),
          emergencyContact:
            emergencyName && emergencyPhone
              ? { name: emergencyName, phone: emergencyPhone }
              : undefined,
          specialRequirements: specialRequirements || undefined,
        },
      });
      setStep(3);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save travellers");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode || !sessionId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiPost<{ pricing: CheckoutPricing }>("/api/v1/checkout/apply-coupon", {
        sessionId,
        code: promoCode,
        paymentMode,
        useWallet,
      });
      setPricing(data.pricing);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid promo code");
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToPayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const key = `pi-${sessionId}-${Date.now()}`;
      const data = await apiPost<{
        clientSecret: string | null;
        paymentIntentId: string;
        devMode?: boolean;
        publishableKey?: string | null;
      }>(
        "/api/v1/checkout/create-payment-intent",
        { sessionId, paymentMode, useWallet },
        key,
      );
      setPaymentData(data);
      setStep(4);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment setup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (paymentIntentId?: string, devMode?: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiPost<{ booking: { id: string } }>("/api/v1/checkout/confirm", {
        sessionId,
        paymentIntentId: paymentIntentId ?? paymentData?.paymentIntentId,
        devModeConfirm: devMode ?? paymentData?.devMode,
      });
      router.push(`/checkout/confirmation/${data.booking.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Confirmation failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleAddOn = (id: string) => {
    setAddOnIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <Section compact>
      <Container>
        <div className="mb-10">
          <Link
            href={`/things-to-do/${tour.slug}`}
            className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-navy"
          >
            <ChevronLeft className="h-4 w-4" /> Back to tour
          </Link>
          <h1 className={cn(ds.headingSection, "mt-4")}>Secure Checkout</h1>
          <p className="mt-2 text-foreground/60">{tour.title}</p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                step === s.id
                  ? "bg-navy text-white"
                  : step > s.id
                    ? "bg-gold/15 text-navy"
                    : "bg-foreground/5 text-foreground/50",
              )}
            >
              {step > s.id ? <Check className="h-4 w-4" /> : <span>{s.id}</span>}
              {s.label}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            {step === 1 && (
              <StepSelection
                tour={tour}
                availability={availability}
                travelDate={travelDate}
                setTravelDate={setTravelDate}
                timeSlotId={timeSlotId}
                setTimeSlotId={setTimeSlotId}
                adultCount={adultCount}
                setAdultCount={setAdultCount}
                childCount={childCount}
                setChildCount={setChildCount}
                addOnIds={addOnIds}
                toggleAddOn={toggleAddOn}
                pickupLocation={pickupLocation}
                setPickupLocation={setPickupLocation}
                slotRemaining={slotRemaining}
                onContinue={handleValidateSelection}
                loading={loading}
              />
            )}

            {step === 2 && (
              <StepTravellers
                primary={primary}
                setPrimary={setPrimary}
                additional={additional}
                setAdditional={setAdditional}
                emergencyName={emergencyName}
                setEmergencyName={setEmergencyName}
                emergencyPhone={emergencyPhone}
                setEmergencyPhone={setEmergencyPhone}
                specialRequirements={specialRequirements}
                setSpecialRequirements={setSpecialRequirements}
                onBack={() => setStep(1)}
                onContinue={handleSaveTravellers}
                loading={loading}
              />
            )}

            {step === 3 && pricing && (
              <StepReview
                tour={tour}
                travelDate={travelDate}
                timeSlotId={timeSlotId}
                adultCount={adultCount}
                childCount={childCount}
                pickupLocation={pickupLocation}
                pricing={pricing}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                paymentMode={paymentMode}
                setPaymentMode={setPaymentMode}
                useWallet={useWallet}
                setUseWallet={setUseWallet}
                onApplyPromo={handleApplyPromo}
                onBack={() => setStep(2)}
                onContinue={handleProceedToPayment}
                loading={loading}
              />
            )}

            {step === 4 && paymentData && pricing && (
              <StepPayment
                pricing={pricing}
                paymentMode={paymentMode}
                paymentData={paymentData}
                sessionId={sessionId}
                onBack={() => setStep(3)}
                onConfirm={handleConfirm}
                loading={loading}
              />
            )}
          </div>

          <CheckoutSummary tour={tour} pricing={pricing} guestTotal={guestTotal} />
        </div>
      </Container>
    </Section>
  );
}

function CheckoutSummary({
  tour,
  pricing,
  guestTotal,
}: {
  tour: CheckoutTour;
  pricing: CheckoutPricing | null;
  guestTotal: number;
}) {
  return (
    <aside className="h-fit rounded-2xl border border-gold/20 bg-white p-6 shadow-[var(--shadow-card)] lg:sticky lg:top-28">
      <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl">
        <Image src={tour.heroImage} alt={tour.title} fill className="object-cover" sizes="380px" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-navy">{tour.title}</h3>
      <p className="mt-1 text-sm text-foreground/60">{tour.location} · {tour.duration}</p>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <Star className="h-4 w-4 fill-gold text-gold" />
        <span className="font-semibold text-navy">{tour.rating.score}</span>
        <span className="text-foreground/50">({tour.rating.count} reviews)</span>
      </div>

      <div className="mt-4 rounded-xl bg-cream/80 px-4 py-3 text-sm">
        <p className="font-medium text-navy">{tour.supplierName}</p>
        <p className="text-foreground/60">Verified supplier · {tour.supplierRating} rating</p>
      </div>

      <div className="mt-4 space-y-2 border-t border-foreground/10 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-foreground/60">Guests</span>
          <span className="font-medium">{guestTotal}</span>
        </div>
        {pricing ? (
          <>
            <div className="flex justify-between">
              <span className="text-foreground/60">Subtotal</span>
              <span>{formatMoney(pricing.subtotal, pricing.currency)}</span>
            </div>
            {pricing.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount</span>
                <span>-{formatMoney(pricing.discountAmount, pricing.currency)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-navy">
              <span>Total</span>
              <span>{formatMoney(pricing.grandTotal, pricing.currency)}</span>
            </div>
          </>
        ) : (
          <div className="flex justify-between">
            <span className="text-foreground/60">From</span>
            <span className="font-semibold">{formatMoney(tour.adultPrice)} / adult</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-foreground/50">
        <Shield className="h-4 w-4" />
        PCI-compliant · Tokenized payments · No card storage
      </div>
    </aside>
  );
}

function StepSelection({
  tour,
  availability,
  travelDate,
  setTravelDate,
  timeSlotId,
  setTimeSlotId,
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  addOnIds,
  toggleAddOn,
  pickupLocation,
  setPickupLocation,
  slotRemaining,
  onContinue,
  loading,
}: {
  tour: CheckoutTour;
  availability: AvailabilityDay[];
  travelDate: string;
  setTravelDate: (v: string) => void;
  timeSlotId: string;
  setTimeSlotId: (v: string) => void;
  adultCount: number;
  setAdultCount: (v: number) => void;
  childCount: number;
  setChildCount: (v: number) => void;
  addOnIds: string[];
  toggleAddOn: (id: string) => void;
  pickupLocation: string;
  setPickupLocation: (v: string) => void;
  slotRemaining: number | null;
  onContinue: () => void;
  loading: boolean;
}) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-navy">Select your experience</h2>
      <p className="mt-1 text-sm text-foreground/60">{tour.overview.slice(0, 160)}…</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label="Travel date" icon={Calendar}>
          <select
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="checkout-input"
          >
            <option value="">Select date</option>
            {availability.slice(0, 30).map((d) => (
              <option key={d.date} value={d.date}>
                {new Date(d.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Time slot" icon={Clock}>
          <select
            value={timeSlotId}
            onChange={(e) => setTimeSlotId(e.target.value)}
            className="checkout-input"
            disabled={!travelDate}
          >
            {tour.timeSlots.map((s) => {
              const rem = availability
                .find((d) => d.date === travelDate)
                ?.slots.find((sl) => sl.timeSlotId === s.id)?.remaining;
              return (
                <option key={s.id} value={s.id} disabled={rem === 0}>
                  {s.label} {rem != null ? `(${rem} left)` : ""}
                </option>
              );
            })}
          </select>
        </Field>

        <Field label="Adults" icon={Users}>
          <input
            type="number"
            min={1}
            max={tour.maxGuests}
            value={adultCount}
            onChange={(e) => setAdultCount(Number(e.target.value))}
            className="checkout-input"
          />
        </Field>

        <Field label="Children" icon={Users}>
          <input
            type="number"
            min={0}
            max={tour.maxGuests}
            value={childCount}
            onChange={(e) => setChildCount(Number(e.target.value))}
            className="checkout-input"
          />
        </Field>

        <Field label="Pickup location" icon={MapPin} className="sm:col-span-2">
          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="checkout-input"
          >
            {tour.pickupLocations.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </Field>
      </div>

      {slotRemaining != null && travelDate && (
        <p className="mt-4 text-sm text-foreground/60">
          {slotRemaining} spots remaining for this slot
        </p>
      )}

      {tour.addOns.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold text-navy">Enhance your journey</h3>
          <div className="mt-4 space-y-3">
            {tour.addOns.map((addon) => (
              <label
                key={addon.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                  addOnIds.includes(addon.id) ? "border-gold bg-gold/5" : "border-foreground/10",
                )}
              >
                <input
                  type="checkbox"
                  checked={addOnIds.includes(addon.id)}
                  onChange={() => toggleAddOn(addon.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="font-medium text-navy">{addon.name}</p>
                  {addon.description && (
                    <p className="text-sm text-foreground/60">{addon.description}</p>
                  )}
                </div>
                <span className="text-sm font-semibold text-navy">+{formatMoney(addon.price)}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onContinue}
        disabled={loading || !travelDate}
        className="checkout-btn-primary mt-8"
      >
        {loading ? "Validating…" : "Continue to travellers"}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function StepTravellers({
  primary,
  setPrimary,
  additional,
  setAdditional,
  emergencyName,
  setEmergencyName,
  emergencyPhone,
  setEmergencyPhone,
  specialRequirements,
  setSpecialRequirements,
  onBack,
  onContinue,
  loading,
}: {
  primary: TravellerForm;
  setPrimary: (v: TravellerForm) => void;
  additional: TravellerForm[];
  setAdditional: (v: TravellerForm[]) => void;
  emergencyName: string;
  setEmergencyName: (v: string) => void;
  emergencyPhone: string;
  setEmergencyPhone: (v: string) => void;
  specialRequirements: string;
  setSpecialRequirements: (v: string) => void;
  onBack: () => void;
  onContinue: () => void;
  loading: boolean;
}) {
  const updateAdditional = (idx: number, field: keyof TravellerForm, value: string) => {
    const next = [...additional];
    next[idx] = { ...next[idx], [field]: value };
    setAdditional(next);
  };

  return (
    <div className="rounded-2xl border border-foreground/10 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-navy">Traveller information</h2>

      <div className="mt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">Primary traveller</h3>
        <TravellerFields values={primary} onChange={setPrimary} showContact />
      </div>

      {additional.map((t, i) => (
        <div key={i} className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
            Additional traveller {i + 1}
          </h3>
          <TravellerFields
            values={t}
            compact
            onFieldChange={(field, value) => updateAdditional(i, field, value)}
          />
        </div>
      ))}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Field label="Emergency contact name">
          <input value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} className="checkout-input" />
        </Field>
        <Field label="Emergency contact phone">
          <input value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} className="checkout-input" />
        </Field>
        <Field label="Special requirements" className="sm:col-span-2">
          <textarea
            value={specialRequirements}
            onChange={(e) => setSpecialRequirements(e.target.value)}
            rows={3}
            className="checkout-input"
          />
        </Field>
      </div>

      <div className="mt-8 flex gap-3">
        <button type="button" onClick={onBack} className="checkout-btn-secondary">
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button type="button" onClick={onContinue} disabled={loading} className="checkout-btn-primary">
          {loading ? "Saving…" : "Review booking"}
        </button>
      </div>
    </div>
  );
}

function TravellerFields({
  values,
  onChange,
  showContact,
  compact,
  onFieldChange,
}: {
  values: TravellerForm;
  onChange?: (v: TravellerForm) => void;
  showContact?: boolean;
  compact?: boolean;
  onFieldChange?: (field: keyof TravellerForm, value: string) => void;
}) {
  const set = (field: keyof TravellerForm, value: string) => {
    if (onFieldChange) onFieldChange(field, value);
    else if (onChange) onChange({ ...values, [field]: value });
  };

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <Field label="First name">
        <input value={values.firstName} onChange={(e) => set("firstName", e.target.value)} className="checkout-input" required />
      </Field>
      <Field label="Last name">
        <input value={values.lastName} onChange={(e) => set("lastName", e.target.value)} className="checkout-input" required />
      </Field>
      {showContact && (
        <>
          <Field label="Email">
            <input type="email" value={values.email} onChange={(e) => set("email", e.target.value)} className="checkout-input" required />
          </Field>
          <Field label="Phone">
            <input value={values.phone} onChange={(e) => set("phone", e.target.value)} className="checkout-input" required />
          </Field>
          <Field label="Date of birth">
            <input type="date" value={values.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} className="checkout-input" />
          </Field>
        </>
      )}
      <Field label="Nationality">
        <input value={values.nationality} onChange={(e) => set("nationality", e.target.value)} className="checkout-input" />
      </Field>
      {compact && (
        <Field label="Age">
          <input type="number" value={values.age} onChange={(e) => set("age", e.target.value)} className="checkout-input" />
        </Field>
      )}
      {!compact && (
        <>
          <Field label="Passport number">
            <input value={values.passportNo} onChange={(e) => set("passportNo", e.target.value)} className="checkout-input" />
          </Field>
          <Field label="Dietary requirements" className="sm:col-span-2">
            <input value={values.dietaryNotes} onChange={(e) => set("dietaryNotes", e.target.value)} className="checkout-input" />
          </Field>
        </>
      )}
    </div>
  );
}

function StepReview({
  tour,
  travelDate,
  timeSlotId,
  adultCount,
  childCount,
  pickupLocation,
  pricing,
  promoCode,
  setPromoCode,
  paymentMode,
  setPaymentMode,
  useWallet,
  setUseWallet,
  onApplyPromo,
  onBack,
  onContinue,
  loading,
}: {
  tour: CheckoutTour;
  travelDate: string;
  timeSlotId: string;
  adultCount: number;
  childCount: number;
  pickupLocation: string;
  pricing: CheckoutPricing;
  promoCode: string;
  setPromoCode: (v: string) => void;
  paymentMode: PaymentMode;
  setPaymentMode: (v: PaymentMode) => void;
  useWallet: boolean;
  setUseWallet: (v: boolean) => void;
  onApplyPromo: () => void;
  onBack: () => void;
  onContinue: () => void;
  loading: boolean;
}) {
  const slotLabel = tour.timeSlots.find((s) => s.id === timeSlotId)?.label ?? timeSlotId;

  return (
    <div className="rounded-2xl border border-foreground/10 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-navy">Review your booking</h2>

      <div className="mt-6 space-y-3 text-sm">
        <Row label="Date" value={new Date(travelDate).toLocaleDateString()} />
        <Row label="Time" value={slotLabel} />
        <Row label="Guests" value={`${adultCount} adults, ${childCount} children`} />
        <Row label="Pickup" value={pickupLocation} />
      </div>

      <div className="mt-8 rounded-xl bg-cream/60 p-5 text-sm">
        <PriceRow label={`Adults × ${adultCount}`} value={formatMoney(pricing.adultTotal, pricing.currency)} />
        {childCount > 0 && (
          <PriceRow label={`Children × ${childCount}`} value={formatMoney(pricing.childTotal, pricing.currency)} />
        )}
        {pricing.addOns.map((a) => (
          <PriceRow key={a.id} label={a.name} value={formatMoney(a.total, pricing.currency)} />
        ))}
        <PriceRow label="Taxes" value={formatMoney(pricing.taxAmount, pricing.currency)} />
        <PriceRow label="Service fee" value={formatMoney(pricing.serviceFee, pricing.currency)} />
        {pricing.discountAmount > 0 && (
          <PriceRow label="Discount" value={`-${formatMoney(pricing.discountAmount, pricing.currency)}`} highlight />
        )}
        {pricing.walletCredit > 0 && (
          <PriceRow label="Wallet credit" value={`-${formatMoney(pricing.walletCredit, pricing.currency)}`} highlight />
        )}
        <div className="mt-3 flex justify-between border-t border-foreground/10 pt-3 text-base font-semibold text-navy">
          <span>Grand total</span>
          <span>{formatMoney(pricing.grandTotal, pricing.currency)}</span>
        </div>
        {pricing.amountSaved > 0 && (
          <p className="mt-2 text-emerald-700">You save {formatMoney(pricing.amountSaved, pricing.currency)}</p>
        )}
      </div>

      <div className="mt-6 flex gap-2">
        <input
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Promo code"
          className="checkout-input flex-1"
        />
        <button type="button" onClick={onApplyPromo} className="checkout-btn-secondary whitespace-nowrap">
          Apply
        </button>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-navy">Payment option</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["FULL", "DEPOSIT", "PARTIAL"] as PaymentMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setPaymentMode(mode)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                paymentMode === mode ? "bg-navy text-white" : "bg-foreground/5 text-foreground/70",
              )}
            >
              {mode === "FULL" ? "Pay in full" : mode === "DEPOSIT" ? `Deposit (${formatMoney(pricing.depositAmount)})` : "Partial payment"}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={useWallet} onChange={(e) => setUseWallet(e.target.checked)} />
        Apply wallet credits (if logged in)
      </label>

      <div className="mt-8 flex gap-3">
        <button type="button" onClick={onBack} className="checkout-btn-secondary">
          <ChevronLeft className="h-4 w-4" /> Edit travellers
        </button>
        <button type="button" onClick={onContinue} disabled={loading} className="checkout-btn-primary">
          {loading ? "Preparing…" : "Proceed to payment"}
        </button>
      </div>
    </div>
  );
}

function StepPayment({
  pricing,
  paymentMode,
  paymentData,
  sessionId,
  onBack,
  onConfirm,
  loading,
}: {
  pricing: CheckoutPricing;
  paymentMode: PaymentMode;
  paymentData: {
    clientSecret: string | null;
    paymentIntentId: string;
    devMode?: boolean;
    publishableKey?: string | null;
  };
  sessionId: string | null;
  onBack: () => void;
  onConfirm: (intentId?: string, devMode?: boolean) => void;
  loading: boolean;
}) {
  const amountDue = pricing.amountDue;

  return (
    <div className="rounded-2xl border border-foreground/10 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-navy">Secure payment</h2>
      <p className="mt-1 text-sm text-foreground/60">
        {paymentMode === "FULL" ? "Full payment" : paymentMode === "DEPOSIT" ? "Deposit payment" : "Partial payment"} ·{" "}
        {formatMoney(amountDue, pricing.currency)} due now
      </p>

      <div className="mt-6 flex flex-wrap gap-3 text-sm text-foreground/60">
        <span className="flex items-center gap-1"><CreditCard className="h-4 w-4" /> Card</span>
        <span>PayPal</span>
        <span>Apple Pay</span>
        <span>Google Pay</span>
      </div>

      {paymentData.clientSecret && paymentData.publishableKey ? (
        <StripePaymentForm
          clientSecret={paymentData.clientSecret}
          publishableKey={paymentData.publishableKey}
          sessionId={sessionId}
          onSuccess={() => onConfirm(paymentData.paymentIntentId)}
        />
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-gold/40 bg-gold/5 p-6">
          <p className="text-sm text-navy">
            Development mode — Stripe keys not configured. Click below to simulate a secure payment and confirm your booking.
          </p>
          <button
            type="button"
            onClick={() => onConfirm(paymentData.paymentIntentId, true)}
            disabled={loading}
            className="checkout-btn-primary mt-4"
          >
            {loading ? "Confirming…" : `Confirm & pay ${formatMoney(amountDue, pricing.currency)}`}
          </button>
        </div>
      )}

      <button type="button" onClick={onBack} className="checkout-btn-secondary mt-6">
        <ChevronLeft className="h-4 w-4" /> Back to review
      </button>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  children,
  className,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-navy">
        {Icon && <Icon className="h-4 w-4 text-gold" />}
        {label}
      </span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-foreground/60">{label}</span>
      <span className="font-medium text-navy">{value}</span>
    </div>
  );
}

function PriceRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={cn("flex justify-between py-1", highlight && "text-emerald-700")}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
