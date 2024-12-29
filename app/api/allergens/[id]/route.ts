import { NextRequest, NextResponse } from "next/server";
import Allergen from "@/model/Allergen";
import { AllergenPartialSchema } from "@/validation/allergen";
import { z } from "zod";
import { getAllergenById, updateAllergen } from "@/app/service/AllergenService";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const allergen = await getAllergenById(params.id);
    if (!allergen)
      return NextResponse.json(
        { error: "Allergen not found" },
        { status: 404 },
      );

    return NextResponse.json(allergen);
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
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const validatedData = AllergenPartialSchema.parse(body);

    const updatedAllergen = await updateAllergen(params.id, validatedData);
    if (!updatedAllergen)
      return NextResponse.json(
        { error: "Allergen not found" },
        { status: 404 },
      );

    return NextResponse.json(updatedAllergen);
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
    const deletedAllergen = await Allergen.findByIdAndDelete((await params).id);
    if (!deletedAllergen)
      return NextResponse.json(
        { error: "Allergen not found" },
        { status: 404 },
      );

    return NextResponse.json({ message: "Allergen deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
