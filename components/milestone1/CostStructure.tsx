import { TypographyH3 } from "@/components/typography/TypographyH3";
import { TypographyList } from "@/components/typography/TypographyList";

const CostStructure = () => {
  return (
    <div className="mt-5">
      <TypographyH3>Costuri preconizate</TypographyH3>
      <div className="text-justify">
        <TypographyList>
          <li>
            <strong>Costuri de Aprovizionare și Ingrediente</strong>
            <br />
            <span>
              Achiziția de materii prime, ingrediente proaspete și materiale de
              ambalare.
            </span>
          </li>
          <li>
            <strong>Costuri de Preparare</strong>
            <br />
            <span>
              Costurile cu forța de muncă pentru bucătari și personalul din
              bucătărie, echipamente de gătit, și mentenanță.
            </span>
          </li>
          <li>
            <strong>Costuri de Livrare și Logistică</strong>
            <br />
            <span>
              Transport, ambalaje termice pentru menținerea prospețimii,
              combustibil, salarii pentru șoferi sau costurile de colaborare cu
              servicii de livrare.
            </span>
          </li>
          <li>
            <strong>Costuri Tehnologice</strong>
            <br />
            <span>
              Dezvoltarea și mentenanța site-ului și a aplicațiilor, hosting,
              integrarea cu metode de plată, funcționalități de personalizare a
              meniului și optimizări UI/UX.
            </span>
          </li>
          <li>
            <strong>Costuri de Marketing și Publicitate</strong>
            <br />
            <span>
              Campanii de marketing digital, SEO, conținut social media,
              promovări și discounturi, materiale de branding și influenceri.
            </span>
          </li>
        </TypographyList>
      </div>
    </div>
  );
};

export default CostStructure;
