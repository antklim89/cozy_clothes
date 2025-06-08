import type { CollectionConfig } from 'payload';
import { SIZES } from '@/lib/constants';


export const ProductVariants: CollectionConfig = {
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
};

