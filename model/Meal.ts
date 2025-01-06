import { model, models, Schema, Types } from "mongoose";
import Ingredient, { IngredientT } from "@/model/Ingredient";
import Allergen, { AllergenT } from "@/model/Allergen";
import DietaryPreference, { DietaryPreferenceT } from "@/model/DietaryPreference";

export interface MealT {
  _id: string;
  name: string;
  description?: string;
  ingredients: { ingredient: IngredientT; quantity: number }[];
  totalCalories: number;
  totalProteins: number;
  totalFats: number;
  totalCarbs: number;
  totalFiber: number;
  totalSugar: number;
  totalSodium: number;
  allergens?: AllergenT[];
  dietaryPreferences?: DietaryPreferenceT[];
  type: "breakfast" | "snack" | "lunch" | "dinner"; // Tipul mesei
}

const MealSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  ingredients: [
    {
      ingredient: { type: Types.ObjectId, ref: Ingredient, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalCalories: { type: Number, required: true },
  totalProteins: { type: Number, required: true },
  totalFats: { type: Number, required: true },
  totalCarbs: { type: Number, required: true },
  totalFiber: { type: Number, required: true },
  totalSugar: { type: Number, required: true },
  totalSodium: { type: Number, required: true },
  allergens: [{ type: Types.ObjectId, ref: Allergen }],
  dietaryPreferences: [{ type: Types.ObjectId, ref: DietaryPreference }],
  type: {
    type: String,
    enum: ["breakfast", "snack", "lunch", "dinner"],
    required: true,
  },
});

const Meal = models.Meal || model<MealT>("Meal", MealSchema, "Meals");
export default Meal;
