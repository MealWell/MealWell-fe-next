import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  DietaryPreferenceSchema,
  DietaryPreferencePartialSchema,
} from "@/validation/dietaryPreference";
import { z } from "zod";
import { toast } from "sonner";
import { DietaryPreferenceT } from "@/model/DietaryPreference";

const API_URL = "/api/dietary-preferences";

export function useDietaryPreferences(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["dietaryPreferences", page, limit],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}?page=${page}&limit=${limit}`,
      );
      return data;
    },
  });
}

export function useAllDietaryPreferences() {
  return useQuery<DietaryPreferenceT[]>({
    queryKey: ["dietaryPreferences"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data || [];
    },
  });
}

export function useCreateDietaryPreference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      dietaryPreference: z.infer<typeof DietaryPreferenceSchema>,
    ) => {
      const { data } = await axios.post(API_URL, dietaryPreference);
      return data;
    },
    onSuccess: () => {
      toast.success("Dietary preference created successfully");
      return queryClient.invalidateQueries({
        queryKey: ["dietaryPreferences"],
      });
    },
    onError: () => {
      toast.error("An error occurred while creating dietary preference!");
    },
  });
}

export function useUpdateDietaryPreference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      dietaryPreference,
    }: {
      id: string;
      dietaryPreference: z.infer<typeof DietaryPreferencePartialSchema>;
    }) => {
      const { data } = await axios.patch(`${API_URL}/${id}`, dietaryPreference);
      return data;
    },
    onSuccess: () => {
      toast.success("Dietary preference updated successfully");
      return queryClient.invalidateQueries({
        queryKey: ["dietaryPreferences"],
      });
    },
    onError: () => {
      toast.error("An error occurred while updating dietary preference!");
    },
  });
}

export function useDeleteDietaryPreference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      toast.success("Dietary preference deleted successfully");
      return queryClient.invalidateQueries({
        queryKey: ["dietaryPreferences"],
      });
    },
    onError: () => {
      toast.error("An error occurred while deleting dietary preference!");
    },
  });
}
