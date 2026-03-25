import type { CollectionConfig } from 'payload';

import { revalidateProductCategoriesCache } from '../services/cache';

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  hooks: {
    afterChange: [revalidateProductCategoriesCache],
    afterDelete: [revalidateProductCategoriesCache],
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
