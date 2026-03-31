import type { CollectionConfig } from 'payload';

import { MediaCollection } from '@/shared/model/collections/media-collection';
import { revalidateTestimonialsCache } from '../services/cache';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  hooks: {
    afterChange: [revalidateTestimonialsCache],
    afterDelete: [revalidateTestimonialsCache],
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
  labels: {
    singular: 'Testimonials Media',
    plural: 'Testimonials Media',
  },
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
  fields: [
    ...MediaCollection.fields,
    {
      name: 'testimonials',
      type: 'join',
      collection: 'testimonials',
      on: 'image',
    },
  ],
};
