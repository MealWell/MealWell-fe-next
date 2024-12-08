import { TypographyH3 } from "@/components/typography/TypographyH3";
import { TypographyP } from "@/components/typography/TypographyP";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div>
      <TypographyH3>Landing page</TypographyH3>
      <div className="text-justify space-y-2">
        <TypographyP>
          Vizualizează landing page-ul nostru:{" "}
          {
            <Button asChild variant={"outline"}>
              <Link href={`/`}>Landing page</Link>
            </Button>
          }
        </TypographyP>
      </div>
    </div>
  );
};

export default LandingPage;
