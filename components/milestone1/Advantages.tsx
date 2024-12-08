import { TypographyH3 } from "@/components/typography/TypographyH3";
import { TypographyList } from "@/components/typography/TypographyList";

const Advantages = () => {
  return (
    <div className="mt-5">
      <TypographyH3>Avantajele noastre</TypographyH3>
      <div>
        <TypographyList className="my-3">
          <li>
            <strong>Abonamente mixte și schimbări rapide de meniu: </strong>
            Permite utilizatorilor să combine mai multe tipuri de planuri.
          </li>
          <li>
            <strong>Opțiuni personalizate de gustări sănătoase: </strong>
            LifeBox se concentrează pe meniurile principale, noi vom oferi o
            gamă variată de gustări sănătoase și personalizate care să se
            potrivească obiectivelor nutriționale ale utilizatorilor.
          </li>
          <li>
            <strong>Ingredientele preferate și ingrediente de evitat: </strong>
            Pe lângă alergeni și alimente nedorite, utilizatorii ar putea alege
            ingredientele preferate (de exemplu, avocado, quinoa) pentru a le
            vedea mai des în meniuri.
          </li>
          <li>
            <strong>Profile de gust: </strong>
            Permite utilizatorilor să selecteze tipul de arome preferate – de
            exemplu, picant, dulce, sărat, sau mai blând – astfel încât fiecare
            meniu să fie adaptat gusturilor individuale.
          </li>
          <li>
            <strong>Planuri tematice pentru perioade scurte: </strong>
            Lansarea unor meniuri tematice pentru perioade limitate.
          </li>
          <li>
            <strong>Meniu „Surpriză”: </strong>
            Opțiune cu o selecție de mese mai puțin întâlnite în opțiunile
            uzuale, pentru utilizatorii deschiși la noi experiențe culinare.
          </li>
        </TypographyList>
      </div>
    </div>
  );
};

export default Advantages;
