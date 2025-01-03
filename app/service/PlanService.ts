import Plan from "@/model/Plan";
import { MealT } from "@/model/Meal";
import connectMongo from "@/db/mongoose";
import { getMealById } from "@/app/service/MealService";
import { z } from "zod";
import { PlanPartialSchema, PlanSchema } from "@/validation/plan";

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
    return await Plan.findById(id).populate("meals");
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getAllPlans() {
  try {
    return await Plan.find().populate("meals");
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getPaginatedPlans(page: number, limit: number) {
  try {
    const skip = (page - 1) * limit;
    const plans = await Plan.find().skip(skip).limit(limit).populate("meals");
    const count = await Plan.countDocuments();
    return { plans, count };
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
