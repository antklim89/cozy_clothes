import type { GlobalConfig } from 'payload';


export const About: GlobalConfig = {
  slug: 'About',
  fields: [
    {
      name: 'text',
      type: 'richText',
      required: true,
    },
  ],
};


