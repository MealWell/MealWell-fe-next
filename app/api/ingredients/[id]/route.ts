import { NextRequest, NextResponse } from "next/server";
import {
  getIngredientById,
  updateIngredient,
} from "@/app/service/IngredientService";
import { IngredientPartialSchema } from "@/validation/ingredient";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    const ingredient = await getIngredientById(id);
    if (!ingredient) {
      return NextResponse.json(
        { error: "Ingredient not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(ingredient, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();
    const data = IngredientPartialSchema.parse(body);
    const ingredient = await updateIngredient((await params).id, data);

    if (!ingredient) {
      return NextResponse.json(
        { error: "Ingredient not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(ingredient);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
