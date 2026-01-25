import { cacheTag, revalidateTag } from 'next/cache';

export const SEO_CACHE_TAG = 'SEO';

export function seoCache() {
  cacheTag(SEO_CACHE_TAG);
}

export function revalidateSeoCache() {
  revalidateTag(SEO_CACHE_TAG, { expire: 0 });
}
