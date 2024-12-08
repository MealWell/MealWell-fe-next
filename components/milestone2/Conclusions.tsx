import React from "react";
import { TypographyH3 } from "../typography/TypographyH3";
import { TypographyP } from "../typography/TypographyP";

function Conclusions() {
  return (
    <div>
      <TypographyH3>Concluziile obținute</TypographyH3>
      <div className="text-justify space-y-2">
        <TypographyP>
          În urma discuțiilor cu potențialii clienți, am identificat categoriile
          principale de utilizatori ai aplicației noastre și anume{" "}
          <strong>studenții și angajații</strong> iar motivele principale pentru
          care aceștia ar folosi aplicația noastră sunt{" "}
          <strong>
            programul foarte încărcat, lipsa diversității în alimentație,
            dificultatea de a menține o alimentație echilibrată
          </strong>{" "}
          sau{" "}
          <strong>
            prețurile exagerate ale restaurantelor și aplicațiilor de livrări
          </strong>
          .
        </TypographyP>
      </div>
    </div>
  );
}

export default Conclusions;
