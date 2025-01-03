"use client";

import { useRouter } from "next/navigation";
import MealForm from "@/components/MealForm";
import { TypographyH2 } from "@/components/typography/TypographyH2";

export default function CreateMealPage() {
  const router = useRouter();

  const onSubmitSuccess = () => {
    router.push("/management/meals");
  };

  return (
    <div>
      <TypographyH2>Create Meal</TypographyH2>
      <MealForm onSubmitSuccess={onSubmitSuccess} isUpdate={false} />
    </div>
  );
}
