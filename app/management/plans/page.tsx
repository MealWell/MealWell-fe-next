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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePublishPlan } from "@/hooks/usePublishedPlans";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PublishedPlanSchema } from "@/validation/publishedPlan";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function PlansPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading, error } = usePlans(page, limit);
  const deletePlan = useDeletePlan();

  const router = useRouter();

  const [isPublishPlanModalOpen, setIsPublishPlanModalOpen] = useState(false);
  const { showConfirmationModal } = useConfirmationModal();

  const [editingPlan, setEditingPlan] = useState<PlanT | null>(null);

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
        Create Plan
      </Button>
      <div className={"rounded-md border"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Daily calories</TableHead>
              <TableHead>Status</TableHead>
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
                  {plan.isPublished ? (
                    <Badge variant="success">Published</Badge>
                  ) : (
                    <Badge variant="outline">Draft</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="default"
                    className="mr-2"
                    onClick={() => {
                      setEditingPlan(plan);
                      setIsPublishPlanModalOpen(true);
                    }}
                    disabled={plan.isPublished}
                  >
                    Publish Plan
                  </Button>
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
      </div>
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

      <Dialog
        open={isPublishPlanModalOpen}
        onOpenChange={setIsPublishPlanModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish plan</DialogTitle>
            <DialogDescription className={"sr-only"}>
              Publish plan
            </DialogDescription>
          </DialogHeader>
          {editingPlan && (
            <PublishPlanForm
              onSubmitSuccess={() => {
                setEditingPlan(null);
                setIsPublishPlanModalOpen(false);
              }}
              id={editingPlan._id}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

type PublishPlanFormProps = {
  onSubmitSuccess: () => void;
  id: string;
};

function PublishPlanForm(props: PublishPlanFormProps) {
  const { onSubmitSuccess, id } = props;

  const publishPlan = usePublishPlan();
  const { showConfirmationModal } = useConfirmationModal();

  const form = useForm<z.infer<typeof PublishedPlanSchema>>({
    resolver: zodResolver(PublishedPlanSchema),
    defaultValues: {
      id: id,
      basePrice: 0,
    },
  });

  const onUpdateSubmit = (data: z.infer<typeof PublishedPlanSchema>) => {
    showConfirmationModal({
      title: "Confirm publishing plan",
      description: "Are you sure you want to publish this plan?",
      onConfirm: () => {
        publishPlan
          .mutateAsync({
            id: id,
            basePrice: data.basePrice,
          })
          .then(onSubmitSuccess)
          .catch((error: AxiosError<{ error: string }>) => {
            form.setError("root", { message: error.response?.data.error });
          });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onUpdateSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="basePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BasePrice (&euro; / month)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder={`Set a base price per month for the publishing plan`}
                  min={0}
                  step={"any"}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        <Button type="submit" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}
