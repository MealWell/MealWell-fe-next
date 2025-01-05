import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "MealWell Admin Dashboard page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
