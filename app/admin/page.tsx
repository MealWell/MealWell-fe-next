"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { client } from "@/lib/auth-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Loader2,
  Plus,
  Trash,
  RefreshCw,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useConfirmationModal } from "@/context/GlobalConfirmationModalContext";

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    role: "user" as const,
  });
  const [isLoading, setIsLoading] = useState<string | undefined>();
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [banForm, setBanForm] = useState({
    userId: "",
    reason: "",
    expirationDate: undefined as Date | undefined,
  });

  const { showConfirmationModal } = useConfirmationModal();

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await client.admin.listUsers(
        {
          query: {
            limit: 10,
            sortBy: "createdAt",
            sortDirection: "desc",
          },
        },
        {
          throw: true,
        },
      );
      return data?.users || [];
    },
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    showConfirmationModal({
      title: "Confirm create user",
      description: "Are you sure you want to create user?",
      onConfirm: async () => {
        setIsLoading("create");
        try {
          await client.admin.createUser({
            email: newUser.email,
            password: newUser.password,
            name: newUser.name,
            role: newUser.role,
          });
          toast.success("User created successfully");
          setNewUser({ email: "", password: "", name: "", role: "user" });
          setIsDialogOpen(false);
          queryClient.invalidateQueries({
            queryKey: ["users"],
          });
        } catch (error) {
          const err = error as { message: string };
          toast.error(err.message || "Failed to create user");
        } finally {
          setIsLoading(undefined);
        }
      },
    });
  };

  const handleDeleteUser = async (id: string) => {
    showConfirmationModal({
      title: "Confirm delete user",
      description: "Are you sure you want to delete user?",
      onConfirm: async () => {
        setIsLoading(`delete-${id}`);
        try {
          await client.admin.removeUser({ userId: id });
          toast.success("User deleted successfully");
          queryClient.invalidateQueries({
            queryKey: ["users"],
          });
        } catch (error) {
          const err = error as { message: string };
          toast.error(err.message || "Failed to delete user");
        } finally {
          setIsLoading(undefined);
        }
      },
    });
  };

  const handleRevokeSessions = async (id: string) => {
    showConfirmationModal({
      title: "Confirm revoke session",
      description: "Are you sure you want to revoke session?",
      onConfirm: async () => {
        setIsLoading(`revoke-${id}`);
        try {
          await client.admin.revokeUserSessions({ userId: id });
          toast.success("Sessions revoked for user");
        } catch (error) {
          const err = error as { message: string };
          toast.error(err.message || "Failed to revoke sessions");
        } finally {
          setIsLoading(undefined);
        }
      },
    });
  };

  const handleBanUser = async (e: React.FormEvent) => {
    e.preventDefault();
    showConfirmationModal({
      title: "Confirm ban user",
      description: "Are you sure you want to ban this user?",
      onConfirm: async () => {
        setIsLoading(`ban-${banForm.userId}`);
        try {
          if (!banForm.expirationDate) {
            throw new Error("Expiration date is required");
          }
          await client.admin.banUser({
            userId: banForm.userId,
            banReason: banForm.reason,
            banExpiresIn:
              banForm.expirationDate.getTime() - new Date().getTime(),
          });
          toast.success("User banned successfully");
          setIsBanDialogOpen(false);
          queryClient.invalidateQueries({
            queryKey: ["users"],
          });
        } catch (error) {
          const err = error as { message: string };
          toast.error(err.message || "Failed to ban user");
        } finally {
          setIsLoading(undefined);
        }
      },
    });
  };

  const handleUnbanUser = async (userId: string) => {
    showConfirmationModal({
      title: "Confirm unban user",
      description: "Are you sure you want to unban this user?",
      onConfirm: async () => {
        setIsLoading(`ban-${userId}`);
        try {
          await client.admin.unbanUser({
            userId: userId,
          });
          toast.success("User unbanned successfully");
          queryClient.invalidateQueries({
            queryKey: ["users"],
          });
        } catch (error) {
          const err = error as { message: string };
          toast.error(err.message || "Failed to unban user");
        } finally {
          setIsLoading(undefined);
        }
      },
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription className={"sr-only"}>
                  Create new user dialog
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value: "admin" | "user") =>
                      setNewUser({ ...newUser, role: value as "user" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading === "create"}
                >
                  {isLoading === "create" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create User"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ban User</DialogTitle>
                <DialogDescription className={"sr-only"}>
                  Ban user dialog
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBanUser} className="space-y-4">
                <div>
                  <Label htmlFor="reason">Reason</Label>
                  <Input
                    id="reason"
                    value={banForm.reason}
                    onChange={(e) =>
                      setBanForm({ ...banForm, reason: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="expirationDate">Expiration Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="expirationDate"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !banForm.expirationDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {banForm.expirationDate ? (
                          format(banForm.expirationDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={banForm.expirationDate}
                        disabled={{ before: new Date() }}
                        onSelect={(date) =>
                          setBanForm({ ...banForm, expirationDate: date })
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading === `ban-${banForm.userId}`}
                >
                  {isLoading === `ban-${banForm.userId}` ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Banning...
                    </>
                  ) : (
                    "Ban User"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isUsersLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Banned</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.role || "user"}</TableCell>
                    <TableCell>
                      {user.banned ? (
                        <Badge variant="destructive">Yes</Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                      {user.banned && user.banReason && (
                        <div className="text-sm text-muted-foreground">
                          <strong>Reason:</strong> {user.banReason}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={isLoading?.startsWith("delete")}
                        >
                          {isLoading === `delete-${user.id}` ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRevokeSessions(user.id)}
                          disabled={isLoading?.startsWith("revoke")}
                        >
                          {isLoading === `revoke-${user.id}` ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCw className="h-4 w-4" />
                          )}
                          Revoke sessions
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            setBanForm({
                              userId: user.id,
                              reason: "",
                              expirationDate: undefined,
                            });
                            if (user.banned) {
                              await handleUnbanUser(user.id);
                            } else {
                              setIsBanDialogOpen(true);
                            }
                          }}
                          disabled={isLoading?.startsWith("ban")}
                        >
                          {isLoading === `ban-${user.id}` ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : user.banned ? (
                            "Unban"
                          ) : (
                            "Ban"
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
