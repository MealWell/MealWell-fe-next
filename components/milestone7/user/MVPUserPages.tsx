import { TypographyH4 } from "@/components/typography/TypographyH4";
import { TypographyP } from "@/components/typography/TypographyP";
import { MVPPage } from "@/const/types";

const ProfileDescription = () => {
  return (
    <>
      <TypographyP>
        În cadrul profilului tău, ai control asupra tuturor detaliilor contului.
        Poți vizualiza și actualiza informațiile tale personale, precum numele
        și adresa de email, pentru a te asigura că datele tale sunt mereu
        corecte. De asemenea, este important să îți verifici email-ul pentru a
        păstra un cont valid și securizat.
      </TypographyP>

      <TypographyH4>Gestionarea Sesiunilor Active</TypographyH4>
      <TypographyP>
        Ai posibilitatea de a monitoriza sesiunile tale active. Dacă vrei să te
        asiguri că contul tău este în siguranță, poți închide sesiunile deschise
        pe alte dispozitive. În plus, ai opțiunea de a te deconecta de pe
        dispozitivele pe care nu mai dorești să fii conectat, asigurându-te că
        accesul la contul tău este protejat.
      </TypographyP>

      <TypographyH4>Securitate și Autentificare</TypographyH4>
      <TypographyP>
        Pentru un nivel suplimentar de securitate, îți oferim opțiunea de a crea
        o cheie de acces (Passkey), care îți va permite o autentificare rapidă
        și sigură. Poți, de asemenea, să activezi autentificarea în doi pași
        (2FA), care protejează contul tău de accesul neautorizat. Dacă simți că
        este necesar, ai opțiunea de a-ți schimba parola, asigurându-te că
        datele tale sunt mereu în siguranță.
      </TypographyP>

      <TypographyP>
        Profilul tău este zona centrală în care îți poți personaliza setările de
        securitate și confidențialitate, având totodată control complet asupra
        sesiunilor tale și asupra autentificării. Aceste opțiuni te ajută să te
        simți în siguranță și să îți gestionezi contul într-un mod simplu și
        eficient.
      </TypographyP>
    </>
  );
};

const Plans = () => {
  return (
    <>
      <TypographyP>
        Pagina cu planurile disponibile îți oferă o selecție variată de opțiuni
        de dietă personalizate, fiecare gândită pentru a răspunde nevoilor tale
        specifice. Fiecare plan include un preț lunar, o descriere scurtă a
        obiectivelor pe care le urmărește, precum și caracteristici cheie care
        evidențiază avantajele planului (de exemplu, planuri pentru slăbire,
        menținerea masei musculare etc.).
      </TypographyP>
    </>
  );
};

const PlanDetails = () => {
  return (
    <>
      <TypographyP>
        Descoperă un mod inovativ de a-ți gestiona alimentația! Pagina cu
        detalii ale meniului îți oferă o privire completă asupra fiecărui plan
        alimentar, incluzând informații esențiale despre distribuția
        macronutrienților, precum proteine, grăsimi, carbohidrați și fibre.
      </TypographyP>
      <TypographyP>
        Cu ajutorul unei diagrame, poți vedea cum se împarte aportul tău
        nutrițional, astfel încât să alegi mesele care se aliniază perfect cu
        obiectivele tale de sănătate și fitness. Fiecare meniu vine cu o listă
        detaliată a felurilor de mâncare incluse, pentru ca tu să ai totul sub
        control.
      </TypographyP>
      <TypographyP>
        Designul intuitiv transformă această pagină într-o unealtă puternică de
        personalizare, economisind timp și maximizând eficiența în alegerea
        meselor potrivite. Ai acum posibilitatea să îți adaptezi complet dieta
        pentru a obține cele mai bune rezultate, fără complicații.
      </TypographyP>
    </>
  );
};

const MealDetails = () => {
  return (
    <>
      <TypographyP>
        Explorează detaliile complete ale fiecărui fel de mâncare! Pe această
        pagină, ai acces la informații detaliate despre ingrediente și valori
        nutriționale pentru a te ajuta să îți planifici mesele mai eficient.
      </TypographyP>
      <TypographyP>
        În tab-ul <strong>Ingrediente</strong>, vei găsi o listă completă a
        ingredientelor, cantitățile fiecăruia și informațiile esențiale despre
        calorii, proteine și carbohidrați. Fiecare detaliu este calculat și
        afișat clar, astfel încât să poți lua decizii informate despre
        alimentația ta.
      </TypographyP>
      <TypographyP>
        În tab-ul <strong>Nutriție</strong>, sunt prezentate valorile
        nutriționale totale ale felului de mâncare. Vei vedea exact ce aport
        aduce fiecare preparat pentru a atinge obiectivele tale nutriționale.
        Toate informațiile sunt clare și accesibile pentru o experiență de
        utilizator optimizată.
      </TypographyP>
    </>
  );
};

