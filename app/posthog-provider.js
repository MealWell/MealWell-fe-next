"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

const shouldInitializePostHog =
  typeof window !== "undefined" && process.env.NODE_ENV !== "development";

if (shouldInitializePostHog) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  });
} else {
  // Provide a noop implementation of PostHog to avoid errors in development
  posthog.capture = () => {};
  posthog.identify = () => {};
}

export function CSPostHogProvider({ children }) {
  return (
    <PostHogProvider client={shouldInitializePostHog ? posthog : null}>
      {children}
    </PostHogProvider>
  );
}
