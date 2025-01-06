import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { authorizedRoles, Role } from "@/lib/auth-config";
import { SetRoleSchema } from "@/validation/setRole";
import { client } from "@/lib/auth-client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useConfirmationModal } from "@/context/GlobalConfirmationModalContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SetRoleFormProps = {
  onSubmitSuccess: () => void;
  initialRole: Role;
  id: string;
};

export default function SetUserRoleDialogForm(props: SetRoleFormProps) {
  const queryClient = useQueryClient();
  const { onSubmitSuccess, initialRole, id } = props;

  const { showConfirmationModal } = useConfirmationModal();

  const form = useForm<z.infer<typeof SetRoleSchema>>({
    resolver: zodResolver(SetRoleSchema),
    defaultValues: { role: initialRole as string },
  });

  const onSetSubmit = (data: z.infer<typeof SetRoleSchema>) => {
    showConfirmationModal({
      title: "Confirm set user role",
      description: `Are you sure you want to set user role to ${data.role}?`,
      onConfirm: async () => {
        try {
          await client.admin.setRole({ userId: id, role: data.role });
          toast.success("Role changed successfully");
          await queryClient.invalidateQueries({
            queryKey: ["users"],
          });
          onSubmitSuccess();
        } catch (error) {
          const err = error as { message: string };
          toast.error(err.message || "Failed to change user role");
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSetSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name={"role"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(authorizedRoles).map(([key, roleInfo]) => (
                      <SelectItem key={key} value={roleInfo.value}>
                        {roleInfo.displayValue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        <Button type="submit" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}
