import type { CollectionConfig, GlobalConfig } from 'payload';
import { Media } from './Media';


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

export const HeroMedia: CollectionConfig = {
  ...Media,
  slug: 'hero-media',
  upload: {
    ...Media.upload,
    staticDir: 'media/hero',
  },
};
