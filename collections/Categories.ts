import type { CollectionConfig } from 'payload';


export const Categories: CollectionConfig = {
  slug: 'categories',
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
