import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allergens",
  description: "MealWell Allergens Management Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
