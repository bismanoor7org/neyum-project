import { z } from "zod";

export const travellerRegisterSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required").max(80),
  lastName: z.string().min(1, "Last name is required").max(80),
});

export type TravellerRegisterRequest = z.infer<typeof travellerRegisterSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().min(1).email(),
});

export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;

export const verifyEmailSchema = z.object({
  token: z.string().min(1),
});

export type VerifyEmailRequest = z.infer<typeof verifyEmailSchema>;

export const resendVerificationSchema = z.object({
  email: z.string().min(1).email(),
});

export type ResendVerificationRequest = z.infer<typeof resendVerificationSchema>;
