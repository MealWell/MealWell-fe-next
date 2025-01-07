import { Role, hasRequiredRole } from "@/lib/auth-config";
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";
import posthog from "posthog-js";

export function useAuthorization() {
  const { data: session, isPending } = useSession();
  const userRole: Role = (session?.user?.role as Role) || "anonymous";

  const isAuthorized = (requiredRole: Role) => {
    return hasRequiredRole(userRole, requiredRole);
  };

  useEffect(() => {
    if (session?.user) {
      posthog.identify(session.user.id, { username: session.user.name });
    }
  }, [session]);

  return {
    isPending,
    isAuthContextPending: isPending,
    isAuthorized,
    userRole,
    isAuthenticated: isPending ? null : !!session?.session,
    user: session?.user,
  };
}
