import { z } from "zod";

export const adminLoginRequestSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional().default(false),
});

export type AdminLoginRequest = z.infer<typeof adminLoginRequestSchema>;

export const supplierLoginRequestSchema = adminLoginRequestSchema.extend({
  twoFactor: z.string().length(6, "Enter the 6-digit code"),
});

export type SupplierLoginRequest = z.infer<typeof supplierLoginRequestSchema>;
