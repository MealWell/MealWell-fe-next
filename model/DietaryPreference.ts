import { model, models, Schema } from "mongoose";

export interface DietaryPreferenceT {
  _id: string;
  name: string; // Numele preferinței dietare
  description?: string; // Descriere opțională
}

const DietaryPreferenceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

const DietaryPreference =
  models.DietaryPreference ||
  model<DietaryPreferenceT>(
    "DietaryPreference",
    DietaryPreferenceSchema,
    "DietaryPreferences",
  );
export default DietaryPreference;
