import { TypographyH4 } from "@/components/typography/TypographyH4";
import MVPPagesCarousel from "../MVPPagesCarousel";
import MVPNutritionistPages from "./MVPNutritionistPages";

const MVPNutritionist = () => {
  return (
    <div className="space-y-4">
      <TypographyH4>Nutriționist</TypographyH4>
      <MVPPagesCarousel pages={MVPNutritionistPages} />
    </div>
  );
};

export default MVPNutritionist;