import "tailwindcss/tailwind.css";
import { TypographyH3 } from "@/components/typography/TypographyH3";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ResponsiveCarouselControls from "@/components/ui/responsive-carousel-controls";
import Image from "next/image";

const results = [
  "/form-results/Q1.png",
  "/form-results/Q2.png",
  "/form-results/Q3.png",
  "/form-results/Q4.png",
  "/form-results/Q5.png",
  "/form-results/Q6.png",
  "/form-results/Q7.png",
  "/form-results/Q8.png",
];

export default function FormResults() {
  return (
    <div>
      <TypographyH3>Rezultate</TypographyH3>
      <div className="flex flex-col items-center px-6 xl:px-16">
        <Carousel
          className="max-w-full w-[85%] xl:w-full"
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {results.map((result, index) => (
              <CarouselItem
                key={index}
                className="flex xl:h-[32rem] items-center justify-center w-full xl:basis-1/2"
              >
                <Image
                  width={1146}
                  height={634}
                  src={result}
                  alt={`result-Q${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <ResponsiveCarouselControls />
        </Carousel>
      </div>
    </div>
  );
}
