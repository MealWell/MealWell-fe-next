import { z } from "zod";

export const IngredientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  calories: z.number().min(0, "Calories must be a positive number"),
  proteins: z.number().min(0, "Proteins must be a positive number"),
  carbohydrates: z.number().min(0, "Carbs must be a positive number"),
  fats: z.number().min(0, "Fats must be a positive number"),
  fiber: z.number().min(0, "Fiber must be a positive number"),
  sugar: z.number().min(0, "Sugar must be a positive number"),
  sodium: z.number().min(0, "Sodium must be a positive number"),
  allergens: z.string().array().optional(),
  dietaryPreferences: z.string().array().optional(),
});

export const IngredientPartialSchema = IngredientSchema.partial();
