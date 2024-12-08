import { z } from "zod";

export const newsletterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().optional(),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
