import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dietary Preferences",
  description: "MealWell Dietary Preferences Management Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
