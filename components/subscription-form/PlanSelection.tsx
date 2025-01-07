"use client";

import { useFormContext } from "react-hook-form";
import { useCustomFormContext } from "@/components/subscription-form/SubscriptionFormContext";
import { z } from "zod";
import { SubscriptionSchema } from "@/validation/userSubscription";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import PublishedPlansCarousel from "@/components/PublishedPlansCarousel";

export default function PlanSelection() {
  const form = useFormContext<z.infer<typeof SubscriptionSchema>>();
  const { setSelectedPlan } = useCustomFormContext();

  return (
    <FormField
      control={form.control}
      name="planId"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className={"flex justify-center mt-4"}>
              <PublishedPlansCarousel
                onSelectButton={(selectedPlan) => {
                  field.onChange(selectedPlan._id);
                  setSelectedPlan(selectedPlan);
                }}
                selectedButtonId={field.value}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
