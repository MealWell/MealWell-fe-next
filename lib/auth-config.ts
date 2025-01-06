import { pathToRegexp } from "path-to-regexp";

export type Role = "admin" | "nutritionist" | "user" | "anonymous";

type RoleInfo = {
  value: Role;
  displayValue: string;
  level: number;
};

export const roles: Record<string, RoleInfo> = {
  anonymous: { value: "anonymous", displayValue: "Visitor", level: 0 },
  user: { value: "user", displayValue: "User", level: 1 },
  nutritionist: {
    value: "nutritionist",
    displayValue: "Nutritionist",
    level: 2,
  },
  admin: { value: "admin", displayValue: "Admin", level: 3 },
};

export const authorizedRoles: typeof roles = Object.fromEntries(
  Object.entries(roles).filter(([key]) => key !== "anonymous"),
);

export type HttpMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type RouteConfig = {
  path: string;
  regexp: RegExp;
  methods?: ("GET" | "POST" | "PUT" | "DELETE" | "PATCH")[];
  minRole: Role;
};

export const routes: RouteConfig[] = [
  {
    path: "/api/allergens",
    regexp: pathToRegexp("/api/allergens{/*path}").regexp,
    minRole: "nutritionist",
  },
  {
    path: "/api/dietary-preferences",
    regexp: pathToRegexp("/api/dietary-preferences{/*path}").regexp,
    minRole: "nutritionist",
  },
  {
    path: "/api/ingredients",
    regexp: pathToRegexp("/api/ingredients{/*path}").regexp,
    minRole: "nutritionist",
  },
  {
    path: "/api/meals",
    regexp: pathToRegexp("/api/meals{/*path}").regexp,
    minRole: "nutritionist",
  },
  {
    path: "/api/plans",
    regexp: pathToRegexp("/api/plans{/*path}").regexp,
    minRole: "nutritionist",
  },
  {
    path: "/api/published-plans",
    regexp: pathToRegexp("/api/published-plans").regexp,
    methods: ["POST"],
    minRole: "admin",
  },
  {
    path: "/api/published-plans/[id]",
    regexp: pathToRegexp("/api/published-plans/:id{/*path}").regexp,
    methods: ["PUT", "DELETE", "PATCH"],
    minRole: "admin",
  },
  {
    path: "/management",
    regexp: pathToRegexp("/management{/*path}").regexp,
    minRole: "nutritionist",
  },
  {
    path: "/profile",
    regexp: pathToRegexp("/profile{/*path}").regexp,
    minRole: "user",
  },
  {
    path: "/dashboard",
    regexp: pathToRegexp("/dashboard{/*path}").regexp,
    minRole: "user",
  },
  {
    path: "/admin",
    regexp: pathToRegexp("/admin{/*path}").regexp,
    minRole: "admin",
  },
];

export function hasRequiredRole(userRole: Role, requiredRole: Role): boolean {
  return roles[userRole].level >= roles[requiredRole].level;
}

export function getDisplayValue(role: Role): string {
  return roles[role].displayValue;
}
