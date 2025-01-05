import { z } from "zod";
import { PlanSchema } from "@/validation/plan";
import { PlanT } from "@/model/Plan";
import { useAllMeals } from "@/hooks/useMeals";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AxiosError } from "axios";
import { useCreatePlan, useUpdatePlan } from "@/hooks/usePlans";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MealT } from "@/model/Meal";
import { Badge } from "@/components/ui/badge";
import { TypographyList } from "@/components/typography/TypographyList";
import { TypographyP } from "@/components/typography/TypographyP";

type PlanFormProps =
  | {
      onSubmitSuccess: () => void;
      isUpdate: false;
    }
  | {
      onSubmitSuccess: () => void;
      initialData: PlanT;
      isUpdate: true;
      id: string;
    };

export function calculateDailyCalories(meals: MealT[]) {
  const mealCategories = {
    breakfast: [] as MealT[],
    snack: [] as MealT[],
    lunch: [] as MealT[],
    dinner: [] as MealT[],
  };

  for (const meal of meals) {
    if (meal && meal.type in mealCategories) {
      mealCategories[meal.type].push(meal);
    }
  }

  let dailyCalories = 0;

  for (const [, meals] of Object.entries(mealCategories)) {
    if (meals.length > 0) {
      const categoryCalories =
        meals.reduce((sum, meal) => sum + meal.totalCalories, 0) / meals.length;

      dailyCalories += categoryCalories;
    }
  }

  return dailyCalories;
}

export default function PlanForm(props: PlanFormProps) {
  const { onSubmitSuccess, isUpdate } = props;

  const form = useForm<z.infer<typeof PlanSchema>>({
    resolver: zodResolver(PlanSchema),
    defaultValues: isUpdate
      ? {
          ...props.initialData,
          meals: props.initialData.meals.map((meal) => meal._id),
        }
      : {
          name: "",
          description: "",
          meals: [],
          goal: undefined,
          keyFeatures: [],
        },
  });

  const createPlan = useCreatePlan();
  const updatePlan = useUpdatePlan();

  const { data } = useAllMeals();

  const planDailyCalories = calculateDailyCalories(
    data?.filter((meal) => form.watch("meals").includes(meal._id)) || [],
  );

  const onCreateSubmit = (data: z.infer<typeof PlanSchema>) => {
    createPlan
      .mutateAsync(data)
      .then(onSubmitSuccess)
      .catch((error: AxiosError<{ error: string }>) => {
        form.setError("root", { message: error.response?.data.error });
      });
  };

  const onUpdateSubmit = (data: z.infer<typeof PlanSchema>) => {
    if (isUpdate) {
      updatePlan
        .mutateAsync({
          id: props.id,
          plan: data,
        })
        .then(onSubmitSuccess)
        .catch((error: AxiosError<{ error: string }>) => {
          form.setError("root", { message: error.response?.data.error });
        });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(isUpdate ? onUpdateSubmit : onCreateSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name={"name"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete={"off"}
                  placeholder={"Plan name"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete={"off"}
                  placeholder={"Give this plan a description"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"goal"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight_loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle_gain">Muscle gain</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"meals"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meals</FormLabel>
              {field.value.length > 0 && (
                <div
                  className={
                    "grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 gap-4"
                  }
                >
                  {field.value.map((mealId) => (
                    <MealCard
                      meal={data?.find((m) => m._id === mealId)}
                      key={mealId}
                    />
                  ))}
                </div>
              )}

              <FormControl>
                <MultiSelect
                  options={
                    data?.map((meal) => ({
                      value: meal._id,
                      label: meal.name,
                    })) || []
                  }
                  defaultValue={field.value}
                  onValueChange={(values: string[]) => field.onChange(values)}
                  placeholder="Select meals"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"keyFeatures"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Features</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {field.value.length > 0 && (
                    <Card>
                      <CardHeader className={"p-4"}>
                        <CardTitle>Key Features</CardTitle>
                      </CardHeader>
                      <CardContent className={"p-4 pt-0"}>
                        {field.value.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 mt-2"
                          >
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                field.onChange(
                                  field.value.filter((ft) => ft !== feature),
                                )
                              }
                            >
                              Delete
                            </Button>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                  <Input
                    id={"keyFeatureInput"}
                    placeholder={"Add a key feature for the plan"}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector(
                        "input#keyFeatureInput",
                      ) as HTMLInputElement;
                      if (input.value) {
                        field.onChange([...field.value, input.value]);
                        input.value = "";
                      }
                    }}
                  >
                    Add key feature
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"}>
          <Card>
            <CardHeader>
              <CardTitle>Average calories per day</CardTitle>
            </CardHeader>
            <CardContent>
              <TypographyP>{planDailyCalories} kcal</TypographyP>
            </CardContent>
          </Card>
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

export const MealCard = ({ meal }: { meal: MealT | null | undefined }) => {
  if (!meal) return null;

  return (
    <Card>
      <CardHeader className={"p-4"}>
        <CardTitle>{meal.name}</CardTitle>
        <CardDescription>{meal.description}</CardDescription>
      </CardHeader>
      <CardContent className={"p-4 pt-0"}>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Type:</span>
            <span className="capitalize">{meal.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total calories:</span>
            <span>{meal.totalCalories} kcal</span>
          </div>
          <div>
            <span className="font-semibold">Ingredients:</span>
            <TypographyList className={"my-0"}>
              {meal.ingredients.map((ing, index) => (
                <li key={index}>
                  {ing.ingredient.name} - {ing.quantity}g
                </li>
              ))}
            </TypographyList>
          </div>
          {meal.allergens && meal.allergens.length > 0 && (
            <div>
              <span className="font-semibold">Allergens:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {meal.allergens.map((allergen) => (
                  <Badge key={allergen._id} variant="outline">
                    {allergen.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {meal.dietaryPreferences && meal.dietaryPreferences.length > 0 && (
            <div>
              <span className="font-semibold">Dietary preferences:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {meal.dietaryPreferences.map((pref) => (
                  <Badge key={pref._id} variant="outline">
                    {pref.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
