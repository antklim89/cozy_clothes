import type { CollectionConfig } from 'payload';

import { MediaCollection } from '@/shared/model/collections/media-collection';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../config/constants';

export const Feedback: CollectionConfig = {
  slug: 'feedback',
  indexes: [{ fields: ['product', 'user'], unique: true }],
  fields: [
    {
      label: 'Review',
      name: 'review',
      type: 'text',
      required: false,
      maxLength: 10000,
    },
    {
      label: 'Positive review',
      name: 'positiveReview',
      type: 'text',
      required: false,
      maxLength: 10000,
    },
    {
      label: 'Negative review',
      name: 'negativeReview',
      type: 'text',
      required: false,
      maxLength: 10000,
    },
    {
      label: 'Rating',
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    {
      label: 'User',
      name: 'user',
      type: 'relationship',
      required: true,
      relationTo: 'users',
    },
    {
      label: 'Product',
      name: 'product',
      type: 'relationship',
      required: true,
      relationTo: 'products',
    },
    {
      name: 'images',
      type: 'upload',
      hasMany: true,
      relationTo: 'feedback-media',
      required: false,
      maxRows: 5,
    },
  ],
};

export const FeedbackMedia = {
  ...MediaCollection,
  labels: {
    singular: 'Feedback Media',
    plural: 'Feedback Media',
  },
  slug: 'feedback-media',
  upload: {
    ...MediaCollection.upload,
    resizeOptions: {
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
      fit: 'contain',
    },
    staticDir: 'media/feedbacks',
  },
} as const satisfies CollectionConfig;
