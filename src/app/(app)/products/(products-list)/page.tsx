import { Suspense } from 'react';
import { createLoader, parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs/server';

import { getProductCategories, productCategoriesCache } from '@/entities/product-categories/services';
import { ProductCategoriesSelect, ProductCategoriesSelectFallback } from '@/entities/product-categories/ui';
import { getProductColors, productColorsCache } from '@/entities/product-colors/services';
import { ProductColorsSelect, ProductColorsSelectFallback } from '@/entities/product-colors/ui';
import { getProductCountries, productCountriesCache } from '@/entities/product-countries/services';
import { ProductCountriesSelect, ProductCountriesSelectFallback } from '@/entities/product-countries/ui';
import { getProductSizes, productSizesCache } from '@/entities/product-sizes/services';
import { ProductSizeSelect, ProductSizesSelectFallback } from '@/entities/product-sizes/ui';
import { getManyProducts } from '@/entities/products/services';
import { ProductsListFallback } from '@/entities/products/ui';
import { ErrorComponent } from '@/shared/ui/error-component';
import { ProductCatalog, ProductCatalogAside, ProductCatalogList } from '@/widgets/products-catalog/ui';

const loadSearchParams = createLoader({
  page: parseAsInteger,
  search: parseAsString,
  category: parseAsArrayOf(parseAsInteger),
  countries: parseAsArrayOf(parseAsInteger),
  colors: parseAsArrayOf(parseAsInteger),
  sizes: parseAsArrayOf(parseAsInteger),
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  sort: parseAsString,
});

async function ProductCategoriesFilterPageSection() {
  'use cache';
  productCategoriesCache();
  const { result: categories, error } = await getProductCategories();
  if (error) return <ErrorComponent error={error} />;

  return <ProductCategoriesSelect categories={categories} />;
}
async function ProductCountriesFilterPageSection() {
  'use cache';
  productCountriesCache();
  const { result: countries, error } = await getProductCountries();
  if (error) return <ErrorComponent error={error} />;

  return <ProductCountriesSelect countries={countries} />;
}

async function ProductColorsFilterPageSection() {
  'use cache';
  productColorsCache();
  const { result: colors, error } = await getProductColors();
  if (error) return <ErrorComponent error={error} />;

  return <ProductColorsSelect colors={colors} />;
}

async function ProductSizesFilterPageSection() {
  'use cache';
  productSizesCache();
  const { result: sizes, error } = await getProductSizes();
  if (error) return <ErrorComponent error={error} />;

  return <ProductSizeSelect sizes={sizes} />;
}

async function ProductCatalogListPageSection({ searchParams }: PageProps<'/products'>) {
  const params = loadSearchParams(await searchParams);

  const getProductListResult = await getManyProducts({
    filter: {
      search: params.search ?? undefined,
      minPrice: params.minPrice ?? undefined,
      maxPrice: params.maxPrice ?? undefined,
      categories: params.category ?? undefined,
      countries: params.countries ?? undefined,
      colors: params.colors ?? undefined,
      sizes: params.sizes ?? undefined,
    },
    options: {
      page: params.page ?? undefined,
      sort: params.sort ?? undefined,
    },
  });
  if (getProductListResult.error) return <ErrorComponent error={getProductListResult.error} />;

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
