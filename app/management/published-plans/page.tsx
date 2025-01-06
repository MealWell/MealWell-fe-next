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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BicepsFlexed,
  Check,
  Leaf,
  Ruler,
  Scale,
  Utensils,
} from "lucide-react";
import { TypographyP } from "@/components/typography/TypographyP";
import { TypographyList } from "@/components/typography/TypographyList";
import ResponsiveCarouselControls from "@/components/ui/responsive-carousel-controls";
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

const iconClass = "w-6 h-6 flex-shrink-0 mr-2";

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

  const getPlanTitleComponents = (goal: string, planName: string) => {
    switch (goal) {
      case "weight_loss":
        return (
          <>
            <Ruler className={iconClass} />
            <span>{`Weight Loss | ${planName}`}</span>
          </>
        );
      case "muscle_gain":
        return (
          <>
            <BicepsFlexed className={iconClass} />
            <span>{`Muscle Gain | ${planName}`}</span>
          </>
        );
      case "vegetarian":
        return (
          <>
            <Leaf className={iconClass} />
            <span>{`Vegetarian | ${planName}`}</span>
          </>
        );
      case "balanced":
        return (
          <>
            <Scale className={iconClass} />
            <span>{`Balanced | ${planName}`}</span>
          </>
        );
      default:
        return (
          <>
            <Utensils className={iconClass} />
            <span>{` ${planName}`}</span>
          </>
        );
    }
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
                    <Button
                      variant={"destructive"}
                      onClick={() => handleDelete(publishedPlan._id)}
                      size={"sm"}
                    >
                      Delete
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
          <Carousel className={"w-[80%]"}>
            <CarouselContent>
              {data?.publishedPlans.map((publishedPlan) => (
                <CarouselItem
                  key={publishedPlan._id}
                  className={"basis-full md:basis-1/2 lg:basis-1/3"}
                >
                  <Card className="flex flex-col h-full">
                    <CardHeader>
                      <CardTitle className={"flex items-center"}>
                        {getPlanTitleComponents(
                          publishedPlan.goal,
                          publishedPlan.name,
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <TypographyP className={"text-muted-foreground text-sm"}>
                        {publishedPlan.description}
                      </TypographyP>
                      <TypographyList className={"ml-0"}>
                        {publishedPlan.keyFeatures.map((value, index) => (
                          <li className="flex items-center text-sm" key={index}>
                            <Check className="mr-2 h-4 w-4 text-success" />
                            {value}
                          </li>
                        ))}
                        <li className="flex items-center text-sm">
                          <Check className="mr-2 h-4 w-4 text-success" />
                          {publishedPlan.dailyCalories} kcal/day
                        </li>
                      </TypographyList>
                    </CardContent>
                    <CardFooter className="mt-auto pt-4 flex flex-col items-center w-full">
                      <div className="text-lg font-semibold mb-4 text-center">
                        Starting from &euro;{publishedPlan.basePrice}/month
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 w-full">
                        <Button className="flex-1 min-w-[120px]">
                          Select Plan
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 min-w-[120px]"
                        >
                          See Details
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <ResponsiveCarouselControls />
          </Carousel>
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
