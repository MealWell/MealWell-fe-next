import { TypographyH4 } from "@/components/typography/TypographyH4";
import { TypographyList } from "@/components/typography/TypographyList";
import { TypographyP } from "@/components/typography/TypographyP";
import { MVPPage } from "@/const/types";

const ManagementPageDescription = () => {
  return (
    <TypographyP>
      Pagina dedicată nutriționiștilor din MealWell oferă un hub centralizat
      pentru administrarea și personalizarea planurilor de alimentație.
      Structurată pe categorii clare, această pagină facilitează crearea,
      organizarea și publicarea planurilor alimentare adaptate nevoilor fiecărui
      utilizator.
    </TypographyP>
  );
};

const IngredientsPageDescription = () => {
  return (
    <>
      <TypographyP>
        Ingredientele stau la baza oricărui plan alimentar bine structurat.
        Sistemul nostru de gestionare a ingredientelor oferă nutriționiștilor
        toate uneltele necesare pentru a organiza și personaliza informațiile
        esențiale.
      </TypographyP>
      <TypographyList>
        <li>
          <strong>Grilă informativă:</strong> Vizualizează ingredientele cu
          detalii despre calorii, proteine, grăsimi, carbohidrați și alte
          informații nutriționale.
        </li>
        <li>
          <strong>Acțiuni rapide:</strong> Editează, vizualizează sau șterge
          ingrediente direct din interfață, pentru o administrare eficientă.
        </li>
        <li>
          <strong>Creare ingredient nou:</strong> Adaugă informații detaliate,
          inclusiv calorii, macronutrienți, fibre, zahăr, sodiu, alergeni și
          preferințe alimentare.
        </li>
      </TypographyList>
      <TypographyP>
        Simplifică procesul de administrare a ingredientelor, oferind
        utilizatorilor finali mese sigure, sănătoase și adaptate nevoilor lor
        individuale.
      </TypographyP>
    </>
  );
};

const AllergensManagement = () => {
  return (
    <>
      <TypographyP>
        Siguranța alimentară este prioritatea noastră principală. Sistemul de
        gestionare a alergenilor permite identificarea și administrarea acestora
        pentru a garanta că planurile și mesele oferite sunt adaptate nevoilor
        fiecărui client.
      </TypographyP>
      <TypographyList>
        <li>
          <strong>Informații clare:</strong> Fiecare alergen include un nume și
          o descriere detaliată pentru o identificare ușoară.
        </li>
        <li>
          <strong>Acțiuni esențiale:</strong> Editează sau șterge alergenii din
          baza de date, păstrând informațiile mereu actualizate.
        </li>
        <li>
          <strong>Siguranță integrată:</strong> Planurile alimentare și mesele
          sunt verificate automat pentru a exclude alergenii specificați de
          utilizatori.
        </li>
      </TypographyList>
      <TypographyP>
        Cu acest sistem, ne asigurăm că fiecare client primește doar opțiuni
        sigure și personalizate, eliminând riscul de reacții alergice.
      </TypographyP>
    </>
  );
};

const MealManagement = () => {
  return (
    <>
      <TypographyP>
        Modulul de gestionare a meselor este proiectat pentru a ajuta
        nutriționiștii să creeze rapid mese care respectă atât nevoile
        nutriționale, cât și preferințele utilizatorilor. Fiecare masă poate fi
        complet personalizată, de la ingrediente la calcule automate.
      </TypographyP>
      <TypographyP>
        Fiecare masă începe cu detalii de bază: un <strong>nume</strong>, o{" "}
        <strong>descriere</strong> și alegerea tipului (mic dejun, gustare,
        prânz, cină). După ce acestea sunt definite, poți adăuga ingrediente din
        lista existentă, specificând cantitatea. Sistemul analizează
        ingredientele selectate pentru a calcula automat valorile nutriționale
        complete: calorii, proteine, grăsimi, carbohidrați, fibre, zaharuri și
        sodiu.
      </TypographyP>
      <TypographyP>
        Un alt aspect esențial al acestui modul este verificarea automată a
        alergenilor și preferințelor dietetice. În acest fel, ne asigurăm că
        mesele sunt sigure și respectă cerințele individuale ale utilizatorilor.
      </TypographyP>
      <TypographyP>
        Rezultatul? Mese sănătoase și echilibrate, pregătite în câteva minute,
        fără compromisuri asupra siguranței sau calității. Totul este optimizat
        pentru a economisi timp și pentru a oferi o experiență profesională
        utilizatorilor aplicației.
      </TypographyP>
    </>
  );
};

