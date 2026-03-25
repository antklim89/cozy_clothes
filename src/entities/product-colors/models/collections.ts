import type { CollectionConfig } from 'payload';

import { revalidateProductColorsCache } from '../services/cache';

export const ProductColors: CollectionConfig = {
  slug: 'product-colors',
  hooks: {
    afterChange: [revalidateProductColorsCache],
    afterDelete: [revalidateProductColorsCache],
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
      unique: true,
    },
    {
      name: 'code',
      type: 'text',
      minLength: 2,
      maxLength: 1000,
      required: true,
      unique: true,
    },
  ],
};
