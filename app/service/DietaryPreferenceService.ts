import DietaryPreference, {
  DietaryPreferenceT,
} from "@/model/DietaryPreference";
import connectMongo from "@/db/mongoose";
import Ingredient from "@/model/Ingredient";
import Meal from "@/model/Meal";

export async function createDietaryPreference(
  data: Omit<DietaryPreferenceT, "_id">,
) {
  try {
    await connectMongo();
    const preference = new DietaryPreference(data);
    return await preference.save();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function updateDietaryPreference(
  id: string,
  data: Partial<Omit<DietaryPreferenceT, "_id">>,
) {
  try {
    await connectMongo();
    return await DietaryPreference.findByIdAndUpdate(id, data, { new: true });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getDietaryPreferenceById(id: string) {
  try {
    await connectMongo();
    return await DietaryPreference.findById(id);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getAllDietaryPreferences() {
  try {
    await connectMongo();
    return await DietaryPreference.find();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getPaginatedDietaryPreferences(
  page: number,
  limit: number,
) {
  try {
    await connectMongo();
    const skip = (page - 1) * limit;
    const preferences = await DietaryPreference.find().skip(skip).limit(limit);
    const count = await DietaryPreference.countDocuments();
    return { preferences, count };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function deleteDietaryPreference(id: string) {
  try {
    await connectMongo();
    await Ingredient.updateMany(
      { dietaryPreferences: id },
      { $pull: { dietaryPreferences: id } },
    );
    await Meal.updateMany(
      { dietaryPreferences: id },
      { $pull: { dietaryPreferences: id } },
    );
    return DietaryPreference.findByIdAndDelete(id);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
