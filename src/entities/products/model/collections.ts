import type { CollectionConfig } from 'payload';

import { MediaCollection } from '@/shared/model/collections/media-collection';

export const Products = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['id', '_status', 'title', 'price', 'colorName', 'size', 'category', 'country'],
  },
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  versions: {
    drafts: true,
  },
  indexes: [{ fields: ['productBase', 'color', 'size'], unique: true }],
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
      type: 'relationship',
      relationTo: 'product-sizes',
      required: true,
    },
    {
      name: 'color',
      type: 'relationship',
      relationTo: 'product-colors',
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
      name: 'favorites',
      type: 'join',
      collection: 'product-favorites',
      on: 'productId',
      hasMany: false,
      admin: {
        hidden: true,
      },
    },
  ],
} as const satisfies CollectionConfig;

export const ProductBases = {
  slug: 'product-bases',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['id', '_status', 'title', 'price', 'category', 'country'],
  },
  labels: {
    singular: 'Product Base',
    plural: 'Product Bases',
  },
  versions: {
    drafts: true,
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
      name: 'productVariants',
      label: 'Product Variants',
      type: 'join',
      collection: 'products',
      on: 'productBase',
      hasMany: true,
      maxDepth: 3,
      defaultLimit: 500,
    },
  ],
} as const satisfies CollectionConfig;

export const ProductFavorites: CollectionConfig = {
  slug: 'product-favorites',
  fields: [
    {
      name: 'productId',
      type: 'relationship',
      relationTo: 'products',
    },
    {
      name: 'authorId',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
  indexes: [{ unique: true, fields: ['productId', 'authorId'] }],
  timestamps: false,
};

export const ProductMedia = {
  ...MediaCollection,
  labels: {
    singular: 'Product Media',
    plural: 'Product Media',
  },
  slug: 'product-media',
  upload: {
    ...MediaCollection.upload,
    staticDir: 'media/products',
  },
} as const satisfies CollectionConfig;
