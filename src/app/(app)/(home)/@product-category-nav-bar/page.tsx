import { cacheTag } from 'next/cache';

import { PRODUCT_CATEGORIES_CACHE_TAG } from '@/entities/product-categories/config';
import { getProductCategories } from '@/entities/product-categories/services';
import { ProductCategoriesNavBar } from '@/entities/product-categories/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

async function Page() {
  'use cache';
  cacheTag(PRODUCT_CATEGORIES_CACHE_TAG);

  const { result: categories, error } = await getProductCategories();
  if (error) return <ErrorComponent error={error} />;

  return <ProductCategoriesNavBar categories={categories} />;
}

export default Page;
