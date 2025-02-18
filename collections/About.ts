import type { CollectionConfig, GlobalConfig } from 'payload';
import { Media } from './Media';


export const About: GlobalConfig = {
  slug: 'About',
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
      relationTo: 'about-media',
      required: true,
    },
    {
      label: 'Values',
      name: 'values',
      type: 'richText',
      required: true,
    },
    {
      label: 'Values list',
      name: 'valuesList',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          minLength: 5,
          maxLength: 1000,

        },
        {
          name: 'text',
          type: 'text',
          required: true,
          minLength: 5,
          maxLength: 1000,
        },
      ],
    },
  ],
};

export const AboutMedia: CollectionConfig = {
  ...Media,
  slug: 'about-media',
  upload: {
    ...Media.upload,
    staticDir: 'media/about',
  },
};
