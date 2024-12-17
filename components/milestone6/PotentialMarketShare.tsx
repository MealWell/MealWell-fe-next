import { TypographyH3 } from "../typography/TypographyH3";
import { TypographyList } from "../typography/TypographyList";

const PotentialMarketShare = () => {
  return (
    <div className="text-justify space-y-4">
      <TypographyH3>Cota de piață potențială in următorii 5 ani</TypographyH3>
      <TypographyList>
        <li>
          <strong>Anul 1:</strong> după lansare o să ne focusăm în special pe
          campanii de marketing și publicitate pentru a ne atrage utilizatorii
          inițiali Această perioada ar fi cea mai complicată pentru creștere
          având în vedere că am avea un buget redus și nu putem beneficia de
          încrederea și recomandările unor clienți fideli. O valoare pe care am
          considera-o rezonabilă ar fi de 0.2%.
        </li>
        <li>
          <strong>Anul 2:</strong> Odată cu creșterea popularității serviciului
          nostru o să fie posibilă creșterea și prin alte metode cum ar fi
          recomandari de la clienți mulțumiți, ajustări ale funcționalităților
          aplicației în baza recenziilor de la actualii utilizatori. Am rămâne
          fixați pe strategii de marketing bine puse la punct și orientate către
          potențialii utilizatori cheie. La sfârșitul acestui an ne-am putea
          aștepta la o creștere spre 0.7%.
        </li>
        <li>
          <strong>Anul 3:</strong> În acest an ne așteptăm deja să obținem cât
          mai mult feedback din partea utilizatorilor noștri pentru a putea
          îmbunătăți funcționalități deja existente și pentru a putea implementa
          noi funcționalități cu impact pozitiv major asupra experienței
          utilizatorilor noștri. Ne putem aștepta la cea mai mare creștere de
          până acum, ~1.5% ținând cont de faptul că vom continua să punem accent
          pe credibilitatea brandului și loyalitatea clienților.
        </li>
        <li>
          <strong>Anul 4:</strong> În acest an ne așteptăm să avem un startup
          matur care să continue să crească în popularitate prin poziția solidă
          pe care deja o avem pe market din anii anteriori. O creștere la 2% ar
          fi posibilă prin adaugare de funcționalități inovative, diverse
          campanii și parteneriate dar și obținere de investiții.
        </li>
        <li>
          <strong>Anul 5:</strong> În acest an ne dorim să avem deja un loc bine
          consolidat pe piață, cu clienți mulțumiți și posibilități mult mai
          mari de extindere decât în anii precedenți. Pentru a atinge o cota de
          piață de 2.8% este important să menținem loialitatea clienților noștri
          și să continuam inovarea funcționalităților noastre prin aplicarea
          feedback-ului obținut de la utilizatori.
        </li>
      </TypographyList>
    </div>
  );
};

export default PotentialMarketShare;
