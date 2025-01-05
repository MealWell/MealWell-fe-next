import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Plans", template: "%s" },
  description: "MealWell Plans Management Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
