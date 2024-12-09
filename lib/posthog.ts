import posthog from "posthog-js";

export enum PostHogEventType {
  PAGE_VIEWED = "Page Viewed",
  SUBMIT_FORM = "Submit form",
  CLICKED_BUTTON = "Button clicked",
}

type BaseEventProperties = {
  username?: string;
  userId?: string;
  description?: string;
};

type PageViewedEvent = BaseEventProperties & {
  eventType: PostHogEventType.PAGE_VIEWED;
  path: string;
};

type FormIdentifier = "newsletter";

type FormSubmitEvent = BaseEventProperties & {
  eventType: PostHogEventType.SUBMIT_FORM;
  form: FormIdentifier;
  submitStatus?: "success" | "error";
};

type ClickedButtonEvent = BaseEventProperties & {
  eventType: PostHogEventType.CLICKED_BUTTON;
  buttonName: string;
}

export type PostHogEventProperties = PageViewedEvent | FormSubmitEvent | ClickedButtonEvent;

export const logEventClient = (properties: PostHogEventProperties) => {
  posthog.capture(properties.eventType, properties);
};
