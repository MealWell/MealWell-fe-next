import { TypographyH3 } from "@/components/typography/TypographyH3";
import { TypographyList } from "@/components/typography/TypographyList";

const Keymetrics = () => {
  return (
    <div className="mt-5">
      <TypographyH3>Key Metrics</TypographyH3>
      <div className="text-justify">
        <TypographyList className="my-3">
          <li>
            <strong>Rata de Retenție a Clienților</strong>
            <br />
            <span>
              Procentul de clienți care continuă să folosească MealWell pe o
              perioadă mai lungă.
            </span>
          </li>
          <li>
            <strong>Rata de Creștere a Abonamentelor</strong>
            <br />
            <span>Creșterea lunară a numărului de abonați</span>
          </li>
          <li>
            <strong>Rata de Conversie</strong>
            <br />
            <span>
              Procentul de vizitatori ai site-ului care devin clienți plătitori
            </span>
          </li>
          <li>
            <strong>Valoarea Medie a Comenzilor</strong>
            <br />
            <span>Suma medie cheltuită de fiecare client per comandă</span>
          </li>
        </TypographyList>
      </div>
    </div>
  );
};

export default Keymetrics;
