import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "@/lib/auth-types";
import { cancelActivePlan } from "@/app/service/UserSubscriptionService";

export async function DELETE(request: NextRequest) {
  try {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      },
    );

    if (!session?.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await cancelActivePlan(session?.user.id);
    return NextResponse.json(
      { message: "Subscription cancelled successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
