import type { CollectionConfig } from 'payload';
import { Media } from './Media';


export const Products: CollectionConfig = {
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
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'images',
      type: 'upload',
      hasMany: true,
      relationTo: 'products-media',
      required: true,
    },
    {
      name: 'variants',
      type: 'relationship',
      relationTo: 'product-variants',
      required: true,
      hasMany: true,
    },
  ],
};

export const ProductsMedia: CollectionConfig = {
  ...Media,
  slug: 'products-media',
  upload: {
    ...Media.upload,
    staticDir: 'media/products',
  },
};
