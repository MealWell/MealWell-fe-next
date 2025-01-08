"use client";

import { useEffect, useState } from "react";
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
import { TypographyH4 } from "../typography/TypographyH4";
import { MVPPage } from "@/const/types";

interface MVPPagesCarouselProps {
  pages: MVPPage[];
}

const MVPPagesCarousel: React.FC<MVPPagesCarouselProps> = ({ pages }) => {
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
    <div className="w-full px-4">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Carousel className="relative" setApi={setApi}>
            <CarouselContent>
              {pages.map((page, index) => (
                <CarouselItem key={index}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer">
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <Image
                            src={page.src}
                            alt={page.alt}
                            className="object-contain w-full h-full"
                            width={page.width}
                            height={page.height}
                          />
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className={"max-w-[90%] max-h-[90%] p-0"}>
                      <DialogTitle className={"sr-only"}>Page</DialogTitle>
                      <DialogDescription className={"sr-only"}>
                        Page
                      </DialogDescription>
                      <div className={"max-w-[90vw] max-h-[90vh] p-0"}>
                        <Image
                          src={page.src}
                          alt={page.alt}
                          className="object-contain w-full h-full"
                          width={page.width}
                          height={page.height}
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
      </div>
      <div className="mt-4 p-4 space-y-2 bg-accent rounded-md">
        <TypographyH4>{pages[currentIndex].alt}</TypographyH4>
        {pages[currentIndex].description}
      </div>
    </div>
  );
};

export default MVPPagesCarousel;
