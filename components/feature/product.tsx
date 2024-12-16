import type { ProductType } from '@/lib/schemas';
import type { ComponentProps } from 'react';
import { ProductOptions } from '@/components/form/product-options';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Price } from '@/components/ui/price';
import { defaultBlurDataUrl } from '@/constants';
import { createBlurDataURL } from '@/lib/createBlurDataURL';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AddToCartButton } from './add-to-cart-button';


interface Props extends ComponentProps<'div'> {
  product: ProductType;
}

export async function Product({ product, className, ...props }: Props) {
  const blurDataURLs = await Promise.all(product.images.map(async image => createBlurDataURL(image)));
  return (
    <div {...props} className={cn('container grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4', className)}>
      <section className="border px-4 flex-[2_1_0]">
        <Carousel>
          <CarouselContent>
            {product.images.map((image, idx) => (
              <CarouselItem key={image}>
                <Image
                  alt={product.title}
                  blurDataURL={blurDataURLs[idx] ?? defaultBlurDataUrl}
                  className="object-cover w-full supports-[height:80dvh]:h-[80dvh] h-80vh"
                  height={320}
                  placeholder="blur"
                  src={image}
                  width={480}
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
        <h3>{product.category}</h3>
        <p>{product.description}</p>
        <ProductOptions options={product.options} />
        <Price discount={product.discount} price={product.price} />
        <AddToCartButton product={product} />
      </aside>
    </div>
  );
}
