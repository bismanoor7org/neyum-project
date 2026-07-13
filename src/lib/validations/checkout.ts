import { z } from "zod";

export const checkoutSelectionSchema = z.object({
  travelDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlotId: z.string().min(1),
  adultCount: z.number().int().min(1).max(20),
  childCount: z.number().int().min(0).max(20),
  addOnIds: z.array(z.string()).default([]),
  pickupLocation: z.string().min(1),
});

export const checkoutTravellerSchema = z.object({
  isPrimary: z.boolean().optional(),
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email().optional(),
  phone: z.string().min(6).max(30).optional(),
  nationality: z.string().max(80).optional(),
  dateOfBirth: z.string().optional(),
  age: z.number().int().min(0).max(120).optional(),
  passportNo: z.string().max(40).optional(),
  dietaryNotes: z.string().max(500).optional(),
  accessibilityNeeds: z.string().max(500).optional(),
});

export const checkoutTravellersSchema = z.object({
  primary: checkoutTravellerSchema.extend({
    email: z.string().email(),
    phone: z.string().min(6).max(30),
    isPrimary: z.literal(true).optional(),
  }),
  additional: z.array(checkoutTravellerSchema).default([]),
  emergencyContact: z
    .object({
      name: z.string().min(1),
      phone: z.string().min(6),
      relationship: z.string().optional(),
    })
    .optional(),
  specialRequirements: z.string().max(1000).optional(),
});

export const checkoutStartSchema = z.object({
  tourSlug: z.string().min(1),
});

export const checkoutSessionSchema = z.object({
  sessionId: z.string().min(1),
});

export const checkoutValidateSchema = checkoutSessionSchema.extend({
  selection: checkoutSelectionSchema,
});

export const checkoutSaveTravellersSchema = checkoutSessionSchema.extend({
  travellers: checkoutTravellersSchema,
});

export const checkoutApplyCouponSchema = checkoutSessionSchema.extend({
  code: z.string().min(2).max(40),
  paymentMode: z.enum(["FULL", "DEPOSIT", "PARTIAL"]).optional(),
  partialAmount: z.number().positive().optional(),
  useWallet: z.boolean().optional(),
});

export const checkoutPaymentIntentSchema = checkoutSessionSchema.extend({
  paymentMode: z.enum(["FULL", "DEPOSIT", "PARTIAL"]).default("FULL"),
  partialAmount: z.number().positive().optional(),
  useWallet: z.boolean().optional(),
  paymentMethod: z.enum(["card", "paypal", "apple_pay", "google_pay"]).optional(),
});

export const checkoutConfirmSchema = checkoutSessionSchema.extend({
  paymentIntentId: z.string().optional(),
  devModeConfirm: z.boolean().optional(),
});

export const refundRequestSchema = z.object({
  bookingId: z.string().min(1),
  reason: z.string().min(10).max(1000),
  amount: z.number().positive().optional(),
});
