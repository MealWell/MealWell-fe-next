import { TypographyH3 } from "../typography/TypographyH3";
import { TypographyList } from "../typography/TypographyList";
import { TypographyP } from "../typography/TypographyP";
import CompetitorsPieChart from "./CompetitorsChart";

const Competitors = () => {
  return (
    <div className="text-justify space-y-4">
      <TypographyH3>Competitorii & Cotă de piață</TypographyH3>
      <TypographyP className="font-bold text-lg">
        Număr estimat de competitori:
      </TypographyP>
      <TypographyList>
        <li>
          <strong>Directi:</strong> ~4-6 jucători.
        </li>
        <li>
          <strong>Indirecti:</strong> ~10-15 jucători majori (inclusiv
          restaurante și supermarketuri).
        </li>
      </TypographyList>
      <TypographyP className="font-bold text-lg">
        Competiție directă:
      </TypographyP>
      <TypographyList>
        <li>
          <strong>FitFood:</strong> Servicii de mese sănătoase personalizate
          (fără abonament).
        </li>
        <li>
          <strong>LifeBox:</strong> Abonamente zilnice pentru mese
          personalizate.
        </li>
        <li>
          <strong>Freshful by eMAG:</strong>
          Soluții de livrare rapidă pentru produse alimentare sănătoase.
        </li>
        <li>
          <strong>Edenia:</strong> Gama de mese gata preparate,
          semi-personalizate.
        </li>
      </TypographyList>
      <TypographyP className="font-bold text-lg">
        Competiție indirectă:
      </TypographyP>
      <TypographyList>
        <li>Restaurante și aplicații de livrare (Glovo, Tazz).</li>
        <li>Magazine bio/naturiste care oferă planuri alimentare.</li>
      </TypographyList>
      <TypographyP className="font-bold text-lg">
        Cota de piață pentru cei mai mari competitori:
      </TypographyP>
      <div className="h-[20rem]">
        <CompetitorsPieChart />
      </div>
    </div>
  );
};

export default Competitors;
