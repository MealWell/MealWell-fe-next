import { NextResponse } from "next/server";
import { newsletterSchema } from "@/const/newsletter";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedFields = newsletterSchema.safeParse({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      message: body.message,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          errors: validatedFields.error.flatten().fieldErrors,
          message:
            "There were errors with your submission. Please correct them and try again.",
          success: false,
        },
        { status: 400 },
      );
    }

    const { firstName, lastName, message, email } = validatedFields.data;

    try {
      const response = await fetch("https://formspree.io/f/xkgnaolk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          message,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return NextResponse.json(
          {
            message:
              "Failed to subscribe to the newsletter. Please try again later.",
            success: false,
            errors: errorResponse.errors || null,
          },
          { status: 400 },
        );
      }

      return NextResponse.json(
        {
          message: "Thank you for subscribing to our newsletter!",
          success: true,
        },
        { status: 200 },
      );
    } catch (error) {
      console.error("Error while subscribing to the newsletter:", error);
      return NextResponse.json(
        {
          message: "An unexpected error occurred. Please try again later.",
          success: false,
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong.",
        success: false,
      },
      { status: 500 },
    );
  }
}
