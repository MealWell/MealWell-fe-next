import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SubscriptionSchema } from "@/validation/userSubscription";
import { createUserSubscription } from "@/app/service/UserSubscriptionService";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "@/lib/auth-types";

export async function POST(request: NextRequest) {
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

    const data = SubscriptionSchema.parse(await request.json());
    const response = await createUserSubscription(session?.user.id, data);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
