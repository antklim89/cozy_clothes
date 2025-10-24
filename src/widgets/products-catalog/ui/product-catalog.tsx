import type { ReactNode } from 'react';
import type { ProductPreviewType } from '@/entities/products/model';
import { ProductsList, ProductsListCard } from '@/entities/products/ui';
import type { PaginatedData } from '@/shared/model/types';
import { ProductPagination } from './product-pagination';
import { ProductSheet } from './product-sheet';

export async function ProductCatalog({ products, filter }: { products: PaginatedData<ProductPreviewType>; filter?: ReactNode }) {
  return (
    <section className="my-4 grid lg:grid-cols-[2fr_5fr] gap-4">
      {filter != null && (
        <aside className="hidden lg:block">
          {filter}
        </aside>
      )}
      <div className="flex flex-col gap-4">
        {filter != null && (
          <ProductSheet className="self-end lg:hidden">
            {filter}
          </ProductSheet>
        )}

        <div>
          <ProductPagination page={products.page} totalPages={products.totalPages} />
          <ProductsList>
            {products.docs.map(product => (
              <ProductsListCard key={product.id} product={product} />
            ))}
          </ProductsList>
          <ProductPagination page={products.page} totalPages={products.totalPages} />
        </div>
      </div>
    </section>
  );
}

