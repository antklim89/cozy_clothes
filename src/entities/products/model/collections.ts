import type { CollectionConfig } from 'payload';
import { SIZES } from '@/src/shared/config';
import { MediaCollection } from '@/src/shared/model/media-collection';


export const Products = {
  slug: 'products',
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
      required: false,
    },
    {
      label: 'Price (final price with discount)',
      name: 'price',
      type: 'number',
      min: 0,
      required: false,
    },
    {
      name: 'discount',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 0,
      required: false,
    },
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
      name: 'imagePreview',
      label: 'Image Preview',
      type: 'upload',
      relationTo: 'product-media',
      required: true,
    },
    {
      name: 'images',
      type: 'upload',
      hasMany: true,
      relationTo: 'product-media',
      required: false,
    },
    {
      name: 'productBase',
      label: 'Product Base',
      type: 'relationship',
      relationTo: 'product-bases',
      required: true,
    },
    {
      name: 'productVariants',
      label: 'Product Variants',
      type: 'join',
      collection: 'products',
      on: 'productBase',
      hasMany: true,
    },
  ],
} as const satisfies CollectionConfig;

export const ProductBases = {
  slug: 'product-bases',
  labels: {
    singular: 'Product Base',
    plural: 'Product Bases',
  },
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
      name: 'products',
      type: 'join',
      collection: 'products',
      on: 'productBase',
      hasMany: true,
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
