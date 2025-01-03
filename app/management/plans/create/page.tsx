"use client";

import { useRouter } from "next/navigation";
import { TypographyH2 } from "@/components/typography/TypographyH2";
import PlanForm from "@/components/PlanForm";

export default function CreateMealPage() {
  const router = useRouter();

  const onSubmitSuccess = () => {
    router.push("/management/plans");
  };

  return (
    <div>
      <TypographyH2>Create Plan</TypographyH2>
      <PlanForm onSubmitSuccess={onSubmitSuccess} isUpdate={false} />
    </div>
  );
}
