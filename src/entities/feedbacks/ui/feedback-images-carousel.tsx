'use client';
import { useState } from 'react';
import Image from 'next/image';

import type { Media } from '@/shared/model/types/types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';

export function FeedbackImagesCarousel({ images, alt }: { images: Media[]; alt: string }) {
  const [startIndex, setStartIndex] = useState(0);

  return (
    <Dialog>
      {images.map((image, index) => (
        <DialogTrigger
          key={image.id}
          render={
            <button type="button" className="cursor-pointer" onClick={() => setStartIndex(index)}>
              <Image
                alt={`${alt}-${index + 1}`}
                blurDataURL={image.blurDataUrl}
                className="size-32 w-full object-cover"
                height={128}
                placeholder="blur"
                src={image.url}
                width={128}
              />
            </button>
          }
        />
      ))}

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
