import { PlanT } from "@/model/Plan";
import PublishedPlan, { PublishedPlanT } from "@/model/PublishedPlan";
import { getPlanById } from "@/app/service/PlanService";
import connectMongo from "@/db/mongoose";

export async function getPublishedPlansIds() {
  try {
    await connectMongo();
    const publishedPlans = await PublishedPlan.find().select("draftPlanId");
    return new Set(publishedPlans.map((p) => p.draftPlanId.toString()));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function publishPlan(planId: string, basePrice: number) {
  await connectMongo();
  const plan: PlanT = await getPlanById(planId);

  if (!plan) {
    throw new Error("Plan not found");
  }

  if (plan.isPublished) {
    throw new Error("Plan is already published");
  }

  const publishedPlan = new PublishedPlan({
    name: plan.name,
    description: plan.description,
    goal: plan.goal,
    dailyCalories: plan.dailyCalories,
    meals: plan.meals.map((meal) => ({
      name: meal.name,
      description: meal.description,
      type: meal.type,
      ingredients: meal.ingredients.map(({ ingredient, quantity }) => ({
        name: ingredient.name,
        quantity,
        calories: ingredient.calories,
        proteins: ingredient.proteins,
        fats: ingredient.fats,
        carbohydrates: ingredient.carbohydrates,
        fiber: ingredient.fiber,
        sugar: ingredient.sugar,
        sodium: ingredient.sodium,
        allergens: ingredient.allergens?.map((allergen) => ({
          name: allergen.name,
          description: allergen.description,
        })),
        dietaryPreferences: ingredient.dietaryPreferences?.map(
          (dietaryPreference) => ({
            name: dietaryPreference.name,
            description: dietaryPreference.description,
          }),
        ),
      })),
      totalCalories: meal.totalCalories,
      totalProteins: meal.totalProteins,
      totalFats: meal.totalFats,
      totalCarbs: meal.totalCarbs,
      totalFiber: meal.totalFiber,
      totalSugar: meal.totalSugar,
      totalSodium: meal.totalSodium,
      allergens: meal.allergens?.map((allergen) => ({
        name: allergen.name,
        description: allergen.description,
      })),
      dietaryPreferences: meal.dietaryPreferences?.map((dietaryPreference) => ({
        name: dietaryPreference.name,
        description: dietaryPreference.description,
      })),
    })),
    keyFeatures: plan.keyFeatures,
    basePrice,
    isActive: true,
    publishedAt: new Date(),
    draftPlanId: plan._id,
  });

  await publishedPlan.save();
  return publishedPlan;
}

export async function getPublishedPlanById(id: string) {
  try {
    await connectMongo();
    return await PublishedPlan.findById(id).lean<PublishedPlanT>();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getAllPublishedPlans() {
  try {
    await connectMongo();

    return await PublishedPlan.find().lean();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getPaginatedPublishedPlans(page: number, limit: number) {
  try {
    await connectMongo();
    const skip = (page - 1) * limit;
    const plans = await PublishedPlan.find().skip(skip).limit(limit).lean();
    const count = await PublishedPlan.countDocuments();
    return {
      publishedPlans: plans,
      count,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function deletePublishedPlan(id: string) {
  try {
    await connectMongo();
    return PublishedPlan.findByIdAndDelete(id);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function updatePublishedPlanBasePrice(
  publishedPlanId: string,
  newBasePrice: number,
) {
  await connectMongo();
  const plan = await PublishedPlan.findByIdAndUpdate(
    publishedPlanId,
    { basePrice: newBasePrice },
    { new: true },
  );

  if (!plan) throw new Error("PublishedPlan not found");

  return plan;
}

export async function setPublishedPlanActive(
  publishedPlanId: string,
  isActive: boolean,
) {
  await connectMongo();

  const plan = await PublishedPlan.findByIdAndUpdate(
    publishedPlanId,
    { isActive: isActive },
    { new: true },
  );

  if (!plan) throw new Error("PublishedPlan not found");

  return plan;
}
