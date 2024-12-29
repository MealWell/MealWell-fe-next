import { z } from "zod";
import { PASSWORD_MIN } from "@/const/limits";

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(
        PASSWORD_MIN,
        `Password must be at least ${PASSWORD_MIN} characters`,
      ),
    confirmPassword: z
      .string()
      .min(
        PASSWORD_MIN,
        `Confirm password must be at least ${PASSWORD_MIN} characters`,
      ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(PASSWORD_MIN, `Password must be at least ${PASSWORD_MIN} characters`),
  rememberMe: z.boolean().default(false),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(
        PASSWORD_MIN,
        `Password must be at least ${PASSWORD_MIN} characters`,
      ),
    confirmPassword: z
      .string()
      .min(
        PASSWORD_MIN,
        `Confirm password must be at least ${PASSWORD_MIN} characters`,
      ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const totpSchema = z.object({
  totpCode: z
    .string()
    .length(6, "TOTP code must be exactly 6 digits")
    .regex(/^\d+$/, "TOTP code must contain only digits"),
});

export type TotpFormValues = z.infer<typeof totpSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;
