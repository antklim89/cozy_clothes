import type { ComponentProps, ReactNode } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';

import type { ProductType } from '@/entities/products/model';
import { AddToCartButton } from '@/features/update-cart/ui';
import { cn } from '@/shared/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel';
import { Price } from '@/shared/ui/price';
import { ProductsVariantsSelect } from './products-variants-select';

export function Product({
  product,
  favoriteButtonSlot,
  className,
  ...props
}: {
  product: ProductType;
  favoriteButtonSlot: ReactNode;
} & ComponentProps<'div'>) {
  return (
    <div {...props} className={cn('container my-4 grid grid-cols-1 gap-4 lg:grid-cols-2', className)}>
      <section>
        <section>
          <Carousel>
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={image.url}>
                  <Image
                    alt={`${product.title}-${index + 1}`}
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
      </section>
      <aside className="flex w-full flex-col gap-8 px-4">
        <div className="flex justify-end">{favoriteButtonSlot}</div>
        <div className="prose dark:prose-invert flex flex-col px-4">
          <h1>
            <span className="font-bold text-5xl">{product.baseTitle}</span>
            <br />
            <span className="font-md font-normal">{product.title}</span>
          </h1>
          <h3>{product.category.name}</h3>
          <RichText data={product.baseDescription} />
        </div>
        <ProductsVariantsSelect selectedVariant={product} variants={product.productVariants} />
        <Price className="items-end" discount={product.discount} price={product.price} size="lg" />
        <AddToCartButton productId={product.id} />
      </aside>
    </div>
  );
}
