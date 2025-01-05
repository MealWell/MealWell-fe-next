"use client";

import { useState } from "react";
import { usePlans, useDeletePlan } from "@/hooks/usePlans";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { PlanT } from "@/model/Plan";
import { useRouter } from "next/navigation";
import { TypographyH2 } from "@/components/typography/TypographyH2";
import { useConfirmationModal } from "@/context/GlobalConfirmationModalContext";

export default function PlansPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading, error } = usePlans(page, limit);
  const deletePlan = useDeletePlan();

  const router = useRouter();

  const { showConfirmationModal } = useConfirmationModal();

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error.message} />;

  const handleDelete = async (id: string) => {
    showConfirmationModal({
      title: "Confirm delete plan",
      description: "Are you sure you want to delete this plan?",
      onConfirm: async () => {
        await deletePlan.mutateAsync(id);
      },
    });
  };

  return (
    <div className="container mx-auto py-8">
      <TypographyH2>Plans Management</TypographyH2>
      <Button
        onClick={() => router.push("/management/plans/create")}
        className="mb-4"
      >
        Create Meal
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Goal</TableHead>
            <TableHead>Daily calories</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.plans.map((plan: PlanT) => (
            <TableRow key={plan._id}>
              <TableCell>{plan.name}</TableCell>
              <TableCell>{plan.description}</TableCell>
              <TableCell>{plan.goal}</TableCell>
              <TableCell>{plan.dailyCalories}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() =>
                    router.push(`/management/plans/edit/${plan._id}`)
                  }
                >
                  Edit/View
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(plan._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-between">
        <Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setPage((p) => p + 1)}
          disabled={(data?.plans.length || 0) < limit}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
