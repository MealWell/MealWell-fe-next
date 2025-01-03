import Ingredient from "@/model/Ingredient";
import connectMongo from "@/db/mongoose";
import { z } from "zod";
import {
  IngredientPartialSchema,
  IngredientSchema,
} from "@/validation/ingredient";
import Meal, { MealT } from "@/model/Meal";
import { calculateMealValues, deleteMeal } from "@/app/service/MealService";

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

export async function deleteIngredient(id: string) {
  try {
    await connectMongo();

    const mealsWithIngredient: MealT[] = await Meal.find({
      "ingredients.ingredient": id,
    })
      .populate("allergens")
      .populate("dietaryPreferences")
      .populate("ingredients.ingredient")
      .populate({
        path: "ingredients.ingredient",
        populate: [{ path: "allergens" }, { path: "dietaryPreferences" }],
      });

    for (const meal of mealsWithIngredient) {
      meal.ingredients = meal.ingredients.filter(
        (ing) => ing.ingredient._id.toString() !== id,
      );

      if (meal.ingredients.length === 0) {
        await deleteMeal(meal._id);
      } else {
        const mealValues = await calculateMealValues(
          meal.ingredients.map((ing) => ({
            ingredient: ing.ingredient._id.toString(),
            quantity: ing.quantity,
          })),
        );

        await Meal.findByIdAndUpdate(meal._id, {
          ingredients: meal.ingredients.map((ing) => ({
            ingredient: ing.ingredient._id,
            quantity: ing.quantity,
          })),
          totalCalories: mealValues.totalCalories,
          totalProteins: mealValues.totalProteins,
          totalFats: mealValues.totalFats,
          totalCarbs: mealValues.totalCarbs,
          totalFiber: mealValues.totalFiber,
          totalSugar: mealValues.totalSugar,
          totalSodium: mealValues.totalSodium,
        });
      }
    }

    console.log(`Deleting ingredient with id: ${id}`);
    return await Ingredient.findByIdAndDelete(id);
  } catch (e) {
    console.error("Error while deleting ingredient:", e);
    throw e;
  }
}
