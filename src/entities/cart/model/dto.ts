import 'server-only';
import placeholder from '@/shared/assets/placeholder.png';
import type { Cart } from '@/shared/model/types/payload-types.generated';
import type { CartItemType } from './types';

export function cartDto(data: { id?: Cart['id']; product: Cart['product']; qty: Cart['qty'] }): CartItemType {
  const product = data.product as Extract<typeof data['product'], object>;
  const productBase = product.productBase as Extract<typeof product['productBase'], object>;
  const images = productBase.images as Extract<typeof productBase['images'][number], object>[];

  return {
    id: data.id,
    productId: product.id,
    size: product.size,
    colorName: product.colorName,
    title: productBase.title,
    discount: product.discount ?? productBase.discount,
    price: product.price ?? productBase.price,
    image: images[0]?.url ?? placeholder.src,
    qty: data.qty,
  };
}
