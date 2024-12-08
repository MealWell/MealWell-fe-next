import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiki",
  description: "The MealWell application roadmap",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full flex justify-center mt-5">{children}</div>;
}
