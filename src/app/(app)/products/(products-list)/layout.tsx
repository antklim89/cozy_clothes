import type { ReactNode } from 'react';

import { ProductCatalog } from '@/widgets/products-catalog/ui';

function Layout({
  category_filter: categoryFilter,
  country_filter: countryFilter,
  children,
}: {
  children: ReactNode;
  category_filter: ReactNode;
  country_filter: ReactNode;
}) {
  return (
    <ProductCatalog
      filter={
        <>
          {categoryFilter}
          {countryFilter}
        </>
      }
      products={children}
    />
  );
}

export default Layout;
