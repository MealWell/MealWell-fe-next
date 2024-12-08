import { TypographyH3 } from "@/components/typography/TypographyH3";
import { TypographyList } from "@/components/typography/TypographyList";

const RevenueStreams = () => {
  return (
    <div className="mt-5">
      <TypographyH3>Venituri preconizate</TypographyH3>
      <div className="text-justify">
        <TypographyList>
          <li>
            <strong>Abonamente pentru Planuri de Mese</strong>
            <br />
            <span>
              Venituri din abonamentele lunare/săptămânale pentru planuri de
              mese.
            </span>
          </li>
          <li>
            <strong>Taxă de Livrare</strong>
            <br />
            <span>
              Taxe suplimentare pentru opțiunile de livrare la domiciliu sau
              livrare rapidă.
            </span>
          </li>
          <li>
            <strong>Personalizare Meniu</strong>
            <br />
            <span>
              Taxe adiționale pentru personalizări detaliate, cum ar fi
              excluderea anumitor alergeni, ingrediente speciale, sau calcul
              caloric precis.
            </span>
          </li>
          <li>
            <strong>Produse Extra și Suplimente</strong>
            <br />
            <span>
              Venituri din vânzarea produselor extra, precum gustări sănătoase,
              băuturi proteice, suplimente, și alimente specifice pentru diete.
            </span>
          </li>
          <li>
            <strong>Parteneriate și Colaborări</strong>
            <br />
            <span>
              Venituri din parteneriate cu branduri de fitness, aplicații de
              sănătate sau programe corporative pentru abonamente de masă la
              preț redus.
            </span>
          </li>
          <li>
            <strong>Publicitate și Sponsorizări</strong>
            <br />
            <span>
              Venituri din publicitate pe platformă sau sponsorizarea unor
              campanii pentru produse compatibile cu misiunea MealWell.
            </span>
          </li>
        </TypographyList>
      </div>
    </div>
  );
};

export default RevenueStreams;
