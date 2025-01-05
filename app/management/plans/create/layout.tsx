import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Plan | MealWell",
  description: "MealWell Create Plan Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
