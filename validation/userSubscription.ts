import { z } from "zod";
import { DeliveryTimes, Weekdays } from "@/const/types";

export const SubscriptionSchema = z.object({
  planId: z.string(),
  preferences: z
    .object({
      allergens: z.array(z.string()).optional(),
      dietaryPreferences: z.array(z.string()).optional(),
    })
    .optional(),
  deliveryInformation: z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z.string(),
    phoneNumber: z.string().min(1, "Phone number is required"),
    specialDeliveryInstructions: z.string().optional(),
    deliveryDays: z
      .array(z.enum(Weekdays as [string, ...string[]]))
      .min(3, "At least 3 unique delivery days are required.")
      .refine((days) => new Set(days).size === days.length, {
        message: "Delivery days must be unique.",
      }),
    preferredDeliveryTime: z.enum(DeliveryTimes as [string, ...string[]]),
  }),
});
