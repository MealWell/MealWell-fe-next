import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MealSchema, MealPartialSchema } from "@/validation/meal";
import { z } from "zod";
import { MealT } from "@/model/Meal";
import { toast } from "sonner";

const API_URL = "/api/meals";

export function useMeals(page = 1, limit = 10) {
  return useQuery<{ meals: MealT[]; count: number }>({
    queryKey: ["meals", page, limit],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}?page=${page}&limit=${limit}`,
      );
      return data;
    },
  });
}

export function useMeal(id?: string) {
  return useQuery<MealT>({
    queryKey: ["meal", id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateMeal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (meal: z.infer<typeof MealSchema>) => {
      const { data } = await axios.post(API_URL, meal);
      return data;
    },
    onSuccess: () => {
      toast.success("Meal created successfully");
      return queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
    onError: () => {
      toast.error("An error occurred while creating meal!");
    },
  });
}

export function useUpdateMeal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      meal,
    }: {
      id: string;
      meal: z.infer<typeof MealPartialSchema>;
    }) => {
      const { data } = await axios.put(`${API_URL}/${id}`, meal);
      return data;
    },
    onSuccess: () => {
      toast.success("Meal updated successfully");
      return queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
    onError: () => {
      toast.error("An error occurred while updating meal!");
    },
  });
}

export function useDeleteMeal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      toast.success("Meal deleted successfully");
      return queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
    onError: () => {
      toast.error("An error occurred while deleting meal!");
    },
  });
}
