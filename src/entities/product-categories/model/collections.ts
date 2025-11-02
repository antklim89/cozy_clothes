import type { CollectionConfig } from 'payload';

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
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
