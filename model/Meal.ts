import { model, models, Schema, Types } from "mongoose";

export interface MealT {
  _id: string;
  name: string;
  description?: string;
  ingredients: { ingredient: string; quantity: number }[]; // Referință la ingredient + cantitatea utilizată (în grame)
  totalCalories: number;
  totalProteins: number;
  totalFats: number;
  totalCarbs: number;
  totalFiber: number;
  totalSugar: number;
  totalSodium: number;
  allergens?: string[];
  dietaryPreferences?: string[];
  type: "breakfast" | "snack" | "lunch" | "dinner"; // Tipul mesei
}

const MealSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  ingredients: [
    {
      ingredient: { type: Types.ObjectId, ref: "Ingredient", required: true },
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
  allergens: [{ type: Types.ObjectId, ref: "Allergen" }],
  dietaryPreferences: [{ type: Types.ObjectId, ref: "DietaryPreference" }],
  type: {
    type: String,
    enum: ["breakfast", "snack", "lunch", "dinner"],
    required: true,
  },
});

const Meal = models.Meal || model<MealT>("Meal", MealSchema, "Meals");
export default Meal;
