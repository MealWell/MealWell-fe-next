"use client";

import { useFormContext } from "react-hook-form";
import { useCustomFormContext } from "@/components/subscription-form/SubscriptionFormContext";
import { AllergenT } from "@/model/Allergen";
import { DietaryPreferenceT } from "@/model/DietaryPreference";
import { z } from "zod";
import { SubscriptionSchema } from "@/validation/userSubscription";
import { PublishedPlanT } from "@/model/PublishedPlan";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";

function extractUniqueAllergensAndPreferences(plan: PublishedPlanT): {
  allergens: AllergenT[];
  dietaryPreferences: DietaryPreferenceT[];
} {
  const allergenSet = new Map<string, AllergenT>();
  const dietaryPreferenceSet = new Map<string, DietaryPreferenceT>();
  plan.meals.forEach((meal) => {
    meal.allergens?.forEach((allergen) => {
      if (!allergenSet.has(allergen.name)) {
        allergenSet.set(allergen.name, allergen);
      }
    });

    meal.dietaryPreferences?.forEach((preference) => {
      if (!dietaryPreferenceSet.has(preference.name)) {
        dietaryPreferenceSet.set(preference.name, preference);
      }
    });
    meal.ingredients.forEach((ingredient) => {
      ingredient.allergens?.forEach((allergen) => {
        if (!allergenSet.has(allergen.name)) {
          allergenSet.set(allergen.name, allergen);
        }
      });

      ingredient.dietaryPreferences?.forEach((preference) => {
        if (!dietaryPreferenceSet.has(preference.name)) {
          dietaryPreferenceSet.set(preference.name, preference);
        }
      });
    });
  });

  return {
    allergens: Array.from(allergenSet.values()),
    dietaryPreferences: Array.from(dietaryPreferenceSet.values()),
  };
}

export default function CustomizeMenu() {
  const context = useCustomFormContext();
  const form = useFormContext<z.infer<typeof SubscriptionSchema>>();

  if (!context.selectedPlan) return <div>Please select a plan first</div>;

  const { allergens, dietaryPreferences } =
    extractUniqueAllergensAndPreferences(context.selectedPlan);

  return (
    <div>
      <FormField
        control={form.control}
        name="preferences.allergens"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Allergens</FormLabel>
            <FormControl>
              <MultiSelect
                {...field}
                options={
                  allergens?.map((allergen) => ({
                    value: allergen.name,
                    label: allergen.name,
                  })) || []
                }
                defaultValue={field.value}
                onValueChange={(values: string[]) => field.onChange(values)}
                placeholder="Select allergens"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferences.dietaryPreferences"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dietary Preferences</FormLabel>
            <FormControl>
              <MultiSelect
                {...field}
                options={
                  dietaryPreferences?.map((dietaryPreference) => ({
                    value: dietaryPreference.name,
                    label: dietaryPreference.name,
                  })) || []
                }
                defaultValue={field.value}
                onValueChange={(values: string[]) => field.onChange(values)}
                placeholder="Select dietary preferences"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
