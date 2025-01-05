"use client";

import { useState } from "react";
import { useMeals, useDeleteMeal } from "@/hooks/useMeals";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { useConfirmationModal } from "@/context/GlobalConfirmationModalContext";
import { TypographyH2 } from "@/components/typography/TypographyH2";

export default function MealsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading, error } = useMeals(page, limit);
  const deleteMeal = useDeleteMeal();
  const router = useRouter();
  const { showConfirmationModal } = useConfirmationModal();

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error.message} />;

  const handleDelete = async (id: string) => {
    showConfirmationModal({
      title: "Confirm delete meal",
      description: "Are you sure you want to delete this meal?",
      onConfirm: async () => {
        await deleteMeal.mutateAsync(id);
      },
    });
  };

  return (
    <>
      <TypographyH2>Meals management</TypographyH2>
      <Button
        onClick={() => router.push("/management/meals/create")}
        className="mb-4"
      >
        Create Meal
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Calories</TableHead>
            <TableHead>Proteins</TableHead>
            <TableHead>Fats</TableHead>
            <TableHead>Carbohydrates</TableHead>
            <TableHead>Fibers</TableHead>
            <TableHead>Sugars</TableHead>
            <TableHead>Sodium</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.meals.map((meal) => (
            <TableRow key={meal._id}>
              <TableCell>{meal.name}</TableCell>
              <TableCell>{meal.description}</TableCell>
              <TableCell>{meal.type}</TableCell>
              <TableCell>{meal.totalCalories}</TableCell>
              <TableCell>{meal.totalProteins}</TableCell>
              <TableCell>{meal.totalFats}</TableCell>
              <TableCell>{meal.totalCarbs}</TableCell>
              <TableCell>{meal.totalFiber}</TableCell>
              <TableCell>{meal.totalSugar}</TableCell>
              <TableCell>{meal.totalSodium}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() =>
                    router.push(`/management/meals/edit/${meal._id}`)
                  }
                >
                  Edit/View
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(meal._id)}
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
          disabled={(data?.meals.length || 0) < limit}
        >
          Next
        </Button>
      </div>
    </>
  );
}
