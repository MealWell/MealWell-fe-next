import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Meal | MealWell",
  description: "MealWell Create Meal Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
