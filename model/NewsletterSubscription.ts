import { model, models, Schema, Types } from "mongoose";

export interface NewsletterSubscriptionT {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
}

const NewsletterSubscriptionSchema = new Schema({
  _id: { type: Types.ObjectId, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: false },
});

const NewsletterSubscription =
  models.NewsletterSubscription ||
  model<NewsletterSubscriptionT>(
    "NewsletterSubscription",
    NewsletterSubscriptionSchema,
    "NewsletterSubscriptions",
  );
export default NewsletterSubscription;
