import Meal, { MealT } from "@/model/Meal";
import Ingredient, { IngredientT } from "@/model/Ingredient";
import connectMongo from "@/db/mongoose";

async function calculateMealValues(
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

export async function createMeal(
  data: Omit<
    MealT,
    | "_id"
    | "totalCalories"
    | "totalProteins"
    | "totalFats"
    | "totalCarbs"
    | "totalFiber"
    | "totalSugar"
    | "totalSodium"
  >,
) {
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
  data: Partial<Omit<MealT, "_id">>,
) {
  try {
    const existingMeal = await Meal.findById(id).populate(
      "ingredients.ingredient",
    );
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

    if (data.ingredients) {
      const calculatedValues = await calculateMealValues(updatedIngredients);
      data = {
        ...data,
        totalCalories: calculatedValues.totalCalories,
        totalProteins: calculatedValues.totalProteins,
        totalFats: calculatedValues.totalFats,
        totalCarbs: calculatedValues.totalCarbs,
        totalFiber: calculatedValues.totalFiber,
        totalSugar: calculatedValues.totalSugar,
        totalSodium: calculatedValues.totalSodium,
        ingredients: updatedIngredients,
      };
    }

    // Actualizăm Meal-ul în baza de date
    return await Meal.findByIdAndUpdate(id, data, { new: true });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getMealById(id: string) {
  try {
    return await Meal.findById(id)
      .populate("ingredients.ingredient")
      .populate("allergens")
      .populate("dietaryPreferences");
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getAllMeals() {
  try {
    return await Meal.find()
      .populate("ingredients.ingredient")
      .populate("allergens")
      .populate("dietaryPreferences");
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getPaginatedMeals(page: number, limit: number) {
  try {
    const skip = (page - 1) * limit;
    const meals = await Meal.find()
      .skip(skip)
      .limit(limit)
      .populate("ingredients.ingredient")
      .populate("allergens")
      .populate("dietaryPreferences");
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
