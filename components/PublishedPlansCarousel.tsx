"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyP } from "@/components/typography/TypographyP";
import { TypographyList } from "@/components/typography/TypographyList";
import {
  BicepsFlexed,
  Check,
  Frown,
  Leaf,
  Ruler,
  Scale,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ResponsiveCarouselControls from "@/components/ui/responsive-carousel-controls";
import { useAllPublishedPlans } from "@/hooks/usePublishedPlans";
import { useRouter } from "next/navigation";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import SkeletonCard from "@/components/SkeletonCard";
import { PublishedPlanT } from "@/model/PublishedPlan";

const iconClass = "w-6 h-6 flex-shrink-0 mr-2";

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

const truncate = (num: number) => Math.trunc(num * 100) / 100;

type PublishedPlansCarouselProps = {
  selectButtonLabel?: string;
  onSelectButton?: (selectedPlan: PublishedPlanT) => void;
  selectedButtonId?: string;
};

export default function PublishedPlansCarousel(
  props: PublishedPlansCarouselProps,
) {
  const router = useRouter();
  const {
    data: publishedPlans,
    isLoading,
    isError,
    error,
  } = useAllPublishedPlans();

  if (isError) return <ErrorDisplay message={error.message} />;

  if (isLoading) {
    return (
      <Carousel className="w-[80%]">
        <CarouselContent>
          {[...Array(3)].map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-full md:basis-1/2 lg:basis-1/3"
            >
              <SkeletonCard />
            </CarouselItem>
          ))}
        </CarouselContent>
        <ResponsiveCarouselControls />
      </Carousel>
    );
  }

  if (publishedPlans && publishedPlans.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="w-full flex justify-center">
            <Frown className="h-12 w-12" />
          </CardTitle>
          <CardDescription>
            There are no published plans at the moment
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Carousel className={"w-[80%]"}>
      <CarouselContent>
        {publishedPlans?.map((publishedPlan) => (
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
                    {truncate(publishedPlan.dailyCalories)} kcal/day
                  </li>
                </TypographyList>
              </CardContent>
              <CardFooter className="mt-auto pt-4 flex flex-col items-center w-full">
                <div className="text-lg font-semibold mb-4 text-center">
                  Starting from &euro;{publishedPlan.basePrice.toFixed(2)}
                  /month
                </div>
                <div className="flex flex-wrap justify-center gap-2 w-full">
                  {props.onSelectButton && (
                    <Button
                      className="flex-1 min-w-[120px]"
                      onClick={() => {
                        props.onSelectButton
                          ? props.onSelectButton(publishedPlan)
                          : null;
                      }}
                      disabled={
                        props.selectedButtonId
                          ? publishedPlan._id === props.selectedButtonId
                          : false
                      }
                    >
                      {props.selectButtonLabel
                        ? props.selectButtonLabel
                        : "Select Plan"}
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="flex-1 min-w-[120px]"
                    onClick={() => {
                      router.push(`/view-published-plan/${publishedPlan._id}`);
                    }}
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
  );
}
