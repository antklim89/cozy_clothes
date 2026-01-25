import { cacheTag, revalidateTag } from 'next/cache';

export const CONTACTS_CACHE_TAG = 'CONTACTS';

export function contactsCache() {
  cacheTag(CONTACTS_CACHE_TAG);
}

export function revalidateContactsCache() {
  revalidateTag(CONTACTS_CACHE_TAG, 'max');
}
