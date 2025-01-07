"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubscriptionSchema } from "@/validation/userSubscription";
import PlanSelection from "@/components/subscription-form/PlanSelection";
import CustomizeMenu from "@/components/subscription-form/CustomizeMenu";
import { CustomFormContextProvider } from "@/components/subscription-form/SubscriptionFormContext";
import DeliverySetup from "@/components/subscription-form/DeliverySetup";
import { Form } from "@/components/ui/form";
import { useSubscribe } from "@/hooks/useSubscription";

const steps = ["Plan Selection", "Customize Menu", "Delivery Setup"];

export default function SubscriptionForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const form = useForm<z.infer<typeof SubscriptionSchema>>({
    resolver: zodResolver(SubscriptionSchema),
    defaultValues: {
      planId: undefined,
      deliveryInformation: {
        address: "",
        city: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        specialDeliveryInstructions: "",
        zipCode: "",
        deliveryDays: [],
        preferredDeliveryTime: undefined,
      },
      preferences: {
        dietaryPreferences: [],
        allergens: [],
      },
    },
  });

  const subscribeMutation = useSubscribe();

  const onSubmit = async (data: z.infer<typeof SubscriptionSchema>) => {
    await subscribeMutation.mutateAsync(data);
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <Form {...form}>
      <CustomFormContextProvider>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{steps[currentStep]}</CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep === 0 && <PlanSelection />}
              {currentStep === 1 && <CustomizeMenu />}
              {currentStep === 2 && <DeliverySetup />}
            </CardContent>
            {!!form.watch("planId") && (
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep <= 0}
                >
                  Previous
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={nextStep} key={"next"}>
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    key={"submit"}
                    disabled={form.formState.isSubmitting}
                  >
                    Submit
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        </form>
      </CustomFormContextProvider>
    </Form>
  );
}
