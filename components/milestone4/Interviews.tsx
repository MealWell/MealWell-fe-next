import { TypographyH3 } from "@/components/typography/TypographyH3";
import { TypographyP } from "@/components/typography/TypographyP";

const Interviews = () => {
  return (
    <div>
      <TypographyH3>Interviuri cu potențiali clienți</TypographyH3>
      <div className="text-justify space-y-2">
        <TypographyP>
          Echipa noastră a realizat interviuri cu potențiali clienți in cadrul
          milestone-ului 2. Aceste interviuri pot fi vizualizate accesând
          acordionul cu titlul &#x22;Milestone 2&#x22; in secțiunea
          &#x22;Interviuri cu clien&#x21B;i&#x22;.
        </TypographyP>
      </div>
    </div>
  );
};

export default Interviews;
