import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PublishedPlanT } from "@/model/PublishedPlan";
import { z } from "zod";
import {
  PublishedPlanUpdateBasePriceSchema,
  PublishedPlanUpdateIsActiveSchema,
} from "@/validation/publishedPlan";
import { toast } from "sonner";

const API_URL = "/api/published-plans";

export function usePublishedPlans(page = 1, limit = 10) {
  return useQuery<{ publishedPlans: PublishedPlanT[]; count: number }>({
    queryKey: ["published-plans", page, limit],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}?page=${page}&limit=${limit}`,
      );
      return data;
    },
  });
}

export function useAllPublishedPlans() {
  return useQuery<PublishedPlanT[]>({
    queryKey: ["published-plans"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data || [];
    },
  });
}

export function useUpdatePublishedPlanBasePrice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      body,
    }: {
      id: string;
      body: z.infer<typeof PublishedPlanUpdateBasePriceSchema>;
    }) => {
      const { data } = await axios.patch(`${API_URL}/${id}/base-price`, body);
      return data;
    },
    onSuccess: () => {
      toast.success("Base price updated successfully");
      return queryClient.invalidateQueries({ queryKey: ["published-plans"] });
    },
    onError: () => {
      toast.error("An error occurred while updating base price!");
    },
  });
}

export function useUpdatePublishedPlanIsActive() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      body,
    }: {
      id: string;
      body: z.infer<typeof PublishedPlanUpdateIsActiveSchema>;
    }) => {
      const { data } = await axios.patch(`${API_URL}/${id}/active`, body);
      return data;
    },
    onSuccess: () => {
      toast.success("Published plan is active updated successfully");
      return queryClient.invalidateQueries({ queryKey: ["published-plans"] });
    },
    onError: () => {
      toast.error("An error occurred while updating is active state!");
    },
  });
}

export function useDeletePublishedPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      toast.success("Published plan deleted successfully");
      return queryClient.invalidateQueries({ queryKey: ["published-plans"] });
    },
    onError: () => {
      toast.error("An error occurred while deleting published plan!");
    },
  });
}

export function usePublishPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      basePrice,
    }: {
      id: string;
      basePrice: number;
    }) => {
      await axios.post(`${API_URL}`, { id, basePrice });
    },
    onSuccess: async () => {
      toast.success("Plan published successfully");
      await queryClient.invalidateQueries({ queryKey: ["published-plans"] });
      await queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
    onError: () => {
      toast.error("An error occurred while publishing plan!");
    },
  });
}
