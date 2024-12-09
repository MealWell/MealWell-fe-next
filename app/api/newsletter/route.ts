import { NextResponse } from "next/server";
import { newsletterSchema } from "@/const/newsletter";
import { createNewsletterSubscription } from "@/app/service/newsletterService";

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Could not get data",
          success: false,
        },
        { status: 400 },
      );
    }

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

    await createNewsletterSubscription(firstName, lastName, email, message);
    return NextResponse.json(
      {
        message: "Thank you for subscribing to our newsletter!",
        success: true,
      },
      { status: 200 },
    );
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
