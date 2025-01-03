import { model, models, Schema, Types } from "mongoose";
import { MealT } from "@/model/Meal";

export interface PlanT {
  _id: string;
  name: string;
  description?: string;
  goal: "weight_loss" | "muscle_gain" | "balanced" | "vegetarian";
  dailyCalories: number;
  meals: MealT[];
  keyFeatures: string[];
}

const PlanSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  goal: {
    type: String,
    enum: ["weight_loss", "muscle_gain", "balanced", "vegetarian"],
    required: true,
  },
  dailyCalories: { type: Number, required: true, default: 0 },
  meals: [{ type: Types.ObjectId, ref: "Meal", required: true }],
  keyFeatures: [{ type: String, required: true }],
});

const Plan = models.Plan || model<PlanT>("Plan", PlanSchema, "Plans");
export default Plan;
