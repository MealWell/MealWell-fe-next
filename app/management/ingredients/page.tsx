"use client";

import { useState } from "react";
import {
  useIngredients,
  useCreateIngredient,
  useUpdateIngredient,
  useDeleteIngredient,
} from "@/hooks/useIngredients";
import { useAllAllergens } from "@/hooks/useAllergens";
import { useAllDietaryPreferences } from "@/hooks/useDietaryPreferences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IngredientSchema } from "@/validation/ingredient";
import { z } from "zod";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { IngredientT } from "@/model/Ingredient";
import { MultiSelect } from "@/components/ui/multi-select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TypographyH2 } from "@/components/typography/TypographyH2";
import { useConfirmationModal } from "@/context/GlobalConfirmationModalContext";

export default function IngredientsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading, error } = useIngredients(page, limit);
  const deleteIngredient = useDeleteIngredient();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] =
    useState<IngredientT | null>(null);

  const { showConfirmationModal } = useConfirmationModal();

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error.message} />;

  const onCreateSuccess = () => {
    setIsCreateModalOpen(false);
  };

  const onUpdateSuccess = () => {
    setIsEditModalOpen(false);
    setEditingIngredient(null);
  };

  const handleDelete = async (id: string) => {
    showConfirmationModal({
      title: "Confirm delete ingredient",
      description: "Are you sure you want to delete this ingredient?",
      onConfirm: async () => {
        await deleteIngredient.mutateAsync(id);
      },
    });
  };

  return (
    <>
      <TypographyH2>Ingredients management</TypographyH2>
      <Button onClick={() => setIsCreateModalOpen(true)} className="mb-4">
        Create Ingredient
      </Button>
      <div className={"rounded-md border"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Calories</TableHead>
              <TableHead>Proteins</TableHead>
              <TableHead>Fats</TableHead>
              <TableHead>Carbohydrates</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.ingredients.map((ingredient: IngredientT) => (
              <TableRow key={ingredient._id}>
                <TableCell>{ingredient.name}</TableCell>
                <TableCell>{ingredient.calories}</TableCell>
                <TableCell>{ingredient.proteins}</TableCell>
                <TableCell>{ingredient.fats}</TableCell>
                <TableCell>{ingredient.carbohydrates}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => {
                      setEditingIngredient(ingredient);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit/View
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(ingredient._id)}
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
          disabled={(data?.ingredients.length || 0) < limit}
        >
          Next
        </Button>
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Ingredient</DialogTitle>
            <DialogDescription className={"sr-only"}>
              Create ingredient dialog
            </DialogDescription>
          </DialogHeader>
          <IngredientForm onSubmitSuccess={onCreateSuccess} isUpdate={false} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Ingredient</DialogTitle>
            <DialogDescription className={"sr-only"}>
              Edit ingredient dialog
            </DialogDescription>
          </DialogHeader>
          {editingIngredient && (
            <IngredientForm
              onSubmitSuccess={onUpdateSuccess}
              isUpdate={true}
              initialData={editingIngredient}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

type IngredientFormProps =
  | {
      onSubmitSuccess: () => void;
      isUpdate: false;
    }
  | {
      onSubmitSuccess: () => void;
      initialData: IngredientT;
      isUpdate: true;
    };

function IngredientForm(props: IngredientFormProps) {
  const { onSubmitSuccess, isUpdate } = props;

  const createIngredient = useCreateIngredient();
  const updateIngredient = useUpdateIngredient();

  const form = useForm<z.infer<typeof IngredientSchema>>({
    resolver: zodResolver(IngredientSchema),
    defaultValues: isUpdate
      ? {
          name: props.initialData.name,
          calories: props.initialData.calories,
          proteins: props.initialData.proteins,
          fats: props.initialData.fats,
          carbohydrates: props.initialData.carbohydrates,
          fiber: props.initialData.fiber,
          sugar: props.initialData.sugar,
          sodium: props.initialData.sodium,
          allergens: props.initialData.allergens
            ? props.initialData.allergens.map((allergen) => allergen._id)
            : [],
          dietaryPreferences: props.initialData.dietaryPreferences
            ? props.initialData.dietaryPreferences.map(
                (preference) => preference._id,
              )
            : [],
        }
      : {
          name: "",
          calories: 0,
          proteins: 0,
          fats: 0,
          carbohydrates: 0,
          fiber: 0,
          sugar: 0,
          sodium: 0,
          allergens: [],
          dietaryPreferences: [],
        },
  });

  const { data: allergenOptions, isLoading: isLoadingAllergens } =
    useAllAllergens();
  const {
    data: dietaryPreferenceOptions,
    isLoading: isLoadingDietaryPreferences,
  } = useAllDietaryPreferences();

  const onCreateSubmit = (data: z.infer<typeof IngredientSchema>) => {
    createIngredient
      .mutateAsync(data)
      .then(onSubmitSuccess)
      .catch((error: AxiosError<{ error: string }>) => {
        form.setError("root", { message: error.response?.data.error });
      });
  };

  const onUpdateSubmit = (data: z.infer<typeof IngredientSchema>) => {
    if (isUpdate) {
      updateIngredient
        .mutateAsync({
          id: props.initialData._id,
          ingredient: data,
        })
        .then(onSubmitSuccess)
        .catch((error: AxiosError<{ error: string }>) => {
          form.setError("root", { message: error.response?.data.error });
        });
    }
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the ingredient&#39;s name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="calories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calories (per 100g)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  min={0}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="proteins"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proteins (per 100g)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  min={0}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fats (per 100g)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  min={0}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="carbohydrates"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carbohydrates (per 100g)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  min={0}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fiber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fiber (per 100g)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  min={0}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sugar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sugar (per 100g)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  min={0}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sodium"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sodium (per 100g)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  {...field}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allergens"
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
          name="dietaryPreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Preferences</FormLabel>
              <FormControl>
                <MultiSelect
                  {...field}
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
        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        <Button type="submit" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}
