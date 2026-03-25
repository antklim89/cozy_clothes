import type { CollectionConfig } from 'payload';

import { revalidateProductSizesCache } from '../services/cache';

export const ProductSizes: CollectionConfig = {
  slug: 'product-sizes',
  hooks: {
    afterChange: [revalidateProductSizesCache],
    afterDelete: [revalidateProductSizesCache],
  },
  admin: {
    useAsTitle: 'name',
  },
  timestamps: false,
  fields: [
    {
      name: 'name',
      type: 'text',
      minLength: 1,
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
