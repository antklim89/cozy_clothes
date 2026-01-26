import type { z } from 'zod/v4-mini';

import type { Media, RichText } from '@/shared/model/types/types';
import type { ProductFilterSchema } from './schemas';

export interface ProductVariantType {
  id: number;
  size: ProductType['size'];
  color: ProductType['color'];
}

export interface ProductType {
  id: number;
  baseTitle: string;
  title: string;
  baseDescription: RichText;
  description?: RichText;
  price: number;
  discount: number;
  isFavorite: boolean;
  category: {
    id: number;
    name: string;
  };
  country: {
    id: number;
    name: string;
  };
  images: Media[];
  size: {
    id: number;
    name: string;
  };
  color: {
    id: number;
    name: string;
    code: string;
  };
  productVariants: ProductVariantType[];
  updatedAt: string;
  createdAt: string;
}

export interface ProductPreviewType
  extends Pick<
    ProductType,
    | 'id'
    | 'title'
    | 'baseTitle'
    | 'category'
    | 'country'
    | 'price'
    | 'discount'
    | 'createdAt'
    | 'updatedAt'
    | 'size'
    | 'color'
    | 'isFavorite'
  > {
  imagePreview: Media;
}

export type ProductFilterType = z.infer<typeof ProductFilterSchema>;
