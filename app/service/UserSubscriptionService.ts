import UserSubscription, { UserSubscriptionT } from "@/model/UserSubscription";
import { z } from "zod";
import connectMongo from "@/db/mongoose";
import { SubscriptionSchema } from "@/validation/userSubscription";
import { getPublishedPlanById } from "@/app/service/PublishedPlanService";
import { PublishedPlanT } from "@/model/PublishedPlan";

export async function getActiveSubscription(
  userId: string,
): Promise<UserSubscriptionT | null> {
  try {
    await connectMongo();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const activeSubscription = await UserSubscription.findOne({
      userId: userId,
      createdAt: { $gte: oneMonthAgo },
    }).lean<UserSubscriptionT>();

    return activeSubscription;
  } catch (error) {
    console.error("Error checking active subscription:", error);
    throw error;
  }
}

export async function cancelActivePlan(userId: string) {
  try {
    await connectMongo();

    const activeSubscription = await getActiveSubscription(userId);

    if (!activeSubscription) {
      throw new Error("User does not have an active subscription.");
    }

    await UserSubscription.findByIdAndDelete(activeSubscription._id);
  } catch (error) {
    console.error("Error checking active subscription:", error);
    throw error;
  }
}

export async function createUserSubscription(
  userId: string,
  data: z.infer<typeof SubscriptionSchema>,
) {
  try {
    await connectMongo();

    const activeSubscription = await getActiveSubscription(userId);
    if (activeSubscription) {
      throw new Error("User already has an active subscription.");
    }

    const publishedPlan: PublishedPlanT | null = await getPublishedPlanById(
      data.planId,
    );
    if (!publishedPlan) {
      throw new Error("Published Plan not found.");
    }

    const planData = {
      name: publishedPlan.name,
      description: publishedPlan.description,
      goal: publishedPlan.goal,
      dailyCalories: publishedPlan.dailyCalories,
      meals: publishedPlan.meals.map((meal) => ({
        name: meal.name,
        description: meal.description,
        type: meal.type,
        ingredients: meal.ingredients.map((ingredient) => ({
          name: ingredient.name,
          quantity: ingredient.quantity,
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
            (preference) => ({
              name: preference.name,
              description: preference.description,
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
        dietaryPreferences: meal.dietaryPreferences?.map((preference) => ({
          name: preference.name,
          description: preference.description,
        })),
      })),
      keyFeatures: publishedPlan.keyFeatures,
      basePrice: publishedPlan.basePrice,
    };

    const newSubscription = new UserSubscription({
      userId: userId,
      planId: data.planId,
      planData,
      preferences: {
        allergens: data.preferences?.allergens?.map((allergen) => ({
          name: allergen,
        })),
        dietaryPreferences: data.preferences?.dietaryPreferences?.map(
          (preference) => ({ name: preference }),
        ),
      },
      deliveryInformation: {
        firstName: data.deliveryInformation.firstName,
        lastName: data.deliveryInformation.lastName,
        address: data.deliveryInformation.address,
        city: data.deliveryInformation.city,
        zipCode: data.deliveryInformation.zipCode,
        phoneNumber: data.deliveryInformation.phoneNumber,
        specialDeliveryInstructions:
          data.deliveryInformation.specialDeliveryInstructions,
        deliveryDays: data.deliveryInformation.deliveryDays,
        preferredDeliveryTime: data.deliveryInformation.preferredDeliveryTime,
      },
      createdAt: new Date(),
    });

    return await newSubscription.save();
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
}
