import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/fonts/inter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CSPostHogProvider } from "@/app/posthog-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";
import { GlobalConfirmationModalProvider } from "@/context/GlobalConfirmationModalContext";

export const metadata: Metadata = {
  title: {
    template: "%s | MealWell",
    default: "MealWell",
  },
  description: "MealWell - Healthy Eating Made Simple",
  openGraph: {
    title: {
      template: "%s | MealWell",
      default: "MealWell",
    },
    description: "MealWell - Healthy Eating Made Simple",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <CSPostHogProvider>
        <QueryClientProviderWrapper>
          <body className={`${inter.className} antialiased`}>
            <ThemeProvider attribute="class" defaultTheme="light">
              <GlobalConfirmationModalProvider>
                <Navbar />
                <div className="min-h-screen w-full flex justify-center">
                  <main className={"my-10 w-full"}>{children}</main>
                </div>
                <Footer />
                <Toaster richColors closeButton />
              </GlobalConfirmationModalProvider>
            </ThemeProvider>
          </body>
        </QueryClientProviderWrapper>
      </CSPostHogProvider>
    </html>
  );
}
