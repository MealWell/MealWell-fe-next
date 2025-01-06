import { NextRequest, NextResponse } from "next/server";
import { PublishedPlanUpdateBasePriceSchema } from "@/validation/publishedPlan";
import { updatePublishedPlanBasePrice } from "@/app/service/PublishedPlanService";
import { z } from "zod";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();
    const validatedData = PublishedPlanUpdateBasePriceSchema.parse(body);

    const updatedPublishedPlan = await updatePublishedPlanBasePrice(
      (await params).id,
      validatedData.basePrice,
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
