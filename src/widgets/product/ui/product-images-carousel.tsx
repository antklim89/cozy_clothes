'use client';
import { useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import Image from 'next/image';

import type { Media } from '@/shared/model/types/types';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';

export function ProductImagesCarousel({ images, alt }: { images: Media[]; alt: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const listener = (e: EmblaCarouselType) => setStartIndex(e.selectedScrollSnap());
    api?.on('select', listener);
    return () => void api?.off('select', listener);
  }, [api]);

  return (
    <Dialog>
      <Carousel setApi={setApi}>
        <DialogTrigger
          render={
            <button type="button" className="cursor-pointer">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={image.url}>
                    <Image
                      alt={`${alt}-${index + 1}`}
                      blurDataURL={image.blurDataUrl}
                      className="h-full max-h-[640px] w-full object-cover"
                      height={640}
                      placeholder="blur"
                      src={image.url}
                      width={320}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </button>
          }
        />

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <DialogContent className="overflow-hidden p-0">
        <Carousel opts={{ startIndex }}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={image.url}>
                <Image
                  alt={`${alt}-${index + 1}`}
                  blurDataURL={image.blurDataUrl}
                  className="h-[90vh] w-full object-contain supports-[height:90dvh]:h-[90dvh]"
                  height={image.height}
                  placeholder="blur"
                  src={image.url}
                  width={image.width}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
