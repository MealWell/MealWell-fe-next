import { PiSealQuestionFill } from "react-icons/pi";
import { TypographyH3 } from "@/components/typography/TypographyH3";
import { TypographyP } from "@/components/typography/TypographyP";

const ProblemDescription = () => {
  return (
    <div className="mt-5">
      <TypographyH3>Descrierea problemei</TypographyH3>
      <div className="flex">
        <div className="space-y-2 text-justify">
          <TypographyP>
            O problemă semnificativă pe care am observat-o este dificultatea tot
            mai mare pe care o întâmpină oamenii în menținerea unei alimentații
            sănătoase și echilibrate, cauzată de stilul de viață aglomerat și de
            lipsa de timp pentru pregătirea meselor.
          </TypographyP>
          <TypographyP>
            O categorie vulnerabilă sunt studenții, mai ales cei care au un
            program de facultate solicitant. Între cursuri, proiecte și sesiuni
            de studiu, aceștia ajung de multe ori să sară peste mese, să recurgă
            la gustări nesănătoase sau să consume alimente de tip fast-food,
            care le pot afecta sănătatea pe termen lung.
          </TypographyP>
          <TypographyP>
            De asemenea, mulți dintre cei care au un loc de muncă cu program
            încărcat, cum ar fi muncitorii sau angajații corporatiști, întâmpină
            dificultăți în a-și pregăti mesele zilnice. După o zi lungă de
            muncă, energia și timpul rămas pentru a găti sunt limitate, ceea ce
            duce deseori la alegeri alimentare rapide, dar mai puțin nutritive.
          </TypographyP>
          <TypographyP>
            Totodată, există și persoane care urmăresc obiective specifice de
            alimentație – fie să slăbească, fie să adauge în greutate. Aceste
            persoane întâmpină adesea dificultăți în a menține o dietă
            echilibrată, mai ales dacă nu dispun de cunoștințele sau timpul
            necesar pentru a planifica și pregăti mesele corespunzătoare.
          </TypographyP>
        </div>
        <div className="hidden xl:flex items-center w-1/2 justify-center ps-4">
          <PiSealQuestionFill className="text-[15rem]" />
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