const PlanManagement = () => {
  return (
    <>
      <TypographyP>
        Transformă alimentația sănătoasă într-un serviciu complet personalizat!
        Cu modulul nostru de gestionare a planurilor, poți construi oferte
        adaptate fiecărui utilizator. Acesta îți permite să adaugi:
      </TypographyP>

      <TypographyList>
        <li>
          <strong>Nume și descriere atractivă</strong> pentru fiecare plan
        </li>
        <li>
          <strong>Obiectiv principal</strong> (slăbire, menținere, masă
          musculară etc.)
        </li>
        <li>
          <strong>Lista meselor</strong> incluse în plan, alături de detaliile
          lor nutriționale
        </li>
        <li>
          <strong>Funcții cheie</strong> care fac planul unic
        </li>
      </TypographyList>

      <TypographyP>
        După ce creezi planul, acesta este vizibil într-un tabel interactiv, iar
        tu vei putea analiza rapid detalii importante precum:
      </TypographyP>

      <TypographyList>
        <li>
          <strong>Denumiți planul și descrierea acestuia</strong>
        </li>
        <li>
          <strong>Obiectivul principal</strong>
        </li>
        <li>
          <strong>Prețul lunar al planului</strong>
        </li>
        <li>
          <strong>Statusul planului</strong> (activ/inactiv)
        </li>
      </TypographyList>

      <TypographyH4>Funcții Esențiale</TypographyH4>
      <TypographyList>
        <li>
          <strong>Publicare rapidă:</strong> Fă planul vizibil utilizatorilor cu
          un singur click.
        </li>
        <li>
          <strong>Flexibilitate totală:</strong> Poți dezactiva un plan, edita
          detaliile, actualiza prețul sau chiar șterge planul.
        </li>
        <li>
          <strong>Vizualizare detaliată:</strong> Analizează structura completă
          a planului, cu toate informațiile despre mese și funcții.
        </li>
      </TypographyList>

      <TypographyP>
        Modulul nostru este gândit pentru a fi eficient și simplu de utilizat,
        dar suficient de puternic pentru a crea cele mai complexe planuri.
        Publicarea unui plan devine astfel un pas natural în procesul de oferire
        a soluțiilor nutriționale de calitate.
      </TypographyP>
    </>
  );
};

const MVPNutritionistPages: MVPPage[] = [
  {
    src: "/mvp-pages/nutritionist/nutritionist-management.png",
    alt: "Pagina principală pentru gestionarea planurilor alimentare",
    width: 1555,
    height: 665,
    description: <ManagementPageDescription />,
  },
  {
    src: "/mvp-pages/nutritionist/ingredients-management.png",
    alt: "Gestionarea ingredientelor",
    width: 1506,
    height: 932,
    description: <IngredientsPageDescription />,
  },
  {
    src: "/mvp-pages/nutritionist/allergens-management.png",
    alt: "Gestionarea alergenilor",
    width: 1578,
    height: 608,
    description: <AllergensManagement />,
  },
  {
    src: "/mvp-pages/nutritionist/meal-create.png",
    alt: "Gestionarea meselor",
    width: 1588,
    height: 869,
    description: <MealManagement />,
  },
  {
    src: "/mvp-pages/nutritionist/plans-management.png",
    alt: "Gestionarea planurilor alimentare",
    width: 1582,
    height: 877,
    description: <PlanManagement />,
  },
];

export default MVPNutritionistPages;
