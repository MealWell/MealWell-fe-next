import PublishedPlansCarousel from "@/components/PublishedPlansCarousel";
import { TypographyH2 } from "@/components/typography/TypographyH2";

export default function PlansPage() {
  return (
    <div className={"container py-8 mx-auto px-4 sm:px-0"}>
      <TypographyH2 className={"text-center"}>MealWell plans</TypographyH2>
      <div className={"flex justify-center mt-4"}>
        <PublishedPlansCarousel />
      </div>
    </div>
  );
}
