import type { ComponentProps } from 'react';

import type { ProductType } from '@/entities/products/model';
import { ProductImagesCarousel, ProductInfo, ProductsVariantsSelect } from '@/entities/products/ui';
import { getMe } from '@/entities/user/services';
import { FavoritesToggleButton } from '@/features/favorites-toggle/ui';
import { AddToCartButton } from '@/features/update-cart/ui';
import { cn } from '@/shared/lib/utils';
import { Price } from '@/shared/ui/price';

interface Props extends ComponentProps<'div'> {
  product: ProductType;
}

export async function Product({ product, className, ...props }: Props) {
  const user = await getMe();

  return (
    <div {...props} className={cn('container my-4 grid grid-cols-1 gap-4 lg:grid-cols-2', className)}>
      <section>
        <ProductImagesCarousel alt={product.baseTitle} images={product.images} />
      </section>
      <aside className="flex w-full flex-col gap-8 px-4">
        <FavoritesToggleButton
          size="icon"
          className="self-end"
          isAuthenticated={user != null}
          productId={product.id}
          isFavorite={product.isFavorite}
        />
        <ProductInfo product={product} />
        <ProductsVariantsSelect selectedVariant={product} variants={product.productVariants} />
        <Price className="items-end" discount={product.discount} price={product.price} size="lg" />
        <AddToCartButton productId={product.id} />
      </aside>
    </div>
  );
}
