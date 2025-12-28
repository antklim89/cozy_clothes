import type { ReactNode } from 'react';

import { ProductCatalogSheet } from './product-catalog-sheet';

export function ProductCatalog({ products, filter }: { products: ReactNode; filter: ReactNode }) {
  return (
    <section className="m-4 grid gap-4 lg:grid-cols-[2fr_5fr]">
      <aside className="hidden lg:block">{filter}</aside>
      <div className="flex flex-col gap-8">
        <ProductCatalogSheet className="self-end lg:hidden">{filter}</ProductCatalogSheet>
        <div>{products}</div>
      </div>
    </section>
  );
}
