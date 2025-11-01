import type { CollectionConfig } from 'payload';


export const ProductCountries: CollectionConfig = {
  slug: 'product-countries',
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
