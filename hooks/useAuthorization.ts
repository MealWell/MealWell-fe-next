import { Role, hasRequiredRole } from "@/lib/auth-config";
import { useSession } from "@/lib/auth-client";

export function useAuthorization() {
  const { data: session, isPending } = useSession();
  const userRole: Role = (session?.user?.role as Role) || "anonymous";

  const isAuthorized = (requiredRole: Role) => {
    return hasRequiredRole(userRole, requiredRole);
  };

  return {
    isAuthContextPending: isPending,
    isAuthorized,
    userRole,
    isAuthenticated: isPending ? null : !!session?.session,
  };
}
