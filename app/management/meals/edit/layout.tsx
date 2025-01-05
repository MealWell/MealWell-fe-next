import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Meal | MealWell",
  description: "MealWell Edit Meal Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
