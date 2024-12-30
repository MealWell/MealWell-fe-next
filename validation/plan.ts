import { z } from "zod";

export const PlanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  goal: z.enum(["weight_loss", "muscle_gain", "balanced", "vegetarian"]),
  meals: z.string().array().nonempty("At least one meal is required"),
  keyFeatures: z
    .string()
    .array()
    .nonempty("At least one key feature is required"),
});

export const PlanPartialSchema = PlanSchema.partial();
