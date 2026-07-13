import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
  search: z.string().optional(),
});

export const bookingUpdateSchema = z.object({
  bookingStatus: z
    .enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "REFUNDED"])
    .optional(),
  paymentStatus: z
    .enum(["PENDING", "PAID", "FAILED", "REFUNDED", "PARTIALLY_REFUNDED"])
    .optional(),
  travelDate: z.string().datetime().optional(),
  guestCount: z.number().int().min(1).optional(),
  notes: z.string().optional(),
  cancelReason: z.string().optional(),
});

export const supplierStatusSchema = z.object({
  verificationStatus: z.enum([
    "PENDING",
    "APPROVED",
    "REJECTED",
    "SUSPENDED",
    "VERIFIED",
  ]),
});

export const tourStatusSchema = z.object({
  status: z
    .enum(["DRAFT", "PENDING", "APPROVED", "REJECTED", "ARCHIVED"])
    .optional(),
  featured: z.boolean().optional(),
});

export const userStatusSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE", "BLOCKED", "PENDING_VERIFICATION"]),
  role: z.enum(["TRAVELER", "SUPPLIER", "ADMIN"]).optional(),
});

export const platformSettingsSchema = z.object({
  platformName: z.string().min(1).optional(),
  supportEmail: z.string().email().optional(),
  defaultCurrency: z.string().length(3).optional(),
  timezone: z.string().optional(),
  commissionPercentage: z.number().min(0).max(100).optional(),
  googleAnalyticsId: z.string().optional(),
  microsoftClarityId: z.string().optional(),
  searchConsoleProperty: z.string().optional(),
});

export const commissionRuleSchema = z.object({
  name: z.string().min(1),
  percentage: z.number().min(0).max(100),
  minBookingAmount: z.number().optional(),
  maxBookingAmount: z.number().optional(),
  supplierId: z.string().optional(),
  tourCategory: z.string().optional(),
  active: z.boolean().default(true),
});

export const reviewModerationSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "FLAGGED"]),
});

export const transportStatusSchema = z.object({
  status: z
    .enum(["DRAFT", "PENDING", "APPROVED", "REJECTED", "SUSPENDED"])
    .optional(),
  featured: z.boolean().optional(),
});
