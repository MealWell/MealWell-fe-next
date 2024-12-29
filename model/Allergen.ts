import { model, models, Schema } from "mongoose";

export interface AllergenT {
  _id: string;
  name: string; // Numele alergenului
  description?: string; // Descriere opțională
}

const AllergenSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

const Allergen =
  models.Allergen || model<AllergenT>("Allergen", AllergenSchema, "Allergens");
export default Allergen;
