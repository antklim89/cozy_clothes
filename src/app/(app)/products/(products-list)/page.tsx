import { Suspense } from 'react';
import { cacheLife, cacheTag } from 'next/cache';
import { createLoader, parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs/server';

import { PRODUCT_CATEGORIES_CACHE_TAG } from '@/entities/product-categories/config';
import { getProductCategories } from '@/entities/product-categories/services';
import { ProductCategorySelect, ProductCategorySelectFallback } from '@/entities/product-categories/ui';
import { PRODUCT_COUNTRIES_CACHE_TAG } from '@/entities/product-countries/config';
import { getProductCountries } from '@/entities/product-countries/services';
import { ProductCountrySelect, ProductCountrySelectFallback } from '@/entities/product-countries/ui';
import { getProductList } from '@/entities/products/services';
import { ProductsListFallback } from '@/entities/products/ui';
import { ErrorComponent } from '@/shared/ui/error-component';
import { ProductCatalog, ProductCatalogAside, ProductCatalogList } from '@/widgets/products-catalog/ui';

const loadSearchParams = createLoader({
  page: parseAsInteger,
  search: parseAsString,
  category: parseAsArrayOf(parseAsInteger),
  countries: parseAsArrayOf(parseAsInteger),
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  sort: parseAsString,
});

async function CategoryFilterPageSection() {
  'use cache';
  cacheLife('max');
  cacheTag(PRODUCT_CATEGORIES_CACHE_TAG);
  const { result: categories, type, error } = await getProductCategories();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <ProductCategorySelect categories={categories} />;
}
async function CountryFilterPageSection() {
  'use cache';
  cacheLife('max');
  cacheTag(PRODUCT_COUNTRIES_CACHE_TAG);
  const { result: countries, type, error } = await getProductCountries();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <ProductCountrySelect countries={countries} />;
}

async function ProductCatalogListPageSection({ searchParams }: PageProps<'/products'>) {
  const params = loadSearchParams(await searchParams);

  const getProductListResult = await getProductList({
    filter: {
      search: params.search ?? undefined,
      minPrice: params.minPrice ?? undefined,
      maxPrice: params.maxPrice ?? undefined,
      category: params.category ?? undefined,
      countries: params.countries ?? undefined,
    },
    options: {
      page: params.page ?? undefined,
      sort: params.sort ?? undefined,
    },
  });
  if (getProductListResult.type === 'error') return <ErrorComponent error={getProductListResult.error} />;

  return <ProductCatalogList products={getProductListResult.result} />;
}

function Page(props: PageProps<'/products'>) {
  return (
    <ProductCatalog
      filter={
        <ProductCatalogAside>
          <Suspense fallback={<ProductCountrySelectFallback />}>
            <CategoryFilterPageSection />
          </Suspense>
          <Suspense fallback={<ProductCategorySelectFallback />}>
            <CountryFilterPageSection />
          </Suspense>
        </ProductCatalogAside>
      }
      products={
        <Suspense fallback={<ProductsListFallback />}>
          <ProductCatalogListPageSection {...props} />
        </Suspense>
      }
    />
  );
}

export default Page;

export { generateMetadata } from './seo';
