import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import { ProductVariants } from '@/components/form/product-variants';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Price } from '@/components/ui/price';
import type { ProductType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { AddToCartButton } from './add-to-cart-button';
import { ProductQtyInput } from './product-qty-input';


interface Props extends ComponentProps<'div'> {
  product: ProductType;
}

export async function Product({ product, className, ...props }: Props) {
  return (
    <div {...props} className={cn('container grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4', className)}>
      <section className="border px-4 flex-[2_1_0]">
        <Carousel>
          <CarouselContent>
            {product.images.map(image => (
              <CarouselItem key={image.url}>
                <Image
                  alt={product.title}
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
      </section>
      <aside className="border prose px-4 flex-[1_1_0] flex flex-col">
        <h1>{product.title}</h1>
        <h3>{product.category.name}</h3>
        <RichText data={product.description} />
        <ProductVariants variants={product.variants} />
        <Price discount={product.discount} price={product.price} />
        <ProductQtyInput
          className="my-8 self-center"
          product={product}
        />
        <AddToCartButton product={product} />
      </aside>
    </div>
  );
}
