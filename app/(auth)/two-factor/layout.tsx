import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Two Factor",
  description: "The MealWell two factor page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
