"use client";

import { Button } from "@/components/ui/button";
import { logEventClient, PostHogEventType } from "@/lib/posthog";

export default function ScrollToSubscribe() {
  return (
    <div className="mt-8">
      <p className="mb-4 text-muted-foreground">
        We are not launched yet. Subscribe to the newsletter to receive news.
      </p>
      <Button
        size="lg"
        onClick={() => {
          document?.getElementById("newsletter-form")?.scrollIntoView({
            behavior: "smooth",
          });
          logEventClient({
            eventType: PostHogEventType.CLICKED_BUTTON,
            buttonName: "ScrollToSubscribe",
          });
        }}
      >
        Subscribe to newsletter
      </Button>
    </div>
  );
}
