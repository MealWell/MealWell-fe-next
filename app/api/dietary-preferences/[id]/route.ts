import { NextRequest, NextResponse } from "next/server";
import DietaryPreference from "@/model/DietaryPreference";
import { DietaryPreferencePartialSchema } from "@/validation/dietaryPreference";
import { z } from "zod";
import {
  getDietaryPreferenceById,
  updateDietaryPreference,
} from "@/app/service/DietaryPreferenceService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const preference = await getDietaryPreferenceById((await params).id);
    if (!preference)
      return NextResponse.json(
        { error: "Dietary Preference not found" },
        { status: 404 },
      );

    return NextResponse.json(preference);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();
    const validatedData = DietaryPreferencePartialSchema.parse(body);

    const updatedPreference = await updateDietaryPreference(
      (await params).id,
      validatedData,
    );
    if (!updatedPreference)
      return NextResponse.json(
        { error: "Dietary Preference not found" },
        { status: 404 },
      );

    return NextResponse.json(updatedPreference);
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const deletedPreference = await DietaryPreference.findByIdAndDelete(
      (await params).id,
    );
    if (!deletedPreference)
      return NextResponse.json(
        { error: "Dietary Preference not found" },
        { status: 404 },
      );

    return NextResponse.json({
      message: "Dietary Preference deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
