import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/fonts/inter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
