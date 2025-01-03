import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { AllergenPartialSchema, AllergenSchema } from "@/validation/allergen";
import { toast } from "sonner";
import { AllergenT } from "@/model/Allergen";

const API_URL = "/api/allergens";

export function useAllergens(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["allergens", page, limit],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}?page=${page}&limit=${limit}`,
      );
      return data;
    },
  });
}

export function useAllAllergens() {
  return useQuery<AllergenT[]>({
    queryKey: ["allergens"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data || [];
    },
  });
}

export function useCreateAllergen() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (allergen: z.infer<typeof AllergenSchema>) => {
      const { data } = await axios.post(API_URL, allergen);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allergens"] });
      toast.success("Allergen created successfully!");
    },
    onError: () => {
      toast.error("An error occurred while creating allergen!");
    },
  });
}

export function useUpdateAllergen() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      allergen,
    }: {
      id: string;
      allergen: z.infer<typeof AllergenPartialSchema>;
    }) => {
      const { data } = await axios.patch(`${API_URL}/${id}`, allergen);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allergens"] });
      toast.success("Allergen updated successfully!");
    },
    onError: () => {
      toast.error("An error occurred while updating allergen!");
    },
  });
}

export function useDeleteAllergen() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allergens"] });
      toast.success("Allergen deleted successfully!");
    },
    onError: () => {
      toast.error("An error occurred while deleting allergen!");
    },
  });
}
