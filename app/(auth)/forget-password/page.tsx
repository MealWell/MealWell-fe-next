"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/auth-client";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/const/schemas";

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await client.forgetPassword({
        email: data.email,
        redirectTo: "/reset-password",
      });
      setIsSubmitted(true);
      toast.success("Reset link sent to your email!");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full">
        <div className="flex items-center flex-col justify-center w-full">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Check your email</CardTitle>
              <CardDescription>
                We&#39;ve sent a password reset link to your email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  If you don&#39;t see the email, check your spam folder.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsSubmitted(false)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to reset password
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center flex-col justify-center w-full md:py-10">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Forgot password</CardTitle>
            <CardDescription>
              Enter your email to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            {...field}
                            autoComplete="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="w-full mt-4"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Sending..."
                    : "Send reset link"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href={"/sign-in"}>
              <Button variant="link" className="px-0">
                Back to sign in
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