const GetStartedStepOne = () => {
  return (
    <>
      <TypographyP>
        Pagina de selecție a planului este primul pas important în călătoria ta
        către un stil de viață mai sănătos. Aici vei găsi toate planurile
        disponibile, fiecare adaptat pentru a răspunde nevoilor tale
        nutriționale și obiectivelor de fitness.
      </TypographyP>
      <TypographyP>
        Fiecare plan include o descriere detaliată, prețuri clare și obiective
        specifice, pentru a te ajuta să iei cea mai bună decizie. După ce alegi
        planul care ți se potrivește, îl poți selecta cu un simplu click.
      </TypographyP>
      <TypographyP>
        Alege planul ideal și începe să-ți atingi obiectivele de sănătate, fără
        stres!
      </TypographyP>
    </>
  );
};

const GetStartedStepTwo = () => {
  return (
    <>
      <TypographyP>
        Pasul 2 este esențial pentru personalizarea planului tău alimentar.
        Alege alergiile și preferințele dietetice pentru a-ți asigura mesele
        potrivite stilului tău de viață. Această selecție îți garantează
        siguranța și confortul, evitând ingrediente periculoase și adaptând
        planul la nevoile tale.
      </TypographyP>
      <TypographyP>
        De ce este important? Pentru că oferim un plan alimentar personalizat
        care respectă sănătatea și preferințele, economisind timp și
        îmbunătățind calitatea mesei utilizatorului!
      </TypographyP>
    </>
  );
};

const GetStartedStepThree = () => {
  return (
    <>
      <TypographyP>
        Pasul final este despre personalizarea livrării planului selectat.
        Utilizator alege adresa de livrare, zilele preferate pentru livrare și
        intervalele orare dorite (avem trei opțiuni pentru a oferi
        flexibilitate). În plus, se pot adăuga instrucțiuni speciale pentru
        livrare, astfel încât totul să fie pe placul clientului.
      </TypographyP>
      <TypographyP>
        La final, se poate vizualiza un rezumat al planului, asigurându-se că
        totul este exact cum dorești utilizatorul. Simplu, rapid și personalizat
        pentru confortul clientului!
      </TypographyP>
    </>
  );
};

const Dashboard = () => {
  return (
    <>
      <TypographyP>
        Dashboard-ul utilizatorului este locul unde totul devine clar și ușor de
        gestionat. Aici, utilizatorii pot urmări caloriile pentru ziua
        respectivă, având în vedere meniul selectat. Acesta oferă o imagine de
        ansamblu completă a fiecărei livrări, inclusiv informații despre
        abonament și livrările viitoare.
      </TypographyP>

      <TypographyP>
        <strong>Ce mai pot face utilizatorii?</strong> Monitorizează când va
        avea loc următoarea livrare, numărul de livrări săptămânale și, în cazul
        în care se răzgândesc, pot anula abonamentul oricând. Nu mai pierd
        timpul căutând informații - totul este la un click distanță.
      </TypographyP>

      <TypographyP>
        <strong>Informații complete pentru o zi perfectă:</strong> Utilizatorii
        pot verifica rapid ce feluri de mâncare și snack-uri sunt programate
        pentru ziua respectivă. Și, pentru a fi mereu pregătiți, pot vizualiza
        detalii despre livrările viitoare, incluzând ziua, data și numărul de
        feluri de mâncare disponibile.
      </TypographyP>
    </>
  );
};

const MVPUserPages: MVPPage[] = [
  {
    src: "/mvp-pages/user/profile.png",
    alt: "Profil",
    width: 1564,
    height: 587,
    description: <ProfileDescription />,
  },
  {
    src: "/mvp-pages/user/plans.png",
    alt: "Meniuri",
    width: 1564,
    height: 587,
    description: <Plans />,
  },
  {
    src: "/mvp-pages/user/plan-details.png",
    alt: "Detalii plan",
    width: 1263,
    height: 862,
    description: <PlanDetails />,
  },
  {
    src: "/mvp-pages/user/meal-details.png",
    alt: "Detalii masă",
    width: 1527,
    height: 800,
    description: <MealDetails />,
  },
  {
    src: "/mvp-pages/user/get-started-step1.png",
    alt: "Pasul 1 - Alege planul",
    width: 1564,
    height: 695,
    description: <GetStartedStepOne />,
  },
  {
    src: "/mvp-pages/user/get-started-step2.png",
    alt: "Pasul 2 - Alege preferințele",
    width: 1568,
    height: 400,
    description: <GetStartedStepTwo />,
  },
  {
    src: "/mvp-pages/user/get-started-step3.png",
    alt: "Pasul 3 - Alege livrarea",
    width: 1405,
    height: 837,
    description: <GetStartedStepThree />,
  },
  {
    src: "/mvp-pages/user/dashboard.png",
    alt: "Dashboard",
    width: 1406,
    height: 455,
    description: <Dashboard />,
  },
];

export default MVPUserPages;
