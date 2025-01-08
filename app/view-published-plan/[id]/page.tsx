"use client";

import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useParams } from "next/navigation";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { usePublishedPlan } from "@/hooks/usePublishedPlans";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Check } from "lucide-react";
import { TypographyList } from "@/components/typography/TypographyList";
import { TypographyP } from "@/components/typography/TypographyP";

const truncate = (num: number) => Math.trunc(num * 100) / 100;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function MealPlanPage() {
  const { id } = useParams<{ id: string }>();
  const { data: plan, isLoading, error } = usePublishedPlan(id);

  if (isLoading) return <LoadingSkeleton />;
  if (error || !plan)
    return <ErrorDisplay message={"Could not get meal data"} />;

  const macroData = [
    {
      name: "Proteins",
      value: plan.meals.reduce((sum, meal) => sum + meal.totalProteins, 0),
    },
    {
      name: "Fats",
      value: plan.meals.reduce((sum, meal) => sum + meal.totalFats, 0),
    },
    {
      name: "Carbs",
      value: plan.meals.reduce((sum, meal) => sum + meal.totalCarbs, 0),
    },
    {
      name: "Fibers",
      value: plan.meals.reduce((sum, meal) => sum + meal.totalFiber, 0),
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8 shadow-lg">
        <CardHeader className="bg-primary/10 rounded-t-lg">
          <CardTitle className="text-3xl text-primary">{plan.name}</CardTitle>
          <CardDescription className="text-lg">
            {plan.description || "No description provided."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="font-semibold capitalize text-lg">
                <span className="text-primary">Goal:</span>{" "}
                {plan.goal.replace("_", " ")}
              </p>
              <p className="font-semibold text-lg">
                <span className="text-primary">Daily Calories:</span>{" "}
                {plan.dailyCalories || "N/A"}
              </p>
              <p className="font-semibold text-lg">
                <span className="text-primary">Base Price:</span>{" "}
                {plan.basePrice ? `${plan.basePrice.toFixed(2)} €` : "N/A"}
              </p>
              {plan.isActive !== undefined && (
                <p className="font-semibold text-lg">
                  <span className="text-primary">Status:</span>{" "}
                  {plan.isActive ? "Active" : "Inactive"}
                </p>
              )}
            </div>
            <div>
              <TypographyP className={"font-semibold"}>
                Key Features:
              </TypographyP>
              <TypographyList className={"ml-0 mt-0"}>
                {plan.keyFeatures && plan.keyFeatures.length > 0 ? (
                  plan.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-success" />
                      {feature}
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground">
                    No key features listed.
                  </li>
                )}
              </TypographyList>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Nutritional Overview
        </h2>
        <Card className={"max-w-xl mx-auto"}>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mb-4 text-primary">Meals</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {plan.meals && plan.meals.length > 0 ? (
          plan.meals.map((meal, index) => (
            <AccordionItem
              key={meal._id}
              value={`meal-${index}`}
              className="border rounded-lg shadow-md"
            >
              <AccordionTrigger className="px-4 py-2 hover:bg-primary/5 transition-colors">
                <div className="flex justify-between items-center w-full">
                  <span className="text-xl font-semibold">{meal.name}</span>
                  <Badge className="capitalize">{meal.type || "N/A"}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2">
                <p className="mb-4 text-muted-foreground">
                  {meal.description || "No description provided."}
                </p>
                <Tabs defaultValue="ingredients" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                  </TabsList>
                  <TabsContent value="ingredients">
                    <ScrollArea className="rounded-md border p-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ingredient</TableHead>
                            <TableHead>Quantity (g)</TableHead>
                            <TableHead>Calories</TableHead>
                            <TableHead>Proteins</TableHead>
                            <TableHead>Fats</TableHead>
                            <TableHead>Carbs</TableHead>
                            <TableHead>Fiber</TableHead>
                            <TableHead>Sugar</TableHead>
                            <TableHead>Sodium</TableHead>
                            <TableHead>Allergens</TableHead>
                            <TableHead>Dietary Preferences</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {meal.ingredients && meal.ingredients.length > 0 ? (
                            meal.ingredients.map((item) => (
                              <TableRow key={item._id}>
                                <TableCell className="font-medium">
                                  {item.name}
                                </TableCell>
                                <TableCell>{item.quantity || "N/A"}</TableCell>
                                <TableCell>
                                  {truncate(item.calories || 0)}
                                </TableCell>
                                <TableCell>
                                  {truncate(item.proteins || 0)}
                                </TableCell>
                                <TableCell>
                                  {truncate(item.fats || 0)}
                                </TableCell>
                                <TableCell>
                                  {truncate(item.carbohydrates || 0)}
                                </TableCell>
                                <TableCell>
                                  {truncate(item.fiber || 0)}
                                </TableCell>
                                <TableCell>
                                  {truncate(item.sugar || 0)}
                                </TableCell>
                                <TableCell>
                                  {truncate(item.sodium || 0)}
                                </TableCell>
                                <TableCell>
                                  {item.allergens && item.allergens.length > 0
                                    ? item.allergens
                                        .map((a) => a.name)
                                        .join(", ")
                                    : "N/A"}
                                </TableCell>
                                <TableCell>
                                  {item.dietaryPreferences &&
                                  item.dietaryPreferences.length > 0
                                    ? item.dietaryPreferences
                                        .map((dp) => dp.name)
                                        .join(", ")
                                    : "N/A"}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={11}
                                className="text-center text-muted-foreground"
                              >
                                No ingredients listed.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="nutrition">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Calories</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <TypographyP className="text-2xl font-bold">
                            {truncate(meal.totalCalories || 0)}
                          </TypographyP>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Proteins</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <TypographyP className="text-2xl font-bold">
                            {truncate(meal.totalProteins || 0)}g
                          </TypographyP>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Fats</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <TypographyP className="text-2xl font-bold">
                            {truncate(meal.totalFats || 0)}g
                          </TypographyP>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            Carbohydrates
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <TypographyP className="text-2xl font-bold">
                            {truncate(meal.totalCarbs || 0)}g
                          </TypographyP>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Fiber</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <TypographyP className="text-2xl font-bold">
                            {truncate(meal.totalFiber || 0)}g
                          </TypographyP>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Sugar</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <TypographyP className="text-2xl font-bold">
                            {truncate(meal.totalSugar || 0)}g
                          </TypographyP>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Sodium</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <TypographyP className="text-2xl font-bold">
                            {truncate(meal.totalSodium || 0)}mg
                          </TypographyP>
                        </CardContent>
                      </Card>
                    </div>
                    {(meal.allergens && meal.allergens.length > 0) ||
                    (meal.dietaryPreferences &&
                      meal.dietaryPreferences.length > 0) ? (
                      <div className="mt-4 p-4 rounded-lg">
                        {meal.allergens && meal.allergens.length > 0 && (
                          <div className="mb-2">
                            <strong className="text-primary">Allergens:</strong>{" "}
                            {meal.allergens.map((a) => a.name).join(", ")}
                          </div>
                        )}
                        {meal.dietaryPreferences &&
                          meal.dietaryPreferences.length > 0 && (
                            <div>
                              <strong className="text-primary">
                                Dietary Preferences:
                              </strong>{" "}
                              {meal.dietaryPreferences
                                .map((dp) => dp.name)
                                .join(", ")}
                            </div>
                          )}
                      </div>
                    ) : null}
                  </TabsContent>
                </Tabs>
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <TypographyP>No meals listed for this plan.</TypographyP>
        )}
      </Accordion>
    </div>
  );
}
