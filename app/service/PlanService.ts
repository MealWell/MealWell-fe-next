import Plan, { PlanT } from "@/model/Plan";
import { MealT } from "@/model/Meal";
import connectMongo from "@/db/mongoose";
import { getMealById } from "@/app/service/MealService";
import { z } from "zod";
import { PlanPartialSchema, PlanSchema } from "@/validation/plan";
import { getPublishedPlansIds } from "@/app/service/PublishedPlanService";

export async function calculateDailyCalories(meals: string[]) {
  const mealCategories = {
    breakfast: [] as MealT[],
    snack: [] as MealT[],
    lunch: [] as MealT[],
    dinner: [] as MealT[],
  };

  for (const mealId of meals) {
    const meal: MealT = await getMealById(mealId);
    if (meal && meal.type in mealCategories) {
      mealCategories[meal.type].push(meal);
    }
  }

  let dailyCalories = 0;

  for (const [, meals] of Object.entries(mealCategories)) {
    if (meals.length > 0) {
      const categoryCalories =
        meals.reduce((sum, meal) => sum + meal.totalCalories, 0) / meals.length;

      dailyCalories += categoryCalories;
    }
  }

  return dailyCalories;
}

export async function createPlan(data: z.infer<typeof PlanSchema>) {
  try {
    await connectMongo();
    const dailyCalories = await calculateDailyCalories(data.meals);

    const planData = {
      ...data,
      dailyCalories,
    };

    const plan = new Plan(planData);
    return await plan.save();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function updatePlan(
  id: string,
  data: z.infer<typeof PlanPartialSchema>,
) {
  try {
    await connectMongo();
    const existingPlan = await Plan.findById(id);
    if (!existingPlan) {
      throw new Error("Plan not found");
    }

    let updatedDailyCalories = existingPlan.dailyCalories;

    if (data.meals) {
      updatedDailyCalories = await calculateDailyCalories(data.meals);
    }

    const updatedPlan = {
      ...data,
      dailyCalories: updatedDailyCalories,
    };

    return await Plan.findByIdAndUpdate(id, updatedPlan, { new: true });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getPlanById(id: string) {
  try {
    await connectMongo();
    const publishedPlansIds = await getPublishedPlansIds();
    const plan: PlanT | null = await Plan.findById(id)
      .populate("meals")
      .populate({
        path: "meals",
        populate: [
          { path: "allergens" },
          { path: "dietaryPreferences" },
          {
            path: "ingredients.ingredient",
            populate: [{ path: "allergens" }, { path: "dietaryPreferences" }],
          },
        ],
      })
      .lean<PlanT>();

    if (!plan) throw new Error("Plan not found");

    return {
      _id: plan._id.toString(),
      name: plan.name,
      description: plan.description,
      goal: plan.goal,
      dailyCalories: plan.dailyCalories,
      meals: plan.meals,
      keyFeatures: plan.keyFeatures,
      isPublished: publishedPlansIds.has(plan?._id.toString()),
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getAllPlans() {
  try {
    await connectMongo();
    const publishedPlansIds = await getPublishedPlansIds();

    const plans = await Plan.find()
      .populate("meals")
      .populate({
        path: "meals",
        populate: [
          { path: "allergens" },
          { path: "dietaryPreferences" },
          {
            path: "ingredients.ingredient",
            populate: [{ path: "allergens" }, { path: "dietaryPreferences" }],
          },
        ],
      })
      .lean<PlanT[]>();

    return plans.map((plan) => ({
      ...plan,
      isPublished: publishedPlansIds.has(plan._id.toString()),
    }));
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getPaginatedPlans(page: number, limit: number) {
  try {
    await connectMongo();
    const skip = (page - 1) * limit;

    const publishedPlansIds = await getPublishedPlansIds();
    const plans = await Plan.find()
      .skip(skip)
      .limit(limit)
      .populate("meals")
      .populate({
        path: "meals",
        populate: [
          { path: "allergens" },
          { path: "dietaryPreferences" },
          {
            path: "ingredients.ingredient",
            populate: [{ path: "allergens" }, { path: "dietaryPreferences" }],
          },
        ],
      })
      .lean<PlanT[]>();
    const count = await Plan.countDocuments();
    return {
      plans: plans.map((plan) => ({
        ...plan,
        isPublished: publishedPlansIds.has(plan._id.toString()),
      })),
      count,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function deletePlan(id: string) {
  try {
    await connectMongo();
    return Plan.findByIdAndDelete(id);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
