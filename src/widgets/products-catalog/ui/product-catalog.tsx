import type { ReactNode } from 'react';

import { ProductCatalogSheet } from './product-catalog-sheet';

export function ProductCatalog({ products, filter }: { products: ReactNode; filter: ReactNode }) {
  return (
    <section className="m-4 flex">
      <aside className="hidden flex-[0_0_20rem] lg:block">
        <div className="fixed h-[calc(100vh-(6rem))] w-80 overflow-y-auto">{filter}</div>
      </aside>
      <div className="flex flex-[1_0_calc(100%-20rem)] flex-col gap-2">
        <ProductCatalogSheet className="self-end lg:hidden">{filter}</ProductCatalogSheet>
        <div>{products}</div>
      </div>
    </section>
  );
}
