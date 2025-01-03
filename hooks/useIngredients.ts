import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  IngredientSchema,
  IngredientPartialSchema,
} from "@/validation/ingredient";
import { z } from "zod";
import { IngredientT } from "@/model/Ingredient";
import { toast } from "sonner";

const API_URL = "/api/ingredients";

export function useIngredients(page = 1, limit = 10) {
  return useQuery<{ ingredients: IngredientT[]; count: number }>({
    queryKey: ["ingredients", page, limit],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}?page=${page}&limit=${limit}`,
      );
      return data;
    },
  });
}

export function useAllIngredients() {
  return useQuery<IngredientT[]>({
    queryKey: ["ingredients"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}`);
      return data;
    },
  });
}

export function useCreateIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ingredient: z.infer<typeof IngredientSchema>) => {
      const { data } = await axios.post(API_URL, ingredient);
      return data;
    },
    onSuccess: () => {
      toast.success("Ingredient created successfully");
      return queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
    onError: () => {
      toast.error("An error occurred while creating ingredient!");
    },
  });
}

export function useUpdateIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ingredient,
    }: {
      id: string;
      ingredient: z.infer<typeof IngredientPartialSchema>;
    }) => {
      const { data } = await axios.put(`${API_URL}/${id}`, ingredient);
      return data;
    },
    onSuccess: () => {
      toast.success("Ingredient updated successfully");
      return queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
    onError: () => {
      toast.error("An error occurred while updating ingredient!");
    },
  });
}

export function useDeleteIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      toast.success("Ingredient deleted successfully");
      return queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
    onError: () => {
      toast.error("An error occurred while deleting ingredient!");
    },
  });
}
