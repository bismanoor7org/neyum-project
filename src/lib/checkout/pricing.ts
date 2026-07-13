import type { CheckoutPricing, CheckoutSelection, CheckoutTour, PaymentMode } from "./types";

const TAX_RATE = 0.09;
const SERVICE_FEE_RATE = 0.025;
const DEPOSIT_RATE = 0.3;

export type PromoDefinition = {
  code: string;
  description?: string;
  discountType: "PERCENT" | "FIXED";
  discountValue: number;
  minAmount?: number;
  active: boolean;
  expiresAt?: string;
  maxUses?: number;
  usedCount: number;
};

export function calculatePricing(
  tour: CheckoutTour,
  selection: CheckoutSelection,
  options: {
    promo?: PromoDefinition | null;
    walletCredit?: number;
    paymentMode?: PaymentMode;
    partialAmount?: number;
  } = {},
): CheckoutPricing {
  const adultTotal = tour.adultPrice * selection.adultCount;
  const childTotal = tour.childPrice * selection.childCount;

  const addOns = selection.addOnIds
    .map((id) => {
      const addon = tour.addOns.find((a) => a.id === id);
      if (!addon) return null;
      return {
        id: addon.id,
        name: addon.name,
        quantity: 1,
        unitPrice: addon.price,
        total: addon.price,
      };
    })
    .filter(Boolean) as CheckoutPricing["addOns"];

  const addOnTotal = addOns.reduce((sum, a) => sum + a.total, 0);
  const subtotal = adultTotal + childTotal + addOnTotal;

  let discountAmount = 0;
  const promo = options.promo;
  if (promo?.active) {
    const notExpired = !promo.expiresAt || new Date(promo.expiresAt) > new Date();
    const underLimit = !promo.maxUses || promo.usedCount < promo.maxUses;
    const meetsMin = !promo.minAmount || subtotal >= promo.minAmount;
    if (notExpired && underLimit && meetsMin) {
      discountAmount =
        promo.discountType === "PERCENT"
          ? Math.round(subtotal * (promo.discountValue / 100) * 100) / 100
          : Math.min(promo.discountValue, subtotal);
    }
  }

  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round(afterDiscount * TAX_RATE * 100) / 100;
  const serviceFee = Math.round(afterDiscount * SERVICE_FEE_RATE * 100) / 100;
  const walletCredit = Math.min(options.walletCredit ?? 0, afterDiscount + taxAmount + serviceFee);
  const grandTotal = Math.round((afterDiscount + taxAmount + serviceFee - walletCredit) * 100) / 100;
  const depositAmount = Math.round(grandTotal * DEPOSIT_RATE * 100) / 100;

  const paymentMode = options.paymentMode ?? "FULL";
  let amountDue = grandTotal;
  if (paymentMode === "DEPOSIT") amountDue = depositAmount;
  if (paymentMode === "PARTIAL") {
    const partial = options.partialAmount ?? grandTotal * 0.5;
    amountDue = Math.min(Math.max(partial, depositAmount), grandTotal);
  }

  return {
    adultUnitPrice: tour.adultPrice,
    childUnitPrice: tour.childPrice,
    adultTotal,
    childTotal,
    addOns,
    subtotal,
    taxRate: TAX_RATE,
    taxAmount,
    serviceFeeRate: SERVICE_FEE_RATE,
    serviceFee,
    discountAmount,
    promoCode: promo?.code,
    walletCredit,
    depositRate: DEPOSIT_RATE,
    depositAmount,
    amountDue: Math.round(amountDue * 100) / 100,
    grandTotal,
    amountSaved: discountAmount + walletCredit,
    currency: tour.currency,
  };
}
