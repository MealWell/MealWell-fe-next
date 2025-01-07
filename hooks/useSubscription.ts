import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { SubscriptionSchema } from "@/validation/userSubscription";
import { useAuthorization } from "@/hooks/useAuthorization";
import { UserSubscriptionT } from "@/model/UserSubscription";

const API_URL = "/api/subscription";

export function useSubscribe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (subscription: z.infer<typeof SubscriptionSchema>) => {
      await axios.post(API_URL, subscription);
    },
    onSuccess: () => {
      toast.success("Subscribed successfully");
      return queryClient.invalidateQueries({
        queryKey: ["active-subscription"],
      });
    },
    onError: () => {
      toast.error("An error occurred while subscribing!");
    },
  });
}

export function useActiveSubscription() {
  const { isAuthenticated, user } = useAuthorization();
  return useQuery<UserSubscriptionT | null>({
    queryKey: ["active-subscription", user?.id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/active`);
      return data;
    },
    enabled: !!isAuthenticated,
  });
}

export function useCancelSubscription() {
  const queryClient = useQueryClient();
  const { user } = useAuthorization();
  return useMutation({
    mutationFn: async () => {
      await axios.delete(`${API_URL}/active/cancel`);
    },
    onSuccess: async () => {
      toast.success("Subscription cancelled successfully");
      await queryClient.invalidateQueries({
        queryKey: ["active-subscription", user?.id],
      });
    },
    onError: () => {
      toast.error("An error occurred while cancelling subscription!");
    },
  });
}
