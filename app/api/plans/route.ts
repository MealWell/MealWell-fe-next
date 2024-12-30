import {
  createPlan,
  getAllPlans,
  getPaginatedPlans,
} from "@/app/service/PlanService";
import { PlanSchema } from "@/validation/plan";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = PlanSchema.parse(await request.json());
    const plan = await createPlan(data);
    return NextResponse.json(plan, { status: 201 });
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || null);
  const limit = Number(searchParams.get("limit") || null);

  try {
    const plans =
      page && limit
        ? await getPaginatedPlans(page, limit)
        : await getAllPlans();

    return NextResponse.json(plans);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
