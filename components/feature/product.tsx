import { ProductOptions } from '@/components/form';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, Price } from '@/components/ui';
import type { ProductType } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import { AddToCartButton } from './add-to-cart-button';

interface Props extends ComponentProps<'div'> {
  product: ProductType;
}

export const Product = ({ product, className, ...props }: Props) => {
  return (
    <div {...props} className={cn('container flex flex-col md:flex-row', className)}>
      <section className="border px-4 flex-[2_1_0]">
        <Carousel>
          <CarouselContent>
            {product.images.map((image) => (
              <CarouselItem key={image}>
                <Image
                  src={image}
                  width={480}
                  height={320}
                  alt={product.title}
                  className="object-cover w-full supports-[height:80dvh]:h-[80dvh] h-80vh"
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
        <Price price={product.price} discount={product.discount} />
        <AddToCartButton product={product} />
      </aside>
    </div>
  );
};

export default Product;
