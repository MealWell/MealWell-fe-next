import Meal, { MealT } from "@/model/Meal";
import Ingredient, { IngredientT } from "@/model/Ingredient";
import connectMongo from "@/db/mongoose";
import { z } from "zod";
import { MealPartialSchema, MealSchema } from "@/validation/meal";

export async function calculateMealValues(
  ingredients: { ingredient: string; quantity: number }[],
) {
  let totalCalories = 0;
  let totalProteins = 0;
  let totalFats = 0;
  let totalCarbs = 0;
  let totalFiber = 0;
  let totalSugar = 0;
  let totalSodium = 0;

  for (const { ingredient, quantity } of ingredients) {
    const ingredientData = await Ingredient.findById(ingredient);
    if (ingredientData) {
      totalCalories += (ingredientData.calories * quantity) / 100;
      totalProteins += (ingredientData.proteins * quantity) / 100;
      totalFats += (ingredientData.fats * quantity) / 100;
      totalCarbs += (ingredientData.carbohydrates * quantity) / 100;
      totalFiber += (ingredientData.fiber * quantity) / 100;
      totalSugar += (ingredientData.sugar * quantity) / 100;
      totalSodium += (ingredientData.sodium * quantity) / 100;
    }
  }

  return {
    totalCalories,
    totalProteins,
    totalFats,
    totalCarbs,
    totalFiber,
    totalSugar,
    totalSodium,
  };
}

export async function createMeal(data: z.infer<typeof MealSchema>) {
  try {
    await connectMongo();
    const calculatedValues = await calculateMealValues(data.ingredients);

    const mealData = {
      ...data,
      totalCalories: calculatedValues.totalCalories,
      totalProteins: calculatedValues.totalProteins,
      totalFats: calculatedValues.totalFats,
      totalCarbs: calculatedValues.totalCarbs,
      totalFiber: calculatedValues.totalFiber,
      totalSugar: calculatedValues.totalSugar,
      totalSodium: calculatedValues.totalSodium,
    };

    const meal = new Meal(mealData);
    return await meal.save();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function updateMeal(
  id: string,
  data: z.infer<typeof MealPartialSchema>,
) {
  try {
    await connectMongo();
    const existingMeal = await Meal.findById(id)
      .populate("allergens")
      .populate("dietaryPreferences")
      .populate("ingredients.ingredient")
      .populate({
        path: "ingredients.ingredient",
        populate: [{ path: "allergens" }, { path: "dietaryPreferences" }],
      });
    if (!existingMeal) {
      throw new Error("Meal not found");
    }

    const updatedIngredients =
      data.ingredients ||
      existingMeal.ingredients.map(
        (ing: { ingredient: IngredientT; quantity: number }) => ({
          ingredient: ing.ingredient._id.toString(),
          quantity: ing.quantity,
        }),
      );

    let updatedMeal: Partial<MealT> | z.infer<typeof MealPartialSchema> = {
      ...data,
    };

    if (data.ingredients) {
      const calculatedValues = await calculateMealValues(updatedIngredients);
      updatedMeal = {
        ...data,
        totalCalories: calculatedValues.totalCalories,
        totalProteins: calculatedValues.totalProteins,
        totalFats: calculatedValues.totalFats,
        totalCarbs: calculatedValues.totalCarbs,
        totalFiber: calculatedValues.totalFiber,
        totalSugar: calculatedValues.totalSugar,
        totalSodium: calculatedValues.totalSodium,
        ingredients: updatedIngredients,
        type: data.type,
      };
    }

    return await Meal.findByIdAndUpdate(id, updatedMeal, { new: true });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getMealById(id: string) {
  try {
    await connectMongo();
    return await Meal.findById(id)
      .populate("allergens")
      .populate("dietaryPreferences")
      .populate("ingredients.ingredient")
      .populate({
        path: "ingredients.ingredient",
        populate: [{ path: "allergens" }, { path: "dietaryPreferences" }],
      });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getAllMeals() {
  try {
    await connectMongo();
    return await Meal.find()
      .populate("allergens")
      .populate("dietaryPreferences")
      .populate("ingredients.ingredient")
      .populate({
        path: "ingredients.ingredient",
        populate: [{ path: "allergens" }, { path: "dietaryPreferences" }],
      });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getPaginatedMeals(page: number, limit: number) {
  try {
    await connectMongo();
    const skip = (page - 1) * limit;
    const meals = await Meal.find()
      .skip(skip)
      .limit(limit)
      .populate("allergens")
      .populate("dietaryPreferences")
      .populate("ingredients.ingredient")
      .populate({
        path: "ingredients.ingredient",
        populate: [{ path: "allergens" }, { path: "dietaryPreferences" }],
      });
    const count = await Meal.countDocuments();
    return { meals, count };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function deleteMeal(id: string) {
  try {
    await connectMongo();
    return Meal.findByIdAndDelete(id);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
