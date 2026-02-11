import { cacheTag, revalidateTag } from 'next/cache';

const PRODUCT_COUNTRIES_CACHE_TAG = 'PRODUCT_COUNTRIES';

export function productCountriesCache() {
  cacheTag(PRODUCT_COUNTRIES_CACHE_TAG);
}

export function revalidateProductCountriesCache() {
  revalidateTag(PRODUCT_COUNTRIES_CACHE_TAG, { expire: 0 });
}
