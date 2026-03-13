import { Suspense } from 'react';

import { ProductsListFallback } from '@/entities/products/ui';
import { ProductCatalog, ProductCatalogAside } from '@/widgets/products-catalog/ui';
import { SearchParamsSchema } from './params';
import { CategoriesFilterSection } from './sections/categories-filter-section';
import { ColorsFilterSection } from './sections/colors-filter-section';
import { CountriesFilterSection } from './sections/countries-filter-section';
import { ProductCatalogListSection } from './sections/product-catalog-list-section';
import { SizesFilterSection } from './sections/sizes-filter-section';

async function Page({ searchParams }: PageProps<'/products'>) {
  const { categories, colors, countries, maxPrice, minPrice, page, search, sizes, sort, averageFeedback } =
    await SearchParamsSchema.parseAsync(await searchParams);

  return (
    <ProductCatalog
      filter={
        <ProductCatalogAside>
          <CategoriesFilterSection />
          <CountriesFilterSection />
          <ColorsFilterSection />
          <SizesFilterSection />
        </ProductCatalogAside>
      }
      products={
        <Suspense fallback={<ProductsListFallback />}>
          <ProductCatalogListSection
            options={{ page, sort }}
            filter={{ categories, colors, countries, maxPrice, minPrice, search, sizes, averageFeedback }}
          />
        </Suspense>
      }
    />
  );
}

export default Page;

export { generateMetadata } from './seo';
