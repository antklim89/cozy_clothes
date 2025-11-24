import { revalidateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';

import { PRODUCT_COUNTRIES_CACHE_TAG } from '../config';

export const ProductCountries: CollectionConfig = {
  slug: 'product-countries',
  hooks: {
    afterChange: [() => revalidateTag(PRODUCT_COUNTRIES_CACHE_TAG, 'max')],
    afterDelete: [() => revalidateTag(PRODUCT_COUNTRIES_CACHE_TAG, 'max')],
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      minLength: 2,
      maxLength: 1000,
      required: true,
    },
  ],
};
