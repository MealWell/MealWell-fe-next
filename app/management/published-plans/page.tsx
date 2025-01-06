"use client";

import { useState } from "react";
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
import { TypographyH2 } from "@/components/typography/TypographyH2";
import {
  useDeletePublishedPlan,
  usePublishedPlans,
  useUpdatePublishedPlanBasePrice,
  useUpdatePublishedPlanIsActive,
} from "@/hooks/usePublishedPlans";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { PublishedPlanUpdateBasePriceSchema } from "@/validation/publishedPlan";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PublishedPlanT } from "@/model/PublishedPlan";
import { useConfirmationModal } from "@/context/GlobalConfirmationModalContext";
import { Badge } from "@/components/ui/badge";
import { useAuthorization } from "@/hooks/useAuthorization";
import { useRouter } from "next/navigation";
import PublishedPlansCarousel from "@/components/PublishedPlansCarousel";

export default function PublishedPlansPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading, error } = usePublishedPlans(page, limit);

  const [editingPublishedPlan, setEditingPublishedPlan] =
    useState<PublishedPlanT | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const deletePublishedPlan = useDeletePublishedPlan();
  const setIsActive = useUpdatePublishedPlanIsActive();
  const { showConfirmationModal } = useConfirmationModal();

  const { isAuthorized } = useAuthorization();

  const router = useRouter();

  const isAdmin = isAuthorized("admin");

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error.message} />;

  const handleDelete = async (id: string) => {
    showConfirmationModal({
      title: "Confirm delete published plan",
      description: "Are you sure you want to delete this published plan?",
      onConfirm: async () => {
        await deletePublishedPlan.mutateAsync(id);
      },
    });
  };

  const handleSetIsActive = (id: string, newIsActive: boolean) => {
    showConfirmationModal({
      title: `Confirm ${newIsActive ? "activation" : "deactivation"} of the published plan`,
      description: `Are you sure you want to ${newIsActive ? "activate" : "deactivate"} published plan?`,
      onConfirm: async () => {
        await setIsActive.mutateAsync({
          id: id,
          body: { isActive: newIsActive },
        });
      },
    });
  };

  return (
    <>
      <TypographyH2>Published Plans Management</TypographyH2>
      <div className={"rounded-md border"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Base Price per month</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.publishedPlans.map((publishedPlan) => (
              <TableRow key={publishedPlan._id}>
                <TableCell>{publishedPlan.name}</TableCell>
                <TableCell>{publishedPlan.description}</TableCell>
                <TableCell>{publishedPlan.goal}</TableCell>
                <TableCell>{publishedPlan.basePrice} &#8364;</TableCell>
                <TableCell>
                  {publishedPlan.isActive ? (
                    <Badge variant="success">Active</Badge>
                  ) : (
                    <Badge variant="outline">Inactive</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {isAdmin && (
                      <Button
                        size="sm"
                        onClick={() => {
                          handleSetIsActive(
                            publishedPlan._id,
                            !publishedPlan.isActive,
                          );
                        }}
                      >
                        {publishedPlan.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    )}
                    {isAdmin && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingPublishedPlan(publishedPlan);
                          setIsEditModalOpen(true);
                        }}
                      >
                        Update price
                      </Button>
                    )}
                    {isAdmin && (
                      <Button
                        variant={"destructive"}
                        onClick={() => handleDelete(publishedPlan._id)}
                        size={"sm"}
                      >
                        Delete
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={() => {
                        router.push(
                          `/view-published-plan/${publishedPlan._id}`,
                        );
                      }}
                    >
                      View Plan Details
                    </Button>
                  </div>
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
          disabled={!!data ? data.publishedPlans.length < limit : true}
        >
          Next
        </Button>
      </div>
      {data?.publishedPlans && data.publishedPlans.length > 0 && (
        <div className={"flex justify-center mt-4"}>
          <PublishedPlansCarousel />
        </div>
      )}

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change published plan base price</DialogTitle>
            <DialogDescription className={"sr-only"}>
              Change published plan base price
            </DialogDescription>
          </DialogHeader>
          {editingPublishedPlan && (
            <PublishedPlanForm
              onSubmitSuccess={() => {
                setIsEditModalOpen(false);
                setEditingPublishedPlan(null);
              }}
              initialBasePrice={editingPublishedPlan.basePrice}
              id={editingPublishedPlan._id}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

type PublishedPlanFormProps = {
  onSubmitSuccess: () => void;
  id: string;
  initialBasePrice: number;
};

function PublishedPlanForm(props: PublishedPlanFormProps) {
  const { onSubmitSuccess, initialBasePrice, id } = props;

  const updateBasePrice = useUpdatePublishedPlanBasePrice();
  const { showConfirmationModal } = useConfirmationModal();

  const form = useForm<z.infer<typeof PublishedPlanUpdateBasePriceSchema>>({
    resolver: zodResolver(PublishedPlanUpdateBasePriceSchema),
    defaultValues: {
      basePrice: initialBasePrice,
    },
  });

  const onUpdateSubmit = (
    data: z.infer<typeof PublishedPlanUpdateBasePriceSchema>,
  ) => {
    showConfirmationModal({
      title: "Confirm change published plan base price",
      description:
        "Are you sure you want to change base price for this published plan?",
      onConfirm: () => {
        updateBasePrice
          .mutateAsync({
            id: id,
            body: data,
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
                  placeholder={`${initialBasePrice}`}
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
