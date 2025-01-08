import { MVPPage } from "@/const/types";
import { TypographyList } from "../../typography/TypographyList";
import { TypographyP } from "../../typography/TypographyP";

const DashboardDescription = () => {
  return (
    <>
      <TypographyP>
        Dashboard-ul Admin din MVP-ul MealWell oferă toate funcționalitățile
        esențiale pentru o administrare rapidă și intuitivă a utilizatorilor:
      </TypographyP>
      <TypographyList>
        <li>
          <strong>Vizualizare utilizatori:</strong> email, nume, rol, status
          (banat/activ).
        </li>
        <li>
          <strong>Acțiuni rapide:</strong> ștergere cont, revocare sesiuni,
          banare, modificare rol.
        </li>
        <li>
          <strong>Creare utilizator:</strong> adaugă rapid noi utilizatori cu
          email, nume și rol.
        </li>
      </TypographyList>
      <TypographyP>
        Simplu, eficient și pregătit pentru a asigura control complet asupra
        platformei.
      </TypographyP>
    </>
  );
};

const MVPAdminPages: MVPPage[] = [
  {
    src: "/mvp-pages/admin/dashboard.png",
    alt: "Dashboard",
    width: 1545,
    height: 455,
    description: <DashboardDescription />,
  },
];

export default MVPAdminPages;
