import { TypographyH3 } from "../typography/TypographyH3";
import { TypographyP } from "../typography/TypographyP";

const TargetMarketSize = () => {
  return (
    <div className="text-justify space-y-4">
      <TypographyH3>Dimensiunea pieței țintă</TypographyH3>
      <TypographyP>
        Piața de livrare a alimentelor online din România se estimează că va
        atinge un venit de 532,20 milioane USD în 2024. În plus, se preconizează
        o rată de creștere anuală compusă (CAGR 2024-2029) de 10,35%, ceea ce va
        duce la un volum de piață de 870,70 milioane USD până în 2029.
      </TypographyP>
      <TypographyP>
        Venitul mediu per utilizator (ARPU) pe piața de livrare de produse
        alimentare este proiectat să fie de 114,10 USD în 2024. În ceea ce
        privește piața de livrare de produse alimentare, numărul utilizatorilor
        este estimat să ajungă la 4,5 milioane până în 2029. De asemenea,
        penetrarea utilizatorilor în această piață este anticipată să fie de
        18,4% în 2024.
      </TypographyP>

      <TypographyP>
        Populația Bucureștiului: ~2 milioane locuitori. Segment de interes:
        Persoanele interesate de sănătate, nutriție, fitness și soluții rapide
        pentru alimentație. TAM estimat: ~200.000 - 400.000 persoane (10-20% din
        populație, având în vedere trendurile de sănătate și nutriție). Clienți
        cu putere de cumpărare medie sau ridicată: Aproximativ 30% din populația
        Bucureștiului (~600.000 persoane). Clienți activi online (50% din cei cu
        putere de cumpărare): ~300.000 persoane. SAM estimat: ~60.000 - 120.000
        persoane (20-40% din totalul clienților activi online).
      </TypographyP>
      <TypographyP>
        Salariu ridicat (&gt;7.000 lei/lună, ~15.8% din populația activă):
        ~90.000 persoane din București. Clienți dispuși să plătească pentru
        abonamente premium și livrări frecvente (4-7 comenzi/săptămână). Focus
        pe planuri personalizate complexe: proteice, vegane, fără gluten.
      </TypographyP>
      <TypographyP>
        Salariu mediu (3.001 - 7.000 lei/lună, ~55.3% din populația activă):
        ~315.000 persoane. Clienți interesați de abonamente echilibrate, cu
        frecvență medie (3-5 comenzi/săptămână). Predilecție pentru planuri
        tradiționale și dietetice.
      </TypographyP>
      <TypographyP>
        Salariu scăzut (&lt;3.000 lei/lună, ~29% din populația activă): ~165.000
        persoane. Clienți care optează ocazional pentru livrări (1-2
        comenzi/săptămână). Interes mai redus pentru personalizare complexă, dar
        deschiși către planuri accesibile și tradiționale.
      </TypographyP>
      <TypographyP className="font-bold text-lg space-x-1">
        <span>Surse:</span>
        <a
          href="https://www.statista.com/outlook/emo/online-food-delivery/romania"
          target="_blank"
          className="underline"
        >
          statista.com
        </a>
        {", "}
        <a
          href="https://adevarul.ro/amp/economie/radiografia-salariilor-din-romania-in-2023-doar-2330342.html"
          target="_blank"
          className="underline"
        >
          adevarul.ro
        </a>
      </TypographyP>
    </div>
  );
};

export default TargetMarketSize;
