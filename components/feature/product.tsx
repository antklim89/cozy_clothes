import { ProductOptions } from '@/components/form';
import { Carousel, Price } from '@/components/ui';
import type { ProductType } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import AddToCartButton from './add-to-cart-button';

interface Props extends ComponentProps<'div'> {
  product: ProductType;
}

function Product({ product, className, ...props }: Props) {
  return (
    <div {...props} className={cn('container flex flex-col md:flex-row', className)}>
      <section className="border px-4 flex-[2_1_0]">
        <Carousel key={product.id} autoplay={false} scrollDistance="slide" showArrows swiping keyboard>
          {product.images.map((image) => (
            <Image
              key={image}
              src={image}
              width={480}
              height={320}
              alt={product.title}
              className="object-cover w-fit h-[28rem] md:h-[48rem]"
            />
          ))}
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
}

export default Product;
