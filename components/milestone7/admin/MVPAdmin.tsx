"use client";

import { TypographyH4 } from "../../typography/TypographyH4";
import MVPAdminPages from "./MVPAdminPages";
import MVPPagesCarousel from "../MVPPagesCarousel";

const MVPAdmin = () => {
  return (
    <div>
      <TypographyH4>Admin</TypographyH4>
      <MVPPagesCarousel pages={MVPAdminPages} />
    </div>
  );
};

export default MVPAdmin;
