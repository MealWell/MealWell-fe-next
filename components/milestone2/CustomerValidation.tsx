import React from "react";
import { TypographyH3 } from "../typography/TypographyH3";
import { TypographyP } from "../typography/TypographyP";

function CustomerValidation() {
  return (
    <div>
      <TypographyH3>Validare</TypographyH3>
      <div className="text-justify space-y-2">
        <TypographyP>
          Considerăm că informațiile obținute din discuțiile cu potențialii
          clienți ne-au oferit o imagine clară asupra nevoilor și preferințelor
          lor. În următoarele etape vom căuta validare din partea clienților
          asupra soluției noastre, pentru a ne asigura că aceasta răspunde cu
          adevărat nevoilor lor. Vom construi aplicația urmând feedback-ul
          primit și vom testa produsul pe un grup inițial mai restrâns de
          utilizatori pentru a ne asigura că funcționalitățile sunt intuitive și
          ușor de folosit. Toate acestea ar trebui sa ne asigure o lansare cu
          succes a produsului nostru.
        </TypographyP>
      </div>
    </div>
  );
}

export default CustomerValidation;
