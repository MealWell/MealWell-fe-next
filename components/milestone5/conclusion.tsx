import { TypographyH3 } from "@/components/typography/TypographyH3";
import { TypographyList } from "@/components/typography/TypographyList";
import { TypographyH4 } from "@/components/typography/TypographyH4";

export default function Conclusions() {
  return (
    <div>
      <TypographyH3>Concluzii bazate pe datele colectate</TypographyH3>
      <div className={"text-justify space-y-5"}>
        <TypographyH4>Funell de conversie</TypographyH4>
        <TypographyList>
          <li>
            <strong className="me-2 text-lg">Intrarea pe pagină</strong>
            <span>
              Din 89 de vizitatori ai landing page-ului, doar 21 au completat
              formularul, ceea ce indică o rată de conversie de 23.60%.
            </span>
          </li>
          <li>
            <strong className="me-2 text-lg">Abandonul:</strong>
            <span>
              Majoritatea vizitatorilor (68 din 89) au abandonat procesul
              înainte de a trimite formularul. Poate fi necesară optimizarea
              formularului sau a paginii pentru a încuraja mai mulți utilizatori
              să finalizeze înscrierea.
            </span>
          </li>
          <li>
            <strong className="me-2 text-lg">
              Timpul mediu de interacțiune:
            </strong>
            <span>
              Timpul median de interacțiune pe pagină este de 28 de secunde. Ar
              putea fi util să se investigheze dacă procesul de înscriere este
              prea lung sau dacă există obstacole tehnice.
            </span>
          </li>
        </TypographyList>
        <TypographyH4>
          Analiza vizitatorilor și comportamentului pe site
        </TypographyH4>
        <TypographyList>
          <li>
            <strong className="me-2 text-lg">Vizitatori și sesiuni:</strong>
            <span>
              În perioada analizată, au fost 93 de vizitatori și 128 de sesiuni,
              ceea ce înseamnă că aceștia au revenit la site de mai multe ori.
              Acest lucru sugerează un interes continuu, dar și o posibilă
              nevoie de a optimiza retention-ul.
            </span>
          </li>
          <li>
            <strong className="me-2 text-lg">Page views și bounce rate:</strong>
            <span>
              Au fost înregistrate 298 de vizualizări ale paginii și o rată de
              bounce de 39%, ceea ce este relativ scăzut, dar totuși indică că o
              parte din vizitatori nu interacționează suficient cu conținutul.
              Rata de bounce ar putea fi redusă prin îmbunătățirea conținutului
              vizual sau a mesajului CTA.
            </span>
          </li>
        </TypographyList>
        <TypographyH4>Performanța canalelor de promovare</TypographyH4>
        <TypographyList>
          <li>
            <strong className="me-2 text-lg">WhatsApp:</strong>
            <span>
              WhatsApp a fost canalul cel mai eficient pentru aducerea de
              vizitatori. De asemenea, WhatsApp a generat cele mai multe abonări
              la newsletter. Acesta s-a dovedit a fi cel mai activ și eficient
              canal, având un impact semnificativ asupra traficului și
              conversiilor.
            </span>
          </li>
          <li>
            <strong className="me-2 text-lg">Instagram:</strong>
            <span>
              Instagram a contribuit cu un număr de vizite constant. De
              asemenea, a generat 6 abonări, ceea ce sugerează o performanță
              solidă, dar cu un impact mai mic comparativ cu WhatsApp. Totuși,
              canalele de promovare pe whatsapp au avut un număr de membri mai
              mare decât abonații la profilurile noastre de Instagram.
            </span>
          </li>
          <li>
            <strong className="me-2 text-lg">Google și Facebook:</strong>
            <span>
              Promovarea nu a fost efectuată pe aceste canale, din cauza aceasta
              avem așa număr mic de clienți veniți de pe acestea, care provin
              din procesul de testare.
            </span>
          </li>
        </TypographyList>
      </div>
    </div>
  );
}
