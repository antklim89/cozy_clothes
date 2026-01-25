import type { CollectionConfig } from 'payload';

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  hooks: {
    afterChange: [() => import('../services/cache').then(m => m.revalidateProductCategoriesCache())],
    afterDelete: [() => import('../services/cache').then(m => m.revalidateProductCategoriesCache())],
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
