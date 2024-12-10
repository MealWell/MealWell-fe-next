import { TypographyH3 } from "@/components/typography/TypographyH3";
import PageviewChart from "@/components/milestone5/pageview-chart";
import ConversionFunnelChart from "@/components/milestone5/conversion-funnel";
import AnalyticsCards from "@/components/milestone5/key-metrics-cards";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import NewsletterSubscriptionsTotalChart from "@/components/milestone5/subscriptions-chart";
import SubscriptionData from "@/components/milestone5/subscriptions-data";

export default function ChannelComparitions() {
  return (
    <div>
      <TypographyH3>Compararea canalelor de generare de lead-uri</TypographyH3>
      <div
        className={"flex flex-col justify-center items-center w-full space-y-5"}
      >
        <PageviewChart />
        <ConversionFunnelChart />
        <AnalyticsCards />
        <NewsletterSubscriptionsTotalChart />
        <Alert className={"w-full max-w-4xl"}>
          <Info className="h-4 w-4" />
          <AlertTitle>Date exportate din Posthog!</AlertTitle>
          <AlertDescription>
            Datele de mai sus sunt date exportate din Posthog, conectat la
            aplicația noastră din producție!
          </AlertDescription>
        </Alert>
        <SubscriptionData />
      </div>
    </div>
  );
}
