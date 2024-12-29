import Ingredient, { IngredientT } from "@/model/Ingredient";
import connectMongo from "@/db/mongoose";

export async function createIngredient(data: Omit<IngredientT, "_id">) {
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
  data: Partial<Omit<IngredientT, "_id">>,
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
