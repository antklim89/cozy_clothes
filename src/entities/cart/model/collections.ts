import type { CollectionConfig } from 'payload';

export const Cart: CollectionConfig = {
  slug: 'cart',
  timestamps: false,
  fields: [
    {
      label: 'Product product',
      name: 'product',
      type: 'relationship',
      required: true,
      relationTo: 'products',
    },
    {
      label: 'User',
      name: 'user',
      type: 'relationship',
      required: true,
      relationTo: 'users',
    },
    {
      label: 'Quantity',
      name: 'qty',
      type: 'number',
      defaultValue: 1,
      required: true,
      min: 1,
      max: 100,
    },
  ],
  indexes: [{ unique: true, fields: ['user', 'product'] }],
};
