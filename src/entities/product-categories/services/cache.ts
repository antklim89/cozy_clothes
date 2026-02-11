import { cacheTag, revalidateTag } from 'next/cache';

const PRODUCT_CATEGORIES_CACHE_TAG = 'PRODUCT_CATEGORIES';

export function productCategoriesCache() {
  cacheTag(PRODUCT_CATEGORIES_CACHE_TAG);
}

export function revalidateProductCategoriesCache() {
  revalidateTag(PRODUCT_CATEGORIES_CACHE_TAG, { expire: 0 });
}
