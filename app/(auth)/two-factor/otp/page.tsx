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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { OtpFormValues, otpSchema } from "@/const/schemas";
import { client } from "@/lib/auth-client";

export default function TwoFactorAuth() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const router = useRouter();

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const requestOTP = async () => {
    await client.twoFactor.sendOtp();
    setMessage("OTP sent to your email");
    setIsError(false);
    setIsOtpSent(true);
  };

  const validateOTP = async (data: OtpFormValues) => {
    try {
      const res = await client.twoFactor.verifyOtp({ code: data.otp });
      if (res.data) {
        setMessage("OTP validated successfully");
        setIsError(false);
        setIsValidated(true);
        setTimeout(() => {
          router.push("/profile");
        }, 1000);
      } else {
        form.setError("otp", { message: "Invalid OTP" });
      }
    } catch (err) {
      console.error(err);
      form.setError("otp", { message: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center flex-col justify-center w-full">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>
              Verify your identity with a one-time password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isOtpSent ? (
              <Button onClick={requestOTP} className="w-full">
                <Mail className="mr-2 h-4 w-4" /> Send OTP to Email
              </Button>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(validateOTP)}>
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter 6-digit OTP"
                            autoComplete="off"
                            maxLength={6}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="text-sm text-muted-foreground py-2">
                    Check your email for the OTP
                  </p>
                  <Button
                    type="submit"
                    className="w-full mt-4"
                    disabled={isValidated || form.formState.isSubmitSuccessful}
                  >
                    {form.formState.isSubmitting
                      ? "Validating..."
                      : "Validate OTP"}
                  </Button>
                </form>
              </Form>
            )}
            {message && (
              <div
                className={`flex items-center gap-2 mt-4 ${
                  isError
                    ? "text-destructive"
                    : form.formState.isSubmitSuccessful
                      ? "text-success"
                      : "text-primary"
                }`}
              >
                {isError ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                <p className="text-sm">{message}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
