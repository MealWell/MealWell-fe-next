import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Published Plans",
  description: "MealWell Published Plans Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
