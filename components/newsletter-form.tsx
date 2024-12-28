"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { NewsletterFormValues, newsletterSchema } from "@/const/newsletter";
import { logEventClient, PostHogEventType } from "@/lib/posthog";
import { Loader2 } from "lucide-react";
import { FIRST_NAME_MAX, LAST_NAME_MAX, MESSAGE_MAX } from "@/const/limits";

export default function NewsletterForm() {
  const [serverResponse, setServerResponse] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const { reset, register, handleSubmit, formState, watch } =
    useForm<NewsletterFormValues>({
      resolver: zodResolver(newsletterSchema),
    });

  const errors = formState.errors;

  console.log(errors);

  const firstNameValue = watch("firstName") || "";
  const lastNameValue = watch("lastName") || "";
  const messageValue = watch("message") || "";

  const onSubmit = async (data: NewsletterFormValues) => {
    try {
      logEventClient({
        eventType: PostHogEventType.SUBMIT_FORM,
        form: "newsletter",
      });
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      setServerResponse({ message: result.message, success: result.success });
      if (result.success === true) {
        reset();
      }
      logEventClient({
        eventType: PostHogEventType.SUBMIT_FORM,
        form: "newsletter",
        submitStatus: !!result.success ? "success" : "error",
      });
    } catch (error) {
      console.log(error);
      setServerResponse({ message: "Something went wrong", success: false });
      logEventClient({
        eventType: PostHogEventType.SUBMIT_FORM,
        form: "newsletter",
        submitStatus: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register("firstName")} />
          <p className="text-xs text-muted-foreground">
            {`${firstNameValue.length} / ${FIRST_NAME_MAX} characters`}
          </p>
          {errors.firstName && (
            <p className="text-sm text-destructive">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register("lastName")} />
          <p className="text-xs text-muted-foreground">
            {`${lastNameValue.length} / ${LAST_NAME_MAX} characters`}
          </p>
          {errors.lastName && (
            <p className="text-sm text-destructive">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register("email")} />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea id="message" {...register("message")} />
        <p className="text-xs text-muted-foreground">
          {`${messageValue.length} / ${MESSAGE_MAX} characters`}
        </p>
        {errors.message && (
          <p className="text-sm destructive">{errors.message.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting && (
          <>
            <Loader2 className="animate-spin" />{" "}
          </>
        )}
        Subscribe
      </Button>
      {serverResponse && (
        <Alert
          className={"mt-4"}
          variant={serverResponse.success ? "success" : "destructive"}
        >
          <AlertDescription>{serverResponse.message}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
