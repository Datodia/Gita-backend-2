import * as zod from "zod";

export const verifyOtpSchema = zod.object({
  otp: zod.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code"),
});

export type VerifyOtpType = zod.infer<typeof verifyOtpSchema>;
