import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UserCard from "./user-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "MealWell user profile",
};

export default async function ProfilePage() {
  const [session, activeSessions] = await Promise.all([
    auth.api.getSession({
      headers: await headers(),
    }),
    auth.api.listSessions({
      headers: await headers(),
    }),
  ]).catch((e) => {
    console.error(e);
    throw redirect("/sign-in");
  });
  return (
    <div className="flex w-full justify-center">
      <div className={"container"}>
        <UserCard
          session={JSON.parse(JSON.stringify(session))}
          activeSessions={JSON.parse(JSON.stringify(activeSessions))}
        />
      </div>
    </div>
  );
}
