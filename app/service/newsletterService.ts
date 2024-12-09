"use server";

import connectMongo from "@/db/mongoose";
import { Types } from "mongoose";
import NewsletterSubscription, {
  NewsletterSubscriptionT,
} from "@/model/NewsletterSubscription";

export async function createNewsletterSubscription(
  firstName: NewsletterSubscriptionT["firstName"],
  lastName: NewsletterSubscriptionT["lastName"],
  email: NewsletterSubscriptionT["email"],
  message: NewsletterSubscriptionT["message"],
) {
  try {
    await connectMongo();
    const newsletterSubscription = new NewsletterSubscription({
      _id: new Types.ObjectId(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      message: message,
    });
    await newsletterSubscription.save();
  } catch (e) {
    console.error(e);
    throw e;
  }
}
