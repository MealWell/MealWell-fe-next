import { TypographyP } from "@/components/typography/TypographyP";
import { TypographyH3 } from "@/components/typography/TypographyH3";
import { TypographyList } from "@/components/typography/TypographyList";

export default function LeadCampaign() {
  return (
    <div>
      <TypographyH3>Campania de generare de lead-uri</TypographyH3>
      <div className={"text-justify space-y-5"}>
        <TypographyP>
          Următoarele canale de promovare au fost folosite:
        </TypographyP>
        <TypographyList>
          <li>
            <strong className="me-2 text-lg">
              WhatsApp
              <br />
            </strong>
            <span>
              Am trimis un mesaj de promovare către grupuri relevante de pe
              WhatsApp, care includ studenți, colegi de muncă și locatari din
              cămine. Mesajul a inclus o scurtă descriere a aplicației și o
              invitație de a vizita landing page-ul. Am observat un număr foarte
              mare de vizitatori provenind din aceste grupuri.
            </span>
          </li>
          <li>
            <strong className="me-2 text-lg">
              Instagram
              <br />
            </strong>
            <span>
              Am realizat o postare de tip Story pentru urmăritorii paginilor
              personale, conținând o scurtă descriere a aplicației și un
              call-to-action pentru a accesa landing page-ul. Am observat o
              creștere vizibilă a traficului din partea utilizatorilor de
              Instagram în intervalul de timp în care Story-ul a fost activ.
            </span>
          </li>
          <li>
            <strong className="me-2 text-lg">
              Telegram
              <br />
            </strong>
            <span>
              Am distribuit un mesaj de promovare în grupuri de Telegram din
              localitățile noastre. Acest mesaj a fost similar cu cel folosit pe
              WhatsApp. Telegram a adus un număr mai mic de vizitatori
              comparativ cu WhatsApp, dar a fost eficient pentru a extinde
              reach-ul campaniei.
            </span>
          </li>
        </TypographyList>
      </div>
    </div>
  );
}
