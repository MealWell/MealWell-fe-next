import { NextRequest, NextResponse } from "next/server";
import {
  getAllPublishedPlans,
  getPaginatedPublishedPlans,
  publishPlan,
} from "@/app/service/PublishedPlanService";
import { z } from "zod";
import { PublishedPlanSchema } from "@/validation/publishedPlan";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || null);
  const limit = Number(searchParams.get("limit") || null);

  try {
    const plans =
      page && limit
        ? await getPaginatedPublishedPlans(page, limit)
        : await getAllPublishedPlans();

    return NextResponse.json(plans);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = PublishedPlanSchema.parse(await request.json());

    const publishedPlan = await publishPlan(data.id, data.basePrice);

    return NextResponse.json(publishedPlan);
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
