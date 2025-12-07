import { cacheTag } from 'next/cache';

import { PRODUCT_CATEGORIES_CACHE_TAG } from '@/entities/product-categories/config';
import { getProductCategories } from '@/entities/product-categories/services';
import { ProductCategoryNavBar } from '@/entities/product-categories/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

async function Page() {
  'use cache';
  cacheTag(PRODUCT_CATEGORIES_CACHE_TAG);

  const { type, result: categories, error } = await getProductCategories();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <ProductCategoryNavBar categories={categories} />;
}

export default Page;
