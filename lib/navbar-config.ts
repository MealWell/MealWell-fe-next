import { Role } from "@/lib/auth-config";

type NavItem = {
  label: string;
  href: string;
  minRole: Role;
  showWhen?: "authenticated" | "unauthenticated";
};

export const navbarConfig: NavItem[] = [
  { label: "Our Plans", href: "/plans", minRole: "anonymous" },
  { label: "Profile", href: "/profile", minRole: "user" },
  // { label: "Dashboard", href: "/dashboard", minRole: "user" },
  { label: "Management", href: "/management", minRole: "nutritionist" },
  { label: "Admin Dashboard", href: "/admin", minRole: "admin" },
  {
    label: "Sign In",
    href: "/sign-in",
    minRole: "anonymous",
    showWhen: "unauthenticated",
  },
  { label: "Fiki", href: "/fiki", minRole: "anonymous" },
];
