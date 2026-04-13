import type { Cart, Product } from '@/shared/model/types/payload-types.generated';
import type { CartItemType } from './types';
import { productPreviewDto } from '../@x/products/model';

export function cartDto(data: { id?: Cart['id']; product: Cart['product']; qty: Cart['qty'] }): CartItemType {
  const product = productPreviewDto(data.product as Product);

  return {
    product: {
      ...product,
      imageUrl: product.imagePreview.url,
    },
    qty: data.qty,
  };
}
