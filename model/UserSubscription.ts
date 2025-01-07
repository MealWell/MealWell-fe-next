import { model, models, Schema } from "mongoose";
import { PublishedPlanT } from "@/model/PublishedPlan";
import { AllergenT } from "@/model/Allergen";
import { DietaryPreferenceT } from "@/model/DietaryPreference";
import {
  DeliveryTimes,
  DeliveryTimeT,
  Weekdays,
  WeekdayT,
} from "@/const/types";

export interface UserSubscriptionT {
  _id: string;
  userId: string;
  planId: string;
  planData: PublishedPlanT;
  preferences?: {
    allergens?: AllergenT[];
    dietaryPreferences?: DietaryPreferenceT[];
  };
  deliveryInformation: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
    phoneNumber: string;
    specialDeliveryInstructions?: string;
    deliveryDays: WeekdayT[];
    preferredDeliveryTime: DeliveryTimeT;
  };
  createdAt: Date;
}

const UserSubscriptionSchema = new Schema<UserSubscriptionT>({
  userId: { type: String, required: true },
  planId: { type: String, required: true },
  planData: {
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
  },
  preferences: {
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
  deliveryInformation: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: false },
    phoneNumber: { type: String, required: true },
    specialDeliveryInstructions: { type: String },
    deliveryDays: {
      type: [String],
      required: true,
      enum: Weekdays,
      validate: {
        validator: function (value: string[]) {
          const uniqueDays = new Set(value);
          return uniqueDays.size >= 3;
        },
        message: "Delivery days must include at least 3 unique days.",
      },
    },
    preferredDeliveryTime: {
      type: String,
      required: true,
      enum: DeliveryTimes,
    },
  },
  createdAt: { type: Date, default: Date.now },
});

const UserSubscription =
  models.UserSubscription ||
  model<UserSubscriptionT>(
    "UserSubscription",
    UserSubscriptionSchema,
    "UserSubscriptions",
  );

export default UserSubscription;
