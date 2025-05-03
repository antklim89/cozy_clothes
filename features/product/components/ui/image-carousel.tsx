import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { ProductType } from '../../types';


interface Props {
  images: ProductType['images'];
  alt: string;
}


export function ImageCarousel({ images, alt }: Props) {
  return (
    <Carousel>
      <CarouselContent>
        {images.map(image => (
          <CarouselItem key={image.url}>
            <Image
              alt={alt}
              blurDataURL={image.blurDataUrl}
              className="object-cover w-full supports-[height:80dvh]:h-[80dvh] h-80vh"
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
  );
}

