import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TypographyH2 } from "@/components/typography/TypographyH2";
import Milestone1 from "@/components/milestone1/Milestone1";
import Milestone2 from "@/components/milestone2/Milestone2";
import Milestone3 from "@/components/milestone3/Milestone3";
import Milestone4 from "@/components/milestone4/Milestone4";
import { logEventServer, PostHogEventType } from "@/lib/posthog";

const milestones = [
  {
    id: "m1",
    title: "Milestone 1",
    content: Milestone1,
  },
  {
    id: "m2",
    title: "Milestone 2",
    content: Milestone2,
  },
  {
    id: "m3",
    title: "Milestone 3",
    content: Milestone3,
  },
  {
    id: "m4",
    title: "Milestone 4",
    content: Milestone4,
  },
];

export default function Fiki() {
  logEventServer({
    eventType: PostHogEventType.PAGE_VIEWED,
    path: "landing",
  });
  return (
    <Accordion type="multiple" className="w-3/4 mb-4">
      {milestones.map((milestone) => (
        <AccordionItem key={milestone.id} value={milestone.id}>
          <AccordionTrigger className="flex hover:no-underline">
            <TypographyH2>{milestone.title}</TypographyH2>
          </AccordionTrigger>
          <AccordionContent>
            <milestone.content />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
