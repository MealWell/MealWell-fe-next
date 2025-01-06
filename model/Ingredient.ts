import { model, models, Schema, Types } from "mongoose";
import Allergen, { AllergenT } from "@/model/Allergen";
import DietaryPreference, {
  DietaryPreferenceT,
} from "@/model/DietaryPreference";

export interface IngredientT {
  _id: string;
  name: string; // Numele ingredientului
  calories: number; // kcal per 100g
  proteins: number; // g per 100g
  fats: number; // g per 100g
  carbohydrates: number; // g per 100g
  fiber: number; // g per 100g
  sugar: number; // g per 100g
  sodium: number; // mg per 100g
  allergens?: AllergenT[]; // Referințe la alergeni
  dietaryPreferences?: DietaryPreferenceT[]; // Referințe la preferințe dietare
}

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  proteins: { type: Number, required: true },
  fats: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  fiber: { type: Number, required: true },
  sugar: { type: Number, required: true },
  sodium: { type: Number, required: true },
  allergens: [{ type: Types.ObjectId, ref: Allergen }],
  dietaryPreferences: [{ type: Types.ObjectId, ref: DietaryPreference }],
});

const Ingredient =
  models.Ingredient ||
  model<IngredientT>("Ingredient", IngredientSchema, "Ingredients");
export default Ingredient;
