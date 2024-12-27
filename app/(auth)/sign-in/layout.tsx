import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "The MealWell sign in page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
