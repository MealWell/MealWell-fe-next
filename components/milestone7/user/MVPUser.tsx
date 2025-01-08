import { TypographyH4 } from "@/components/typography/TypographyH4";
import MVPPagesCarousel from "../MVPPagesCarousel";
import MVPUserPages from "./MVPUserPages";

const MVPUser = () => {
  return (
    <div className="space-y-4">
      <TypographyH4>Utilizator</TypographyH4>
      <MVPPagesCarousel pages={MVPUserPages} />
    </div>
  )
};

export default MVPUser;