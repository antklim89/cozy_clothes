import 'server-only';
import type { Cart } from '@/payload-types';
import placeholder from '@/src/shared/assets/placeholder.png';
import { CartItemSchema } from './schemas';
import type { CartItemType } from './types';

export function cartDto(data: { id?: Cart['id']; variant: Cart['variant']; qty?: Cart['qty'] }): CartItemType {
  const variant = data.variant as Extract<typeof data['variant'], object>;
  const product = variant.product as Extract<typeof variant['product'], object>;
  const images = product.images as Extract<typeof product['images'][number], object>[];

  return CartItemSchema.parse({
    id: data.id,
    variantId: variant.id,
    productId: product.id,
    size: variant.size,
    colorName: variant.colorName,
    title: product.title,
    discount: product.discount,
    price: product.price,
    image: images[0]?.url ?? placeholder.src,
    qty: data.qty ?? 1,
  });
}
