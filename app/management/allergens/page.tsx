"use client";

import { useState } from "react";
import {
  useAllergens,
  useCreateAllergen,
  useUpdateAllergen,
  useDeleteAllergen,
} from "@/hooks/useAllergens";
import { Button } from "@/components/ui/button";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AllergenSchema, AllergenPartialSchema } from "@/validation/allergen";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { TypographyH2 } from "@/components/typography/TypographyH2";
import { AxiosError } from "axios";
import { AllergenT } from "@/model/Allergen";
import { useConfirmationModal } from "@/context/GlobalConfirmationModalContext";

export default function AllergensPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading, error } = useAllergens(page, limit);
  const deleteAllergen = useDeleteAllergen();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAllergen, setEditingAllergen] = useState<AllergenT | null>(
    null,
  );

  const { showConfirmationModal } = useConfirmationModal();

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error.message} />;

  const onCreateSuccess = () => {
    setIsCreateModalOpen(false);
  };

  const onUpdateSuccess = async () => {
    setIsEditModalOpen(false);
    setEditingAllergen(null);
  };

  const handleDelete = async (id: string) => {
    showConfirmationModal({
      title: "Confirm delete allergen",
      description: "Are you sure you want to delete this allergen?",
      onConfirm: async () => {
        await deleteAllergen.mutateAsync(id);
      },
    });
  };

  return (
    <>
      <TypographyH2 className="text-3xl font-bold mb-8">
        Allergens Management
      </TypographyH2>
      <Button onClick={() => setIsCreateModalOpen(true)} className="mb-4">
        Create Allergen
      </Button>
      <div className={"rounded-md border"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.allergens.map(
              (allergen: z.infer<typeof AllergenSchema> & { _id: string }) => (
                <TableRow key={allergen._id}>
                  <TableCell>{allergen.name}</TableCell>
                  <TableCell>{allergen.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => {
                        setEditingAllergen(allergen);
                        setIsEditModalOpen(true);
                      }}
                    >
                      Edit/View
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(allergen._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ),
            )}
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
          disabled={data.allergens.length < limit}
        >
          Next
        </Button>
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Allergen</DialogTitle>
            <DialogDescription className={"sr-only"}>
              Create allergen dialog
            </DialogDescription>
          </DialogHeader>
          <AllergenForm onSubmitSuccess={onCreateSuccess} isUpdate={false} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Allergen</DialogTitle>
            <DialogDescription className={"sr-only"}>
              Edit allergen dialog
            </DialogDescription>
          </DialogHeader>
          {editingAllergen && (
            <AllergenForm
              onSubmitSuccess={onUpdateSuccess}
              initialData={editingAllergen}
              isUpdate={true}
              id={editingAllergen._id}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

type AllergenFormProps =
  | {
      onSubmitSuccess: () => void;
      isUpdate: false;
    }
  | {
      onSubmitSuccess: () => void;
      initialData: AllergenT;
      isUpdate: true;
      id: string;
    };

function AllergenForm(props: AllergenFormProps) {
  const { onSubmitSuccess, isUpdate } = props;

  const form = useForm<z.infer<typeof AllergenSchema>>({
    resolver: zodResolver(AllergenSchema),
    defaultValues: isUpdate ? props.initialData : { name: "", description: "" },
  });

  const createAllergen = useCreateAllergen();
  const updateAllergen = useUpdateAllergen();

  const onCreateSubmit = (allergen: z.infer<typeof AllergenSchema>) => {
    createAllergen
      .mutateAsync(allergen)
      .then(() => onSubmitSuccess())
      .catch((error: AxiosError<{ error: string }>) => {
        form.setError("root", { message: error.response?.data.error });
      });
  };

  const onUpdateSubmit = (allergen: z.infer<typeof AllergenPartialSchema>) => {
    if (isUpdate) {
      updateAllergen
        .mutateAsync({ id: props.id, allergen })
        .then(() => onSubmitSuccess())
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter the name of the allergen.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Provide a description for the allergen (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
