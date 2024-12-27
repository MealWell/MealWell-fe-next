"use client";

import SignIn from "@/components/sign-in";
import SignUp from "@/components/sign-up";
import { client } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  useEffect(() => {
    client.oneTap();
  }, []);

  const [selected, setSelected] = useState<"sign-in" | "sign-up">("sign-in");

  return (
    <div className="w-full">
      <div className="flex items-center flex-col justify-center w-full md:py-10">
        <div>
          <Tabs value={selected}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="sign-in"
                onClick={() => setSelected("sign-in")}
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="sign-up"
                onClick={() => setSelected("sign-up")}
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <SignIn onSignUp={() => setSelected("sign-up")} />
            </TabsContent>
            <TabsContent value="sign-up">
              <SignUp onSignIn={() => setSelected("sign-in")} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
