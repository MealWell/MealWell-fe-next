import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password",
  description: "The MealWell forget password page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
