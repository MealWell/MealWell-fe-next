import { NextRequest, NextResponse } from "next/server";
import {
  deletePublishedPlan,
  getPublishedPlanById,
} from "@/app/service/PublishedPlanService";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const publishedPlan = await getPublishedPlanById((await params).id);
    if (!publishedPlan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }
    return NextResponse.json(publishedPlan);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Internal server error",
      status: 500,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const deletedPlan = await deletePublishedPlan((await params).id);
    if (!deletedPlan) {
      return NextResponse.json(
        { error: "Published Plan not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Published Plan deleted successfully" },
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
