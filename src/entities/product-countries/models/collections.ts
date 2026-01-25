import type { CollectionConfig } from 'payload';

export const ProductCountries: CollectionConfig = {
  slug: 'product-countries',
  hooks: {
    afterChange: [() => import('../services/cache').then(m => m.revalidateProductCountriesCache())],
    afterDelete: [() => import('../services/cache').then(m => m.revalidateProductCountriesCache())],
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      minLength: 2,
      maxLength: 1000,
      required: true,
    },
  ],
};
