import type { ComponentProps, ReactNode } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';

import type { ProductType } from '@/entities/products/model';
import { AddToCartButton } from '@/features/update-cart/ui';
import { cn } from '@/shared/lib/utils';
import { Price } from '@/shared/ui/price';
import { RatingTotal } from '@/shared/ui/rating';
import { ProductImagesCarousel } from './product-images-carousel';
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
        <ProductImagesCarousel alt={product.title} images={product.images} />
      </section>
      <aside className="flex w-full flex-col gap-8 px-4">
        <div className="flex justify-end gap-8">
          <RatingTotal rating={product.averageFeedback} total={product.totalFeedbacks} />
          {favoriteButtonSlot}
        </div>
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
