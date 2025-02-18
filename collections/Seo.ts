import type { GlobalConfig } from 'payload';


export const Seo: GlobalConfig = {
  slug: 'Seo',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      minLength: 5,
      maxLength: 1000,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      minLength: 5,
      maxLength: 10000,
    },
    {
      name: 'keywords',
      type: 'text',
      hasMany: true,
      required: true,
    },
    {
      name: 'creator',
      type: 'text',
      required: true,
      minLength: 5,
      maxLength: 1000,
    },
  ],
};
