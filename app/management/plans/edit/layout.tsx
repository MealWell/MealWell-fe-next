import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Plan | MealWell",
  description: "MealWell Edit Plan Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
