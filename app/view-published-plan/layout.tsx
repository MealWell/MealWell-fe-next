import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Details",
  description: "MealWell Plan Details Page",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"container py-8 mx-auto px-4 sm:px-0"}>{children}</div>
  );
}
