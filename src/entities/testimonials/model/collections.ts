import { revalidateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';

import { MediaCollection } from '@/shared/model/collections/media-collection';
import { TESTIMONIALS_CACHE_TAG } from '../config/cache-tag';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  hooks: {
    afterChange: [() => revalidateTag(TESTIMONIALS_CACHE_TAG, 'max')],
    afterDelete: [() => revalidateTag(TESTIMONIALS_CACHE_TAG, 'max')],
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      label: 'Author Image',
      name: 'image',
      relationTo: 'testimonials-media',
      type: 'upload',
      required: true,
      hasMany: false,
    },
    {
      label: 'Text',
      name: 'text',
      type: 'textarea',
      required: true,
      minLength: 5,
      maxLength: 10000,
    },
    {
      label: 'Author Name',
      name: 'name',
      type: 'text',
      required: true,
      minLength: 5,
      maxLength: 1000,
    },
  ],
};

export const TestimonialsMedia: CollectionConfig = {
  ...MediaCollection,
  slug: 'testimonials-media',
  upload: {
    ...MediaCollection.upload,
    staticDir: 'media/testimonials',
    resizeOptions: {
      position: 'center',
      fit: 'cover',
      height: 120,
      width: 120,
    },
  },
};
