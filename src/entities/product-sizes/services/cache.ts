import { cacheTag, revalidateTag } from 'next/cache';

const PRODUCT_SIZES_CACHE_TAG = 'PRODUCT_SIZES';

export function productSizesCache() {
  cacheTag(PRODUCT_SIZES_CACHE_TAG);
}

export function revalidateProductSizesCache() {
  revalidateTag(PRODUCT_SIZES_CACHE_TAG, { expire: 0 });
}
