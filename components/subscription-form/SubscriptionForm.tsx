"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useActiveSubscription, useSubscribe } from "@/hooks/useSubscription";
import { useAuthorization } from "@/hooks/useAuthorization";
import Link from "next/link";
import SkeletonCard from "@/components/SkeletonCard";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { useRouter } from "next/navigation";

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

  const { isAuthenticated } = useAuthorization();

  const router = useRouter();

  const {
    data: activeSubscription,
    isLoading: isLoadingUserSubscription,
    isError,
  } = useActiveSubscription();

  const onSubmit = async (data: z.infer<typeof SubscriptionSchema>) => {
    await subscribeMutation.mutateAsync(data);
    router.push("/dashboard");
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Button
              variant={"link"}
              className={"p-0 text-base font-bold"}
              asChild
            >
              <Link href={"/sign-in"}>Sign In</Link>
            </Button>{" "}
            to start a subscription
          </CardTitle>
          <CardDescription>
            To start a plan subscription you should sign in
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (isLoadingUserSubscription) {
    return <SkeletonCard />;
  }

  if (isError) {
    return (
      <ErrorDisplay message={"Could not check currently active subscription"} />
    );
  }

  if (activeSubscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>You already have a subscription</CardTitle>
          <CardDescription>
            Check your dashboard to manage your currently active subscription
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

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
