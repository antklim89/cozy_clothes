import type { Cart } from '@/shared/model/types/payload-types.generated';
import type { CartItemType } from './types';
import { productPreviewDto } from '../@x/products/model';

export function cartDto(data: { id?: Cart['id']; product: Cart['product']; qty: Cart['qty'] }): CartItemType {
  const product = data.product as Extract<(typeof data)['product'], object>;

  return {
    id: data.id,
    product: productPreviewDto(product),
    qty: data.qty,
  };
}
