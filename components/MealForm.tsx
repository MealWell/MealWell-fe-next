import { MealT } from "@/model/Meal";
import { useEffect, useState } from "react";
import { MealSchema } from "@/validation/meal";
import { z } from "zod";
import { IngredientT } from "@/model/Ingredient";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IngredientSelect } from "@/components/IngredientsSelect";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { AllergenT } from "@/model/Allergen";
import { DietaryPreferenceT } from "@/model/DietaryPreference";
import { useAllAllergens } from "@/hooks/useAllergens";
import { useAllDietaryPreferences } from "@/hooks/useDietaryPreferences";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useCreateMeal, useUpdateMeal } from "@/hooks/useMeals";
import { AxiosError } from "axios";
import { TypographyH4 } from "@/components/typography/TypographyH4";
import { TypographyP } from "@/components/typography/TypographyP";

function calculateMealValues(
  ingredients: { ingredient: IngredientT; quantity: number }[],
) {
  let totalCalories = 0;
  let totalProteins = 0;
  let totalFats = 0;
  let totalCarbs = 0;
  let totalFiber = 0;
  let totalSugar = 0;
  let totalSodium = 0;

  for (const { ingredient, quantity } of ingredients) {
    if (ingredient) {
      totalCalories += (ingredient.calories * quantity) / 100;
      totalProteins += (ingredient.proteins * quantity) / 100;
      totalFats += (ingredient.fats * quantity) / 100;
      totalCarbs += (ingredient.carbohydrates * quantity) / 100;
      totalFiber += (ingredient.fiber * quantity) / 100;
      totalSugar += (ingredient.sugar * quantity) / 100;
      totalSodium += (ingredient.sodium * quantity) / 100;
    }
  }

  return {
    totalCalories,
    totalProteins,
    totalFats,
    totalCarbs,
    totalFiber,
    totalSugar,
    totalSodium,
  };
}

type MealFormProps =
  | {
      onSubmitSuccess: () => void;
      isUpdate: false;
    }
  | {
      onSubmitSuccess: () => void;
      initialData: MealT;
      isUpdate: true;
      id: string;
    };

