import type { z } from 'zod/v4-mini';

import type { SIZES } from '@/shared/config/sizes';
import type { Media, RichText } from '@/shared/model/types/types';
import type { ProductFilterSchema } from './schemas';

export interface ProductVariantType {
  id: number;
  size: (typeof SIZES)[number];
  colorName: string;
  colorCode: string;
}

export interface ProductType {
  id: number;
  baseTitle: string;
  title: string;
  baseDescription: RichText;
  description?: RichText;
  price: number;
  discount: number;
  category: {
    id: number;
    name: string;
  };
  country: {
    id: number;
    name: string;
  };
  images: Media[];
  size: (typeof SIZES)[number];
  colorName: string;
  colorCode: string;
  productVariants: ProductVariantType[];
  updatedAt: string;
  createdAt: string;
}

export interface ProductPreviewType
  extends Pick<
    ProductType,
    'id' | 'title' | 'baseTitle' | 'category' | 'country' | 'price' | 'discount' | 'createdAt' | 'updatedAt'
  > {
  isFavorite: boolean;
  imagePreview: Media;
}

export type ProductFilterType = z.infer<typeof ProductFilterSchema>;
