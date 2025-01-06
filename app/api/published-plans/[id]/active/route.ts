import { NextRequest, NextResponse } from "next/server";
import { PublishedPlanUpdateIsActiveSchema } from "@/validation/publishedPlan";
import { setPublishedPlanActive } from "@/app/service/PublishedPlanService";
import { z } from "zod";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();
    const validatedData = PublishedPlanUpdateIsActiveSchema.parse(body);

    const updatedPublishedPlan = await setPublishedPlanActive(
      (await params).id,
      validatedData.isActive,
    );
    if (!updatedPublishedPlan)
      return NextResponse.json(
        { error: "PublishedPlan not found" },
        { status: 404 },
      );

    return NextResponse.json(updatedPublishedPlan);
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
