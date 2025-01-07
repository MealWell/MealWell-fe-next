"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Utensils, Calendar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuthorization } from "@/hooks/useAuthorization";
import SkeletonDashboard from "@/components/SkeletonDashboard";
import { TypographyH3 } from "@/components/typography/TypographyH3";
import { useRouter } from "next/navigation";
import {
  useActiveSubscription,
  useCancelSubscription,
} from "@/hooks/useSubscription";
import { Skeleton } from "@/components/ui/skeleton";
import { useConfirmationModal } from "@/context/GlobalConfirmationModalContext";
import Link from "next/link";

export default function SubscriptionDashboard() {
  const { isAuthenticated, user, isPending } = useAuthorization();
  const { data: activeSubscription, isLoading: isLoadingUserSubscription } =
    useActiveSubscription();

  const { showConfirmationModal } = useConfirmationModal();

  const router = useRouter();

  const cancelSubscriptionMutation = useCancelSubscription();

  if (isPending) {
    return <SkeletonDashboard />;
  }

  if (!isAuthenticated) {
    router.push("/sign-in");
    return;
  }

  const handleCancel = async () => {
    showConfirmationModal({
      title: "Confirm cancel subscription",
      description: "Are you sure you want to cancel this subscription?",
      onConfirm: async () => {
        await cancelSubscriptionMutation.mutateAsync();
      },
    });
  };

  if (!isLoadingUserSubscription && !activeSubscription) {
    return (
      <div>
        <TypographyH3>
          Welcome back, {!!user ? user.name : "user"}!
        </TypographyH3>
        <Card>
          <CardHeader>
            <CardTitle>You don&#39;t have a subscription</CardTitle>
            <CardDescription>
              Go to{" "}
              <Button variant={"link"} className={"text-inherit font-bold p-0"}>
                <Link href={"/get-started"}>Get Started</Link>
              </Button>{" "}
              page to start a subscription
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <>
      <TypographyH3>Welcome back, {!!user ? user.name : "user"}!</TypographyH3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Calories Today
            </CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234 / 1,800</div>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Delivery</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tomorrow</div>
            <p className="text-xs text-muted-foreground">3 meals, 2 snacks</p>
          </CardContent>
        </Card>
        {isLoadingUserSubscription ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-32" /> {/* Placeholder for title */}
              <Skeleton className="h-4 w-4" /> {/* Placeholder for icon */}
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-24" /> {/* Placeholder for stats */}
              <Skeleton className="h-4 w-full mt-2" />{" "}
              {/* Placeholder for progress bar */}
            </CardContent>
          </Card>
        ) : (
          activeSubscription && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscription
                </CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {activeSubscription.planData.name}
                </div>
                <p className="text-xs text-muted-foreground">
                  Delivery{" "}
                  {activeSubscription.deliveryInformation.deliveryDays.length}{" "}
                  days/week
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  onClick={handleCancel}
                >
                  Cancel subscription
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
      <Tabs defaultValue="meals" className="mt-8">
        <TabsList>
          <TabsTrigger value="meals">Today&#39;s Meals</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Deliveries</TabsTrigger>
        </TabsList>
        <TabsContent value="meals" className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Breakfast</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Avocado Toast with Poached Eggs</p>
                <p className="text-sm text-muted-foreground">450 calories</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Lunch</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Grilled Chicken Salad</p>
                <p className="text-sm text-muted-foreground">380 calories</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Dinner</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Baked Salmon with Roasted Vegetables</p>
                <p className="text-sm text-muted-foreground">520 calories</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="upcoming" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Monday, June 5</p>
                    <p className="text-sm text-muted-foreground">
                      3 meals, 2 snacks
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Wednesday, June 7</p>
                    <p className="text-sm text-muted-foreground">
                      3 meals, 2 snacks
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Friday, June 9</p>
                    <p className="text-sm text-muted-foreground">
                      3 meals, 2 snacks
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
