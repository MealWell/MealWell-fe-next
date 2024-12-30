import { getMealById, updateMeal, deleteMeal } from "@/app/service/MealService";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { MealPartialSchema } from "@/validation/meal";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const meal = await getMealById(params.id);
    if (!meal) {
      return NextResponse.json({ error: "Meal not found" }, { status: 404 });
    }
    return NextResponse.json(meal);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const data = MealPartialSchema.parse(await request.json());
    const updatedMeal = await updateMeal(params.id, data);
    if (!updatedMeal) {
      return NextResponse.json({ error: "Meal not found" }, { status: 404 });
    }
    return NextResponse.json(updatedMeal);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const deletedMeal = await deleteMeal(params.id);
    if (!deletedMeal) {
      return NextResponse.json({ error: "Meal not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Meal deleted successfully" },
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
