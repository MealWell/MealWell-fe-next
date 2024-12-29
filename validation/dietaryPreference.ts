import { z } from "zod";

export const DietaryPreferenceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export const DietaryPreferencePartialSchema = DietaryPreferenceSchema.partial();
