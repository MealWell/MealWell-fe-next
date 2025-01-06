import { betterFetch } from "@better-fetch/fetch";
import { NextRequest, NextResponse } from "next/server";
import type { Session } from "./lib/auth-types";
import { routes, hasRequiredRole, HttpMethods, Role } from "./lib/auth-config";

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const userRole: Role = (session?.user?.role || "anonymous") as Role;
  const pathname = request.nextUrl.pathname;
  const method = request.method;

  console.log(pathname);

  const matchedRoute = routes.find((route) => {
    const pathMatch = route.regexp.exec(pathname);
    const methodMatch =
      !route.methods || route.methods.includes(method as HttpMethods);
    return pathMatch && methodMatch;
  });

  if (matchedRoute) {
    if (!hasRequiredRole(userRole, matchedRoute.minRole)) {
      if (userRole === "anonymous") {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      } else {
        return NextResponse.json(
          { error: "Not authorized" },
          {
            status: 401,
          },
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/management/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
