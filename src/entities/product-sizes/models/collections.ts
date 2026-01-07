import { revalidateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';

import { PRODUCT_SIZES_CACHE_TAG } from '../config';

export const ProductSizes: CollectionConfig = {
  slug: 'product-sizes',
  hooks: {
    afterChange: [() => revalidateTag(PRODUCT_SIZES_CACHE_TAG, 'max')],
    afterDelete: [() => revalidateTag(PRODUCT_SIZES_CACHE_TAG, 'max')],
  },
  admin: {
    useAsTitle: 'name',
  },
  timestamps: false,
  fields: [
    {
      name: 'name',
      type: 'text',
      minLength: 2,
      maxLength: 1000,
      required: true,
      unique: true,
    },
    {
      name: 'length',
      type: 'number',
      min: 0,
      max: 1000,
      required: false,
    },
    {
      name: 'shoulderLength',
      type: 'number',
      min: 0,
      max: 1000,
      required: false,
    },
    {
      name: 'sleeveLength',
      type: 'number',
      min: 0,
      max: 1000,
      required: false,
    },
    {
      name: 'waistSize',
      type: 'number',
      min: 0,
      max: 1000,
      required: false,
    },
    {
      name: 'bustSize',
      type: 'number',
      min: 0,
      max: 1000,
      required: false,
    },
  ],
};
