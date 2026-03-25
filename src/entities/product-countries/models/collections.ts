import type { CollectionConfig } from 'payload';

import { revalidateProductCountriesCache } from '../services/cache';

export const ProductCountries: CollectionConfig = {
  slug: 'product-countries',
  hooks: {
    afterChange: [revalidateProductCountriesCache],
    afterDelete: [revalidateProductCountriesCache],
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
