import { GiMeal } from "react-icons/gi";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { TypographyH3 } from "@/components/typography/TypographyH3";
import { TypographyP } from "@/components/typography/TypographyP";
import { TypographyH4 } from "@/components/typography/TypographyH4";
import { TypographyList } from "@/components/typography/TypographyList";

const ProblemSolution = () => {
  return (
    <div className="mt-5">
      <TypographyH3>Soluția propusă</TypographyH3>
      <div className="text-justify">
        <TypographyP>
          Aplicatia noastră simplifică alimentația oferind mese personalizate în
          funcție de obiectivele utilizatorului (menținere, pierdere în greutate
          sau creștere în greutate). Utilizatorii aleg mesele preferate, iar
          aplicația creează un plan variat și delicios, cu calculele necesare de
          calorii și nutrienți. Totul este adaptat preferințelor personale,
          eliminând stresul și economisind timp, oferind, în esență, un bucătar
          și un nutriționist la un click distanță.
        </TypographyP>
        <div className="flex mt-5">
          <div>
            <TypographyH4 className="font-bold">
              Abonamente personalizate:
            </TypographyH4>
            <TypographyList className="my-3">
              <li>
                <strong>Planuri bogate în proteine:</strong> Destinate
                persoanelor care doresc să câștige masă musculară sau care
                practică sporturi.
              </li>
              <li>
                <strong>Planuri dietetice:</strong> Axate pe pierderea în
                greutate, cu porții controlate și ingrediente sănătoase.
              </li>
              <li>
                <strong>Planuri vegetariene sau vegane:</strong> Ideal pentru
                cei care doresc să adopte o dietă pe bază de plante.
              </li>
              <li>
                <strong>Planuri fără gluten:</strong> Pentru cei cu intoleranțe
                sau alergii.
              </li>
              <li>
                <strong>Planuri tradiționale:</strong> Oferind mese bazate pe
                rețete locale și tradiționale.
              </li>
            </TypographyList>

            <TypographyH4 className="font-bold">
              Opțiuni de planificare săptămânală:
            </TypographyH4>
            <TypographyP className="my-3 ml-6">
              <strong>Clienții</strong> pot alege să primească mese pentru o
              anumită perioadă (de exemplu, 3, 5 sau 7 zile pe săptămână),
              adaptându-se astfel la programul lor personal.
            </TypographyP>
          </div>
          <div className="hidden xl:flex items-center w-1/2 justify-center ps-4">
            <GiMeal className="text-[15rem]" />
          </div>
        </div>

        <div className="flex">
          <div className="hidden xl:flex items-center w-1/2 justify-center pe-4">
            <MdOutlineDeliveryDining className="text-[15rem]" />
          </div>
          <div>
            <TypographyH4 className="font-bold">
              Livrare la domiciliu:
            </TypographyH4>
            <TypographyP className="my-3 ml-6 mt-2">
              <strong>Comoditate maximă:</strong> Oferim livrare la ușa
              clientului, eliminând astfel efortul de a merge la cumpărături sau
              de a pregăti mesele. Acest serviciu va avea un cost suplimentar,
              dar va fi o opțiune convenabilă pentru clienți.
            </TypographyP>

            <TypographyH4 className="font-bold">
              Interfață prietenoasă și ușor de utilizat:
            </TypographyH4>
            <TypographyP className="my-3 ml-6 mt-2">
              <strong>Un site web</strong> care să permită utilizatorilor să-și
              gestioneze abonamentele, să selecteze planurile alimentare dorite,
              să facă modificări sau să comande mese suplimentare.
            </TypographyP>
          </div>
        </div>
        <TypographyH4 className="font-bold">Concluzie</TypographyH4>
        <TypographyP className="my-3 ml-6 mt-2">
          <strong>MealWell</strong> nu este doar o aplicație de livrare de mese,
          ci o soluție completă pentru un stil de viață sănătos, adresându-se
          celor care au un program încărcat, dar care doresc să își mențină
          sănătatea și forma fizică. Prin personalizare, comoditate și suport
          nutrițional, ne propunem să facem alimentația sănătoasă accesibilă
          pentru toți.
        </TypographyP>
      </div>
    </div>
  );
};

export default ProblemSolution;
