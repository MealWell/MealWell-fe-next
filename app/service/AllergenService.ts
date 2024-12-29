import Allergen, { AllergenT } from "@/model/Allergen";
import connectMongo from "@/db/mongoose";

export async function createAllergen(data: Omit<AllergenT, "_id">) {
  try {
    await connectMongo();
    const allergen = new Allergen(data);
    return allergen.save();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function updateAllergen(
  id: string,
  data: Partial<Omit<AllergenT, "_id">>,
) {
  try {
    await connectMongo();
    return Allergen.findByIdAndUpdate(id, data, { new: true });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getAllergenById(id: string) {
  try {
    await connectMongo();

    return Allergen.findById(id);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getAllAllergens() {
  try {
    await connectMongo();

    return Allergen.find();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getPaginatedAllergens(page: number, limit: number) {
  try {
    await connectMongo();

    const skip = (page - 1) * limit;
    const allergens = await Allergen.find().skip(skip).limit(limit);
    const count = await Allergen.countDocuments();
    return { allergens, count };
  } catch (e) {
    console.error(e);
    throw e;
  }
}
