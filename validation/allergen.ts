import { z } from "zod";

export const AllergenSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export const AllergenPartialSchema = AllergenSchema.partial();
