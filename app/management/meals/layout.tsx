import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Meals", template: "%s" },
  description: "MealWell Meals Management Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
