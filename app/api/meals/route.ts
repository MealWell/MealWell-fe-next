import {
  createMeal,
  getAllMeals,
  getPaginatedMeals,
} from "@/app/service/MealService";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { MealSchema } from "@/validation/meal";

export async function POST(request: NextRequest) {
  try {
    const data = MealSchema.parse(await request.json());
    const meal = await createMeal(data);
    return NextResponse.json(meal, { status: 201 });
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
    const meals =
      page && limit
        ? await getPaginatedMeals(page, limit)
        : await getAllMeals();
    return NextResponse.json(meals);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
