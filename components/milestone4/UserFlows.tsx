"use client";

import { TypographyH3 } from "@/components/typography/TypographyH3";
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

const flows = [
  {
    src: "user-flows/user_flow_new_subscription.jpg",
    alt: "New subscription user flow",
    description: "User flow pentru crearea unui nou abonament.",
  },
  {
    src: "user-flows/user_flow_manage_active_subscriptions.jpg",
    alt: "Manage active subscriptions user flow",
    description: "User flow pentru gestionarea abonamentelor active.",
  },
];

const UserFlows = () => {
  return (
    <div>
      <TypographyH3>User Flows</TypographyH3>
      <UserFlowCarousel />
    </div>
  );
};

const UserFlowCarousel = () => {
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
            {flows.map((flow, index) => (
              <CarouselItem key={index}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer">
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img
                          src={flow.src}
                          alt={flow.alt}
                          className="object-contain w-full h-full"
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
                      <img
                        src={flow.src}
                        alt={flow.alt}
                        className="object-contain w-full h-full"
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
      <div className="mt-4 text-center p-4 bg-gray-100 rounded-md">
        <p>{flows[currentIndex].description}</p>
      </div>
    </div>
  );
};

export default UserFlows;
