import { revalidateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';

import { PRODUCT_CATEGORIES_CACHE_TAG } from '../config';

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  hooks: {
    afterChange: [() => revalidateTag(PRODUCT_CATEGORIES_CACHE_TAG, 'max')],
    afterDelete: [() => revalidateTag(PRODUCT_CATEGORIES_CACHE_TAG, 'max')],
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      minLength: 3,
      maxLength: 1000,
      required: true,
    },
  ],
};
