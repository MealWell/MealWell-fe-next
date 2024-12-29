import { IngredientSchema } from "@/validation/ingredient";
import {
  createIngredient,
  getAllIngredients,
  getPaginatedIngredients,
} from "@/app/service/IngredientService";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = IngredientSchema.parse(await request.json());
    const ingredient = await createIngredient(data);
    return NextResponse.json(ingredient, { status: 201 });
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
    const ingredients =
      page && limit
        ? await getPaginatedIngredients(page, limit)
        : await getAllIngredients();
    return NextResponse.json(ingredients);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
