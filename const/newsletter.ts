import { z } from "zod";
import {
  EMAIL_MAX,
  FIRST_NAME_MAX,
  LAST_NAME_MAX,
  MESSAGE_MAX,
} from "@/const/limits";

export const newsletterSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(
      FIRST_NAME_MAX,
      `First name must not exceed ${FIRST_NAME_MAX} characters`,
    )
    .regex(/^[a-zA-Z-]+$/, "First name can only contain letters and hyphens"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(LAST_NAME_MAX, `Last name must not exceed ${LAST_NAME_MAX} characters`)
    .regex(/^[a-zA-Z-]+$/, "Last name can only contain letters and hyphens"),
  email: z
    .string()
    .email("Invalid email address")
    .max(EMAIL_MAX, `Email must not exceed ${EMAIL_MAX} characters`), // Standard email length limit
  message: z
    .string()
    .trim()
    .max(MESSAGE_MAX, "Message must not exceed 500 characters")
    .optional(),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
