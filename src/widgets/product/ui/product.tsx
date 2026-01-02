import type { ComponentProps, ReactNode } from 'react';

import type { ProductType } from '@/entities/products/model';
import { ProductImagesCarousel, ProductInfo, ProductsVariantsSelect } from '@/entities/products/ui';
import { AddToCartButton } from '@/features/update-cart/ui';
import { cn } from '@/shared/lib/utils';
import { Price } from '@/shared/ui/price';

interface Props extends ComponentProps<'div'> {
  product: ProductType;
  favoriteButtonSlot: ReactNode;
}

export function Product({ product, favoriteButtonSlot, className, ...props }: Props) {
  return (
    <div {...props} className={cn('container my-4 grid grid-cols-1 gap-4 lg:grid-cols-2', className)}>
      <section>
        <ProductImagesCarousel alt={product.baseTitle} images={product.images} />
      </section>
      <aside className="flex w-full flex-col gap-8 px-4">
        <div className="flex justify-end">{favoriteButtonSlot}</div>
        <ProductInfo product={product} />
        <ProductsVariantsSelect selectedVariant={product} variants={product.productVariants} />
        <Price className="items-end" discount={product.discount} price={product.price} size="lg" />
        <AddToCartButton productId={product.id} />
      </aside>
    </div>
  );
}
