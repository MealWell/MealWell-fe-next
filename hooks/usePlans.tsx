import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PlanSchema, PlanPartialSchema } from "@/validation/plan";
import { z } from "zod";
import { PlanT } from "@/model/Plan";
import { toast } from "sonner";

const API_URL = "/api/plans";

export function usePlans(page = 1, limit = 10) {
  return useQuery<{ plans: PlanT[]; count: number }>({
    queryKey: ["plans", page, limit],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}?page=${page}&limit=${limit}`,
      );
      return data;
    },
  });
}

export function usePlan(id?: string) {
  return useQuery<PlanT>({
    queryKey: ["meal", id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreatePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (plan: z.infer<typeof PlanSchema>) => {
      const { data } = await axios.post(API_URL, plan);
      return data;
    },
    onSuccess: () => {
      toast.success("Plan created successfully");
      return queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
    onError: () => {
      toast.error("An error occurred while creating plan!");
    },
  });
}

export function useUpdatePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      plan,
    }: {
      id: string;
      plan: z.infer<typeof PlanPartialSchema>;
    }) => {
      const { data } = await axios.put(`${API_URL}/${id}`, plan);
      return data;
    },
    onSuccess: () => {
      toast.success("Plan updated successfully");
      return queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
    onError: () => {
      toast.error("An error occurred while updating plan!");
    },
  });
}

export function useDeletePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      toast.success("Plan deleted successfully");
      return queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
    onError: () => {
      toast.error("An error occurred while deleting plan!");
    },
  });
}
