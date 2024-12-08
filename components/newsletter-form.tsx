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

export default function NewsletterForm() {
  const [serverResponse, setServerResponse] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    try {
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
    } catch (error) {
      console.log(error);
      setServerResponse({ message: "Something went wrong", success: false });
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
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register("lastName")} />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register("email")} />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea id="message" {...register("message")} />
      </div>
      <Button type="submit" className="w-full">
        Subscribe
      </Button>
      {serverResponse && (
        <Alert
          className={`mt-4 ${
            serverResponse.success ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <AlertDescription>{serverResponse.message}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
