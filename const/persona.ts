export interface Persona {
  name: string;
  avatar: string;
  details: {
    age: number;
    location: string;
    occupation: string;
    lifestyle: string;
    hobbies: string[];
  };
  motivations: string[];
  behaviors: string[];
  needs: string[];
}
export interface Story {
  id: number;
  title: string;
  as_a: string;
  i_want: string;
  so_that: string;
}

export const personas: { persona: Persona; stories: Story[] }[] = [
  {
    persona: {
      name: "Alex Popescu",
      avatar: "./personas/persona.jpg",
      details: {
        age: 27,
        location: "Bucharest, Romania",
        occupation: "Angajat Corporatist",
        lifestyle: "Profesionist ocupat cu puțin timp liber",
        hobbies: ["Fitness", "Gătit Sănătos"],
      },
      motivations: [
        "Își dorește să mențină un stil de viață sănătos, în ciuda programului încărcat",
        "Caută opțiuni convenabile de mese care să se alinieze obiectivelor de fitness",
        "Preferă să economisească timp cu planificarea și pregătirea meselor",
      ],
      behaviors: [
        "Folosește aplicații pentru confort și economisire de timp",
        "Caută informații nutriționale clare",
        "Preferă planuri de abonament flexibile",
      ],
      needs: [
        "Planuri de mese personalizate, adaptate obiectivelor de fitness",
        "Livrare la domiciliu a meselor sănătoase, gata de consum",
        "Interfață prietenoasă în aplicație pentru gestionarea abonamentelor",
      ],
    },
    stories: [
      {
        id: 1,
        title: "Abonare la un plan săptămânal de mese",
        as_a: "profesionist ocupat",
        i_want:
          "să mă abonez la un plan săptămânal de mese adaptat obiectivelor mele de fitness",
        so_that:
          "să economisesc timp și să mănânc sănătos fără să-mi compromit programul",
      },
      {
        id: 2,
        title: "Personalizează preferințele pentru mese",
        as_a: "utilizator cu nevoi dietetice specifice",
        i_want:
          "să exclud ingredientele la care sunt alergic sau care nu îmi plac",
        so_that:
          "să mă bucur de mese potrivite gusturilor și cerințelor mele de sănătate",
      },
      {
        id: 3,
        title: "Monitorizează aportul nutrițional",
        as_a: "individ preocupat de sănătate",
        i_want: "să văd detaliile nutriționale ale meselor din abonamentul meu",
        so_that: "să pot monitoriza eficient aportul caloric și de nutrienți",
      },
      {
        id: 4,
        title: "Pune pe pauză sau modifică abonamentele",
        as_a: "utilizator flexibil",
        i_want:
          "să pot întrerupe sau modifica abonamentul pentru anumite săptămâni",
        so_that: "să adaptez serviciul în funcție de programul meu",
      },
    ],
  },
];
