import { cacheTag, revalidateTag } from 'next/cache';

const PRODUCT_COLORS_CACHE_TAG = 'PRODUCT_COLORS';

export function productColorsCache() {
  cacheTag(PRODUCT_COLORS_CACHE_TAG);
}

export function revalidateProductColorsCache() {
  revalidateTag(PRODUCT_COLORS_CACHE_TAG, { expire: 0 });
}
