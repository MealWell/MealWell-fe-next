import Member from "./Member";
import { TypographyH3 } from "@/components/typography/TypographyH3";

export interface MemberInfo {
  name: string;
  role: string;
  description: string;
  img: string;
}

const membersInfo: MemberInfo[] = [
  {
    name: "Codreanu Dan",
    role: "CEO",
    description:
      "Dan Codreanu este liderul echipei și CEO, având o experiență de 3 ani ca Backend Developer la ATTA Systems. Cu o viziune strategică solidă și abilități tehnice excelente, Dan coordonează direcția echipei, asigurând o dezvoltare sustenabilă și inovativă a proiectelor.",
    img: "./members/dan.jpeg",
  },
  {
    name: "Patrasc Eduardo",
    role: "CTO",
    description:
      "Eduardo Patrasc este CTO-ul echipei, cu 3 ani de experiență la Deutsche Bank, unde a lucrat ca Backend Developer și Observability Engineer. Eduardo se ocupă de arhitectura tehnică și optimizarea performanței, asigurând stabilitatea și eficiența infrastructurii software.",
    img: "./members/edi.jpeg",
  },
  {
    name: "Dionisie Rusu",
    role: "Developer",
    description:
      "Denis Rusu este Fullstack Developer cu 2 ani de experiență la GlobalSoftwareSystems. Este implicat activ în dezvoltarea atât a frontend-ului, cât și a backend-ului proiectelor, aducând flexibilitate și expertiză tehnică echipei.",
    img: "./members/denis.jpeg",
  },
  {
    name: "Ionel Catruc",
    role: "Developer",
    description:
      "Ionel Catruc este Fullstack Developer cu o experiență de 2 ani la GlobalSoftwareSystems. Contribuie la dezvoltarea aplicațiilor printr-o abordare tehnică detaliată și colaborativă, optimizând experiența utilizatorului și funcționalitatea aplicațiilor.",
    img: "./members/ionel.jpeg",
  },
  {
    name: "Alexandru Cauia",
    role: "Developer",
    description:
      "Alexandru Cauia, Fullstack Developer cu 2 ani de experiență la GlobalSoftwareSystems, joacă un rol esențial în dezvoltarea și implementarea de funcționalități complexe, având abilități tehnice versatile pentru a îmbunătăți calitatea și performanța aplicațiilor.",
    img: "./members/alex.jpg",
  },
  {
    name: "Mihai Catalin Volintiru",
    role: "DevOps, Security Engineer",
    description:
      "Mihai Catalin Volintiru este DevOps și Security Engineer cu 2 ani de experiență. Este responsabil pentru securitatea și stabilitatea infrastructurii, implementând soluții de DevOps care asigură protecția și performanța proiectelor software ale echipei.",
    img: "./members/voli.jpeg",
  },
];

const Members = () => {
  return (
    <div>
      <TypographyH3>Membrii echipei</TypographyH3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
        {membersInfo.map((member) => {
          return <Member key={member.name} member={member} />;
        })}
      </div>
    </div>
  );
};

export default Members;
