import Persona from "./Persona";
import { personas } from "@/const/persona";
import { TypographyH3 } from "@/components/typography/TypographyH3";

const Personas = () => {
  return (
    <div>
      <TypographyH3>User Persona</TypographyH3>
      <div className="space-y-4">
        {personas.map((obj, index) => (
          <Persona key={index} persona={obj.persona} stories={obj.stories} />
        ))}
      </div>
    </div>
  );
};

export default Personas;
