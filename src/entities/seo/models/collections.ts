import type { CollectionConfig, GlobalConfig } from 'payload';

export const Seo: GlobalConfig = {
  slug: 'Seo',
  hooks: {
    afterChange: [() => import('../services/cache').then(m => m.revalidateSeoCache())],
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
  labels: {
    singular: 'Seo Media',
    plural: 'Seo Media',
  },
  fields: [],
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media/seo',
    resizeOptions: {
      position: 'center',
      fit: 'cover',
      width: 1200,
      height: 630,
    },
  },
} as const satisfies CollectionConfig;
