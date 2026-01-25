import { cacheTag, revalidateTag } from 'next/cache';

export const HERO_CACHE_TAG = 'HERO';

export function heroCache() {
  cacheTag(HERO_CACHE_TAG);
}

export function revalidateHeroCache() {
  revalidateTag(HERO_CACHE_TAG, 'max');
}
