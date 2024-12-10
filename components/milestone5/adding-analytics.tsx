import { TypographyH3 } from "@/components/typography/TypographyH3";
import { TypographyP } from "@/components/typography/TypographyP";
import Link from "next/link";
import { TypographyList } from "@/components/typography/TypographyList";

export default function AddingAnalytics() {
  return (
    <div>
      <TypographyH3>Adăugarea de analytics pe landing page</TypographyH3>
      <div className="text-justify space-y-2">
        <TypographyP>
          Pentru analiza comportamentului utilizatorilor am utilizat{" "}
          <Link
            href={"https://posthog.com/"}
            className={"underline underline-offset-4"}
          >
            Posthog
          </Link>
          .
        </TypographyP>
        <TypographyP>Metode de analiză utilizate:</TypographyP>
        <TypographyList>
          <li>
            <strong className="me-2 text-lg">
              Web Analytics
              <br />
            </strong>
            <span>
              Include metrici precum numărul de vizitatori unici, paginile
              vizitate, rata de abandon (bounce rate), timpul petrecut pe site
              și distribuția traficului în funcție de dispozitive și locații
              geografice.
            </span>
          </li>
          <li>
            <strong className="me-2 text-lg">
              Product Analytics
              <br />
            </strong>
            <span>
              Product analytics se concentrează pe analiza comportamentului
              utilizatorilor în raport cu acțiunile cheie definite pe landing
              page. În acest context, funnel-ul de conversie urmărește pașii pe
              care utilizatorii îi fac de la vizitarea paginii până la
              completarea Call-to-Action-ului (CTA), care este înscrierea la
              newsletter.
              <br />
            </span>
            <strong className="me-2">Insight despre sursa traficului:</strong>
            <span>
              Analizele includ identificarea canalelor sursă (de exemplu,
              Facebook, Reddit, organic) și performanța fiecăruia în generarea
              de conversii.
            </span>
          </li>
          <li>
            <strong className="me-2 text-lg">
              Session replay
              <br />
            </strong>
            <span>
              Session replay oferă o redare detaliată a sesiunilor
              utilizatorilor pe landing page, inclusiv click-uri, mișcări de
              mouse și interacțiuni. Cu ajutorul Posthog, se poate vizualiza
              consola browserului pentru a identifica erorile și blocajele
              tehnice care afectează experiența utilizatorilor.
              <br />
            </span>
            <strong className="me-2">Astfel:</strong>
            <span>
              am identificat problemele și confuziile care au apărut în timpul
              interacțiunii utilizatorilor cu pagina. Acestea au inclus erori de
              afișare, formularul care nu funcționa corect la început, secțiuni
              care nu erau suficient de clare.
            </span>
          </li>
        </TypographyList>
      </div>
    </div>
  );
}
