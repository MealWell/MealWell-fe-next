import { z } from "zod";

export const IngredientInputSchema = z.object({
  ingredient: z.string().min(1, "Ingredient ID is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export const MealSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  ingredients: z
    .array(IngredientInputSchema)
    .nonempty("At least one ingredient is required"),
  allergens: z.string().array().optional(),
  dietaryPreferences: z.string().array().optional(),
  type: z.enum(["breakfast", "snack", "lunch", "dinner"]),
});

export const MealPartialSchema = MealSchema.partial();
