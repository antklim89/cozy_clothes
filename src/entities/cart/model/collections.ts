import type { CollectionConfig } from 'payload';


export const Cart: CollectionConfig = {
  slug: 'cart',
  timestamps: false,
  fields: [
    {
      label: 'Product variant',
      name: 'variant',
      type: 'relationship',
      required: true,
      relationTo: 'product-variants',
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
};
