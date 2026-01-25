import type { CollectionConfig } from 'payload';

export const ProductColors: CollectionConfig = {
  slug: 'product-colors',
  hooks: {
    afterChange: [() => import('../services/cache').then(m => m.revalidateProductColorsCache())],
    afterDelete: [() => import('../services/cache').then(m => m.revalidateProductColorsCache())],
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
