import { revalidateTag } from 'next/cache';
import type { CollectionConfig, GlobalConfig } from 'payload';

import { SEO_CACHE_TAG } from '../config/cache-tag';

export const Seo: GlobalConfig = {
  slug: 'Seo',
  hooks: {
    afterChange: [() => revalidateTag(SEO_CACHE_TAG, 'max')],
  },

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
    {
      name: 'images',
      type: 'upload',
      hasMany: true,
      relationTo: 'seo-media',
      required: true,
    },
  ],
};

export const SeoMedia = {
  slug: 'seo-media',
  fields: [],
  upload: {
    staticDir: 'media/seo',
    resizeOptions: {
      position: 'center',
      fit: 'cover',
      width: 800,
      height: 600,
    },
  },
} as const satisfies CollectionConfig;
