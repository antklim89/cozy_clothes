import { RichText } from '@payloadcms/richtext-lexical/react';
import type { ComponentProps, ReactNode } from 'react';
import { Price } from '@/components/ui/price';
import { ImageCarousel } from '@/features/product/components/ui/image-carousel';
import { ProductVariants } from '@/features/product/components/ui/product-variants';
import type { ProductType } from '@/features/product/types';
import { cn } from '@/lib/utils';


interface Props extends ComponentProps<'div'> {
  product: ProductType;
  addToCartButton: ReactNode;
  qtyInput: ReactNode;
}

export async function Product({
  product,
  addToCartButton,
  qtyInput,
  className,
  ...props
}: Props) {
  return (
    <div {...props} className={cn('container my-4 grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-4', className)}>
      <section>
        <ImageCarousel alt={product.title} images={product.images} />
      </section>
      <aside className="prose px-4 flex flex-col">
        <h1>{product.title}</h1>
        <h3>{product.category.name}</h3>
        <RichText data={product.description} />
        <ProductVariants variants={product.variants} />
        <Price discount={product.discount} price={product.price} size="lg" />
        <div className="flex flex-col items-center gap-4 my-4">
          {qtyInput}
          {addToCartButton}
        </div>
      </aside>
    </div>
  );
}
