import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { DietaryPreferenceSchema } from "@/validation/dietaryPreference";
import {
  createDietaryPreference,
  getAllDietaryPreferences,
  getPaginatedDietaryPreferences,
} from "@/app/service/DietaryPreferenceService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = DietaryPreferenceSchema.parse(body);

    const newPreference = await createDietaryPreference(validatedData);
    return NextResponse.json(newPreference, { status: 201 });
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
        ? await getPaginatedDietaryPreferences(page, limit)
        : await getAllDietaryPreferences();
    return NextResponse.json(ingredients);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
