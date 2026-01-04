import { revalidateTag } from 'next/cache';
import type { CollectionConfig, GlobalConfig } from 'payload';

import { MediaCollection } from '@/shared/model/collections/media-collection';
import { HERO_CACHE_TAG } from '../config/cache-tag';

export const Hero: GlobalConfig = {
  slug: 'Hero',
  hooks: {
    afterChange: [() => revalidateTag(HERO_CACHE_TAG, 'max')],
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
