import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ingredients",
  description: "MealWell Ingredients Management Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
