import { z } from "zod";

export const PublishedPlanSchema = z.object({
  id: z.string().min(1, "Id is required"),
  basePrice: z.number().min(0, "Base price should be a positive number"),
});

export const PublishedPlanUpdateBasePriceSchema = z.object({
  basePrice: z.number().min(0, "Base price should be a positive number"),
});

export const PublishedPlanUpdateIsActiveSchema = z.object({
  isActive: z.boolean({ message: "isActive is required" }),
});
