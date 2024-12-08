import { TypographyH3 } from "@/components/typography/TypographyH3";
import { TypographyP } from "@/components/typography/TypographyP";

const IdentifyingProblem = () => {
  return (
    <div>
      <TypographyH3>Identificarea Problemei</TypographyH3>
      <div className="text-justify space-y-2">
        <TypographyP>
          După ce ne-am mutat la cămin, am realizat cât de mult timp necesită
          gătitul. Odată ce am început să lucrăm, organizarea meselor a devenit
          o provocare majoră. Am observat că și colegii noștri se confruntau cu
          aceeași problemă.
        </TypographyP>
        <TypographyP>
          Presiunea timpului îi făcea să opteze pentru soluții rapide, precum
          fast-food-ul și gustările nesănătoase, afectându-le sănătatea.
          Discuțiile cu ei ne-au făcut să înțelegem că aceasta era o problemă
          comună, întâlnită frecvent printre tineri și profesioniști ocupați.
        </TypographyP>
      </div>
    </div>
  );
};

export default IdentifyingProblem;
