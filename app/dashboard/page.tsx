import SubscriptionDashboard from "@/components/SubscriptionDashboard";
import { TypographyH2 } from "@/components/typography/TypographyH2";

export default function DashboardPage() {
  return (
    <div className={"container py-8 mx-auto px-4 sm:px-0"}>
      <TypographyH2>Dashboard</TypographyH2>
      <SubscriptionDashboard />
    </div>
  );
}
