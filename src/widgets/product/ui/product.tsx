import type { ComponentProps, ReactNode } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';

import type { ProductType } from '@/entities/products/model';
import { cn } from '@/shared/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel';
import { Price } from '@/shared/ui/price';

export function Product({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn('container my-4 grid grid-cols-1 gap-4 lg:grid-cols-2', className)} />;
}

export function ProductPrice({ product }: { product: ProductType }) {
  return <Price className="items-end" discount={product.discount} price={product.price} size="lg" />;
}

export function ProductInfo({ product }: { product: ProductType }) {
  return (
    <div className="prose dark:prose-invert flex flex-col px-4">
      <h1>
        <span className="font-bold text-5xl">{product.baseTitle}</span>
        <br />
        <span className="font-md font-normal">{product.title}</span>
      </h1>
      <h3>{product.category.name}</h3>
      <RichText data={product.baseDescription} />
    </div>
  );
}

export function ProductRightSide({ children }: { children: ReactNode }) {
  return <aside className="flex w-full flex-col gap-8 px-4">{children}</aside>;
}

export function ProductImagesCarousel({ images, alt }: { images: ProductType['images']; alt: string }) {
  return (
    <section>
      <Carousel>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image.url}>
              <Image
                alt={`${alt}-${index + 1}`}
                blurDataURL={image.blurDataUrl}
                className="h-80vh w-full object-cover supports-[height:80dvh]:h-[80dvh]"
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
    </section>
  );
}
