import { cacheTag, revalidateTag } from 'next/cache';

export const TESTIMONIALS_CACHE_TAG = 'TESTIMONIALS';

export function testimonialsCache() {
  cacheTag(TESTIMONIALS_CACHE_TAG);
}

export function revalidateTestimonialsCache() {
  revalidateTag(TESTIMONIALS_CACHE_TAG, { expire: 0 });
}
