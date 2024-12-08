import { TypographyH2 } from "@/components/typography/TypographyH2";
import { TypographyH4 } from "@/components/typography/TypographyH4";
import { TypographyList } from "@/components/typography/TypographyList";
import Image from "next/image";

const Competition = () => {
  return (
    <div className="mt-5">
      <TypographyH2>Competiție</TypographyH2>
      <div className="flex flex-col xl:flex-row">
        <div className="text-justify">
          <TypographyH4>Competitor: LifeBox</TypographyH4>
          LifeBox se poziționează ca un furnizor de servicii de livrare a
          meselor sănătoase, având mai multe meniuri concepute de nutriționiști
          pentru a satisface nevoile diverse ale consumatorilor. Iată câteva
          dintre caracteristicile cheie care îi definesc oferta:
          <TypographyList className="">
            <li>
              <strong>Meniuri Nutriționale:</strong> LifeBox oferă o gamă
              variată de meniuri, fiecare dintre ele fiind întocmit de
              specialiști în nutriție, asigurându-se că clienții beneficiază de
              mese echilibrate și sănătoase.
            </li>
            <li>
              <strong>Interfață Prietenoasă:</strong> Platforma LifeBox se
              remarcă printr-un design user-friendly, care facilitează navigarea
              și selecția opțiunilor de masă, astfel încât utilizatorii pot
              alege cu ușurință mesele dorite.
            </li>
            <li>
              <strong>Flexibilitate în Livrare:</strong> Clienții pot selecta
              zilele în care doresc să primească livrările, oferind astfel un
              grad înalt de personalizare și confort.
            </li>
            <li>
              <strong>Livrare Zilnică:</strong> LifeBox se angajează să livreze
              mese proaspete în fiecare zi, garantând astfel că utilizatorii au
              acces constant la mâncare sănătoasă.
            </li>
            <li>
              <strong>Oferte Promoționale:</strong> Pentru a atrage și a păstra
              clienții, LifeBox oferă diverse oferte promoționale, permițând
              utilizatorilor să beneficieze de discounturi sau mese gratuite.
            </li>
          </TypographyList>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={"/competitor/lifebox.png"}
            alt={"competitor-lifebox"}
            width={750}
            height={750}
          />
        </div>
      </div>
    </div>
  );
};

export default Competition;
