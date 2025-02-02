"use client";

import { TypographyH3 } from "@/components/typography/TypographyH3";
import React, { useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import ResponsiveCarouselControls from "@/components/ui/responsive-carousel-controls";
import Image from "next/image";

const postedContent = [
  {
    src: "/posted-content/mesaj_1_whatsapp.jpg",
    alt: "Whatsapp message 1",
    description: "Mesaj trimis în grupul colegilor de muncă",
  },
  {
    src: "/posted-content/mesaj_2_telegram.jpg",
    alt: "Telegram message",
    description: "Mesaj trimis pe un grup Telegram al unei localități",
  },
  {
    src: "/posted-content/mesaj_3_whatsapp.jpg",
    alt: "Whatsapp message, faculty group",
    description: "Mesaj trimis pe grupul specialității MTI, Master",
  },
  {
    src: "/posted-content/mesaj_4_whatsapp.jpg",
    alt: "Whatsapp message, faculty group",
    description:
      "Numărul de membri ai grupului în care a fost trimis mesajul anterior (129)",
  },
  {
    src: "/posted-content/mesaj_5_whatsapp.jpg",
    alt: "Whatsapp message group",
    description: "Mesaj trimis pe grupul căminului",
  },
  {
    src: "/posted-content/mesaj_6_whatsapp.jpg",
    alt: "Whatsapp message group",
    description:
      "Numărul de membri ai grupului în care a fost trimis mesajul anterior (571)",
  },
  {
    src: "/posted-content/story_1_instagram.jpg",
    alt: "Instagram story post",
    description: "Postare de tip story pentru promovare MealWell",
  },
  {
    src: "/posted-content/story_2_instagram.jpg",
    alt: "Instagram story post",
    description:
      "Numărul de vizualizări ai story-ului cu promovare MealWell (74)",
  },
];

const PostedContent = () => {
  return (
    <div>
      <TypographyH3>Conținutul Postat pentru promovare</TypographyH3>
      <PostedContentCarousel />
    </div>
  );
};

const PostedContentCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<EmblaCarouselType>();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="relative">
        <Carousel className="relative" setApi={setApi}>
          <CarouselContent>
            {postedContent.map((content, index) => (
              <CarouselItem key={index}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer">
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image
                          src={content.src}
                          alt={content.alt}
                          height={500}
                          width={500}
                          className={"object-contain w-full h-full"}
                        />
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className={"max-w-[90%] max-h-[90%] p-0"}>
                    <DialogTitle className={"sr-only"}>Flow</DialogTitle>
                    <DialogDescription className={"sr-only"}>
                      Flow
                    </DialogDescription>
                    <div className={"max-w-[90vw] max-h-[90vh] p-0"}>
                      <Image
                        src={content.src}
                        alt={content.alt}
                        height={500}
                        width={500}
                        className={"object-contain w-full h-full"}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
          <ResponsiveCarouselControls />
        </Carousel>
      </div>
      <div className="mt-4 text-center p-4 bg-accent rounded-md">
        <p>{postedContent[currentIndex].description}</p>
      </div>
    </div>
  );
};

export default PostedContent;
