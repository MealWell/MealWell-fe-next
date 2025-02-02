import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "The MealWell reset password page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
