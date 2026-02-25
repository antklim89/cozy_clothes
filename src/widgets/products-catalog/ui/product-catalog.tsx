import type { ReactNode } from 'react';

import { ProductCatalogSheet } from './product-catalog-sheet';

export function ProductCatalog({ products, filter }: { products: ReactNode; filter: ReactNode }) {
  return (
    <section className="m-4 flex">
      <aside className="hidden flex-[0_0_22rem] lg:block">{filter}</aside>
      <div className="flex flex-[1_0_calc(100%-22rem)] flex-col gap-2">
        <ProductCatalogSheet className="self-end lg:hidden">{filter}</ProductCatalogSheet>
        <div>{products}</div>
      </div>
    </section>
  );
}
