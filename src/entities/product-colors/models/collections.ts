import { revalidateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';

import { PRODUCT_COLORS_CACHE_TAG } from '../config';

export const ProductColors: CollectionConfig = {
  slug: 'product-colors',
  hooks: {
    afterChange: [() => revalidateTag(PRODUCT_COLORS_CACHE_TAG, 'max')],
    afterDelete: [() => revalidateTag(PRODUCT_COLORS_CACHE_TAG, 'max')],
  },
  admin: {
    useAsTitle: 'name',
  },
  timestamps: false,
  indexes: [{ fields: ['name', 'code'], unique: true }],
  fields: [
    {
      name: 'name',
      type: 'text',
      minLength: 2,
      maxLength: 1000,
      required: true,
    },
    {
      name: 'code',
      type: 'text',
      minLength: 2,
      maxLength: 1000,
      required: true,
    },
  ],
};
