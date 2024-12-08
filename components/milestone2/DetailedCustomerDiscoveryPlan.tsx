import { TypographyH3 } from "@/components/typography/TypographyH3";
import { TypographyP } from "@/components/typography/TypographyP";
import FormResults from "@/components/milestone2/FormResults";
import { TypographyList } from "@/components/typography/TypographyList";

const DetailedCustomerDiscoveryPlan = () => {
  return (
    <>
      <div>
        <TypographyH3>Discuții cu clienții</TypographyH3>
        <div className="text-justify space-y-2">
          <TypographyP>
            Am urmat planul inițial de descoperire a clienților și am realizat
            un sondaj care ne-a permis să identificăm nevoile și preferințele
            potențialilor utilizatori ai aplicației. Am colectat feedback de la
            peste 25 de persoane și acestea sunt rezultatele obținute:
          </TypographyP>
        </div>
      </div>
      <div>
        <FormResults />

        <div className="text-justify space-y-2">
          <TypographyP>
            Am efectuat și interviuri individuale cu potențiali clienți pentru a
            discuta despre obiceiurile alimentare, preferințele lor și
            așteptările față de aplicație. Acestea au fost principalele
            întrebări și motivele pentru care le-am considerat importante:
          </TypographyP>
          <TypographyList>
            <li>
              <strong className="me-2 text-lg">
                Cum îți gestionezi alimentația în prezent? Ce tip de mese
                consumi cel mai des (gătite acasă, cumpărate, livrate etc.)?
                <br />
              </strong>
              <strong className="me-2">Ce identificăm:</strong>
              <span>
                Stilul de viață și obiceiurile alimentare curente ale
                clientului. <br />
              </span>
              <strong className="me-2">Importanța întrebării:</strong>
              <span>
                Înțelegerea surselor principale de alimentație ale clienților
                poate indica deschiderea lor față de o soluție de livrare și cât
                de dispuși ar fi să-și schimbe obiceiurile.
              </span>
            </li>
            <li>
              <strong className="me-2 text-lg">
                Care sunt principalele obstacole pe care le întâmpini atunci
                când încerci să mănânci sănătos și echilibrat?
                <br />
              </strong>
              <strong className="me-2">Ce identificăm:</strong>
              <span>
                Dificultățile specifice pe care le întâmpină în menținerea unei
                alimentații sănătoase. <br />
              </span>
              <strong className="me-2">Importanța întrebării:</strong>
              <span>
                Ne ajută să identificăm punctele de frustrare pe care MealWell
                le poate rezolva, fie că e vorba de lipsa timpului, varietatea
                scăzută a alimentelor sănătoase, sau disponibilitatea
                ingredientelor.
              </span>
            </li>
            <li>
              <strong className="me-2 text-lg">
                Cât de important este pentru tine să îți monitorizezi caloriile
                și nutrienții pe care îi consumi zilnic?
                <br />
              </strong>
              <strong className="me-2">Ce identificăm:</strong>
              <span>
                Nivelul de interes al clientului pentru controlul calității
                alimentației sale. <br />
              </span>
              <strong className="me-2">Importanța întrebării:</strong>
              <span>
                Aceasta determină nevoia de personalizare nutrițională în
                aplicație și sugerează dacă funcții precum calcularea
                nutrienților și caloriilor ar fi atractive pentru utilizator.
              </span>
            </li>
            <li>
              <strong className="me-2 text-lg">
                În medie, cât timp ai la dispoziție pentru a-ți pregăti mesele
                zilnice?
                <br />
              </strong>
              <strong className="me-2">Ce identificăm:</strong>
              <span>
                Disponibilitatea clientului de a găti și timpul efectiv pe care
                îl poate dedica meselor. <br />
              </span>
              <strong className="me-2">Importanța întrebării:</strong>
              <span>
                Înțelegerea acestei limite ne ajută să oferim soluții adaptate
                (ex. mese gata pregătite, livrare) pentru cei care au foarte
                puțin timp la dispoziție.
              </span>
            </li>
            <li>
              <strong className="me-2 text-lg">
                Ai preferințe alimentare specifice (vegetarian, vegan, fără
                gluten etc.) sau alergii pe care trebuie să le respecți?
                <br />
              </strong>
              <strong className="me-2">Ce identificăm:</strong>
              <span>
                Necesitățile alimentare particulare ale clienților și
                sensibilitățile alimentare. <br />
              </span>
              <strong className="me-2">Importanța întrebării:</strong>
              <span>
                Permite adaptarea planurilor MealWell astfel încât să răspundă
                nevoilor individuale, ceea ce crește atractivitatea aplicației
                pentru o gamă variată de utilizatori.
              </span>
            </li>
            <li>
              <strong className="me-2 text-lg">
                Cât de interesat ai fi de un plan alimentar personalizat, și
                livrarea meselor acasă?
                <br />
              </strong>
              <strong className="me-2">Ce identificăm:</strong>
              <span>
                Deschiderea clientului față de ideea de livrare regulată și
                personalizată. <br />
              </span>
              <strong className="me-2">Importanța întrebării:</strong>
              <span>
                Acest lucru confirmă interesul pentru livrarea la domiciliu, o
                funcție de bază a MealWell, și ne ajută să înțelegem cât de
                dorită este aceasta față de opțiunea de a găti personal.
              </span>
            </li>
            <li>
              <strong className="me-2 text-lg">
                Ce părere ai despre posibilitatea de a alege un plan alimentar
                în funcție de obiectivul tău (slăbire, menținere, masă musculară
                etc.)?
                <br />
              </strong>
              <strong className="me-2">Ce identificăm:</strong>
              <span>
                Motivațiile specifice ale utilizatorului legate de alimentație.
                <br />
              </span>
              <strong className="me-2">Importanța întrebării:</strong>
              <span>
                Înțelegerea acestor obiective ajută MealWell să creeze planuri
                mai precise și să personalizeze oferta pentru rezultate care să
                corespundă așteptărilor clienților.
              </span>
            </li>
            <li>
              <strong className="me-2 text-lg">
                Cât de des ai folosi un astfel de serviciu? Ai prefera un plan
                zilnic sau doar anumite zile pe săptămână?
                <br />
              </strong>
              <strong className="me-2">Ce identificăm:</strong>
              <span>
                Frecvența optimă de utilizare a serviciului.
                <br />
              </span>
              <strong className="me-2">Importanța întrebării:</strong>
              <span>
                Ajută la configurarea ofertelor săptămânale și a abonamentelor,
                adaptând numărul de mese la preferințele clientului.
              </span>
            </li>
            <li>
              <strong className="me-2 text-lg">
                Ce buget ai in medie lunar pentru alimentatie? Ce parte din
                buget este pentru mancarea gatita si care este pentru mancarea
                comandata?
                <br />
              </strong>
              <strong className="me-2">Ce identificăm:</strong>
              <span>
                Pragul financiar de acceptabilitate al clienților.
                <br />
              </span>
              <strong className="me-2">Importanța întrebării:</strong>
              <span>
                Setarea unui preț corect și competitiv este crucială pentru
                atragerea și păstrarea clienților.
              </span>
            </li>
          </TypographyList>
        </div>
      </div>
    </>
  );
};

export default DetailedCustomerDiscoveryPlan;
