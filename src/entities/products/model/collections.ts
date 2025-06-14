import type { CollectionConfig } from 'payload';
import { SIZES } from '@/src/shared/config';
import { MediaCollection } from '@/src/shared/model/media-collection';


export const Products = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      minLength: 5,
      maxLength: 1000,
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      label: 'Price (final price with discount)',
      name: 'price',
      type: 'number',
      min: 0,
      required: true,
    },
    {
      name: 'discount',
      type: 'number',
      min: 0,
      max: 100,
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      required: true,
    },
    {
      name: 'country',
      type: 'relationship',
      relationTo: 'product-countries',
      required: true,
    },
    {
      name: 'images',
      type: 'upload',
      hasMany: true,
      relationTo: 'product-media',
      required: true,
    },
    {
      name: 'variants',
      type: 'join',
      collection: 'product-variants',
      on: 'product',
      hasMany: true,
    },
  ],
} as const satisfies CollectionConfig;

export const ProductVariants = {
  slug: 'product-variants',
  fields: [
    {
      name: 'size',
      type: 'select',
      options: SIZES as unknown as string[],
      required: true,
    },
    {
      name: 'colorName',
      type: 'text',
      required: true,
    },
    {
      name: 'colorCode',
      type: 'text',
      required: true,
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
  ],
} as const satisfies CollectionConfig;

export const ProductMedia = {
  ...MediaCollection,
  slug: 'product-media',
  upload: {
    ...MediaCollection.upload,
    staticDir: 'media/products',
  },
} as const satisfies CollectionConfig;
