import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { SubscriptionSchema } from "@/validation/userSubscription";

const API_URL = "/api/subscription";

export function useSubscribe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (subscription: z.infer<typeof SubscriptionSchema>) => {
      await axios.post(API_URL, subscription);
    },
    onSuccess: () => {
      toast.success("Subscribed successfully");
      return queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: () => {
      toast.error("An error occurred while subscribing!");
    },
  });
}
