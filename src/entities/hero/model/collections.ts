import type { CollectionConfig, GlobalConfig } from 'payload';

import { MediaCollection } from '@/shared/model/collections/media-collection';

export const Hero: GlobalConfig = {
  slug: 'Hero',
  hooks: {
    afterChange: [() => import('../services/cache').then(m => m.revalidateHeroCache())],
  },

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
  ...MediaCollection,
  slug: 'hero-media',
  labels: {
    singular: 'Hero Media',
    plural: 'Hero Media',
  },
  upload: {
    ...MediaCollection.upload,
    staticDir: 'media/hero',
  },
};
