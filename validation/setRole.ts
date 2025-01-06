import { z } from "zod";
import { authorizedRoles } from "@/lib/auth-config";

const roleValues = Object.values(authorizedRoles).map(
  (roleInfo) => roleInfo.value,
);

export const SetRoleSchema = z.object({
  role: z.enum(roleValues as [string, ...string[]]),
});
