import { cacheTag } from 'next/cache';

import { PRODUCT_CATEGORIES_CACHE_TAG } from '@/entities/product-categories/config';
import { getProductCategories } from '@/entities/product-categories/services';
import { ProductCategoryNavBar } from '@/entities/product-categories/ui';

async function Page() {
  'use cache';
  cacheTag(PRODUCT_CATEGORIES_CACHE_TAG);

  const { type, result: categories } = await getProductCategories();
  if (type === 'error') return <p>Error</p>;

  return <ProductCategoryNavBar categories={categories} />;
}

export default Page;
