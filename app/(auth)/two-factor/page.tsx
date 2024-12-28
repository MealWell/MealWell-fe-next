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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { client } from "@/lib/auth-client";
import { TotpFormValues, totpSchema } from "@/const/schemas";

export default function TotpVerification() {
  const router = useRouter();

  const form = useForm<TotpFormValues>({
    resolver: zodResolver(totpSchema),
    defaultValues: {
      totpCode: "",
    },
  });

  const onSubmit = async (data: TotpFormValues) => {
    try {
      const res = await client.twoFactor.verifyTotp({ code: data.totpCode });
      if (res.data?.token) {
        setTimeout(() => {
          router.push("/profile");
        }, 1000);
      } else {
        form.setError("totpCode", { message: "Invalid TOTP code" });
      }
    } catch (error) {
      console.error(error);
      form.setError("totpCode", {
        message: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center flex-col justify-center w-full">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>TOTP Verification</CardTitle>
            <CardDescription>
              Enter your 6-digit TOTP code to authenticate
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!form.formState.isSubmitSuccessful ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="totpCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TOTP Code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter 6-digit code"
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full mt-4"
                    disabled={form.formState.isSubmitSuccessful}
                  >
                    {form.formState.isSubmitting ? "Verifying..." : "Verify"}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-success" />
                <p className="text-lg font-semibold">Verification Successful</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground gap-2">
            <Link href={"/two-factor/otp"}>
              <Button variant="link" size="sm">
                Switch to Email Verification
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
