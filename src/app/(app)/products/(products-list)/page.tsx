import { Suspense } from 'react';
import { cacheLife, cacheTag } from 'next/cache';
import { createLoader, parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs/server';

import { PRODUCT_CATEGORIES_CACHE_TAG } from '@/entities/product-categories/config';
import { getProductCategories } from '@/entities/product-categories/services';
import { ProductCategoriesSelect, ProductCategoriesSelectFallback } from '@/entities/product-categories/ui';
import { PRODUCT_COLORS_CACHE_TAG } from '@/entities/product-colors/config';
import { getProductColors } from '@/entities/product-colors/services';
import { ProductColorsSelect, ProductColorsSelectFallback } from '@/entities/product-colors/ui';
import { PRODUCT_COUNTRIES_CACHE_TAG } from '@/entities/product-countries/config';
import { getProductCountries } from '@/entities/product-countries/services';
import { ProductCountriesSelect, ProductCountriesSelectFallback } from '@/entities/product-countries/ui';
import { PRODUCT_SIZES_CACHE_TAG } from '@/entities/product-sizes/config';
import { getProductSizes } from '@/entities/product-sizes/services';
import { ProductSizeSelect, ProductSizesSelectFallback } from '@/entities/product-sizes/ui';
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

async function ProductCategoriesFilterPageSection() {
  'use cache';
  cacheLife('max');
  cacheTag(PRODUCT_CATEGORIES_CACHE_TAG);
  const { result: categories, type, error } = await getProductCategories();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <ProductCategoriesSelect categories={categories} />;
}
async function ProductCountriesFilterPageSection() {
  'use cache';
  cacheLife('max');
  cacheTag(PRODUCT_COUNTRIES_CACHE_TAG);
  const { result: countries, type, error } = await getProductCountries();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <ProductCountriesSelect countries={countries} />;
}

async function ProductColorsFilterPageSection() {
  'use cache';
  cacheLife('max');
  cacheTag(PRODUCT_COLORS_CACHE_TAG);
  const { result: colors, type, error } = await getProductColors();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <ProductColorsSelect colors={colors} />;
}

async function ProductSizesFilterPageSection() {
  'use cache';
  cacheLife('max');
  cacheTag(PRODUCT_SIZES_CACHE_TAG);
  const { result: sizes, type, error } = await getProductSizes();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <ProductSizeSelect sizes={sizes} />;
}

async function ProductCatalogListPageSection({ searchParams }: PageProps<'/products'>) {
  const params = loadSearchParams(await searchParams);

  const getProductListResult = await getProductList({
    filter: {
      search: params.search ?? undefined,
      minPrice: params.minPrice ?? undefined,
      maxPrice: params.maxPrice ?? undefined,
      categories: params.category ?? undefined,
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
          <Suspense fallback={<ProductCountriesSelectFallback />}>
            <ProductCategoriesFilterPageSection />
          </Suspense>
          <Suspense fallback={<ProductCategoriesSelectFallback />}>
            <ProductCountriesFilterPageSection />
          </Suspense>
          <Suspense fallback={<ProductColorsSelectFallback />}>
            <ProductColorsFilterPageSection />
          </Suspense>
          <Suspense fallback={<ProductSizesSelectFallback />}>
            <ProductSizesFilterPageSection />
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
