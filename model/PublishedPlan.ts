import { model, models, Schema, Types } from "mongoose";
import { PlanT } from "@/model/Plan";
import { DietaryPreferenceT } from "@/model/DietaryPreference";
import { AllergenT } from "@/model/Allergen";
import { MealT } from "@/model/Meal";

export interface PublishedPlanT extends Omit<PlanT, "meals"> {
  _id: string;
  basePrice: number;
  isActive: boolean;
  publishedAt: Date | null;
  draftPlanId: string;
  meals: PublishedMealT[];
}

export interface PublishedMealT extends Omit<MealT, "ingredients"> {
  ingredients: {
    _id: string;
    name: string;
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
    fiber: number;
    sugar: number;
    sodium: number;
    allergens?: AllergenT[];
    dietaryPreferences?: DietaryPreferenceT[];
    quantity: number;
  }[];
}

const PublishedPlanSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  goal: {
    type: String,
    enum: ["weight_loss", "muscle_gain", "balanced", "vegetarian"],
    required: true,
  },
  dailyCalories: { type: Number, required: true, default: 0 },
  meals: [
    {
      name: { type: String, required: true },
      description: { type: String, required: false },
      type: {
        type: String,
        enum: ["breakfast", "snack", "lunch", "dinner"],
        required: true,
      },
      ingredients: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          calories: { type: Number, required: true },
          proteins: { type: Number, required: true },
          fats: { type: Number, required: true },
          carbohydrates: { type: Number, required: true },
          fiber: { type: Number, required: true },
          sugar: { type: Number, required: true },
          sodium: { type: Number, required: true },
          allergens: [
            {
              name: { type: String, required: true },
              description: { type: String, required: false },
            },
          ],
          dietaryPreferences: [
            {
              name: { type: String, required: true },
              description: { type: String, required: false },
            },
          ],
        },
      ],
      totalCalories: { type: Number, required: true },
      totalProteins: { type: Number, required: true },
      totalFats: { type: Number, required: true },
      totalCarbs: { type: Number, required: true },
      totalFiber: { type: Number, required: true },
      totalSugar: { type: Number, required: true },
      totalSodium: { type: Number, required: true },
      allergens: [
        {
          name: { type: String, required: true },
          description: { type: String, required: false },
        },
      ],
      dietaryPreferences: [
        {
          name: { type: String, required: true },
          description: { type: String, required: false },
        },
      ],
    },
  ],
  keyFeatures: [{ type: String, required: true }],
  basePrice: { type: Number, required: true },
  isActive: { type: Boolean, required: true, default: true },
  publishedAt: { type: Date, default: null },
  draftPlanId: { type: Types.ObjectId },
});

const PublishedPlan =
  models.PublishedPlan ||
  model<PublishedPlanT>("PublishedPlan", PublishedPlanSchema, "PublishedPlans");
export default PublishedPlan;
