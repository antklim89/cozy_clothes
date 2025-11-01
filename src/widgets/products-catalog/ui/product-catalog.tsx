import type { ReactNode } from 'react';
import { PriceFilter, ProductSearch } from '@/entities/products/ui';
import { ProductCatalogAside } from './product-catalog-aside';
import { ProductCatalogSheet } from './product-catalog-sheet';

export async function ProductCatalog({ products, filter }: { products: ReactNode; filter?: ReactNode }) {
  return (
    <section className="m-4 grid lg:grid-cols-[2fr_5fr] gap-4">
      <aside className="hidden lg:block">
        <ProductCatalogAside>
          <ProductSearch />
          <PriceFilter />
          {filter}
        </ProductCatalogAside>
      </aside>
      <div className="flex flex-col gap-4">
        <ProductCatalogSheet asChild className="self-end lg:hidden">
          <ProductCatalogAside>
            <ProductSearch />
            <PriceFilter />
            {filter}
          </ProductCatalogAside>
        </ProductCatalogSheet>

        <div>
          {products}
        </div>
      </div>
    </section>
  );
}
