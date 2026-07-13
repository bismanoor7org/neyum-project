export type CheckoutTimeSlot = {
  id: string;
  label: string;
  capacity: number;
};

export type CheckoutAddOn = {
  id: string;
  name: string;
  price: number;
  description?: string;
};

export type CheckoutTour = {
  slug: string;
  tourId: string;
  title: string;
  location: string;
  duration: string;
  overview: string;
  heroImage: string;
  images: string[];
  supplierId: string;
  supplierName: string;
  supplierRating: number;
  supplierStatus: "ACTIVE" | "SUSPENDED";
  tourStatus: "ACTIVE" | "DRAFT" | "SUSPENDED";
  rating: { score: number; count: number };
  adultPrice: number;
  childPrice: number;
  currency: string;
  maxGuests: number;
  timeSlots: CheckoutTimeSlot[];
  addOns: CheckoutAddOn[];
  pickupLocations: string[];
};

export type CheckoutSelection = {
  travelDate: string;
  timeSlotId: string;
  adultCount: number;
  childCount: number;
  addOnIds: string[];
  pickupLocation: string;
};

export type CheckoutTraveller = {
  isPrimary?: boolean;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  nationality?: string;
  dateOfBirth?: string;
  age?: number;
  passportNo?: string;
  dietaryNotes?: string;
  accessibilityNeeds?: string;
};

export type EmergencyContact = {
  name: string;
  phone: string;
  relationship?: string;
};

export type CheckoutTravellersPayload = {
  primary: CheckoutTraveller & { email: string; phone: string };
  additional: CheckoutTraveller[];
  emergencyContact?: EmergencyContact;
  specialRequirements?: string;
};

export type CheckoutPricing = {
  adultUnitPrice: number;
  childUnitPrice: number;
  adultTotal: number;
  childTotal: number;
  addOns: { id: string; name: string; quantity: number; unitPrice: number; total: number }[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  serviceFeeRate: number;
  serviceFee: number;
  discountAmount: number;
  promoCode?: string;
  walletCredit: number;
  depositRate: number;
  depositAmount: number;
  amountDue: number;
  grandTotal: number;
  amountSaved: number;
  currency: string;
};

export type PaymentMode = "FULL" | "DEPOSIT" | "PARTIAL";

export type CheckoutSessionRecord = {
  id: string;
  tourSlug: string;
  tourId: string;
  supplierId: string;
  travelerId: string | null;
  status: "ACTIVE" | "EXPIRED" | "COMPLETED" | "ABANDONED";
  expiresAt: string;
  selection: CheckoutSelection | null;
  travellers: CheckoutTravellersPayload | null;
  pricing: CheckoutPricing | null;
  promoCode: string | null;
  paymentMode: PaymentMode;
  partialAmount?: number;
  createdAt: string;
  updatedAt: string;
};

export type ConfirmedBooking = {
  id: string;
  bookingNumber: string;
  sessionId: string;
  tourSlug: string;
  tourTitle: string;
  supplierId: string;
  supplierName: string;
  travelerId: string;
  travelDate: string;
  timeSlot: string;
  pickupLocation: string;
  guestCount: number;
  adultCount: number;
  childCount: number;
  pricing: CheckoutPricing;
  paymentMode: PaymentMode;
  paymentStatus: "PAID" | "PARTIAL" | "PENDING";
  bookingStatus: "CONFIRMED";
  travellers: CheckoutTravellersPayload;
  invoiceNumber: string;
  voucherNumber: string;
  qrCodeData: string;
  createdAt: string;
};
