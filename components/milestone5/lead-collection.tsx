import { TypographyH3 } from "@/components/typography/TypographyH3";
import { TypographyP } from "@/components/typography/TypographyP";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function LeadCollection() {
  return (
    <div>
      <TypographyH3>
        Secțiunea de colectare a clienților potențiali
      </TypographyH3>
      <div className="text-justify space-y-2">
        <TypographyP>
          Colectarea informației de la potențialii utilizatorii a fost efectuată
          prin intermediul unui formular de tip newsletter. Aceste este{" "}
          <strong>Call to action-ul</strong> de pe pagina de landing. Formularul
          solicită completarea Numelui, Prenumelui, Email-ului din partea
          utilizatorilor, și optional, un mesaj, care poate conține sugestii,
          păreri, așteptări s.a.
        </TypographyP>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-2">
              <div className="relative aspect-square">
                <Image
                  src="/lead-collection/lead_1.jpg"
                  alt="Lead 1"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="w-full max-w-md">
            <CardContent className="p-2">
              <div className="relative aspect-square">
                <Image
                  src="/lead-collection/lead_2.jpg"
                  alt="Lead 2"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <TypographyP>
          Datele trimise în formular sunt salvate persistent într-un mediu de
          stocare{" "}
          <Link
            href={"https://www.mongodb.com/products/platform/cloud"}
            className={"underline underline-offset-2"}
          >
            MongoDB
          </Link>
          .
        </TypographyP>
      </div>
    </div>
  );
}
