import type { ComponentProps } from 'react';

import type { ProductPreviewType } from '@/entities/products/model';
import { ProductPagination, ProductsList, ProductsListCard } from '@/entities/products/ui';
import { cn } from '@/shared/lib/utils';
import { ProductsFavoritesEmpty } from './products-favorites-empty';

export function ProductsFavorites({
  products,
  totalPages,
  page,
  children,
  className,
  ...props
}: ComponentProps<'section'> & {
  products: ProductPreviewType[];
  totalPages: number;
  page?: number | undefined;
}) {
  return (
    <section className={cn('container my-8', className)} {...props}>
      <h2 className="mb-4 text-2xl">Favorites Products</h2>
      <ProductPagination totalPages={totalPages} page={page} />
      {products.length === 0 && <ProductsFavoritesEmpty />}
      <ProductsList>
        {products.map(product => (
          <ProductsListCard key={product.id} product={product} />
        ))}
      </ProductsList>
      <ProductPagination totalPages={totalPages} page={page} />
    </section>
  );
}
