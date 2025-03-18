import type { CollectionConfig } from 'payload';
import { Media } from '@/collections/Media';


export const ProductMedia: CollectionConfig = {
  ...Media,
  slug: 'product-media',
  upload: {
    ...Media.upload,
    staticDir: 'media/products',
  },
};
