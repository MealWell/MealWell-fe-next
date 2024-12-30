import Plan, { PlanT } from "@/model/Plan";
import Meal from "@/model/Meal";
import connectMongo from "@/db/mongoose";

async function calculatePlanCalories(meals: string[]) {
  let totalCalories = 0;

  for (const mealId of meals) {
    const meal = await Meal.findById(mealId);
    if (meal) {
      totalCalories += meal.totalCalories;
    }
  }

  return totalCalories;
}

export async function createPlan(data: Omit<PlanT, "_id" | "dailyCalories">) {
  try {
    await connectMongo();
    const dailyCalories = await calculatePlanCalories(data.meals);

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
  data: Partial<Omit<PlanT, "_id" | "dailyCalories">>,
) {
  try {
    await connectMongo();
    const existingPlan = await Plan.findById(id);
    if (!existingPlan) {
      throw new Error("Plan not found");
    }

    let updatedDailyCalories = existingPlan.dailyCalories;

    if (data.meals) {
      updatedDailyCalories = await calculatePlanCalories(data.meals);
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