export default function MealForm(props: MealFormProps) {
  const { onSubmitSuccess, isUpdate } = props;

  const createMeal = useCreateMeal();
  const updateMeal = useUpdateMeal();

  const form = useForm<z.infer<typeof MealSchema>>({
    resolver: zodResolver(MealSchema),
    defaultValues: isUpdate
      ? {
          ...props.initialData,
          ingredients: props.initialData.ingredients.map(
            ({ ingredient, quantity }) => ({
              ingredient: ingredient._id,
              quantity,
            }),
          ),
          allergens:
            props.initialData.allergens?.map((allergen) => allergen._id) || [],
          dietaryPreferences:
            props.initialData.dietaryPreferences?.map(
              (preference) => preference._id,
            ) || [],
        }
      : {
          name: "",
          description: "",
          type: undefined,
          allergens: [],
          dietaryPreferences: [],
          ingredients: [],
        },
  });

  const [nutritionValues, setNutritionValues] = useState<{
    totalCalories: number;
    totalProteins: number;
    totalFats: number;
    totalCarbs: number;
    totalFiber: number;
    totalSugar: number;
    totalSodium: number;
  } | null>(null);

  const [ingredients, setIngredients] = useState(
    isUpdate ? props.initialData.ingredients : [],
  );

  const { data: allergenOptions, isLoading: isLoadingAllergens } =
    useAllAllergens();
  const {
    data: dietaryPreferenceOptions,
    isLoading: isLoadingDietaryPreferences,
  } = useAllDietaryPreferences();

  const [collectedAllergens, setCollectedAllergens] = useState<string[]>([]);
  const [collectedDietaryPreferences, setCollectedDietaryPreferences] =
    useState<string[]>([]);

  useEffect(() => {
    if (ingredients.length > 0) {
      const result = calculateMealValues(ingredients);
      setNutritionValues(result);
    } else {
      setNutritionValues(null);
    }
  }, [ingredients]);

  useEffect(() => {
    if (ingredients.length > 0) {
      const allergens = new Set<string>();
      const dietaryPreferences = new Set<string>();

      ingredients.forEach((ing) => {
        ing.ingredient.allergens?.forEach((allergen: AllergenT) =>
          allergens.add(allergen.name),
        );
        ing.ingredient.dietaryPreferences?.forEach(
          (preference: DietaryPreferenceT) =>
            dietaryPreferences.add(preference.name),
        );
      });

      setCollectedAllergens(Array.from(allergens));
      setCollectedDietaryPreferences(Array.from(dietaryPreferences));
    } else {
      setCollectedAllergens([]);
      setCollectedDietaryPreferences([]);
    }
  }, [ingredients]);

  const onCreateSubmit = (data: z.infer<typeof MealSchema>) => {
    createMeal
      .mutateAsync(data)
      .then(onSubmitSuccess)
      .catch((error: AxiosError<{ error: string }>) => {
        form.setError("root", { message: error.response?.data.error });
      });
  };

  const onUpdateSubmit = (data: z.infer<typeof MealSchema>) => {
    if (isUpdate) {
      updateMeal
        .mutateAsync({
          id: props.id,
          meal: data,
        })
        .then(onSubmitSuccess)
        .catch((error: AxiosError<{ error: string }>) => {
          form.setError("root", { message: error.response?.data.error });
        });
    }
  };

  const handleAddIngredient = (ingredient: IngredientT, quantity: number) => {
    const newIngredients = [...ingredients, { ingredient, quantity }];
    setIngredients(newIngredients);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  if (isLoadingAllergens || isLoadingDietaryPreferences) {
    return <LoadingSkeleton />;
  }

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
                <Input {...field} />
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
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"type"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"ingredients"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <div
                className={
                  "my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                }
              >
                {ingredients.map((ing, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>
                        {ing.ingredient.name} - {ing.quantity}g
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TypographyP>
                        Allergens:{" "}
                        {ing.ingredient.allergens
                          ?.map((a: AllergenT) => a.name)
                          .join(", ") || "None"}
                        <br />
                        Dietary preferences:{" "}
                        {ing.ingredient.dietaryPreferences
                          ?.map((dp: DietaryPreferenceT) => dp.name)
                          .join(", ") || "None"}
                      </TypographyP>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          handleRemoveIngredient(index);
                          field.onChange(
                            ingredients
                              .filter((_, i) => i !== index)
                              .map(({ ingredient, quantity }) => ({
                                ingredient: ingredient._id,
                                quantity,
                              })),
                          );
                        }}
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <FormControl>
                <IngredientSelect
                  onSelect={(ingredient, quantity) => {
                    handleAddIngredient(ingredient, quantity);
                    field.onChange(
                      [...ingredients, { ingredient, quantity }].map(
                        ({ ingredient, quantity }) => ({
                          ingredient: ingredient._id,
                          quantity,
                        }),
                      ),
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
          <Card>
            <CardHeader>
              <CardTitle>Allergens collected from ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              {collectedAllergens.length > 0 ? (
                <ul>
                  {collectedAllergens.map((allergen, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {allergen}
                    </li>
                  ))}
                </ul>
              ) : (
                <TypographyP className="text-sm text-muted-foreground">
                  No allergen detected.
                </TypographyP>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Dietary preferences collected from ingredients
              </CardTitle>
            </CardHeader>
            <CardContent>
              {collectedDietaryPreferences.length > 0 ? (
                <ul>
                  {collectedDietaryPreferences.map((preference, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {preference}
                    </li>
                  ))}
                </ul>
              ) : (
                <TypographyP className="text-sm text-muted-foreground">
                  No dietary preference detected.
                </TypographyP>
              )}
            </CardContent>
          </Card>
        </div>
        <FormField
          control={form.control}
          name={"allergens"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergens</FormLabel>
              <FormControl>
                <MultiSelect
                  {...field}
                  options={
                    allergenOptions?.map((allergen) => ({
                      value: allergen._id,
                      label: allergen.name,
                    })) || []
                  }
                  defaultValue={field.value}
                  onValueChange={(values: string[]) => field.onChange(values)}
                  placeholder="Select allergens"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"dietaryPreferences"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Preferences</FormLabel>
              <FormControl>
                <MultiSelect
                  options={
                    dietaryPreferenceOptions?.map((preference) => ({
                      value: preference._id,
                      label: preference.name,
                    })) || []
                  }
                  defaultValue={field.value}
                  onValueChange={(values: string[]) => field.onChange(values)}
                  placeholder="Select dietary preferences"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {nutritionValues && (
          <div className="mt-4">
            <TypographyH4>Nutritional Values:</TypographyH4>
            <div
              className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Calories</CardTitle>
                </CardHeader>
                <CardContent>
                  <TypographyP>
                    {nutritionValues.totalCalories} kcal
                  </TypographyP>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Proteins</CardTitle>
                </CardHeader>
                <CardContent>
                  <TypographyP>{nutritionValues.totalProteins} g</TypographyP>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fats</CardTitle>
                </CardHeader>
                <CardContent>
                  <TypographyP>{nutritionValues.totalFats} g</TypographyP>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Carbohydrates</CardTitle>
                </CardHeader>
                <CardContent>
                  <TypographyP>{nutritionValues.totalCarbs} g</TypographyP>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fibres</CardTitle>
                </CardHeader>
                <CardContent>
                  <TypographyP>{nutritionValues.totalFiber} g</TypographyP>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sugar</CardTitle>
                </CardHeader>
                <CardContent>
                  <TypographyP>{nutritionValues.totalSugar} g</TypographyP>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sodium</CardTitle>
                </CardHeader>
                <CardContent>
                  <TypographyP>{nutritionValues.totalSodium} mg</TypographyP>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
