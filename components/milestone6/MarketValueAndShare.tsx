import { TypographyH3 } from "../typography/TypographyH3";
import { TypographyList } from "../typography/TypographyList";
import { TypographyP } from "../typography/TypographyP";

const MarketValueAndShare = () => {
  return (
    <div className="text-justify space-y-4">
      <TypographyH3>Valoarea și cota de piață in următorii 5 ani</TypographyH3>
      <TypographyP>
        În anul 2024, valoarea pieței din România este estimată la 352 milioane
        USD, cu o rată de creștere de 10,35%. Pe baza acestor date, putem estima
        valoarea de piață a startup-ului nostru.
      </TypographyP>
      <TypographyList>
        <li>
          <strong>Anul 2025:</strong> 0.2% din 587 milioane (1.1 milioane)
        </li>
        <li>
          <strong>Anul 2026:</strong> 0.7% din 645 milioane (4.5 milioane)
        </li>
        <li>
          <strong>Anul 2027:</strong> 1.5% din 709 milioane (10.6 milioane)
        </li>
        <li>
          <strong>Anul 2028:</strong> 2% din 779 milioane (15.5 milioane)
        </li>
        <li>
          <strong>Anul 2029:</strong> 2.8% din 856 milioane (23.9 milioane)
        </li>
      </TypographyList>
    </div>
  );
};

export default MarketValueAndShare;
