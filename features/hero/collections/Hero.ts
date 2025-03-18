import type { GlobalConfig } from 'payload';


export const Hero: GlobalConfig = {
  slug: 'Hero',
  fields: [
    {
      name: 'text',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      hasMany: false,
      relationTo: 'hero-media',
      required: true,
    },
  ],
};
