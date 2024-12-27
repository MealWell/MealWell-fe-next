import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/fonts/inter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CSPostHogProvider } from "@/app/posthog-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: {
    template: "%s | MealWell",
    default: "MealWell",
  },
  description: "The MealWell application",
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
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Navbar />
            <div className="min-h-screen w-full flex justify-center">
              <main className={"mt-20 w-full"}>{children}</main>
            </div>
            <Footer />
            <Toaster richColors closeButton />
          </ThemeProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
