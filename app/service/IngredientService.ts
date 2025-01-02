import Ingredient from "@/model/Ingredient";
import connectMongo from "@/db/mongoose";
import { z } from "zod";
import {
  IngredientPartialSchema,
  IngredientSchema,
} from "@/validation/ingredient";

export async function createIngredient(data: z.infer<typeof IngredientSchema>) {
  try {
    await connectMongo();
    const ingredient = new Ingredient(data);
    return ingredient.save();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function updateIngredient(
  id: string,
  data: z.infer<typeof IngredientPartialSchema>,
) {
  try {
    await connectMongo();
    return Ingredient.findByIdAndUpdate(id, data, { new: true });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getIngredientById(id: string) {
  try {
    await connectMongo();
    return Ingredient.findById(id)
      .populate("allergens")
      .populate("dietaryPreferences");
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getAllIngredients() {
  try {
    await connectMongo();
    return Ingredient.find().populate("allergens dietaryPreferences");
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getPaginatedIngredients(page: number, limit: number) {
  try {
    await connectMongo();
    const skip = (page - 1) * limit;
    const ingredients = await Ingredient.find()
      .skip(skip)
      .limit(limit)
      .populate("allergens")
      .populate("dietaryPreferences");
    const count = await Ingredient.countDocuments();
    return { ingredients, count };
  } catch (e) {
    console.error(e);
    throw e;
  }
}
