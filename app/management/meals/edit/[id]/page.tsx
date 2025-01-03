"use client";

import { useMeal } from "@/hooks/useMeals";
import { useRouter, useParams } from "next/navigation";
import MealForm from "@/components/MealForm";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { TypographyH2 } from "@/components/typography/TypographyH2";

export default function EditMealPage() {
  const { id } = useParams<{ id: string }>();
  const { data: meal, isLoading, error } = useMeal(id);
  const router = useRouter();

  if (isLoading) return <LoadingSkeleton />;
  if (error || !meal)
    return <ErrorDisplay message={"Could not get meal data"} />;

  const onSubmitSuccess = () => {
    router.push("/management/meals");
  };

  return (
    <div>
      <TypographyH2>Edit/View Meal</TypographyH2>
      <MealForm
        onSubmitSuccess={onSubmitSuccess}
        isUpdate={true}
        initialData={meal}
        id={meal._id}
      />
    </div>
  );
}
