import { TypographyH2 } from "@/components/typography/TypographyH2";
import SubscriptionForm from "@/components/subscription-form/SubscriptionForm";

export default function PlansPage() {
  return (
    <div className={"container py-8 mx-auto px-4 sm:px-0"}>
      <TypographyH2>Get started with a subscription</TypographyH2>
      <SubscriptionForm />
    </div>
  );
}
