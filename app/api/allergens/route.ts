import { NextRequest, NextResponse } from "next/server";
import { AllergenSchema } from "@/validation/allergen";
import { z } from "zod";
import {
  createAllergen,
  getAllAllergens,
  getPaginatedAllergens,
} from "@/app/service/AllergenService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = AllergenSchema.parse(body);

    const newAllergen = await createAllergen(validatedData);
    return NextResponse.json(newAllergen, { status: 201 });
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
        ? await getPaginatedAllergens(page, limit)
        : await getAllAllergens();
    return NextResponse.json(ingredients);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
