"use client";

import { useState } from "react";
import {
  useDietaryPreferences,
  useCreateDietaryPreference,
  useUpdateDietaryPreference,
  useDeleteDietaryPreference,
} from "@/hooks/useDietaryPreferences";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { TypographyH2 } from "@/components/typography/TypographyH2";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  DietaryPreferenceSchema,
  DietaryPreferencePartialSchema,
} from "@/validation/dietaryPreference";
import { DietaryPreferenceT } from "@/model/DietaryPreference";
import { AxiosError } from "axios";

export default function DietaryPreferencesPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading, error } = useDietaryPreferences(page, limit);

  const deleteDietaryPreference = useDeleteDietaryPreference();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDietaryPreference, setEditingDietaryPreference] =
    useState<DietaryPreferenceT | null>(null);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error.message} />;

  const onCreateSuccess = () => setIsCreateModalOpen(false);

  const onUpdateSuccess = () => {
    setIsEditModalOpen(false);
    setEditingDietaryPreference(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this dietary preference?")) {
      await deleteDietaryPreference.mutateAsync(id);
    }
  };

  return (
    <>
      <TypographyH2>Dietary Preferences Management</TypographyH2>
      <Button onClick={() => setIsCreateModalOpen(true)} className="mb-4">
        Create Dietary Preference
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
            {data.preferences.map(
              (
                preference: z.infer<typeof DietaryPreferenceSchema> & {
                  _id: string;
                },
              ) => (
                <TableRow key={preference._id}>
                  <TableCell>{preference.name}</TableCell>
                  <TableCell>{preference.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => {
                        setEditingDietaryPreference(preference);
                        setIsEditModalOpen(true);
                      }}
                    >
                      Edit/View
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(preference._id)}
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
          disabled={data.preferences.length < limit}
        >
          Next
        </Button>
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Dietary Preference</DialogTitle>
            <DialogDescription className={"sr-only"}>
              Create dietary preference dialog
            </DialogDescription>
          </DialogHeader>
          <DietaryPreferenceForm
            onSubmitSuccess={onCreateSuccess}
            isUpdate={false}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Dietary Preference</DialogTitle>
            <DialogDescription className={"sr-only"}>
              Edit dietary preference dialog
            </DialogDescription>
          </DialogHeader>
          {editingDietaryPreference && (
            <DietaryPreferenceForm
              onSubmitSuccess={onUpdateSuccess}
              isUpdate={true}
              id={editingDietaryPreference._id}
              initialData={editingDietaryPreference}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

type DietaryPreferenceFormProps =
  | {
      onSubmitSuccess: () => void;
      isUpdate: false;
    }
  | {
      onSubmitSuccess: () => void;
      initialData: DietaryPreferenceT;
      isUpdate: true;
      id: string;
    };

function DietaryPreferenceForm(props: DietaryPreferenceFormProps) {
  const { onSubmitSuccess, isUpdate } = props;

  const createDietaryPreference = useCreateDietaryPreference();
  const updateDietaryPreference = useUpdateDietaryPreference();

  const form = useForm<z.infer<typeof DietaryPreferenceSchema>>({
    resolver: zodResolver(DietaryPreferenceSchema),
    defaultValues: isUpdate
      ? {
          name: props.initialData.name,
          description: props.initialData.description,
        }
      : { name: "", description: "" },
  });

  const onCreateSubmit = (data: z.infer<typeof DietaryPreferenceSchema>) => {
    createDietaryPreference
      .mutateAsync(data)
      .then(() => onSubmitSuccess())
      .catch((error: AxiosError<{ error: string }>) => {
        form.setError("root", { message: error.response?.data.error });
      });
  };

  const onUpdateSubmit = (
    data: z.infer<typeof DietaryPreferencePartialSchema>,
  ) => {
    if (isUpdate) {
      updateDietaryPreference
        .mutateAsync({
          id: props.id,
          dietaryPreference: data,
        })
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
              <FormDescription>
                Provide a name for the dietary preference.
              </FormDescription>
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
                Provide a description for the dietary preference.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        <Button type="submit" className="w-full mt-4">
          Save
        </Button>
      </form>
    </Form>
  );
}
