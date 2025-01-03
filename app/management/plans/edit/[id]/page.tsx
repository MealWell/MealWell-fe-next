"use client";

import { useRouter, useParams } from "next/navigation";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { TypographyH2 } from "@/components/typography/TypographyH2";
import { usePlan } from "@/hooks/usePlans";
import PlanForm from "@/components/PlanForm";

export default function EditPlanPage() {
  const { id } = useParams<{ id: string }>();
  const { data: plan, isLoading, error } = usePlan(id);
  const router = useRouter();

  if (isLoading) return <LoadingSkeleton />;
  if (error || !plan)
    return <ErrorDisplay message={"Could not get plan data"} />;

  const onSubmitSuccess = () => {
    router.push("/management/plans");
  };

  return (
    <div>
      <TypographyH2>Edit/View Plan</TypographyH2>
      <PlanForm
        onSubmitSuccess={onSubmitSuccess}
        isUpdate={true}
        initialData={plan}
        id={plan._id}
      />
    </div>
  );
}
